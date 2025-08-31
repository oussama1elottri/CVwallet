import React, { useState } from 'react';
import { Attestation } from './types';
import HostWebsite from './components/HostWebsite';
import CvWalletPopup from './components/CvWalletPopup';

const App: React.FC = () => {
  const [isWalletOpen, setWalletOpen] = useState(false);
  const [attestationResult, setAttestationResult] = useState<Attestation | null>(null);

  const handleConnect = () => {
    setAttestationResult(null); // Reset previous results when starting a new flow
    setWalletOpen(true);
  };

  const handleClose = () => {
    setWalletOpen(false);
  };

  const handleComplete = (attestation: Attestation) => {
    setAttestationResult(attestation);
    setWalletOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans relative">
      <HostWebsite onConnect={handleConnect} attestationResult={attestationResult} />
      {isWalletOpen && <CvWalletPopup onClose={handleClose} onComplete={handleComplete} />}
    </div>
  );
};

export default App;