import WPCPanel from '@/components/tcs/WPCPanel';
import SIHeader from '@/components/SIHeader';
import { SIAlignmentTestButton } from '@/components/SIAlignmentTestButton';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 p-10 space-y-6">
      <h1 className="text-4xl font-bold text-yellow-300">TC-S: Solar Dashboard</h1>
      <p className="text-gray-300">Global Solar Intelligence Network - All Indices</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <SIHeader />
        <SIAlignmentTestButton />
      </div>
      
      <WPCPanel />
    </main>
  );
}
