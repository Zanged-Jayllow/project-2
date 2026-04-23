import { redirect } from 'next/navigation';
import { getProfile } from '@/lib/profile';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  if (!profile || profile.role !== 'admin') {
    redirect('/protected/dashboard?error=forbidden');
  }
  return <>{children}</>;
}
