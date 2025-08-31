import React, { useState, useCallback, useMemo } from 'react';
import WelcomeStep from './WelcomeStep';
import ConnectStep from './ConnectStep';
import ConsentStep from './ConsentStep';
import ProcessingStep from './ProcessingStep';
import ReviewStep from './ReviewStep';
import StepIndicator from './StepIndicator';
import { generateAttestation } from '../services/geminiService';
import { AppStep, Attestation, EvidenceSource } from '../types';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface CvWalletPopupProps {
  onClose: () => void;
  onComplete: (attestation: Attestation) => void;
}

const CvWalletPopup: React.FC<CvWalletPopupProps> = ({ onClose, onComplete }) => {
  const [step, setStep] = useState<AppStep>(AppStep.Welcome);
  const [evidence, setEvidence] = useState<EvidenceSource[]>([]);
  const [attestation, setAttestation] = useState<Attestation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEvidenceValid, setIsEvidenceValid] = useState(false);

  const nextStep = () => {
    switch (step) {
      case AppStep.Welcome:
        setStep(AppStep.Connect);
        break;
      case AppStep.Connect:
        setStep(AppStep.Consent);
        break;
      case AppStep.Consent:
        handleConsent();
        break;
      case AppStep.Review:
        handleFinalize();
        break;
    }
  };
  
  const prevStep = () => {
    if (step === AppStep.Consent) {
      setStep(AppStep.Connect);
    }
  };

  const handleEvidenceChange = (newEvidence: EvidenceSource[]) => {
    setEvidence(newEvidence);
    setIsEvidenceValid(newEvidence.length > 0);
  };

  const handleConsent = useCallback(async () => {
    setStep(AppStep.Processing);
    setError(null);
    try {
      const result = await generateAttestation(evidence);
      setAttestation(result);
      setStep(AppStep.Review);
    } catch (e) {
      setError('An error occurred during analysis. Please try again.');
      console.error(e);
      setStep(AppStep.Consent);
    }
  }, [evidence]);

  const handleFinalize = () => {
    if (attestation) {
      onComplete(attestation);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case AppStep.Welcome:
        return <WelcomeStep />;
      case AppStep.Connect:
        return <ConnectStep onEvidenceChange={handleEvidenceChange} initialEvidence={evidence} />;
      case AppStep.Consent:
        return <ConsentStep evidence={evidence} error={error} />;
      case AppStep.Processing:
        return <ProcessingStep />;
      case AppStep.Review:
        return attestation && <ReviewStep attestation={attestation} />;
      default:
        return <WelcomeStep />;
    }
  };
  
  const footerButtonText = useMemo(() => {
    switch (step) {
      case AppStep.Welcome: return 'Get Started';
      case AppStep.Connect: return 'Continue';
      case AppStep.Consent: return 'Consent & Analyze';
      case AppStep.Review: return 'Share with Employer & Finish';
      default: return '';
    }
  }, [step]);
  
  const isNextDisabled = step === AppStep.Connect && !isEvidenceValid;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="relative w-full max-w-sm h-[640px] bg-slate-900 text-white rounded-2xl shadow-2xl shadow-slate-950/50 border border-slate-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-7 w-7 text-cyan-400" />
            <h1 className="ml-2 text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 text-transparent bg-clip-text">
              CVWallet
            </h1>
          </div>
          <button onClick={onClose} className="text-2xl font-light text-slate-500 hover:text-slate-300 transition leading-none h-8 w-8 flex items-center justify-center">&times;</button>
        </div>

        {/* Step Indicator */}
        {step > AppStep.Welcome && step < AppStep.Processing && (
            <div className="p-4 border-b border-slate-800 flex-shrink-0">
                <StepIndicator currentStep={step} />
            </div>
        )}

        {/* Main Content */}
        <div className="flex-grow p-6 overflow-y-auto">
          {renderStepContent()}
        </div>
        
        {/* Footer */}
        {step !== AppStep.Processing && (
          <div className="p-4 border-t border-slate-800 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-4">
              {step === AppStep.Consent && (
                 <button
                  onClick={prevStep}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold py-3 px-4 rounded-lg transition"
                >
                  Back
                </button>
              )}
              <button
                onClick={nextStep}
                disabled={isNextDisabled}
                className="w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
              >
                {footerButtonText}
                {step !== AppStep.Consent && step !== AppStep.Review && <ChevronRightIcon className="h-5 w-5 ml-2" />}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CvWalletPopup;
