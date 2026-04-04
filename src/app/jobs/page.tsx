'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, ExternalLink, Flame, Heart, Globe, Building2 } from 'lucide-react';

const CL: Record<string, string> = { 
  pune: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', 
  blr: 'bg-green-500/10 text-green-500 border-green-500/20', 
  hyd: 'bg-blue-500/10 text-blue-500 border-blue-500/20', 
  ncr: 'bg-purple-500/10 text-purple-500 border-purple-500/20', 
  mum: 'bg-orange-500/10 text-orange-500 border-orange-500/20' 
};

const CN: Record<string, string> = { 
  pune: 'Pune', 
  blr: 'Bangalore', 
  hyd: 'Hyderabad', 
  ncr: 'NCR', 
  mum: 'Mumbai',
  remote: 'Remote'
};

interface Job {
  id: number;
  t: string;
  co: string;
  logo: string;
  city: string;
  rem: boolean;
  smin: number;
  smax: number;
  sk: string[];
  src: string;
  url: string;
  h: number;
  hot: boolean;
  type: 'mnc' | 'startup';
  pb: boolean;
}

const JOBS: Job[] = [
  // PUNE — MNC
  {id:1,t:'Senior Full Stack Engineer',co:'Persistent Systems',logo:'PS',city:'pune',rem:false,smin:28,smax:50,sk:['React','Java','Spring Boot'],src:'Naukri',url:'https://www.naukri.com/persistent-systems-jobs-in-pune',h:.5,hot:true,type:'mnc',pb:true},
  {id:2,t:'Full Stack Developer – SaaS',co:'NICE Systems',logo:'NC',city:'pune',rem:true,smin:32,smax:55,sk:['React','Node.js','TypeScript'],src:'LinkedIn',url:'https://www.linkedin.com/jobs/search/?keywords=full+stack+nice+pune',h:1.5,hot:false,type:'mnc',pb:true},
  {id:3,t:'Senior SDE – Contract Platform',co:'Icertis',logo:'IC',city:'pune',rem:false,smin:40,smax:65,sk:['React','C#','.NET'],src:'LinkedIn',url:'https://www.linkedin.com/jobs/search/?keywords=senior+sde+icertis+pune',h:2,hot:true,type:'mnc',pb:true},
  {id:4,t:'Full Stack Engineer – Observability',co:'LogicMonitor',logo:'LM',city:'pune',rem:true,smin:45,smax:70,sk:['React','Node.js','Go'],src:'Wellfound',url:'https://wellfound.com/company/logicmonitor/jobs',h:3,hot:true,type:'mnc',pb:false},
  {id:5,t:'Full Stack SDE-2',co:'Cummins Digital',logo:'CM',city:'pune',rem:false,smin:30,smax:48,sk:['React','Python','FastAPI'],src:'Naukri',url:'https://www.naukri.com/cummins-jobs-in-pune',h:4,hot:false,type:'mnc',pb:false},
  {id:6,t:'Senior Software Engineer',co:'Veritas Technologies',logo:'VT',city:'pune',rem:false,smin:35,smax:60,sk:['React','Java','Kubernetes'],src:'LinkedIn',url:'https://www.linkedin.com/jobs/search/?keywords=senior+software+engineer+veritas+pune',h:5,hot:false,type:'mnc',pb:false},
  // PUNE — Dhruva
  {id:7,t:'Full Stack Engineer – Game Tools',co:'Dhruva Software',logo:'DH',city:'pune',rem:false,smin:28,smax:48,sk:['React','Node.js','Unity WebGL'],src:'LinkedIn',url:'https://www.dhruvagames.com/careers',h:3,hot:true,type:'mnc',pb:true},
  // PUNE — Startups
  {id:8,t:'Senior Full Stack Developer',co:'Facilio',logo:'FC',city:'pune',rem:true,smin:28,smax:45,sk:['React','Node.js','MongoDB'],src:'CutShort',url:'https://cutshort.io/company/facilio',h:1,hot:true,type:'startup',pb:false},
  {id:9,t:'Full Stack Engineer (MERN)',co:'NonStop io',logo:'NS',city:'pune',rem:true,smin:25,smax:42,sk:['React','Node.js','PostgreSQL'],src:'CutShort',url:'https://cutshort.io/jobs/startup-jobs-in-pune',h:2.5,hot:false,type:'startup',pb:false},
  {id:10,t:'Lead Full Stack – Drone Tech',co:'Ideaforge',logo:'IF',city:'pune',rem:false,smin:30,smax:50,sk:['React','Python','Embedded'],src:'Wellfound',url:'https://wellfound.com/company/ideaforge',h:3.5,hot:true,type:'startup',pb:false},
  // BANGALORE — Big MNC
  {id:11,t:'Senior Software Engineer – Jira',co:'Atlassian',logo:'AT',city:'blr',rem:true,smin:60,smax:100,sk:['React','Node.js','TypeScript'],src:'Atlassian Careers',url:'https://www.atlassian.com/company/careers/all-jobs',h:.8,hot:true,type:'mnc',pb:true},
  {id:12,t:'Software Engineer II – Full Stack',co:'Google',logo:'GO',city:'blr',rem:false,smin:60,smax:110,sk:['React','Python','Go'],src:'Google Careers',url:'https://careers.google.com/jobs/results/?location=Bangalore%2C+Karnataka%2C+India',h:1.2,hot:true,type:'mnc',pb:true},
  {id:13,t:'Software Engineer – Azure Platform',co:'Microsoft',logo:'MS',city:'blr',rem:false,smin:50,smax:95,sk:['React','TypeScript','C#'],src:'Microsoft Careers',url:'https://careers.microsoft.com/v2/global/en/locations/india.html',h:2,hot:true,type:'mnc',pb:true},
  {id:14,t:'Full Stack Engineer – Strats',co:'Goldman Sachs',logo:'GS',city:'blr',rem:false,smin:55,smax:95,sk:['React','Java','Python'],src:'GS Careers',url:'https://www.goldmansachs.com/careers',h:2.5,hot:true,type:'mnc',pb:true},
  {id:15,t:'Full Stack Engineer – AI SaaS',co:'Sarvam AI',logo:'SA',city:'blr',rem:true,smin:40,smax:65,sk:['Python','React','LLMs'],src:'Wellfound',url:'https://wellfound.com/company/sarvam-ai',h:2,hot:true,type:'startup',pb:false},
  {id:16,t:'Staff Software Engineer',co:'CRED',logo:'CR',city:'blr',rem:false,smin:50,smax:80,sk:['Go','React','Microservices'],src:'Naukri',url:'https://www.naukri.com/cred-jobs',h:1,hot:true,type:'startup',pb:false},
  {id:17,t:'Lead Full Stack Developer',co:'Dhruva Software',logo:'DH',city:'blr',rem:false,smin:35,smax:55,sk:['React','Python','WebGL'],src:'Naukri',url:'https://www.dhruvagames.com/careers',h:6,hot:false,type:'mnc',pb:true},
  {id:18,t:'Senior Full Stack Engineer',co:'Razorpay',logo:'RZ',city:'blr',rem:false,smin:35,smax:55,sk:['React','Node.js','TypeScript'],src:'LinkedIn',url:'https://www.linkedin.com/jobs/search/?keywords=senior+full+stack+razorpay',h:.3,hot:true,type:'startup',pb:false},
  // HYDERABAD
  {id:19,t:'Software Engineer – Engineering',co:'Goldman Sachs',logo:'GS',city:'hyd',rem:false,smin:50,smax:90,sk:['React','Java','Python'],src:'GS Careers',url:'https://www.goldmansachs.com/careers',h:3,hot:true,type:'mnc',pb:true},
  {id:20,t:'Software Engineer II',co:'Microsoft',logo:'MS',city:'hyd',rem:false,smin:50,smax:90,sk:['React','TypeScript','Azure'],src:'Microsoft Careers',url:'https://careers.microsoft.com/v2/global/en/locations/india.html',h:4,hot:true,type:'mnc',pb:true},
  {id:21,t:'Software Engineer – Cloud AI',co:'Google',logo:'GO',city:'hyd',rem:false,smin:60,smax:105,sk:['Python','React','TensorFlow'],src:'Google Careers',url:'https://careers.google.com/jobs/results/?location=Hyderabad%2C+Telangana%2C+India',h:5,hot:false,type:'mnc',pb:true},
  // NCR
  {id:22,t:'Senior Software Engineer',co:'Microsoft',logo:'MS',city:'ncr',rem:false,smin:48,smax:88,sk:['React','C#','TypeScript'],src:'Microsoft Careers',url:'https://careers.microsoft.com/v2/global/en/locations/india.html',h:6,hot:false,type:'mnc',pb:true},
  {id:23,t:'Full Stack Engineer – GCP',co:'Google',logo:'GO',city:'ncr',rem:false,smin:55,smax:100,sk:['React','Node.js','Go'],src:'Google Careers',url:'https://careers.google.com/jobs/results/?location=Gurugram%2C+Haryana%2C+India',h:7,hot:false,type:'mnc',pb:true},
  // MUMBAI
  {id:24,t:'Technology Analyst – Full Stack',co:'Goldman Sachs',logo:'GS',city:'mum',rem:false,smin:40,smax:70,sk:['React','Java','Spring'],src:'GS Careers',url:'https://www.goldmansachs.com/careers',h:4,hot:false,type:'mnc',pb:true},
  {id:25,t:'Software Engineer – Cloud',co:'Google',logo:'GO',city:'mum',rem:false,smin:55,smax:95,sk:['React','Python','GCP'],src:'Google Careers',url:'https://careers.google.com/jobs/results/?location=Mumbai%2C+Maharashtra%2C+India',h:10,hot:false,type:'mnc',pb:true},
];

