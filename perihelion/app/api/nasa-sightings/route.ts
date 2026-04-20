import { NextResponse } from "next/server";

/** JPL Small-Body Database — meaningful for asteroids, comets, dwarf planets, major planets by name. */
const SBDB = "https://ssd-api.jpl.nasa.gov/sbdb.api";

export type NasaSightingsResponse =
  | {
      applicable: true;
      designation: string;
      name?: string;
      kind?: string;
      orbitClass?: string;
      note?: string;
    }
  | { applicable: false; reason: string };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json({ error: "missing q" }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);

  try {
    const url = `${SBDB}?sstr=${encodeURIComponent(q)}`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timer);

    const json = (await res.json()) as {
      object?: {
        designation?: string;
        name?: string;
        kind?: string;
        orbit_class?: string;
      };
      message?: string;
    };

    if (!res.ok || json.message) {
      return NextResponse.json({
        applicable: false,
        reason: "not_a_small_body_or_unknown",
      } satisfies NasaSightingsResponse);
    }

    const obj = json.object;
    if (!obj?.designation) {
      return NextResponse.json({
        applicable: false,
        reason: "not_a_small_body_or_unknown",
      } satisfies NasaSightingsResponse);
    }

    return NextResponse.json({
      applicable: true,
      designation: obj.designation,
      name: obj.name,
      kind: obj.kind,
      orbitClass: obj.orbit_class,
      note: "NASA JPL SBDB — solar-system small-body record",
    } satisfies NasaSightingsResponse);
  } catch (e) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") {
      return NextResponse.json({ error: "timeout" }, { status: 504 });
    }
    return NextResponse.json({ error: "lookup_failed" }, { status: 500 });
  }
}
