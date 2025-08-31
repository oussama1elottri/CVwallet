import React, { useState, useRef, useEffect } from 'react';
import { EvidenceSource, EvidenceType } from '../types';
import GithubIcon from './icons/GithubIcon';
import DocumentIcon from './icons/DocumentIcon';

interface ConnectStepProps {
  onEvidenceChange: (evidence: EvidenceSource[]) => void;
  initialEvidence: EvidenceSource[];
}

const ConnectStep: React.FC<ConnectStepProps> = ({ onEvidenceChange, initialEvidence }) => {
  const [githubUrl, setGithubUrl] = useState(
    initialEvidence.find(e => e.type === EvidenceType.GitHub)?.identifier || ''
  );
  const [files, setFiles] = useState<File[]>(
     initialEvidence.filter(e => e.type === EvidenceType.File).map(e => new File([], e.identifier))
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const evidence: EvidenceSource[] = [];
    if (githubUrl.trim()) {
      evidence.push({ type: EvidenceType.GitHub, identifier: githubUrl.trim() });
    }
    files.forEach(file => {
      evidence.push({ type: EvidenceType.File, identifier: file.name });
    });
    onEvidenceChange(evidence);
  }, [githubUrl, files, onEvidenceChange]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files!)]);
    }
  };

  const removeFile = (fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-100 mb-2">Connect Your Evidence</h2>
      <p className="text-slate-400 mb-8">
        Add sources for our AI to analyze. We recommend at least one code repository.
      </p>

      <div className="space-y-6">
        {/* GitHub Section */}
        <div>
          <label htmlFor="github-url" className="block text-sm font-medium text-slate-300 mb-2">
            GitHub Repository URL
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <GithubIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              id="github-url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/user/repo"
              className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 pl-10 pr-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-white"
            />
          </div>
        </div>

        {/* File Upload Section */}
        <div>
           <label className="block text-sm font-medium text-slate-300 mb-2">
            Local Documents
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex justify-center items-center w-full px-6 py-10 border-2 border-slate-700 border-dashed rounded-md cursor-pointer hover:bg-slate-800/50"
          >
            <div className="text-center">
              <DocumentIcon className="mx-auto h-10 w-10 text-slate-500" />
              <p className="mt-2 text-sm text-slate-400">
                <span className="font-semibold text-cyan-400">Click to upload</span>
              </p>
              <p className="text-xs text-slate-500">PDF, DOCX, or TXT</p>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
            accept=".pdf,.docx,.txt"
          />
           {files.length > 0 && (
            <div className="mt-4 space-y-2">
              <h4 className="font-semibold text-slate-300">Uploaded files:</h4>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={`${file.name}-${index}`} className="flex items-center justify-between bg-slate-800 p-2 rounded-md text-sm">
                    <span className="text-slate-300 truncate">{file.name}</span>
                    <button onClick={() => removeFile(file.name)} className="text-red-400 hover:text-red-300 font-bold ml-4 flex-shrink-0">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectStep;
