
import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, Shield, Activity, Terminal, AlertTriangle, 
  Cpu, HardDrive, Menu, X, ChevronRight, Eye, Layers, Lock, 
  Zap, BrainCircuit, Globe, Code, ArrowRight, Ghost, Monitor, 
  Fingerprint, Book, Database, FileCode, Settings, ShieldCheck, 
  CheckCircle, Info, Trash2, Binary, Waves, Filter, ShieldAlert,
  Target, Crosshair, Brackets, TerminalSquare, InfoIcon
} from 'lucide-react';
// Add GoogleGenAI import
import { GoogleGenAI } from "@google/genai";
import { ARTIFACTS, TOOLS, SCENARIOS, MOD_COMPONENTS, HANDBOOK_CONTENT } from './data';
import { Artifact, ArtifactCategory, DetectionTool, SimulationScenario, ModComponent, HandbookSection } from './types';

// --- Sub-Components ---

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
        ? 'bg-lotus-900/50 text-lotus-400 border-l-4 border-lotus-500 shadow-lg' 
        : 'text-slate-400 hover:bg-dark-800 hover:text-lotus-200'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 border-b border-dark-700 pb-4">
    <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">{title}</h2>
    {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
  </div>
);

// --- View Components ---

const HandbookView = () => {
  const [selectedId, setSelectedId] = useState(HANDBOOK_CONTENT[0]?.id);
  const activeSection = HANDBOOK_CONTENT.find(s => s.id === selectedId) || HANDBOOK_CONTENT[0];

  if (!activeSection) return <div className="p-8 text-center text-slate-500">No handbook content available.</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 animate-fadeIn">
      <div className="lg:col-span-1 space-y-2">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-2">Table of Contents</h3>
        <div className="space-y-1">
          {HANDBOOK_CONTENT.map(section => (
            <button
              key={section.id}
              onClick={() => setSelectedId(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                selectedId === section.id 
                  ? 'bg-lotus-900/30 text-lotus-300 border border-lotus-800' 
                  : 'text-slate-400 hover:bg-dark-800'
              }`}
            >
              <div className="font-bold">{section.title}</div>
              <div className="text-xs opacity-60 uppercase">{section.chapter}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-3 bg-dark-800 border border-dark-700 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center space-x-2 text-lotus-500 mb-2">
          <Book size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">{activeSection.chapter}</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">{activeSection.title}</h2>
        <div className="space-y-6 text-slate-300 leading-relaxed text-lg font-light">
          {activeSection.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-dark-700 flex flex-wrap gap-2">
          {activeSection.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-dark-900 text-slate-400 text-xs rounded-full border border-dark-600">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SimulationView = () => {
  const [selectedId, setSelectedId] = useState<string | null>(SCENARIOS[0]?.id || null);
  const scenario = SCENARIOS.find(s => s.id === selectedId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
      <div className="space-y-3">
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedId(s.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedId === s.id ? 'bg-lotus-900/20 border-lotus-500 text-white' : 'bg-dark-800 border-dark-700 text-slate-400 hover:border-dark-600'
            }`}
          >
            <div className="font-bold mb-1">{s.action}</div>
            <div className="text-xs opacity-60 uppercase">{s.riskLevel} Risk Level</div>
          </button>
        ))}
      </div>
      <div className="lg:col-span-2">
        {scenario ? (
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8 h-full shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Forensic Analysis Report</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">{scenario.description}</p>
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase text-lotus-500 tracking-widest flex items-center">
                <ShieldAlert size={14} className="mr-2" /> Forensic Triggers
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {scenario.triggers.map((t, i) => (
                  <div key={i} className="flex items-center space-x-3 bg-dark-900/50 p-4 rounded-xl border border-dark-700 group hover:border-lotus-900 transition-all">
                    <AlertTriangle className="text-lotus-500 group-hover:scale-110 transition-transform" size={18} />
                    <span className="text-slate-200 font-mono text-sm">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-dark-700 rounded-2xl text-slate-600 p-12">
            <Activity size={48} className="mb-4 opacity-20" />
            <p>Select a scenario to analyze traces</p>
          </div>
        )}
      </div>
    </div>
  );
};

const BypassingView = () => {
  const [selectedComp, setSelectedComp] = useState<ModComponent | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  
  const categories = ['All', 'Execution', 'Anti-Forensics', 'Storage'];

  const filteredComponents = useMemo(() => {
    if (categoryFilter === 'All') return MOD_COMPONENTS;
    return MOD_COMPONENTS.filter(c => c.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="space-y-8 animate-fadeIn pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <SectionTitle title="Evasion Lab" subtitle="Deep-dive into C++ JNI bypassing & anti-forensics." />
        <div className="flex items-center space-x-2 bg-dark-800 p-1.5 rounded-xl border border-dark-700 h-fit">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-1.5 text-xs font-black rounded-lg transition-all uppercase tracking-tight ${
                categoryFilter === cat ? 'bg-lotus-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map(c => (
          <div 
            key={c.id} 
            onClick={() => setSelectedComp(c)}
            className="group relative bg-dark-800 border border-dark-700 rounded-2xl p-6 cursor-pointer hover:border-lotus-500 hover:bg-dark-700/40 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              <Brackets size={40} />
            </div>
            
            <div className="flex justify-between items-start mb-4">
               <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                  c.category === 'Execution' ? 'bg-blue-900/20 text-blue-400 border-blue-900/30' : 
                  c.category === 'Anti-Forensics' ? 'bg-purple-900/20 text-purple-400 border-purple-900/30' : 'bg-green-900/20 text-green-400 border-green-900/30'
                }`}>
                  {c.category}
                </span>
                <span className="text-[10px] font-mono text-slate-500">SCORE: {c.riskScore}</span>
            </div>
            
            <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">{c.name}</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">{c.description}</p>
            
            <div className="flex items-center text-lotus-500 text-[10px] font-bold uppercase tracking-widest mt-auto">
              VIEW TECHNICAL DATA <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedComp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-md bg-black/60 animate-in fade-in duration-300">
          <div className="bg-dark-900 border border-dark-700 w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-dark-800 flex items-center justify-between bg-dark-800/30">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-lotus-600/10 rounded-2xl flex items-center justify-center border border-lotus-500/20">
                  <TerminalSquare className="text-lotus-500" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{selectedComp.name}</h2>
                  <p className="text-xs text-slate-500 font-mono">MODULE_ID: {selectedComp.id} | REF: {selectedComp.redLotusReference}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedComp(null)}
                className="p-2 hover:bg-dark-700 rounded-full transition-colors text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-black text-lotus-500 uppercase tracking-[0.2em] mb-3 flex items-center">
                      <InfoIcon size={14} className="mr-2" /> Technical Briefing
                    </h4>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      {selectedComp.technicalDetail || "Detailed technical briefing under construction. Access Tome II for physical documentation."}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-lotus-500 uppercase tracking-[0.2em] mb-3">Implementation Steps (C++)</h4>
                    <div className="space-y-3">
                      {selectedComp.implementationSteps?.map((step, i) => (
                        <div key={i} className="flex items-start space-x-3 bg-dark-800/40 p-3 rounded-xl border border-dark-700/50">
                          <div className="w-5 h-5 bg-dark-700 rounded flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <span className="text-xs text-slate-400">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {selectedComp.codeSnippet && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-lotus-500 uppercase tracking-[0.2em] flex items-center">
                        <Code size={14} className="mr-2" /> Source Snippet (Native)
                      </h4>
                      <div className="bg-black/40 rounded-2xl border border-dark-700 p-6 font-mono text-[11px] leading-relaxed text-blue-300 overflow-x-auto">
                        <pre>{selectedComp.codeSnippet}</pre>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-900/10 border border-green-900/20 rounded-2xl">
                      <h5 className="text-[10px] font-black text-green-500 uppercase mb-2">Primary Bypasses</h5>
                      <div className="flex flex-wrap gap-1">
                        {selectedComp.bypasses.map((b, i) => (
                          <span key={i} className="px-2 py-0.5 bg-green-900/30 text-green-400 rounded text-[9px] font-bold">{b}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-red-900/10 border border-red-900/20 rounded-2xl">
                      <h5 className="text-[10px] font-black text-red-500 uppercase mb-2">Detection Triggers</h5>
                      <div className="flex flex-wrap gap-1">
                        {selectedComp.triggers.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 bg-red-900/30 text-red-400 rounded text-[9px] font-bold">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-dark-800 bg-dark-800/30 flex justify-end">
              <button 
                onClick={() => setSelectedComp(null)}
                className="px-6 py-2 bg-lotus-600 hover:bg-lotus-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all"
              >
                Acknowledge Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Missing BypassIntel Component ---
/**
 * BypassIntel component provides an AI-powered technical analysis for advanced
 * Minecraft client evasion and forensic trails using Gemini 3 Pro.
 */
const BypassIntel = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      // Initialize Gemini AI client for high-quality technical analysis
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const result = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: query,
        config: {
          systemInstruction: 'You are a Red Lotus Senior Intelligence Analyst specializing in advanced Minecraft client bypasses, C++ JNI development, and Windows forensic analysis. Your goal is to provide highly technical, precise, and professional intelligence reports based on user queries about evasion techniques, tool trails, or forensic countermeasures. Assume the user is a professional ScreenSharer or security researcher.',
          temperature: 0.7,
        },
      });
      setResponse(result.text || 'No intelligence gathered for this vector.');
    } catch (error) {
      setResponse('Connection failed. Error code: INTELLIGENCE_LINK_OFFLINE. Ensure your infrastructure permits API calls.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-20">
      <SectionTitle 
        title="Bypass Intelligence" 
        subtitle="Neural-assisted technical briefing on modern evasion techniques and forensic countermeasures." 
      />
      
      <div className="bg-dark-800 border border-dark-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
          <BrainCircuit size={240} />
        </div>
        
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="text-lotus-500" size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-dark-900 border border-dark-700 rounded-2xl py-5 pl-14 pr-32 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-lotus-500/50 transition-all font-light"
            placeholder="Search for a technique (e.g., 'Module Stomping Traces' or 'JVM Hooking')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="absolute right-3 top-3 bottom-3 px-6 bg-lotus-600 hover:bg-lotus-500 disabled:opacity-50 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-lotus-900/40"
          >
            {loading ? 'ANALYZING...' : 'EXECUTE'}
          </button>
        </div>

        {response && (
          <div className="mt-8 space-y-4 animate-in slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-lotus-500">
                <BrainCircuit size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Intelligence Briefing</span>
              </div>
              <div className="text-[10px] font-mono text-slate-600">ENCRYPTION: AES-256-GCM</div>
            </div>
            <div className="bg-dark-900/80 border border-dark-700 rounded-2xl p-8 text-slate-300 leading-relaxed font-light whitespace-pre-wrap text-sm border-l-4 border-l-lotus-500 shadow-inner">
              {response}
            </div>
          </div>
        )}

        {!response && !loading && (
          <div className="py-20 text-center space-y-6 opacity-30">
            <div className="relative inline-block">
              <Globe size={64} className="mx-auto text-slate-400 animate-pulse" />
              <div className="absolute inset-0 bg-lotus-500 blur-3xl opacity-10"></div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Waiting for operative input</p>
              <p className="text-[10px] font-mono text-slate-600">UPLINK_STATUS: STANDBY</p>
            </div>
          </div>
        )}
        
        {loading && (
          <div className="py-20 text-center space-y-6">
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-lotus-500 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-lotus-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-lotus-500 rounded-full animate-bounce delay-300"></div>
            </div>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-lotus-500 animate-pulse">Scanning Neural Network...</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'handbook' | 'artifacts' | 'tools' | 'simulation' | 'evasion' | 'intelligence'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="max-w-5xl mx-auto py-12 text-center space-y-12 animate-fadeIn">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-lotus-900/30 text-lotus-400 rounded-full text-xs font-black tracking-[0.2em] border border-lotus-500/20 uppercase mb-4">
                Red Lotus Unified Command
              </div>
              <h1 className="text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
                FORENSIC <span className="text-lotus-500">INTELLIGENCE</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Comprehensive analyzer and simulator based on the Red Lotus Tome II methodology. Study the trails, understand the artifacts, and master the bypassing lab.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { tab: 'handbook', label: 'Handbook', desc: 'The full Red Lotus guide.', icon: BookOpen, color: 'border-lotus-500/20' },
                { tab: 'evasion', label: 'Bypassing', desc: 'C++ JNI Module details.', icon: Lock, color: 'border-purple-500/20' },
                { tab: 'simulation', label: 'Simulator', desc: 'Live forensic trace simulation.', icon: Activity, color: 'border-blue-500/20' },
                { tab: 'artifacts', label: 'Artifacts', desc: 'Forensic data points.', icon: HardDrive, color: 'border-green-500/20' },
              ].map(item => (
                <div 
                  key={item.tab} 
                  onClick={() => setActiveTab(item.tab as any)} 
                  className={`p-6 bg-dark-800 rounded-3xl border transition-all cursor-pointer group hover:bg-dark-700/40 hover:-translate-y-2 hover:shadow-2xl ${item.color}`}
                >
                  <item.icon className="mx-auto mb-4 text-slate-500 group-hover:text-white group-hover:scale-110 transition-all" size={36} />
                  <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tighter">{item.label}</h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-gradient-to-r from-lotus-950 to-dark-800 rounded-[2.5rem] border border-lotus-900/30 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={200} />
              </div>
              <div className="relative z-10 max-w-2xl">
                <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Bypassing Methodology</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">Access the Evasion Lab to explore advanced C++ JNI techniques used in modern stealth clients. From Manual Mapping to Native Hooking, Tome II covers every detection vector used by professional ScreenSharers.</p>
                <button 
                  onClick={() => setActiveTab('evasion')}
                  className="flex items-center space-x-2 bg-lotus-600 hover:bg-lotus-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-lotus-950/40"
                >
                  <span>Launch Lab</span> <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      case 'handbook': return <HandbookView />;
      case 'artifacts': return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {ARTIFACTS.map(a => (
            <div key={a.id} className="bg-dark-800 border border-dark-700 rounded-2xl p-6 hover:border-lotus-500 hover:bg-dark-700/30 transition-all group shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{a.category}</span>
              <h3 className="text-2xl font-black text-white mb-2 mt-1 uppercase tracking-tighter">{a.name}</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">{a.description}</p>
              <div className="bg-dark-900 rounded-xl p-4 border-l-4 border-lotus-600 group-hover:border-lotus-500 transition-colors">
                <span className="text-[10px] font-bold uppercase text-lotus-400 block mb-1">Red Lotus Note</span>
                <p className="text-xs italic text-slate-300">"{a.redLotusNotes}"</p>
              </div>
            </div>
          ))}
        </div>
      );
      case 'tools': return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {TOOLS.map(t => (
            <div key={t.id} className="bg-dark-800 border border-dark-700 rounded-2xl p-6 hover:border-blue-500 transition-all group">
              <div className="w-12 h-12 bg-dark-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Terminal className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-1 uppercase tracking-tight">{t.name}</h3>
              <div className="text-xs text-blue-300 font-bold mb-3 uppercase tracking-tighter">{t.purpose}</div>
              <p className="text-sm text-slate-400 leading-relaxed">{t.description}</p>
            </div>
          ))}
        </div>
      );
      case 'simulation': return <SimulationView />;
      case 'evasion': return <BypassingView />;
      case 'intelligence': return <BypassIntel />;
      default: return <div className="text-center p-20 text-slate-500">Coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 flex font-sans selection:bg-lotus-500/30 overflow-x-hidden">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-dark-900 border-b border-dark-800 flex items-center justify-between px-6 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-lotus-600 rounded-lg flex items-center justify-center shadow-lg">
             <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <span className="text-lg font-black tracking-tighter text-white">REDLOTUS</span>
        </div>
        <button 
          className="p-2 bg-dark-800 rounded-lg border border-dark-700 text-slate-200" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-dark-900 border-r border-dark-700 transform transition-transform duration-300 md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full shadow-2xl shadow-black/50'}`}>
        <div className="p-8 border-b border-dark-800 hidden md:block">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 bg-lotus-600 rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg shadow-lotus-900/40 group-hover:rotate-0 transition-transform duration-500">
              <div className="w-5 h-5 bg-white rounded-md transform -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">REDLOTUS</span>
          </div>
        </div>
        
        <nav className="p-4 space-y-1 mt-16 md:mt-0">
          <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</div>
          <SidebarItem icon={BookOpen} label="Overview" active={activeTab === 'home'} onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={Book} label="Handbook" active={activeTab === 'handbook'} onClick={() => { setActiveTab('handbook'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={HardDrive} label="Artifacts" active={activeTab === 'artifacts'} onClick={() => { setActiveTab('artifacts'); setIsMobileMenuOpen(false); }} />
          
          <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 ml-4 mt-8">Operations</div>
          <SidebarItem icon={Lock} label="Bypassing" active={activeTab === 'evasion'} onClick={() => { setActiveTab('evasion'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={Activity} label="Simulator" active={activeTab === 'simulation'} onClick={() => { setActiveTab('simulation'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={Search} label="Tools" active={activeTab === 'tools'} onClick={() => { setActiveTab('tools'); setIsMobileMenuOpen(false); }} />
          <SidebarItem icon={BrainCircuit} label="Bypass Intel" active={activeTab === 'intelligence'} onClick={() => { setActiveTab('intelligence'); setIsMobileMenuOpen(false); }} />
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-dark-800/50 rounded-2xl p-4 border border-dark-700/50 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-[10px] font-black text-lotus-500 mb-1">
              <Shield size={10} /> <span>UNIFIED SECURITY</span>
            </div>
            <div className="text-[9px] text-slate-600 uppercase tracking-widest font-mono">CORE_VERSION: 2.0.5B</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen pt-16 md:pt-0">
        <div className="p-6 md:p-12 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
