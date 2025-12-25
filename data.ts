import { Artifact, ArtifactCategory, DetectionTool, SimulationScenario, ModComponent } from './types';

export const TOOLS: DetectionTool[] = [
  {
    id: 't1',
    name: 'WinPrefetchView',
    purpose: 'Execution Analysis',
    description: 'Used to analyze Prefetch files (.pf) to see execution history, run counts, and last run times. Can also view loaded DLLs for specific executables.'
  },
  {
    id: 't2',
    name: 'LastActivityView',
    purpose: 'Timeline Analysis',
    description: 'Collects information from various sources (Registry, Prefetch, Event Logs) to create a chronological timeline of user activity.'
  },
  {
    id: 't3',
    name: 'System Informer (Process Hacker)',
    purpose: 'Memory & Process Analysis',
    description: 'Advanced task manager used to dump memory strings, view loaded modules, and detect injected DLLs or hidden threads. Red Lotus uses regex searches here.'
  },
  {
    id: 't4',
    name: 'Everything (Voidtools)',
    purpose: 'File System Search',
    description: 'Instant file search tool. Red Lotus uses it to find renamed cheats, leftover configs, or specific file sizes (e.g., 5mb..25mb) associated with known clients.'
  },
  {
    id: 't5',
    name: 'JournalTool / JournalTrace',
    purpose: 'USN Journal Analysis',
    description: 'Parses the NTFS USN Journal ($J) to track file creations, deletions, and renames. Crucial for detecting "Time Stomping" or "Data Overwrite" bypasses.'
  },
  {
    id: 't6',
    name: 'Registry Explorer',
    purpose: 'Registry Forensics',
    description: 'Parses registry hives (SYSTEM, SOFTWARE, NTUSER.DAT) to find evidence of execution (BAM, UserAssist, MuiCache) even if files are deleted.'
  }
];

export const ARTIFACTS: Artifact[] = [
  {
    id: 'a1',
    name: 'Prefetch',
    category: ArtifactCategory.EXECUTION,
    description: 'Windows creates .pf files to speed up application startup. Stores the last 8 execution times and a counter.',
    detectionMethod: 'Checks for .pf files of known cheats or renamed executables (e.g., svchost.exe running from a wrong path).',
    toolsUsed: ['WinPrefetchView', 'PECmd'],
    redLotusNotes: 'Deleting prefetch is suspicious (Event ID 3079/FileDelete). Renamed files still generate prefetch with the original executable name in the header or hash.'
  },
  {
    id: 'a2',
    name: 'BAM / DAM',
    category: ArtifactCategory.REGISTRY,
    description: 'Background Activity Moderator. Tracks full paths of executables run on the system, often persisting longer than Prefetch.',
    detectionMethod: 'Parses the Registry SYSTEM hive. Looks for execution entries that match cheat file paths.',
    toolsUsed: ['Registry Explorer', 'System Informer'],
    redLotusNotes: 'If a user clears BAM, it is an instant ban. BAM tracks execution path, so moving a cheat file creates a new entry.'
  },
  {
    id: 'a3',
    name: 'USN Journal ($J)',
    category: ArtifactCategory.FILE_SYSTEM,
    description: 'NTFS Change Journal. Logs every change to files on the disk (Create, Delete, Rename, DataExtend, BasicInfoChange).',
    detectionMethod: 'Scans for "Basic Info Change" (Time Stomping) or "Data Overwrite" (Hex Editing).',
    toolsUsed: ['JournalTool', 'MFTECmd'],
    redLotusNotes: 'The most reliable source. If a file was renamed from "cheat.exe" to "notepad.exe", the rename event is logged here. Cannot be easily bypassed without kernel access.'
  },
  {
    id: 'a4',
    name: 'SRUM',
    category: ArtifactCategory.SYSTEM_LOGS,
    description: 'System Resource Usage Monitor. Tracks network usage, CPU time, and application runtime.',
    detectionMethod: 'Used to prove an application was running for a specific duration, contradicting user claims.',
    toolsUsed: ['SrumECmd', 'RL Collector'],
    redLotusNotes: 'Good for "Uptime of Apps" checks. Can detect if a "cleaner" tool was run recently.'
  },
  {
    id: 'a5',
    name: 'Event Logs',
    category: ArtifactCategory.SYSTEM_LOGS,
    description: 'Windows Event Logs (Security, System, Application).',
    detectionMethod: 'Event ID 4688 (Process Creation), 1102 (Log Clear), 7036 (Service Stop).',
    toolsUsed: ['Event Viewer', 'Hayabusa'],
    redLotusNotes: 'Clearing Event Logs (ID 1102) is a bannable offense. Used to track PCA (Program Compatibility Assistant) for executed binaries.'
  },
  {
    id: 'a6',
    name: 'Strings / Memory',
    category: ArtifactCategory.MEMORY,
    description: 'Strings resident in RAM for active processes.',
    detectionMethod: 'System Informer regex scans for specific cheat signatures (e.g., "clicker", "autoclicker", known client strings).',
    toolsUsed: ['System Informer'],
    redLotusNotes: 'Bypassable if the cheat cleans its memory strings or uses heavy obfuscation (Themida), but "Hollow" characters can still be found.'
  }
];

