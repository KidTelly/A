export enum ArtifactCategory {
  EXECUTION = 'Execution Evidence',
  FILE_SYSTEM = 'File System',
  REGISTRY = 'Registry',
  SYSTEM_LOGS = 'System Logs',
  MEMORY = 'Memory'
}

export interface Artifact {
  id: string;
  name: string;
  category: ArtifactCategory;
  description: string;
  detectionMethod: string;
  toolsUsed: string[];
  redLotusNotes: string;
}

export interface DetectionTool {
  id: string;
  name: string;
  purpose: string;
  description: string;
}

export interface SimulationScenario {
  id: string;
  action: string;
  description: string;
  triggers: string[];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ModComponent {
  id: string;
  name: string;
  category: 'Execution' | 'Storage' | 'Anti-Forensics';
  description: string;
  bypasses: string[]; // List of artifacts this helps avoid
  triggers: string[]; // List of artifacts this definitely triggers
  riskScore: number; // 1-10, lower is stealthier
  redLotusReference: string; // Quote or reference from the guide
}
