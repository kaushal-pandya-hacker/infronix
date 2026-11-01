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
  const [isAdminMode] = useState<boolean>(() => checkInitialAdminState());
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(() => checkInitialAdminState());

  return (
    <div className="min-h-screen bg-[#040914] text-[#F0F6FF]">
      {/* Primary Customer-Facing Smart Landing Page */}
      <LandingPage
        isAdminMode={isAdminMode}
        onOpenAdminQr={() => setIsAdminOpen(true)}
      />

      {/* Admin QR Code Generator & Verification Studio */}
      {isAdminOpen && (
        <AdminQRStudio
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
