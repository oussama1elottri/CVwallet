
export enum AppStep {
  Welcome,
  Connect,
  Consent,
  Processing,
  Review,
}

export enum EvidenceType {
  GitHub = 'GitHub Repository',
  File = 'Local File',
}

export interface EvidenceSource {
  type: EvidenceType;
  identifier: string;
}

export interface Skill {
  skill: string;
  score: number;
  evidence: string;
}

export interface Attestation {
  summary: string;
  skills: Skill[];
}
