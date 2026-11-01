import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AdminQRStudio } from './components/AdminQRStudio';

const checkInitialAdminState = (): boolean => {
  if (typeof window === 'undefined') return false;
  const searchParams = new URLSearchParams(window.location.search);
  const hasAdminParam = searchParams.get('admin') === 'true' || searchParams.get('qr') === 'true';
  const hasAdminHash = window.location.hash === '#admin' || window.location.hash === '#qr';
  return hasAdminParam || hasAdminHash;
};

export const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(() => checkInitialAdminState());

  return (
    <div className="min-h-screen bg-white text-[#0F172A]">
      {/* Primary Customer-Facing Smart Landing Page in Clean White Theme */}
      <LandingPage />

      {/* Admin QR Code Generator & Verification Studio (URL-Activated via ?admin=true) */}
      {isAdminOpen && (
        <AdminQRStudio
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