const BENEFITS = [
  {
    co: 'Atlassian',
    grade: 'A+',
    locs: 'Bangalore (India HQ) · Remote-first globally',
    items: [
      { text: '26 weeks fully paid parental leave for birthing parents', color: 'pink' },
      { text: '20 weeks fully paid leave for non-birthing parents (partners, adoption)', color: 'pink' },
      { text: 'Comprehensive family health insurance including newborn coverage from day one', color: 'blue' },
      { text: 'Mental health platform access for parents and children included', color: 'green' },
    ],
    url: 'https://www.atlassian.com/company/careers/resources/perk-and-benefits/global/india'
  },
  {
    co: 'Goldman Sachs',
    grade: 'A',
    locs: 'Bangalore · Hyderabad · Mumbai',
    items: [
      { text: '20 weeks fully paid (100% salary) for birth parents', color: 'pink' },
      { text: '20 weeks fully paid for non-birth parents — identical policy, no discrimination', color: 'pink' },
      { text: 'Comprehensive health, life and disability insurance', color: 'blue' },
      { text: 'Adoption, surrogacy, egg donation and retrieval stipends available', color: 'green' },
    ],
    url: 'https://www.goldmansachs.com/careers/benefits'
  },
  {
    co: 'Google India',
    grade: 'A',
    locs: 'Bangalore · Hyderabad · Mumbai · Gurugram',
    items: [
      { text: '18–24 weeks paid maternity leave; 12 weeks paternity leave', color: 'pink' },
      { text: 'Family health insurance covering spouse, children, parents and in-laws', color: 'blue' },
      { text: 'Fertility treatment, adoption assistance, and baby bonding leave', color: 'green' },
    ],
    url: 'https://careers.google.com/intl/en_in/benefits/'
  }
];

