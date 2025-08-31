import React from 'react';
import { Attestation } from '../types';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import CheckIcon from './icons/CheckIcon';

interface HostWebsiteProps {
  onConnect: () => void;
  attestationResult: Attestation | null;
}

const HostWebsite: React.FC<HostWebsiteProps> = ({ onConnect, attestationResult }) => {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 text-slate-800">
      <header className="border-b border-slate-200 pb-6 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Senior Golang Engineer</h1>
        <p className="mt-2 text-lg text-slate-600">Scale AI - Remote (US)</p>
      </header>
      
      <main>
        <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
        <div className="prose prose-slate max-w-none">
            <p>
                We are seeking an experienced Senior Golang Engineer to join our core infrastructure team. You will be responsible for designing, developing, and maintaining high-performance microservices that power our AI data platform. The ideal candidate has a strong background in distributed systems, API design, and a passion for writing clean, efficient, and testable code.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-2">Responsibilities:</h3>
            <ul>
                <li>Architect and build scalable backend services in Go.</li>
                <li>Design and implement robust REST and gRPC APIs.</li>
                <li>Write comprehensive unit and integration tests.</li>
                <li>Collaborate with product managers and other engineers to deliver high-quality features.</li>
                <li>Mentor junior engineers and contribute to best practices.</li>
            </ul>
        </div>
        
        <div className="mt-12 p-8 bg-white rounded-xl border border-slate-200 shadow-sm">
           {!attestationResult ? (
            <>
                <h3 className="text-xl font-semibold text-center">Ready to Apply?</h3>
                <p className="text-slate-600 text-center mt-2 mb-6">
                    Prove your skills confidentially using your own evidence.
                </p>
                <button
                    onClick={onConnect}
                    className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
                >
                    <ShieldCheckIcon className="h-5 w-5 mr-2" />
                    Apply with CVWallet
                </button>
            </>
           ) : (
             <div className="animate-fade-in">
                <div className="flex items-center justify-center text-green-600 mb-4">
                    <CheckIcon className="h-8 w-8 mr-3 p-1 bg-green-100 rounded-full"/>
                    <h3 className="text-xl font-semibold">Application Submitted</h3>
                </div>
                <p className="text-slate-600 text-center mb-6">
                    Your skills attestation has been successfully attached to your application.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-800">Attached Attestation Summary:</h4>
                    <p className="text-sm text-slate-600 italic mt-2">
                        &ldquo;{attestationResult.summary}&rdquo;
                    </p>
                </div>
             </div>
           )}
        </div>
      </main>

      <footer className="text-center mt-12 text-slate-400 text-sm">
        <p>This is a simulated host website for the CVWallet demonstration.</p>
      </footer>
    </div>
  );
};

export default HostWebsite;