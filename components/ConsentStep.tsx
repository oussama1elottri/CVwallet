import React from 'react';
import { EvidenceSource } from '../types';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import GithubIcon from './icons/GithubIcon';
import DocumentIcon from './icons/DocumentIcon';

interface ConsentStepProps {
  evidence: EvidenceSource[];
  error: string | null;
}

const ConsentStep: React.FC<ConsentStepProps> = ({ evidence, error }) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Review and Consent</h2>
      <p className="text-slate-400 mb-6">
        You are about to submit the following evidence for analysis. Please confirm you agree to our secure processing terms.
      </p>

      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-slate-200 mb-4">Evidence to be Analyzed:</h3>
        <ul className="space-y-3">
          {evidence.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.type === 'GitHub Repository' ? (
                <GithubIcon className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
              ) : (
                <DocumentIcon className="h-5 w-5 text-slate-400 mr-3 flex-shrink-0" />
              )}
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-slate-300 truncate" title={item.identifier}>{item.identifier}</p>
                <p className="text-xs text-slate-500">{item.type}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
       <div className="flex items-start p-4 bg-slate-800 rounded-lg border border-cyan-500/20 text-sm mb-8">
          <ShieldCheckIcon className="h-8 w-8 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-slate-200">Our Commitment to Privacy</h3>
            <p className="text-slate-400">
              Your documents will be processed in a secure, confidential environment. No raw data is stored after analysis.
            </p>
          </div>
        </div>
      
       {error && <p className="text-red-400 text-center mb-4">{error}</p>}

    </div>
  );
};

export default ConsentStep;
