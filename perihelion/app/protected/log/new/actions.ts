"use server";

import { createClient } from "@/lib/supabase/server";
import { parseObservationForm } from "@/lib/observations/schema";
import { revalidatePath } from "next/cache";

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
  return base || "sketch";
}

const MAX_SKETCH_BYTES = 5 * 1024 * 1024;

export type CreateObservationResult =
  | { ok: true }
  | { ok: false; error: string };

export async function createObservation(formData: FormData): Promise<CreateObservationResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "You must be signed in." };
  }

  const parsed = parseObservationForm(formData);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => i.message).join("; ");
    return { ok: false, error: msg || "Invalid form" };
  }

  const v = parsed.data;
  let sketch_path: string | null = null;

  const sketch = formData.get("sketch");
  if (sketch instanceof File && sketch.size > 0) {
    if (sketch.size > MAX_SKETCH_BYTES) {
      return { ok: false, error: "Sketch file must be 5 MB or smaller." };
    }
    if (!sketch.type.startsWith("image/")) {
      return { ok: false, error: "Sketch must be an image file." };
    }
    const path = `${user.id}/${Date.now()}-${sanitizeFilename(sketch.name)}`;
    const { error: uploadError } = await supabase.storage.from("observation-sketches").upload(path, sketch, {
      contentType: sketch.type,
      upsert: false,
    });
    if (uploadError) {
      return { ok: false, error: uploadError.message };
    }
    sketch_path = path;
  }

  const { error: insertError } = await supabase.from("observations").insert({
    user_id: user.id,
    object_name: v.object_name.trim(),
    object_type: v.object_type.trim(),
    observed_at: v.observed_at,
    location: v.location.trim(),
    telescope: v.telescope.trim(),
    notes: v.notes.trim(),
    sketch_path,
  });

  if (insertError) {
    return { ok: false, error: insertError.message };
  }

  revalidatePath("/protected/dashboard");
  revalidatePath("/protected/log");
  return { ok: true };
}
