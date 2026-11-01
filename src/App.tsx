import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { AdminQRStudio } from './components/AdminQRStudio';

export const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    // Check if user came with ?admin=true or ?qr=true or #admin in the URL
    const searchParams = new URLSearchParams(window.location.search);
    const hasAdminParam = searchParams.get('admin') === 'true' || searchParams.get('qr') === 'true';
    const hasAdminHash = window.location.hash === '#admin' || window.location.hash === '#qr';

    if (hasAdminParam || hasAdminHash) {
      setIsAdminMode(true);
      setIsAdminOpen(true);
    }
  }, []);

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
