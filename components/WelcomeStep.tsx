import React from 'react';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import CodeIcon from './icons/CodeIcon';

const WelcomeStep: React.FC = () => {
  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Apply with CVWallet</h2>
      <p className="text-slate-400 mb-8">
        Prove your skills with verifiable evidence from your work. Your data is processed securely and is never shared without your consent.
      </p>

      <div className="space-y-4 text-left mb-10">
        <div className="flex items-start p-4 bg-slate-800 rounded-lg border border-slate-700">
          <CodeIcon className="h-6 w-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-slate-200">Connect Your Evidence</h3>
            <p className="text-slate-400 text-sm">Link your GitHub repositories, upload code samples, or provide performance reviews.</p>
          </div>
        </div>
        <div className="flex items-start p-4 bg-slate-800 rounded-lg border border-slate-700">
          <ShieldCheckIcon className="h-6 w-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-slate-200">AI-Powered Analysis</h3>
            <p className="text-slate-400 text-sm">Our secure AI oracle analyzes your evidence to generate a skills attestation, without exposing your raw data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;
