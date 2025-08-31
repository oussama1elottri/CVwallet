
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Establishing secure connection to oracle...",
  "Encrypting and transmitting your evidence...",
  "Running multi-model LLM analysis...",
  "Aggregating scores and generating proofs...",
  "Finalizing your cryptographic attestation...",
];

const ProcessingStep: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center animate-fade-in flex flex-col items-center justify-center h-80">
      <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-6"></div>
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Processing Securely</h2>
      <p className="text-slate-400 transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default ProcessingStep;
