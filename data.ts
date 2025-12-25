import { Artifact, ArtifactCategory, DetectionTool, SimulationScenario, ModComponent, HandbookSection } from './types';

export const TOOLS: DetectionTool[] = [
  {
    id: 't1',
    name: 'WinPrefetchView',
    purpose: 'Execution Analysis',
    description: 'Used to analyze Prefetch files (.pf) to see execution history, run counts, and last run times.'
  },
  {
    id: 't2',
    name: 'LastActivityView',
    purpose: 'Timeline Analysis',
    description: 'Collects information from various sources to create a chronological timeline of user activity.'
  },
  {
    id: 't3',
    name: 'System Informer',
    purpose: 'Memory & Process Analysis',
    description: 'Advanced task manager used to dump memory strings and detect hidden threads.'
  }
];

export const HANDBOOK_CONTENT: HandbookSection[] = [
  {
    id: 'h1',
    title: 'The Foundation',
    chapter: 'Introduction',
    content: [
      'Red Lotus Unified consists of Currently the best SS Team In the entire SS Community.',
      'It aims to improve the quality of ScreenShares on servers. Its main objective is safety of Staff and Players together.',
      'This manual is a collection of the most of Red Lotus methods and digital handbooks to aid ScreenSharers of all levels.'
    ],
    tags: ['Mission', 'Staff Safety']
  },
  {
    id: 'h3',
    title: 'Phase I: Prefetch',
    chapter: 'Chapter I',
    content: [
      'Prefetch is a Windows component that logs execution time of .exe files. For Java/DLLs, it generates java.exe entries.',
      'If cleared, check for deleted .pf files using USN Journal parsing.'
    ],
    tags: ['Prefetch', 'Execution Trace']
  }
];

export const ARTIFACTS: Artifact[] = [
  {
    id: 'a1',
    name: 'Prefetch',
    category: ArtifactCategory.EXECUTION,
    description: 'Windows creates .pf files to speed up application startup.',
    detectionMethod: 'Checks for .pf files of known cheats.',
    toolsUsed: ['WinPrefetchView'],
    redLotusNotes: 'Deleting prefetch is suspicious.'
  }
];

export const SCENARIOS: SimulationScenario[] = [
  {
    id: 's1',
    action: 'Rename "Vape.exe" to "notepad.exe" and run it',
    description: 'Attempting to hide a cheat by impersonating a system file.',
    triggers: [
      'Prefetch: Creates NOTEPAD.EXE-[HASH].pf (Hash mismatch).',
      'USN Journal: Logs "FileRename" event.'
    ],
    riskLevel: 'High'
  }
];

