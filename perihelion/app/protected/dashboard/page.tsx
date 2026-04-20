import { DashboardView } from "@/components/dashboard/dashboard-view";
import { createClient } from "@/lib/supabase/server";
import {
  aggregateObjectTypes,
  buildHeatmapGrid,
  buildMonthlySeries,
} from "@/lib/observations/queries";
import type { ObservationRow } from "@/lib/types/observation";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

const HEATMAP_WEEKS = 26;

export default async function DashboardPage() {
  noStore();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from("observations")
    .select("*")
    .eq("user_id", user.id)
    .order("observed_at", { ascending: false });

  if (error) {
    return (
      <div style={{ color: "#f87171", fontSize: "0.9rem" }}>
        Could not load observations. Apply the database migration in Supabase if you have not yet.
      </div>
    );
  }

  const rows = (data ?? []) as ObservationRow[];
  const monthly = buildMonthlySeries(rows);
  const typeCounts = aggregateObjectTypes(rows);
  const { levels: heatmapLevels } = buildHeatmapGrid(rows, HEATMAP_WEEKS);

  return (
    <DashboardView
      typeCounts={typeCounts}
      monthly={monthly}
      heatmapLevels={heatmapLevels}
      heatmapWeeks={HEATMAP_WEEKS}
      totalObservations={rows.length}
    />
  );
}
