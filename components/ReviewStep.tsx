import React from 'react';
import { Attestation, Skill } from '../types';
import CheckIcon from './icons/CheckIcon';
import CodeIcon from './icons/CodeIcon';

interface ReviewStepProps {
  attestation: Attestation;
}

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => {
    const scoreColor = skill.score >= 85 ? 'bg-cyan-400' : skill.score >= 70 ? 'bg-teal-400' : 'bg-amber-400';
    return (
        <div className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-semibold text-slate-200">{skill.skill}</h4>
                <span className={`text-xl font-bold ${skill.score >= 85 ? 'text-cyan-300' : skill.score >= 70 ? 'text-teal-300' : 'text-amber-300'}`}>{skill.score}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div className={`${scoreColor} h-2.5 rounded-full`} style={{ width: `${skill.score}%` }}></div>
            </div>
            <p className="text-xs text-slate-400 mt-2 italic">
                &ldquo;{skill.evidence}&rdquo;
            </p>
        </div>
    )
}

const ReviewStep: React.FC<ReviewStepProps> = ({ attestation }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <CheckIcon className="h-12 w-12 bg-green-500 text-white rounded-full p-2 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-100">Attestation Generated</h2>
        <p className="text-slate-400">
            Review your AI-generated skill summary.
        </p>
      </div>

      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-slate-200 mb-1 flex items-center"><CodeIcon className="h-5 w-5 mr-2 text-cyan-400" /> AI Summary</h3>
        <p className="text-slate-300 text-sm mb-6">{attestation.summary}</p>
        <hr className="border-slate-700 mb-6" />
        <h3 className="font-semibold text-slate-200 mb-4">Verified Skills</h3>
        {attestation.skills.map(skill => (
            <SkillBar key={skill.skill} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default ReviewStep;