export const MOD_COMPONENTS: ModComponent[] = [
  { 
    id: 'm1', 
    name: 'Manual Mapping (JNI Context)', 
    category: 'Execution', 
    description: 'Bypasses LoadLibrary by manually writing PE to memory.', 
    bypasses: ['IAT Hooks', 'LdrpLoadDll', 'PEB Modules'], 
    triggers: ['Private Commits', 'Floating Code'], 
    riskScore: 2, 
    redLotusReference: 'Tome II, Sec 1.1',
    technicalDetail: 'Manual mapping avoids registering the DLL with the operating system loader, effectively hiding it from standard module enumeration tools used in SS.',
    implementationSteps: [
      'Allocate memory with VirtualAllocEx.',
      'Write headers and sections.',
      'Perform base relocation.',
      'Resolve IAT dependencies.',
      'Execute EntryPoint.'
    ],
    codeSnippet: `// Relocation logic
PIMAGE_BASE_RELOCATION pReloc = ...;
DWORD delta = (DWORD)pBase - pOptHeader->ImageBase;
while (pReloc->VirtualAddress) {
    WORD* pRel = (WORD*)(pReloc + 1);
    for (int i=0; i<count; i++) {
        if ((pRel[i]>>12) == 3) *(DWORD*)(pBase + ...) += delta;
    }
}`
  },
  { 
    id: 'm2', 
    name: 'Direct System Calls (Syscalls)', 
    category: 'Execution', 
    description: 'Bypasses EDR/AV hooks in ntdll.dll by calling kernel functions directly.', 
    bypasses: ['Ntdll Hooks', 'API Monitoring', 'User-mode EDR'], 
    triggers: ['Direct Syscall Instruction', 'Stack Pivoting'], 
    riskScore: 1, 
    redLotusReference: 'Tome II, Sec 3.4',
    technicalDetail: 'By extracting the syscall ID from ntdll.dll and using the syscall assembly instruction, we can perform operations like NtAllocateVirtualMemory without triggering hooks placed at the beginning of the function.',
    implementationSteps: [
      'Locate ntdll.dll in memory.',
      'Extract the Service ID for desired Nt function.',
      'Move Service ID into EAX register.',
      'Execute the syscall instruction in assembly.'
    ],
    codeSnippet: `// Assembly for NtAllocateVirtualMemory
mov r10, rcx
mov eax, 18h // Syscall ID for Win10
syscall
ret`
  },
  { 
    id: 'm3', 
    name: 'Thread Context Hijacking', 
    category: 'Execution', 
    description: 'Hijacking a legitimate thread in the process to execute malicious code.', 
    bypasses: ['CreateRemoteThread detection', 'Thread Start Address Check'], 
    triggers: ['Abnormal Thread Context', 'RIP Mismatch'], 
    riskScore: 3, 
    redLotusReference: 'Tome II, Sec 1.5',
    technicalDetail: 'Instead of creating a new thread (which is easily flagged), we suspend an existing thread (like a JVM heartbeat thread), change its instruction pointer (RIP/EIP) to our shellcode, and resume.',
    implementationSteps: [
      'Open target thread with THREAD_ALL_ACCESS.',
      'Suspend the thread.',
      'GetThreadContext to save original registers.',
      'Set RIP/EIP to the address of our shellcode.',
      'SetThreadContext and ResumeThread.'
    ],
    codeSnippet: `CONTEXT ctx;
ctx.ContextFlags = CONTEXT_CONTROL;
GetThreadContext(hThread, &ctx);
ctx.Rip = (DWORD64)shellcode_ptr;
SetThreadContext(hThread, &ctx);
ResumeThread(hThread);`
  },
  { 
    id: 'm4', 
    name: 'APC Injection (Early Bird)', 
    category: 'Execution', 
    description: 'Queueing an Asynchronous Procedure Call to execute code before the main entry point.', 
    bypasses: ['Standard Process Start Detection', 'Static Analysis'], 
    triggers: ['Early APC Queueing', 'NtTestAlert usage'], 
    riskScore: 2, 
    redLotusReference: 'Tome II, Sec 1.12',
    technicalDetail: 'By creating a process in a suspended state and queueing an APC to its main thread, the code executes as soon as the thread enters an alertable state, often before security tools can initialize hooks.',
    implementationSteps: [
      'Create target process with CREATE_SUSPENDED.',
      'Allocate and write shellcode to target memory.',
      'Use QueueUserAPC to point to shellcode.',
      'Resume the main thread.'
    ],
    codeSnippet: `QueueUserAPC((PAPCFUNC)pShellcode, hThread, NULL);
ResumeThread(hThread);`
  },
  { 
    id: 'm5', 
    name: 'VEH Hooking (Vectored Exception)', 
    category: 'Anti-Forensics', 
    description: 'Using exception handlers to redirect code flow without modifying target bytes.', 
    bypasses: ['Checksum/CRC Checks', 'Byte-matching scanners'], 
    triggers: ['VEH Registration', 'Frequent Int3 Exceptions'], 
    riskScore: 2, 
    redLotusReference: 'Tome II, Sec 4.2',
    technicalDetail: 'Vectored Exception Handlers catch hardware breakpoints. We place a breakpoint (0xCC) at the function we want to hook. When hit, our VEH handles the exception and redirects execution to our C++ JNI code.',
    implementationSteps: [
      'Register a VEH using AddVectoredExceptionHandler.',
      'Set a Hardware Breakpoint or write 0xCC at the target address.',
      'Inside the handler, check if the exception address matches our hook.',
      'Adjust the Instruction Pointer (RIP) to our proxy function.'
    ],
    codeSnippet: `LONG CALLBACK MyVEH(PEXCEPTION_POINTERS pEx) {
    if (pEx->ExceptionRecord->ExceptionCode == EXCEPTION_BREAKPOINT) {
        if (pEx->ExceptionRecord->ExceptionAddress == target) {
            pEx->ContextRecord->Rip = (DWORD64)myProxy;
            return EXCEPTION_CONTINUE_EXECUTION;
        }
    }
    return EXCEPTION_CONTINUE_SEARCH;
}`
  },
  { 
    id: 'm6', 
    name: 'IAT Camouflage', 
    category: 'Anti-Forensics', 
    description: 'Dynamically building imports to hide function dependencies from static analysis.', 
    bypasses: ['Static Dependency Checks', 'Strings Analysis'], 
    triggers: ['Dynamic GetProcAddress usage', 'Entropy peaks'], 
    riskScore: 1, 
    redLotusReference: 'Tome II, Sec 5.1',
    technicalDetail: 'Most SS tools look for imports like "VirtualAllocEx" or "WriteProcessMemory". By XOR encrypting these strings and resolving them via GetProcAddress at runtime, we hide our intent from static analysis.',
    implementationSteps: [
      'Encrypt API names using compile-time XOR macros.',
      'Decrypt the string in a local buffer at runtime.',
      'Call GetModuleHandle and GetProcAddress.',
      'Zero out the local buffer immediately after use.'
    ],
    codeSnippet: `// XOR String Macro Example
auto fn = (pVirtualAlloc)GetProcAddr(GetMod("kernel32.dll"), decrypt("WlyabhsHssvj"));
fn(NULL, 1024, MEM_COMMIT, PAGE_EXECUTE_READWRITE);`
  },
  { 
    id: 'm7', 
    name: 'Process Ghosting', 
    category: 'Execution', 
    description: 'Executing code from a file that is in a pending-deletion state.', 
    bypasses: ['File-based AV scanning', 'Procmon Logging'], 
    triggers: ['Irregular Section Creation', 'Delete-on-close handles'], 
    riskScore: 4, 
    redLotusReference: 'Tome II, Sec 1.15',
    technicalDetail: 'By creating a file with delete-on-close permissions, writing the payload, and creating an image section from it before closing the handle, we can execute the code while the file "exists" only in a ghost state.',
    implementationSteps: [
      'Create a file with FILE_FLAG_DELETE_ON_CLOSE.',
      'Write the PE payload to the file.',
      'Create an image section (NtCreateSection) from the file handle.',
      'Close the handle (file is logically deleted).',
      'Create a process (NtCreateProcessEx) from the section.'
    ],
    codeSnippet: `HANDLE hFile = CreateFile(path, ..., FILE_FLAG_DELETE_ON_CLOSE);
WriteFile(hFile, payload, ...);
NtCreateSection(&hSection, ..., hFile);
CloseHandle(hFile); // File is now a ghost
NtCreateProcessEx(&hProcess, ..., hSection, ...);`
  }
];
