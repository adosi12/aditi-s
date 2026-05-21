'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Volume2, VolumeX, Monitor, Play, RefreshCw, X, Folder, File, HelpCircle } from 'lucide-react';
import { learningProjects, LearningProject } from '@/data/learningProjects';

type TerminalTheme = 'matrix' | 'amber' | 'cyan' | 'classic';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
  isInput: boolean;
  dir: string;
}

export default function DevTerminal() {
  const [theme, setTheme] = useState<TerminalTheme>('matrix');
  const [isMuted, setIsMuted] = useState(true);
  const [currentDir, setCurrentDir] = useState<string>('/');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);
  const [isRunningScript, setIsRunningScript] = useState(false);
  const [bootTextIndex, setBootTextIndex] = useState(0);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  // Audio utility using Web Audio API to avoid external assets
  const playBeep = (type: 'keypress' | 'boot' | 'error' | 'success') => {
    if (isMuted || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      if (type === 'keypress') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(350 + Math.random() * 100, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'boot') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.6);
        gainNode.gain.setValueAtTime(0.03, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else if (type === 'error') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);

        setTimeout(() => {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
          gain2.gain.setValueAtTime(0.02, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.15);
        }, 100);
      }
    } catch (e) {
      console.warn('Audio Context failed to start:', e);
    }
  };

  // Virtual files definitions
  const files = useMemo(() => ({
    '/': {
      'about.txt': `Aditi Dosi — Full Stack Developer & Agentic AI Specialist.
Currently building innovative scalable solutions at Deutsche Bank.
Enthusiastic about generative AI, system architecture, and building premium interfaces.
Certified Google Cloud Professional Developer.`,
      'skills.txt': `=== TECHNICAL PROFICIENCY ===

* Frontend: React, TypeScript, Next.js, Tailwind CSS, Redux
* Backend: Java, Axiom Framework, GraphQL, Node.js, Python, FastAPI
* Cloud/DevOps: GCP (Certified Professional Developer), AWS, Docker, Kubernetes, CI/CD, Liquibase
* Monitoring: JMX, ITRS Netprobe, Geneos, New Relic, Splunk, Git
* Emerging Tech: Agentic AI, LangGraph, CrewAI, AutoGen, Blockchain`,
      'contact.txt': `=== CONTACT DETAILS ===

* Email: adosi12@gmail.com
* LinkedIn: linkedin.com/in/aditidosi
* GitHub: github.com/adosi12
Feel free to drop a message or start a discussion!`,
    },
    '/projects': learningProjects.reduce((acc, project) => {
      acc[`${project.id}.sh`] = `PROJECT RUNNER: ${project.title}
Category: ${project.category}
Tech Stack: ${project.techStack.join(', ')}
Type "run ${project.id}" or "./${project.id}.sh" to execute simulation.`;
      return acc;
    }, {} as Record<string, string>),
  }), []);

  // Theme settings mapping
  const themeStyles = {
    matrix: {
      text: 'text-[#33ff33]',
      glow: 'shadow-[0_0_15px_rgba(51,255,51,0.4)] border-[#33ff33]/30',
      bg: 'bg-[#051105]',
      inputBg: 'bg-[#081f08]',
      accent: '#33ff33',
      cursor: 'bg-[#33ff33]',
    },
    amber: {
      text: 'text-[#ffb000]',
      glow: 'shadow-[0_0_15px_rgba(255,176,0,0.4)] border-[#ffb000]/30',
      bg: 'bg-[#140c00]',
      inputBg: 'bg-[#241500]',
      accent: '#ffb000',
      cursor: 'bg-[#ffb000]',
    },
    cyan: {
      text: 'text-[#00ffff]',
      glow: 'shadow-[0_0_15px_rgba(0,255,255,0.4)] border-[#00ffff]/30',
      bg: 'bg-[#000a16]',
      inputBg: 'bg-[#001733]',
      accent: '#00ffff',
      cursor: 'bg-[#00ffff]',
    },
    classic: {
      text: 'text-slate-100',
      glow: 'shadow-[0_0_15px_rgba(255,255,255,0.1)] border-slate-700',
      bg: 'bg-slate-950',
      inputBg: 'bg-slate-900',
      accent: '#f1f5f9',
      cursor: 'bg-slate-200',
    },
  }[theme];

  // Boot sequence animation texts
  const bootLines = [
    'BOOT ROM VERSION 2.6.2026',
    'COPYRIGHT (C) 2026 ADITI DOSI LABS',
    '--------------------------------------',
    'INITIALIZING STORAGE MEMORY... OK',
    'CONNECTING TO CLOUD NETWORK INFRASTRUCTURE... OK',
    'LOADING VIRTUAL FILESYSTEM MODULES...',
    '  - Loaded: /about.txt',
    '  - Loaded: /skills.txt',
    '  - Loaded: /contact.txt',
    '  - Loaded: /projects/',
    'DETECTING RECENT HACKATHON AND PORTFOLIO ARTIFACTS...',
    'SYSTEM READY.',
    'Type "help" to list available commands.',
  ];

  // Booting effect
  useEffect(() => {
    if (!isBooting) return;
    const interval = setTimeout(() => {
      if (bootTextIndex < bootLines.length) {
        setBootTextIndex((prev) => prev + 1);
        playBeep('keypress');
      } else {
        setIsBooting(false);
        playBeep('success');
      }
    }, 180);
    return () => clearTimeout(interval);
  }, [bootTextIndex, isBooting]);

  // Matrix Rain Screensaver Canvas effect
  useEffect(() => {
    if (!showMatrix) return;

    const canvas = matrixCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$#@%';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    ctx.font = `${fontSize}px monospace`;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = themeStyles.accent;
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [showMatrix, themeStyles.accent]);

  // Scroll to bottom when history or input changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isBooting, bootTextIndex, isRunningScript]);

  // Focus terminal input
  const focusInput = () => {
    if (!showMatrix && !isRunningScript && !isBooting) {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    focusInput();
  }, [isBooting, isRunningScript, showMatrix]);

  // Command History Navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = cmdHistoryIndex + 1;
      if (nextIndex < cmdHistory.length) {
        setCmdHistoryIndex(nextIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = cmdHistoryIndex - 1;
      if (nextIndex >= 0) {
        setCmdHistoryIndex(nextIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      } else {
        setCmdHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      handleAutocompletion();
    } else {
      // play click sound
      playBeep('keypress');
    }
  };

  // Autocomplete functionality
  const handleAutocompletion = () => {
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0];
    const arg = parts.slice(1).join(' ');

    const availableCommands = ['help', 'ls', 'cd', 'cat', 'run', 'whoami', 'theme', 'clear', 'matrix', 'sudo'];

    // Autocomplete primary command
    if (parts.length === 1 && input.length > 0) {
      const match = availableCommands.find((c) => c.startsWith(input));
      if (match) {
        setInput(match + ' ');
      }
      return;
    }

    // Autocomplete arguments (filenames or project IDs)
    if (parts.length > 1) {
      const dirFiles = currentDir === '/' ? Object.keys(files['/']) : Object.keys(files['/projects']);
      const match = dirFiles.find((f) => f.startsWith(arg));
      if (match) {
        setInput(`${cmd} ${match}`);
      }
    }
  };

  // Run stylized project simulation
  const simulateProjectRun = (project: LearningProject) => {
    setIsRunningScript(true);
    let logs: string[] = [
      `Initializing project container for: ${project.title}...`,
      `Pulling dynamic data resources...`,
      `Validating tech stack configuration: [${project.techStack.join(', ')}]`,
    ];

    setHistory((prev) => [
      ...prev,
      {
        command: `run ${project.id}`,
        output: <span className="opacity-75">Spinning up sandbox environments...</span>,
        timestamp: new Date().toLocaleTimeString(),
        isInput: true,
        dir: currentDir,
      },
    ]);

    let logIndex = 0;
    const progressLimit = 100;
    let currentProgress = 0;

    const runInterval = setInterval(() => {
      if (currentProgress < progressLimit) {
        currentProgress += 10;
        playBeep('keypress');
        setHistory((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];

          // Create a custom styled rendering for run
          last.output = (
            <div className="space-y-3">
              <div className="font-mono text-sm leading-relaxed">
                {logs.slice(0, logIndex + 1).map((log, i) => (
                  <div key={i} className="opacity-80">▸ {log}</div>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm">Building:</span>
                <div className="w-48 bg-card border border-card-border h-4 rounded overflow-hidden flex">
                  <div 
                    className={`h-full ${theme === 'matrix' ? 'bg-[#33ff33]' : theme === 'amber' ? 'bg-[#ffb000]' : theme === 'cyan' ? 'bg-[#00ffff]' : 'bg-slate-200'}`} 
                    style={{ width: `${currentProgress}%` }} 
                  />
                </div>
                <span className="font-mono text-sm font-bold">{currentProgress}%</span>
              </div>
            </div>
          );
          return updated;
        });

        if (currentProgress % 30 === 0 && logIndex < logs.length - 1) {
          logIndex++;
        }
      } else {
        clearInterval(runInterval);
        playBeep('success');
        setIsRunningScript(false);

        // Append final project specification report
        setHistory((prev) => [
          ...prev,
          {
            command: '',
            output: (
              <div className="p-6 bg-card border border-card-border rounded-2xl space-y-4 max-w-2xl my-3 text-left">
                <div className="flex justify-between items-center border-b border-card-border pb-3">
                  <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-coral animate-ping shrink-0" />
                    {project.title}
                  </h4>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 bg-background border border-card-border rounded-full text-muted">
                    {project.category}
                  </span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-bold block mb-1 text-foreground">💡 Key Idea:</span>
                    <p className="text-muted leading-relaxed">{project.description}</p>
                  </div>
                  
                  <div>
                    <span className="font-bold block mb-1 text-foreground">🛠️ Architecture Elements:</span>
                    <ul className="list-disc pl-5 text-muted space-y-1">
                      {project.whatWeUsed.slice(0, 3).map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold block mb-1 text-foreground">🌐 Application & Impact:</span>
                    <p className="text-muted leading-relaxed">{project.uses[0]}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-card-border flex justify-end gap-3">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-xs px-3 py-1.5 bg-background border border-card-border rounded-lg font-bold hover:text-coral transition-colors"
                    >
                      GitHub Repo
                    </a>
                  )}
                  <a 
                    href={`/learning/${project.id}`} 
                    className="text-xs px-3 py-1.5 bg-foreground text-background rounded-lg font-bold hover:opacity-90 transition-opacity"
                  >
                    View Full Blueprint
                  </a>
                </div>
              </div>
            ),
            timestamp: new Date().toLocaleTimeString(),
            isInput: false,
            dir: currentDir,
          },
        ]);
      }
    }, 150);
  };

  // Process typed commands
  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Save to history
    setCmdHistory((prev) => [...prev, trimmed]);
    setCmdHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    let output: React.ReactNode = '';
    let success = true;

    switch (command) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-xl text-left">
            <div><span className="font-bold text-foreground">help</span> - List all commands</div>
            <div><span className="font-bold text-foreground">ls / dir</span> - List files in current folder</div>
            <div><span className="font-bold text-foreground">cd &lt;dir&gt;</span> - Change directory (e.g. cd projects, cd ..)</div>
            <div><span className="font-bold text-foreground">cat &lt;file&gt;</span> - Read content of a file</div>
            <div><span className="font-bold text-foreground">run &lt;project&gt;</span> - Execute a project simulation</div>
            <div><span className="font-bold text-foreground">whoami</span> - Display system bio card</div>
            <div><span className="font-bold text-foreground">theme &lt;name&gt;</span> - Change theme (matrix, amber, cyan, classic)</div>
            <div><span className="font-bold text-foreground">matrix</span> - Launch green digital rain code screensaver</div>
            <div><span className="font-bold text-foreground">clear / cls</span> - Clear terminal logs</div>
            <div><span className="font-bold text-foreground">sudo / secrets</span> - Unlock administrator logs</div>
          </div>
        );
        break;

      case 'ls':
      case 'dir':
        if (currentDir === '/') {
          output = (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <span className="flex items-center gap-1 text-blue-400 font-bold"><Folder size={14} /> projects/</span>
              <span className="flex items-center gap-1"><File size={14} /> about.txt</span>
              <span className="flex items-center gap-1"><File size={14} /> skills.txt</span>
              <span className="flex items-center gap-1"><File size={14} /> contact.txt</span>
            </div>
          );
        } else {
          output = (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {learningProjects.map((p) => (
                <span key={p.id} className="flex items-center gap-1 text-emerald-400">
                  <File size={14} /> {p.id}.sh
                </span>
              ))}
            </div>
          );
        }
        break;

      case 'cd':
        if (!arg || arg === '~' || arg === '/') {
          setCurrentDir('/');
          output = 'Moved to root directory (/)';
        } else if (arg === '..') {
          setCurrentDir('/');
          output = 'Moved to parent directory (/)';
        } else if (arg.toLowerCase() === 'projects') {
          setCurrentDir('/projects');
          output = 'Moved to /projects';
        } else {
          success = false;
          output = `cd: system directory not found: ${arg}`;
        }
        break;

      case 'cat':
        if (!arg) {
          success = false;
          output = 'cat: missing filename. Type "ls" to view files.';
        } else {
          const rootFiles = files['/'];
          const projectFiles = files['/projects'];

          if (currentDir === '/' && arg in rootFiles) {
            output = <pre className="whitespace-pre-wrap font-mono leading-relaxed text-left">{rootFiles[arg as keyof typeof rootFiles]}</pre>;
          } else if (currentDir === '/projects' && arg in projectFiles) {
            output = <pre className="whitespace-pre-wrap font-mono leading-relaxed text-left">{projectFiles[arg]}</pre>;
          } else if (currentDir === '/' && arg === 'projects') {
            success = false;
            output = 'cat: projects is a directory. Use "cd projects" to view its files.';
          } else {
            success = false;
            output = `cat: file not found: ${arg}`;
          }
        }
        break;

      case 'run': {
        if (!arg) {
          success = false;
          output = 'run: missing project script name. Usage: run <project-id> (e.g. run taxmaster-india)';
          break;
        }
        // Extract project ID if user wrote run taxmaster-india.sh or ./taxmaster-india.sh
        const cleanId = arg.replace('./', '').replace('.sh', '').trim();
        const project = learningProjects.find((p) => p.id === cleanId);
        if (project) {
          simulateProjectRun(project);
          return; // Skip adding normal history item since simulateProjectRun handles it
        } else {
          success = false;
          output = `run: executable file or script "${arg}" not recognized. Type "ls" inside "/projects" to see names.`;
        }
        break;
      }

      case 'whoami':
        output = (
          <div className="flex flex-col md:flex-row gap-6 p-4 border border-card-border rounded-2xl bg-card text-left max-w-lg">
            <div className="font-mono text-xs text-coral space-y-1">
              <div> ___  ___  _ _____ _ </div>
              <div>/ _ \/ _ \| |_   _(_)</div>
              <div>/ __ / __ /| | | | | |</div>
              <div>\_/  \_/  |_| |_| |_|</div>
              <div className="text-yellow-400 mt-2 font-bold font-mono">ADITI DOSI v1.0</div>
            </div>
            <div className="space-y-1 text-sm text-muted">
              <div><span className="font-bold text-foreground">Role:</span> Full Stack Developer & Agentic AI Learner</div>
              <div><span className="font-bold text-foreground">Certifications:</span> GCP Professional Dev</div>
              <div><span className="font-bold text-foreground">Current Project:</span> Deutsche Bank Platform Dev</div>
              <div><span className="font-bold text-foreground">Emerging Core:</span> CrewAI, LangGraph, LLMs</div>
            </div>
          </div>
        );
        break;

      case 'theme':
        if (!arg) {
          output = 'Usage: theme <matrix | amber | cyan | classic>';
        } else if (['matrix', 'amber', 'cyan', 'classic'].includes(arg.toLowerCase())) {
          setTheme(arg.toLowerCase() as TerminalTheme);
          output = `Terminal theme configured to: ${arg.toLowerCase()}`;
        } else {
          success = false;
          output = `theme: unrecognized option: ${arg}. Select matrix, amber, cyan, or classic.`;
        }
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        playBeep('success');
        return;

      case 'matrix':
        setShowMatrix(true);
        playBeep('success');
        return;

      case 'sudo':
      case 'secrets':
        output = (
          <div className="text-left font-mono space-y-2">
            <span className="text-red-500 font-bold block">⚠️ SECURE DATABASE ACCESSED: TOP SECRET ELITE CODES</span>
            <div className="opacity-80">
              - [PASS] Neural Network Weight Optimization Protocol Initiated.<br />
              - [PASS] Zero-latency DB Migration: Complete.<br />
              - [FUN] "There are 10 types of people in the world: those who understand binary, and those who don't."
            </div>
            <div className="italic text-yellow-400">Welcome, Super User!</div>
          </div>
        );
        break;

      default:
        // Try executing as a script directly if in projects (e.g. ./taxmaster-india.sh)
        if (trimmed.startsWith('./') || currentDir === '/projects') {
          const cleanId = trimmed.replace('./', '').replace('.sh', '').trim();
          const project = learningProjects.find((p) => p.id === cleanId);
          if (project) {
            simulateProjectRun(project);
            return;
          }
        }
        success = false;
        output = `command not found: "${command}". Type "help" to view list of system operations.`;
    }

    if (!success) {
      playBeep('error');
    } else {
      playBeep('success');
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output,
        timestamp: new Date().toLocaleTimeString(),
        isInput: true,
        dir: currentDir,
      },
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isRunningScript) return;
    handleCommand(input);
    setInput('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* Outer Monitor Case */}
      <div 
        className={`relative rounded-3xl border-8 border-neutral-800 bg-neutral-950 p-1 md:p-3 overflow-hidden shadow-2xl transition-all duration-300 ${themeStyles.glow}`}
        onClick={focusInput}
      >
        {/* CRT Bevel Highlight */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none rounded-[18px] border border-neutral-700/50" />
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-neutral-400 text-xs select-none rounded-t-[14px]">
          <div className="flex items-center gap-2">
            <Monitor size={14} className={themeStyles.text} />
            <span className="font-mono tracking-wider font-bold">DEVSHELL // ADITI_OS_v1.0</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Selectors */}
            <div className="hidden sm:flex items-center gap-1.5 bg-neutral-950 px-2 py-0.5 rounded-full border border-neutral-800">
              {(['matrix', 'amber', 'cyan', 'classic'] as TerminalTheme[]).map((t) => (
                <button
                  key={t}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme(t);
                    playBeep('success');
                  }}
                  className={`w-3 h-3 rounded-full transition-all hover:scale-125 ${
                    t === 'matrix' ? 'bg-[#33ff33]' : t === 'amber' ? 'bg-[#ffb000]' : t === 'cyan' ? 'bg-[#00ffff]' : 'bg-slate-300'
                  } ${theme === t ? 'ring-2 ring-white scale-110' : 'opacity-50'}`}
                  title={`${t} theme`}
                />
              ))}
            </div>

            {/* Mute Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="hover:text-white transition-colors"
              title={isMuted ? 'Unmute terminal sounds' : 'Mute terminal sounds'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className={themeStyles.text} />}
            </button>

            {/* Reboot button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHistory([]);
                setBootTextIndex(0);
                setIsBooting(true);
                setShowMatrix(false);
                setIsRunningScript(false);
                playBeep('boot');
              }}
              className="hover:text-white transition-colors"
              title="Reboot terminal"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>

        {/* Screen Content Wrapper */}
        <div className={`relative ${themeStyles.bg} min-h-[380px] max-h-[460px] overflow-y-auto font-mono text-sm p-5 md:p-6 transition-all duration-300 select-text flex flex-col rounded-b-[14px] scrollbar-thin`}>
          {/* CRT Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-scanlines z-10 opacity-15" />
          
          {/* Phosphor Flickering Glow */}
          <div className="absolute inset-0 pointer-events-none bg-crt-glow z-0 opacity-10" />

          {/* Matrix Screensaver Overlay */}
          {showMatrix && (
            <div 
              className="absolute inset-0 bg-black z-20 flex flex-col"
              onClick={(e) => {
                e.stopPropagation();
                setShowMatrix(false);
                playBeep('success');
              }}
            >
              <canvas ref={matrixCanvasRef} className="w-full h-full cursor-pointer" />
              <div className="absolute bottom-4 left-0 right-0 text-center text-xs opacity-50 select-none animate-pulse font-mono" style={{ color: themeStyles.accent }}>
                [ CLICK OR PRESS ANY KEY TO EXIT SCREEN SAVER ]
              </div>
            </div>
          )}

          {/* Boot sequence or logs */}
          <div className={`flex-grow space-y-4 ${themeStyles.text} z-10`}>
            {isBooting ? (
              <div className="text-left space-y-1">
                {bootLines.slice(0, bootTextIndex).map((line, idx) => (
                  <div key={idx} className="opacity-90 leading-relaxed font-mono">
                    {line}
                  </div>
                ))}
                {bootTextIndex < bootLines.length && (
                  <span className={`inline-block w-2.5 h-4 ml-1 animate-pulse ${themeStyles.cursor}`} />
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Historical commands and outputs */}
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-left">
                    {item.command && item.isInput && (
                      <div className="flex items-center gap-1 opacity-80 select-none">
                        <span className="text-coral">guest@aditi-os</span>
                        <span>:</span>
                        <span className="text-yellow-400 font-bold">{item.dir}</span>
                        <span>$</span>
                        <span className="font-bold">{item.command}</span>
                      </div>
                    )}
                    <div className="pl-2 border-l border-white/5 py-0.5">{item.output}</div>
                  </div>
                ))}

                {/* Script runner loading text */}
                {isRunningScript && (
                  <div className="text-left opacity-75 animate-pulse">Running process simulation...</div>
                )}

                {/* Bottom spacer for automatic scroll */}
                <div ref={terminalEndRef} />
              </div>
            )}
          </div>

          {/* Input field (Hidden during boot/scripts) */}
          {!isBooting && !isRunningScript && !showMatrix && (
            <form onSubmit={handleFormSubmit} className="mt-4 pt-3 border-t border-white/5 flex items-center z-10">
              <div className="flex items-center gap-1 mr-2 select-none shrink-0 opacity-80">
                <span className="text-coral">guest@aditi-os</span>
                <span>:</span>
                <span className="text-yellow-400 font-bold">{currentDir}</span>
                <span>$</span>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-transparent border-none outline-none focus:ring-0 p-0 font-mono text-sm leading-none caret-transparent"
                style={{ color: themeStyles.accent }}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                maxLength={60}
              />
              {/* Custom blinking caret positioned at the end of input text */}
              <div className="relative flex-grow flex pointer-events-none select-none">
                <span className="invisible whitespace-pre">{input}</span>
                <span className={`inline-block w-2.5 h-4 animate-pulse shrink-0 ${themeStyles.cursor}`} />
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Helper drawer for mobile & fast click commands */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center select-none">
        <span className="text-xs text-muted font-mono flex items-center gap-1 py-1 px-2 border border-card-border rounded-xl">
          <HelpCircle size={12} /> Quick Options:
        </span>
        {[
          { label: 'help', cmd: 'help' },
          { label: 'whoami', cmd: 'whoami' },
          { label: 'skills.txt', cmd: 'cat skills.txt' },
          { label: 'cd projects', cmd: 'cd projects' },
          { label: 'ls projects', cmd: currentDir === '/projects' ? 'ls' : 'cd projects && ls' },
          { label: 'run taxmaster', cmd: currentDir === '/projects' ? 'run taxmaster-india' : 'cd projects && run taxmaster-india' },
          { label: 'run medical-ai', cmd: currentDir === '/projects' ? 'run ai-for-medicine' : 'cd projects && run ai-for-medicine' },
          { label: 'matrix screensaver', cmd: 'matrix' },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => {
              playBeep('keypress');
              if (btn.cmd.includes('&&')) {
                const subCommands = btn.cmd.split(' && ');
                // Execute sequentially
                handleCommand(subCommands[0]);
                setTimeout(() => handleCommand(subCommands[1]), 300);
              } else {
                handleCommand(btn.cmd);
              }
            }}
            className="text-xs px-3 py-1.5 rounded-xl bg-card border border-card-border hover:border-coral/40 hover:text-coral transition-all font-mono"
            disabled={isBooting || isRunningScript || showMatrix}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
