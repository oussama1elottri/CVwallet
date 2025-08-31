import React from 'react';
import { AppStep } from '../types';

interface StepIndicatorProps {
  currentStep: AppStep;
}

const steps = [
  { id: AppStep.Connect, name: 'Connect' },
  { id: AppStep.Consent, name: 'Consent' },
  { id: AppStep.Review, name: 'Review' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {currentStep > step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-cyan-500" />
                </div>
                <div className="relative flex h-6 w-6 items-center justify-center bg-cyan-500 rounded-full">
                   <span className="text-slate-900 text-xs font-bold">{stepIdx + 1}</span>
                </div>
              </>
            ) : currentStep === step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-700" />
                </div>
                <div className="relative flex h-6 w-6 items-center justify-center bg-slate-800 border-2 border-cyan-500 rounded-full" aria-current="step">
                   <span className="text-cyan-400 text-xs font-bold">{stepIdx + 1}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-700" />
                </div>
                <div className="group relative flex h-6 w-6 items-center justify-center bg-slate-800 border-2 border-slate-600 rounded-full">
                   <span className="text-slate-400 text-xs font-bold">{stepIdx + 1}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;