export default function JobsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'listings' | 'benefits'>('listings');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    city: 'all',
    tier: 'all',
    role: 'all',
    sal: 25
  });
  const [sort, setSort] = useState<'date' | 'sal' | 'co'>('date');

  const filteredJobs = useMemo(() => {
    let jobs = JOBS.filter(j => {
      const txt = `${j.t} ${j.co} ${j.sk.join(' ')} ${j.city}`.toLowerCase();
      if (search && !txt.includes(search.toLowerCase())) return false;
      if (j.smin < filters.sal) return false;
      if (filters.city !== 'all' && filters.city !== 'remote' && j.city !== filters.city) return false;
      if (filters.city === 'remote' && !j.rem) return false;
      if (filters.tier === 'mnc' && j.type !== 'mnc') return false;
      if (filters.tier === 'startup' && j.type !== 'startup') return false;
      if (filters.tier === 'parental' && !j.pb) return false;
      
      if (filters.role !== 'all') {
        if (filters.role === 'lead') {
          if (!/lead|architect|principal|staff|manager/i.test(j.t)) return false;
        } else if (!j.sk.some(s => s.toLowerCase().includes(filters.role))) {
          return false;
        }
      }
      return true;
    });

    if (sort === 'sal') jobs.sort((a, b) => b.smax - a.smax);
    else if (sort === 'co') jobs.sort((a, b) => a.co.localeCompare(b.co));
    else jobs.sort((a, b) => a.h - b.h);

    return jobs;
  }, [search, filters, sort]);

  const stats = useMemo(() => ({
    total: filteredJobs.length,
    pune: filteredJobs.filter(j => j.city === 'pune').length,
    pb: filteredJobs.filter(j => j.pb).length,
    topPay: filteredJobs.length ? Math.max(...filteredJobs.map(j => j.smax)) : 0
  }), [filteredJobs]);

  const getTimeAgo = (h: number) => {
    if (h < .1) return 'just now';
    if (h < 1) return Math.round(h * 60) + 'm ago';
    if (h < 24) return Math.round(h) + 'h ago';
    return Math.floor(h / 24) + 'd ago';
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'adosi12') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-yellow-400 mb-8 block">
              ADITI DOSI
            </Link>
            <h1 className="text-4xl font-black mb-4 tracking-tighter">Protected Access</h1>
            <p className="text-muted">Please enter the password to view the jobs board.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-card border border-card-border rounded-xl py-4 px-4 text-foreground focus:outline-none focus:border-yellow-400/50 transition-colors"
            />
            {error && <p className="text-coral text-sm font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl hover:bg-yellow-500 transition-all"
            >
              Access Board
            </button>
            <Link href="/" className="block text-center text-sm text-muted hover:text-foreground transition-colors pt-4">
              ← Back to portfolio
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-card-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter text-yellow-400">
            ADITI DOSI
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back to portfolio
          </Link>
        </div>
      </nav>

      <header className="pt-32 pb-12 px-6 border-b border-card-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-yellow-400 font-mono text-xs uppercase tracking-widest mb-4">// curated for full stack · 25L+ · India</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Jobs <span className="italic text-yellow-400 font-light">Board</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Hand-picked full stack openings across Pune, Bangalore, Hyderabad, NCR and Mumbai. Updated every 48 hours.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8 border-b border-card-border mb-12">
          <button 
            onClick={() => setActiveTab('listings')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'listings' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-muted hover:text-foreground'}`}
          >
            Listings
          </button>
          <button 
            onClick={() => setActiveTab('benefits')}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'benefits' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-muted hover:text-foreground'}`}
          >
            Parental Benefits
          </button>
        </div>

        {activeTab === 'listings' ? (
          <div className="space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Search role, company, skill, city..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-card border border-card-border rounded-xl py-4 pl-12 pr-4 text-foreground focus:outline-none focus:border-yellow-400/50 transition-colors"
              />
            </div>

            <div className="grid gap-6">
              <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase font-bold tracking-widest">
                <span className="text-muted min-w-[60px]">City</span>
                {['all', 'pune', 'blr', 'hyd', 'ncr', 'mum', 'remote'].map(city => (
                  <button 
                    key={city}
                    onClick={() => setFilters(f => ({ ...f, city }))}
                    className={`px-4 py-1.5 rounded-full border transition-all ${filters.city === city ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30' : 'bg-transparent text-muted border-card-border hover:border-foreground/20'}`}
                  >
                    {CN[city] || 'All'}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase font-bold tracking-widest">
                <span className="text-muted min-w-[60px]">Tier</span>
                <button 
                  onClick={() => setFilters(f => ({ ...f, tier: 'all' }))}
                  className={`px-4 py-1.5 rounded-full border transition-all ${filters.tier === 'all' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30' : 'bg-transparent text-muted border-card-border hover:border-foreground/20'}`}
                >
                  All Cos
                </button>
                <button 
                  onClick={() => setFilters(f => ({ ...f, tier: 'mnc' }))}
                  className={`px-4 py-1.5 rounded-full border transition-all ${filters.tier === 'mnc' ? 'bg-blue-400/10 text-blue-400 border-blue-400/30' : 'bg-transparent text-muted border-card-border hover:border-foreground/20'}`}
                >
                  MNC only
                </button>
                <button 
                  onClick={() => setFilters(f => ({ ...f, tier: 'startup' }))}
                  className={`px-4 py-1.5 rounded-full border transition-all ${filters.tier === 'startup' ? 'bg-purple-400/10 text-purple-400 border-purple-400/30' : 'bg-transparent text-muted border-card-border hover:border-foreground/20'}`}
                >
                  Startups
                </button>
                <button 
                  onClick={() => setFilters(f => ({ ...f, tier: 'parental' }))}
                  className={`px-4 py-1.5 rounded-full border transition-all ${filters.tier === 'parental' ? 'bg-pink-400/10 text-pink-400 border-pink-400/30' : 'bg-transparent text-muted border-card-border hover:border-foreground/20'}`}
                >
                  Parental benefits <Heart size={10} className="inline ml-1" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase font-bold tracking-widest">
                <span className="text-muted min-w-[60px]">Pay</span>
                {[25, 40, 60].map(val => (
                  <button 
                    key={val}
                    onClick={() => setFilters(f => ({ ...f, sal: val }))}
                    className={`px-4 py-1.5 rounded-full border transition-all ${filters.sal === val ? 'bg-green-400/10 text-green-400 border-green-400/30' : 'bg-transparent text-muted border-card-border hover:border-foreground/20'}`}
                  >
                    {val}L+
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Listings', val: stats.total },
                { label: 'In Pune', val: stats.pune },
                { label: 'Parental Benefits', val: stats.pb },
                { label: 'Top Pay', val: stats.topPay ? `${stats.topPay}L` : '—' }
              ].map(stat => (
                <div key={stat.label} className="bg-card border border-card-border p-6 rounded-2xl text-foreground">
                  <div className="text-3xl font-black text-yellow-400 mb-1">{stat.val}</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 py-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted">Sort:</span>
              <button onClick={() => setSort('date')} className={`text-[10px] font-bold uppercase tracking-widest ${sort === 'date' ? 'text-foreground' : 'text-muted hover:text-foreground'}`}>Newest</button>
              <button onClick={() => setSort('sal')} className={`text-[10px] font-bold uppercase tracking-widest ${sort === 'sal' ? 'text-foreground' : 'text-muted hover:text-foreground'}`}>Salary ↓</button>
              <button onClick={() => setSort('co')} className={`text-[10px] font-bold uppercase tracking-widest ${sort === 'co' ? 'text-foreground' : 'text-muted hover:text-foreground'}`}>Company A–Z</button>
            </div>

            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-20 text-muted font-mono text-sm">No jobs match your filters.</div>
              ) : (
                filteredJobs.map(job => (
                  <a 
                    key={job.id} 
                    href={job.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-card border border-card-border hover:bg-card/80 hover:border-foreground/10 transition-all gap-6"
                  >
                    <div className="flex items-start gap-4 text-foreground">
                      <div className="w-12 h-12 rounded-xl bg-background border border-card-border flex items-center justify-center font-bold text-muted flex-shrink-0 group-hover:text-yellow-400 transition-colors">
                        {job.logo}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold group-hover:text-yellow-400 transition-colors flex items-center gap-2">
                          {job.t} {job.hot && <Flame size={16} className="text-orange-500" />}
                        </h3>
                        <p className="text-muted font-medium mb-3">{job.co}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-tighter ${CL[job.city]}`}>
                            {CN[job.city]}
                          </span>
                          <span className="px-2 py-0.5 rounded-full border border-card-border bg-background text-[9px] font-bold uppercase tracking-tighter text-muted">
                            {job.type}
                          </span>
                          {job.pb && <span className="px-2 py-0.5 rounded-full border border-pink-500/20 bg-pink-500/10 text-[9px] font-bold uppercase tracking-tighter text-pink-500">Parental ♥</span>}
                          {job.rem && <span className="px-2 py-0.5 rounded-full border border-green-500/20 bg-green-500/10 text-[9px] font-bold uppercase tracking-tighter text-green-500">Remote</span>}
                          {job.sk.map(s => (
                            <span key={s} className="px-2 py-0.5 rounded-full border border-card-border bg-background text-[9px] font-bold uppercase tracking-tighter text-muted">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-row md:flex-col justify-between items-center md:items-end gap-2 border-t md:border-none border-card-border pt-4 md:pt-0">
                      <div className="text-2xl font-black text-yellow-400">₹{job.smin}–{job.smax}L</div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-muted">{getTimeAgo(job.h)}</div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {BENEFITS.map(ben => (
              <div key={ben.co} className="bg-card border border-card-border rounded-2xl p-8 hover:border-foreground/10 transition-all text-foreground">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{ben.co}</h3>
                    <p className="text-sm text-muted flex items-center gap-2"><Globe size={14} /> {ben.locs}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${ben.grade === 'A+' ? 'bg-pink-500/10 text-pink-500 border border-pink-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                    Grade {ben.grade}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {ben.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${item.color === 'pink' ? 'bg-pink-500' : item.color === 'blue' ? 'bg-blue-500' : 'bg-green-500'}`} />
                      {item.text}
                    </li>
                  ))}
                </ul>
                <a 
                  href={ben.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Careers & Benefits <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-card-border py-12 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] uppercase font-bold tracking-widest text-muted">
            ADITI DOSI · Full Stack Developer · Pune, India
          </div>
          <div className="flex gap-8">
            <Link href="/" className="text-[10px] uppercase font-bold tracking-widest text-muted hover:text-foreground transition-colors">Portfolio</Link>
            <Link href="/learning" className="text-[10px] uppercase font-bold tracking-widest text-muted hover:text-foreground transition-colors">Learning Space</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
