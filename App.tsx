import React, { useState } from 'react';
import { BookOpen, Search, Shield, Activity, Terminal, AlertTriangle, Cpu, HardDrive, Menu, X, ChevronRight, Eye, Layers, Lock, Zap, BrainCircuit, Globe, Code, ArrowRight, Ghost, Monitor, Keyboard, Database, FileCode, Settings, ShieldCheck, CheckCircle, Info, Trash2, ShieldAlert, Binary, Fingerprint, Waves } from 'lucide-react';
import { ARTIFACTS, TOOLS, SCENARIOS, MOD_COMPONENTS } from './data';
import { Artifact, ArtifactCategory, DetectionTool, SimulationScenario, ModComponent } from './types';

// --- Components ---

const SidebarItem = ({ 
  icon: Icon, 
  label, 
  active, 
  onClick 
}: { 
  icon: React.ElementType, 
  label: string, 
  active: boolean, 
  onClick: () => void 
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-lotus-900/50 text-lotus-400 border-l-4 border-lotus-500' 
        : 'text-slate-400 hover:bg-dark-800 hover:text-lotus-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 border-b border-dark-700 pb-4">
    <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
    {subtitle && <p className="text-slate-400">{subtitle}</p>}
  </div>
);

const ArtifactCard: React.FC<{ artifact: Artifact }> = ({ artifact }) => (
  <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-lotus-900 transition-colors">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center space-x-2">
        <HardDrive className="text-lotus-500" size={20} />
        <h3 className="text-xl font-bold text-lotus-100">{artifact.name}</h3>
      </div>
      <span className="text-xs font-mono bg-dark-900 text-slate-400 px-2 py-1 rounded">
        {artifact.category}
      </span>
    </div>
    <p className="text-slate-300 mb-4 text-sm leading-relaxed">{artifact.description}</p>
    
    <div className="space-y-3">
      <div className="bg-dark-900/50 p-3 rounded-lg">
        <span className="text-xs uppercase tracking-wider text-lotus-400 font-bold block mb-1">Detection Method</span>
        <p className="text-sm text-slate-300">{artifact.detectionMethod}</p>
      </div>
      
      <div className="bg-dark-900/50 p-3 rounded-lg border-l-2 border-lotus-600">
        <span className="text-xs uppercase tracking-wider text-lotus-400 font-bold block mb-1">Red Lotus Note</span>
        <p className="text-sm text-slate-300 italic">"{artifact.redLotusNotes}"</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {artifact.toolsUsed.map(tool => (
          <span key={tool} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
            {tool}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ToolCard: React.FC<{ tool: DetectionTool }> = ({ tool }) => (
  <div className="bg-dark-800 border border-dark-700 rounded-xl p-5 hover:bg-dark-700/50 transition-colors">
    <div className="flex items-center space-x-3 mb-3">
      <Terminal className="text-blue-400" size={20} />
      <h3 className="text-lg font-bold text-white">{tool.name}</h3>
    </div>
    <span className="inline-block px-2 py-0.5 rounded text-xs bg-blue-900/30 text-blue-200 mb-3 border border-blue-900/50">
      {tool.purpose}
    </span>
    <p className="text-slate-400 text-sm">{tool.description}</p>
  </div>
);

const StealthLabView = () => {
  return (
    <div className="space-y-12 animate-fadeIn max-w-6xl mx-auto pb-24">
      <SectionTitle 
        title="Stealth Injection Lab" 
        subtitle="Moving beyond registry keys. Advanced fileless and memory-resident injection vectors for Red Lotus evasion." 
      />

      {/* Hero: The 'No Trace' Philosophy */}
      <div className="bg-dark-800 border border-dark-700 rounded-3xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <Binary size={240} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-4 mb-6">
            <Fingerprint className="text-lotus-500" size={40} />
            <h3 className="text-3xl font-extrabold text-white tracking-tight uppercase">Registry-Free Stealth</h3>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            Red Lotus analysts check Registry Keys (IFEO, BAM) and File System trails (Prefetch, USN Journal) because they are the easiest to verify. 
            The next level of evasion relies on <strong>In-Memory Volatile Injection</strong>—where your payload only exists in the RAM of a legitimate system process.
          </p>
        </div>
      </div>

      {/* Advanced Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Reflective DLL Injection */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Waves className="text-blue-400" size={24} />
              <h4 className="text-xl font-bold text-white uppercase">Reflective DLL</h4>
            </div>
            <span className="text-[10px] bg-blue-900/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">CORE STEALTH</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            The DLL contains its own minimal PE loader. The injector simply allocates space and jumps to the DLL's entry point. <strong>Bypasses:</strong> `LdrpLoadDll` hooks and standard "Module" listings in most tools.
          </p>
          <div className="bg-dark-900/50 p-4 rounded-xl border border-dark-700">
            <div className="text-[10px] text-slate-500 mb-2 font-mono uppercase">Memory Signature</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-300 font-mono">Status: Invisible to Standard Module Parsers</span>
            </div>
          </div>
        </div>

        {/* Module Overloading */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 hover:border-green-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Layers className="text-green-400" size={24} />
              <h4 className="text-xl font-bold text-white uppercase">Module Overloading</h4>
            </div>
            <span className="text-[10px] bg-green-900/20 text-green-400 px-2 py-0.5 rounded-full font-bold">GOD TIER</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Find a large, rarely used system DLL in `javaw.exe` (e.g., `bcrypt.dll` or `d3d11.dll`). Overwrite its memory sections with your cheat. <strong>Analyst View:</strong> They see a legitimate, signed Microsoft DLL.
          </p>
          <div className="bg-dark-900/50 p-4 rounded-xl border border-dark-700">
            <div className="text-[10px] text-slate-500 mb-2 font-mono uppercase">Forensic Trace</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-slate-300 font-mono">Bypasses: Private Memory Scans</span>
            </div>
          </div>
        </div>

        {/* Thread Hijacking */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Ghost className="text-purple-400" size={24} />
              <h4 className="text-xl font-bold text-white uppercase">Thread Hijacking</h4>
            </div>
            <span className="text-[10px] bg-purple-900/20 text-purple-400 px-2 py-0.5 rounded-full font-bold">NO NEW THREADS</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Suspend a legitimate thread in the target process. Use `SetThreadContext` to change the `RIP` (Instruction Pointer) to point to your shellcode, then resume. No new threads are created for Red Lotus to find.
          </p>
          <div className="bg-dark-900/50 p-4 rounded-xl border border-dark-700">
            <div className="text-[10px] text-slate-500 mb-2 font-mono uppercase">Stack Trace</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-slate-300 font-mono">Bypasses: Thread List Enumeration</span>
            </div>
          </div>
        </div>

        {/* Process Hollowing (PE) */}
        <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 hover:border-orange-500/50 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Trash2 className="text-orange-400" size={24} />
              <h4 className="text-xl font-bold text-white uppercase">Process Hollowing</h4>
            </div>
            <span className="text-[10px] bg-orange-900/20 text-orange-400 px-2 py-0.5 rounded-full font-bold">LEGACY BUT EFFECTIVE</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Launch a legit system process (e.g., `calc.exe`) in a suspended state. Unmap its memory and replace it with your loader's PE image. Resume. The OS and analysts think it's Calculator.
          </p>
          <div className="bg-dark-900/50 p-4 rounded-xl border border-dark-700">
            <div className="text-[10px] text-slate-500 mb-2 font-mono uppercase">Evasion Level</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-slate-300 font-mono">Detected by: Advanced Entropy Scanners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Mapping Deep Dive */}
      <div className="bg-gradient-to-br from-dark-800 to-lotus-950/20 border border-dark-700 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center space-x-4 mb-8">
          <Cpu className="text-lotus-500" size={32} />
          <h3 className="text-2xl font-bold text-white uppercase tracking-tight">The Manual Map Blueprint</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-slate-300 text-sm leading-relaxed">
              Manual mapping is the gold standard because it avoids the Windows Loader entirely. You perform the work of `LoadLibrary` manually:
            </p>
            <ul className="space-y-4">
              {[
                "1. Map PE headers and sections into target memory.",
                "2. Perform Base Relocations (fixing absolute addresses).",
                "3. Resolve Imports by parsing the IAT manually.",
                "4. Execute TLS Callbacks and then the DllMain entry point."
              ].map((text, i) => (
                <li key={i} className="flex items-start space-x-3 text-xs text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-lotus-500 mt-1 shrink-0"></div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-dark-950/80 p-6 rounded-2xl border border-dark-700 font-mono text-[10px]">
            <div className="text-lotus-400 mb-2">// Manual Mapping Pseudo-Code</div>
            <div className="text-slate-500">void MapDLL(const char* dllPath, HANDLE targetProcess) &#123;</div>
            <div className="pl-4">
              <div className="text-blue-300">LPVOID remoteMem = VirtualAllocEx(targetProcess, ...);</div>
              <div className="text-slate-400">WriteProcessMemory(targetProcess, remoteMem, headers, ...);</div>
              <div className="text-slate-400">for (auto& section : sections) &#123;</div>
              <div className="pl-4 text-slate-400">WriteProcessMemory(targetProcess, remoteMem + offset, data, ...);</div>
              <div className="text-slate-400">&#125;</div>
              <div className="text-green-300">// Fix Relocations & Imports via shellcode stub...</div>
              <div className="text-blue-300">CreateRemoteThread(targetProcess, ..., stub, ...);</div>
            </div>
            <div className="text-slate-500">&#125;</div>
          </div>
        </div>
      </div>

      {/* Anti-Forensic Advice */}
      <div className="bg-lotus-900/10 border border-lotus-500/30 p-8 rounded-3xl">
        <div className="flex items-center space-x-3 mb-6">
          <ShieldCheck className="text-lotus-400" size={24} />
          <h3 className="text-xl font-bold text-white uppercase">Injection Hardening</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase">Memory Zeroing</h5>
            <p className="text-[11px] text-slate-500">Once DllMain returns, zero out your PE headers in the target memory. Analysts use `System Informer` to find 'MZ' signatures—removing them breaks their scanning.</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase">Junk Code Insertion</h5>
            <p className="text-[11px] text-slate-500">Add 20% random junk logic to your shellcode. This changes the entropy and signature of your injector, making generic regex scans from Red Lotus analysts fail.</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase">Thread Name Spoofing</h5>
            <p className="text-[11px] text-slate-500">If you create a thread, rename it immediately to match a background worker like `TimerThread` or `Garbage Collector` to blend into the JVM process.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SimulationView = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const selectedScenario = SCENARIOS.find(s => s.id === selectedScenarioId);

  return (
    <div className="space-y-6">
      <SectionTitle 
        title="Forensic Simulator" 
        subtitle="Simulate user actions to see what forensic trails Red Lotus detects." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-lg font-semibold text-lotus-200 mb-4">Select an Action</h3>
          {SCENARIOS.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenarioId(scenario.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedScenarioId === scenario.id
                  ? 'bg-lotus-900/20 border-lotus-500 text-white'
                  : 'bg-dark-800 border-dark-700 text-slate-400 hover:bg-dark-700'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">{scenario.action}</span>
                <ChevronRight size={16} className={`transform transition-transform ${selectedScenarioId === scenario.id ? 'rotate-90' : ''}`} />
              </div>
              <div className="text-xs opacity-70 truncate">{scenario.description}</div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedScenario ? (
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 h-full animate-fadeIn">
              <div className="flex items-center justify-between mb-6 border-b border-dark-600 pb-4">
                <h3 className="text-xl font-bold text-white">Analysis Report</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                  selectedScenario.riskLevel === 'Critical' ? 'bg-red-900/50 text-red-400 border border-red-800' :
                  selectedScenario.riskLevel === 'High' ? 'bg-orange-900/50 text-orange-400 border border-orange-800' :
                  'bg-yellow-900/50 text-yellow-400 border border-yellow-800'
                }`}>
                  {selectedScenario.riskLevel} Detection Risk
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm uppercase tracking-wider text-slate-500 font-bold mb-3">Detected Traces</h4>
                  <div className="space-y-3">
                    {selectedScenario.triggers.map((trigger, idx) => (
                      <div key={idx} className="flex items-start space-x-3 bg-dark-900/50 p-3 rounded-lg">
                        <AlertTriangle className="text-lotus-500 shrink-0 mt-0.5" size={16} />
                        <span className="text-slate-200 text-sm font-mono">{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 bg-dark-800/50 border border-dark-700 border-dashed rounded-xl p-12">
              <Activity size={48} className="mb-4 opacity-50" />
              <p className="text-lg">Select a scenario to begin simulation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EvasionArchitect = () => {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const toggleComponent = (id: string) => {
    setSelectedComponents(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const activeComponents = MOD_COMPONENTS.filter(c => selectedComponents.includes(c.id));
  const totalRisk = activeComponents.reduce((acc, curr) => acc + curr.riskScore, 0);
  const riskClass = activeComponents.length === 0 ? 'None' : totalRisk > 15 ? 'Critical' : totalRisk > 10 ? 'High' : totalRisk > 5 ? 'Medium' : 'Low';
  const bypasses = Array.from(new Set(activeComponents.flatMap(c => c.bypasses)));

  return (
    <div className="space-y-6">
      <SectionTitle 
        title="Evasion Architect" 
        subtitle="Build a conceptual mod architecture and see its forensic score." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Architecture Components</h3>
          <div className="space-y-3">
            {MOD_COMPONENTS.map(comp => (
              <div 
                key={comp.id}
                onClick={() => toggleComponent(comp.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedComponents.includes(comp.id)
                    ? 'bg-lotus-900/20 border-lotus-500 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    : 'bg-dark-800 border-dark-700 hover:border-dark-600'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-bold px-2 py-0.5 rounded ${
                    comp.category === 'Execution' ? 'bg-blue-900/50 text-blue-300' :
                    comp.category === 'Storage' ? 'bg-purple-900/50 text-purple-300' :
                    'bg-orange-900/50 text-orange-300'
                  }`}>
                    {comp.category}
                  </span>
                </div>
                <h4 className="text-white font-bold mb-1">{comp.name}</h4>
                <p className="text-xs text-slate-400">{comp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 h-full sticky top-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-dark-700">
              <div>
                <h3 className="text-xl font-bold text-white">Detection Profile</h3>
              </div>
              <div className="text-right">
                <span className={`block text-2xl font-bold ${
                  riskClass === 'Critical' ? 'text-red-500' : 
                  riskClass === 'High' ? 'text-orange-500' : 
                  riskClass === 'Medium' ? 'text-yellow-500' : 
                  riskClass === 'Low' ? 'text-green-500' : 'text-slate-500'
                }`}>
                  {riskClass} Risk
                </span>
              </div>
            </div>

            {selectedComponents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-600">
                <Layers size={48} className="mb-4 opacity-50" />
                <p>Select components to build your architecture</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-green-400 font-bold mb-3 flex items-center">
                    <Shield size={14} className="mr-2" /> Bypassed Artifacts
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {bypasses.map((bypass, idx) => (
                      <span key={idx} className="text-xs bg-green-900/20 text-green-300 border border-green-900/50 px-2 py-1 rounded">
                        {bypass}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-dark-900 rounded-lg p-4 border border-dark-600">
                  <h4 className="text-xs uppercase tracking-wider text-lotus-400 font-bold mb-2 flex items-center">
                    <Zap size={14} className="mr-2" /> Red Lotus Insight
                  </h4>
                  <div className="space-y-3">
                    {activeComponents.map(comp => (
                      <div key={comp.id} className="text-xs text-slate-400 border-l-2 border-dark-600 pl-3">
                        <span className="text-slate-200 font-bold">{comp.name}:</span> "{comp.redLotusReference}"
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const BypassIntelligence = () => {
  return (
    <div className="space-y-10 animate-fadeIn">
      <SectionTitle 
        title="Bypass Strategy" 
        subtitle="Tier-1 strategies for evading Red Lotus ScreenShares." 
      />

      {/* The Injectable Blueprint */}
      <div className="bg-gradient-to-br from-lotus-900/40 to-dark-800 border border-lotus-500/30 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Ghost size={120} className="text-lotus-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="text-lotus-500" size={32} />
            <h3 className="text-2xl font-bold text-white tracking-tight uppercase">The "Ghost DLL" Method</h3>
          </div>

          <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-3xl">
            Injecting into system hosts like <strong>svchost.exe</strong> or <strong>explorer.exe</strong> is the ultimate evasion tier. 
            Follow this technical sequence to survive a manual forensic audit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-dark-900/60 p-5 rounded-xl border border-dark-700">
              <div className="flex items-center space-x-2 mb-3">
                <Terminal className="text-blue-400" size={18} />
                <h4 className="text-white font-bold">1. Kill the Logger</h4>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Immediately suspend the <span className="text-blue-300 font-mono">sechost.dll</span> thread within <strong>SysMain</strong>. This halts all Prefetch generation. No .pf file will ever be created for your injector or target.
              </p>
            </div>
            
            <div className="bg-dark-900/60 p-5 rounded-xl border border-dark-700">
              <div className="flex items-center space-x-2 mb-3">
                <Monitor className="text-purple-400" size={18} />
                <h4 className="text-white font-bold">2. System Host Selection</h4>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Target <strong>svchost.exe</strong> or a background driver process (e.g. <code className="bg-dark-800 px-1">LGHUB.exe</code>). Analysts focus 95% of their attention on <code className="bg-dark-800 px-1 font-mono">javaw.exe</code>.
              </p>
            </div>

            <div className="bg-dark-900/60 p-5 rounded-xl border border-dark-700">
              <div className="flex items-center space-x-2 mb-3">
                <Layers className="text-green-400" size={18} />
                <h4 className="text-white font-bold">3. Manual Map + Overload</h4>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Never use LoadLibrary. Use <strong>Manual Mapping</strong>. For max stealth, perform <strong>Module Overloading</strong>: find a legitimate DLL already in the host and overwrite its memory with your cheat.
              </p>
            </div>

            <div className="bg-dark-900/60 p-5 rounded-xl border border-dark-700">
              <div className="flex items-center space-x-2 mb-3">
                <Lock className="text-orange-400" size={18} />
                <h4 className="text-white font-bold">4. Zero-Footprint Memory</h4>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Use <strong>Runtime XOR Encryption</strong> for strings. Decrypt into a temporary buffer, use it, then immediately <code>memset</code> that buffer to 0. Analysts regex scanning RAM will find nothing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'artifacts' | 'tools' | 'simulation' | 'evasion' | 'intelligence' | 'stealth'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center py-12">
              <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
                Red Lotus <span className="text-lotus-500">Analyst</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Interactive forensic intelligence based on the <span className="text-lotus-400">Red Lotus Screenshare Guide</span>.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div onClick={() => setActiveTab('artifacts')} className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-lotus-500/50 cursor-pointer transition-all group">
                <HardDrive className="text-lotus-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Artifacts DB</h3>
                <p className="text-slate-400 text-sm">Forensic artifacts like Prefetch, BAM, and USN Journal.</p>
              </div>
              <div onClick={() => setActiveTab('tools')} className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-blue-500/50 cursor-pointer transition-all group">
                <Terminal className="text-blue-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Tool Suite</h3>
                <p className="text-slate-400 text-sm">Capabilities of System Informer and Everything.</p>
              </div>
              <div onClick={() => setActiveTab('simulation')} className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-green-500/50 cursor-pointer transition-all group">
                <Activity className="text-green-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Simulator</h3>
                <p className="text-slate-400 text-sm">Simulate user actions and see left traces.</p>
              </div>
              <div onClick={() => setActiveTab('stealth')} className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-yellow-500/50 cursor-pointer transition-all group">
                <Fingerprint className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Stealth Lab</h3>
                <p className="text-slate-400 text-sm">Advanced fileless & memory injection deep-dives.</p>
              </div>
              <div onClick={() => setActiveTab('evasion')} className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-purple-500/50 cursor-pointer transition-all group">
                <Lock className="text-purple-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Evasion Lab</h3>
                <p className="text-slate-400 text-sm">Design mod architectures against Red Lotus logic.</p>
              </div>
              <div onClick={() => setActiveTab('intelligence')} className="bg-gradient-to-br from-dark-800 to-lotus-950 p-6 rounded-xl border border-lotus-900/50 hover:border-lotus-500 cursor-pointer transition-all group md:col-span-2 lg:col-span-1">
                <BrainCircuit className="text-lotus-400 mb-4 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Bypass Intel</h3>
                <p className="text-slate-400 text-sm">The gold-standard deep-dives.</p>
              </div>
            </div>
          </div>
        );
      case 'artifacts': return (<div><SectionTitle title="Forensic Artifacts" /><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{ARTIFACTS.map(a => <ArtifactCard key={a.id} artifact={a} />)}</div></div>);
      case 'tools': return (<div><SectionTitle title="Detection Tools" /><div className="grid grid-cols-1 md:grid-cols-3 gap-6">{TOOLS.map(t => <ToolCard key={t.id} tool={t} />)}</div></div>);
      case 'simulation': return <SimulationView />;
      case 'evasion': return <EvasionArchitect />;
      case 'intelligence': return <BypassIntelligence />;
      case 'stealth': return <StealthLabView />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 flex font-sans">
      <button className="fixed top-4 right-4 z-50 md:hidden p-2 bg-dark-800 rounded-lg border border-dark-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark-900 border-r border-dark-700 transform transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-dark-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-lotus-600 rounded-lg flex items-center justify-center transform rotate-45">
              <div className="w-4 h-4 bg-white rounded-sm transform -rotate-45" />
            </div>
            <span className="text-xl font-bold tracking-wide text-white">RED LOTUS</span>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <SidebarItem icon={BookOpen} label="Overview" active={activeTab === 'home'} onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={HardDrive} label="Artifacts" active={activeTab === 'artifacts'} onClick={() => { setActiveTab('artifacts'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={Search} label="Tools" active={activeTab === 'tools'} onClick={() => { setActiveTab('tools'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={Cpu} label="Simulator" active={activeTab === 'simulation'} onClick={() => { setActiveTab('simulation'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={Fingerprint} label="Stealth Lab" active={activeTab === 'stealth'} onClick={() => { setActiveTab('stealth'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={Lock} label="Evasion Lab" active={activeTab === 'evasion'} onClick={() => { setActiveTab('evasion'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={BrainCircuit} label="Bypass Intel" active={activeTab === 'intelligence'} onClick={() => { setActiveTab('intelligence'); setIsMobileMenuOpen(false); }} />
        </nav>
      </aside>

      <main className="flex-1 md:ml-64 min-h-screen">
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
