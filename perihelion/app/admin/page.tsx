import { createClient } from '@/lib/supabase/server';
import type { ObservationRow } from '@/lib/types/observation';
import type { Profile } from '@/lib/types/profile';

export default async function AdminPage() {
  const supabase = await createClient();

  const [{ data: observations }, { data: profiles }] = await Promise.all([
    supabase.from('observations').select('*').order('created_at', { ascending: false }),
    supabase.from('profiles').select('*'),
  ]);

  const obs = (observations ?? []) as ObservationRow[];
  const prof = (profiles ?? []) as Profile[];

  // Build per-user stats
  const statsByUser = prof.map((p) => {
    const userObs = obs.filter((o) => o.user_id === p.id);
    const last = userObs[0]?.observed_at ?? '—';
    return { id: p.id, role: p.role, handle: p.handle, count: userObs.length, last };
  });

  return (
    <main className="min-h-screen p-8" style={{ color: '#dce8ff' }}>
      <h1
        style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          letterSpacing: '0.2em',
          fontSize: '1.6rem',
          marginBottom: '0.25rem',
          color: '#c8d8f8',
        }}
      >
        Admin — Observer Overview
      </h1>
      <p style={{ color: '#4a6088', fontSize: '0.82rem', marginBottom: '2rem' }}>
        {obs.length} total observations across {prof.length} users
      </p>

      <section style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(140,180,255,0.15)', textAlign: 'left', color: '#8ab4ff' }}>
              <th style={{ padding: '0.5rem 1rem 0.5rem 0' }}>User ID</th>
              <th style={{ padding: '0.5rem 1rem' }}>Handle</th>
              <th style={{ padding: '0.5rem 1rem' }}>Role</th>
              <th style={{ padding: '0.5rem 1rem' }}>Observations</th>
              <th style={{ padding: '0.5rem 0 0.5rem 1rem' }}>Last observed</th>
            </tr>
          </thead>
          <tbody>
            {statsByUser.map((row) => (
              <tr
                key={row.id}
                style={{ borderBottom: '1px solid rgba(140,180,255,0.07)', color: '#9aaccc' }}
              >
                <td style={{ padding: '0.6rem 1rem 0.6rem 0', fontFamily: 'monospace', fontSize: '0.72rem', color: '#4a6088' }}>
                  {row.id}
                </td>
                <td style={{ padding: '0.6rem 1rem' }}>{row.handle ?? '—'}</td>
                <td style={{ padding: '0.6rem 1rem' }}>
                  <span
                    style={{
                      padding: '0.1rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.72rem',
                      background: row.role === 'admin' ? 'rgba(138,180,255,0.15)' : 'rgba(74,96,136,0.2)',
                      color: row.role === 'admin' ? '#8ab4ff' : '#4a6088',
                    }}
                  >
                    {row.role}
                  </span>
                </td>
                <td style={{ padding: '0.6rem 1rem' }}>{row.count}</td>
                <td style={{ padding: '0.6rem 0 0.6rem 1rem' }}>{row.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ color: '#8ab4ff', fontSize: '0.9rem', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          ALL OBSERVATIONS
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(140,180,255,0.15)', textAlign: 'left', color: '#8ab4ff' }}>
              <th style={{ padding: '0.5rem 1rem 0.5rem 0' }}>Object</th>
              <th style={{ padding: '0.5rem 1rem' }}>Type</th>
              <th style={{ padding: '0.5rem 1rem' }}>Observed</th>
              <th style={{ padding: '0.5rem 0 0.5rem 1rem', fontFamily: 'monospace', fontSize: '0.68rem' }}>User ID</th>
            </tr>
          </thead>
          <tbody>
            {obs.map((o) => (
              <tr key={o.id} style={{ borderBottom: '1px solid rgba(140,180,255,0.07)', color: '#9aaccc' }}>
                <td style={{ padding: '0.5rem 1rem 0.5rem 0' }}>{o.object_name}</td>
                <td style={{ padding: '0.5rem 1rem' }}>{o.object_type || '—'}</td>
                <td style={{ padding: '0.5rem 1rem' }}>{o.observed_at}</td>
                <td style={{ padding: '0.5rem 0 0.5rem 1rem', fontFamily: 'monospace', fontSize: '0.68rem', color: '#4a6088' }}>
                  {o.user_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