export const SCENARIOS: SimulationScenario[] = [
  {
    id: 's1',
    action: 'Rename "Vape.exe" to "notepad.exe" and run it',
    description: 'Attempting to hide a cheat by impersonating a system file.',
    triggers: [
      'Prefetch: Creates NOTEPAD.EXE-[HASH].pf. The Hash will differ from the real Notepad.',
      'BAM: Logs the execution path. If run from Downloads, it differs from System32.',
      'USN Journal: Logs "FileRename" event from Vape.exe -> notepad.exe.',
      'UserAssist: Logs execution count of the fake notepad.'
    ],
    riskLevel: 'High'
  },
  {
    id: 's6',
    action: 'Manual Map into svchost.exe',
    description: 'Injecting the mod as a "ghost" module inside a system host.',
    triggers: [
      'System Informer: Memory tab shows "Private" committed memory with no backing file.',
      'Event Logs: ID 4688 logs the loader running as Administrator.',
      'Process Handle: svchost.exe shows a handle leak to the loader if not closed properly.'
    ],
    riskLevel: 'Low'
  }
];

export const MOD_COMPONENTS: ModComponent[] = [
  {
    id: 'm1',
    name: 'Task Scheduler Loader',
    category: 'Execution',
    description: 'Launching the cheat via a Scheduled Task instead of double-clicking.',
    bypasses: ['Standard Prefetch', 'PCA logging'],
    triggers: ['Registry (TaskCache)', 'BAM (logs startup)', 'Event Logs (Task Creation)'],
    riskScore: 6,
    redLotusReference: 'Nowadays most Bypassers use Task Scheduler... to bypass Prefetch. Detectable via Anti-Scheduler tool or C:\\Windows\\System32\\Tasks analysis.'
  },
  {
    id: 'm7',
    name: 'Manual Mapping',
    category: 'Execution',
    description: 'Injecting a DLL without using standard Windows APIs, bypassing the Modules list in System Informer.',
    bypasses: ['System Informer (Modules list)', 'Standard Injection Traces'],
    triggers: ['Memory Anomaly (Private Commit)', 'Stack Walking'],
    riskScore: 2,
    redLotusReference: 'DLL injections... challenging to prove... System Informer displays unsigned modules... Manual mapping avoids standard module enumeration.'
  },
  {
    id: 'm9',
    name: 'Module Overloading',
    category: 'Anti-Forensics',
    description: 'Hiding the cheat inside a legitimate, already loaded system DLL like kernel32.dll.',
    bypasses: ['Memory Scanners (Private region checks)', 'Module List Flags'],
    triggers: ['Checksum Mismatch', 'Instruction Deviation'],
    riskScore: 1,
    redLotusReference: 'Security is not about having no traces; it is about having traces that do not lead to a conclusion.'
  }
];
