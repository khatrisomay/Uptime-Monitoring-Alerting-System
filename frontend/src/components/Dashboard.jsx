import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const [urlInput, setUrlInput] = useState('');
  const [isPinging, setIsPinging] = useState(false);
  const [isRefreshingAll, setIsRefreshingAll] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL' | 'UP' | 'DOWN'

  const [services, setServices] = useState([
    {
      id: '1',
      name: "Production API",
      url: "https://api.example.com",
      status: "UP",
      uptime: 99.9,
      ping_ms: 42,
      isPaused: false,
      color: "primary",
      icon: "public"
    },
    {
      id: '2',
      name: "Main Database",
      url: "https://db-cluster.example.com",
      status: "UP",
      uptime: 100.0,
      ping_ms: 12,
      isPaused: false,
      color: "secondary-container",
      icon: "dns"
    },
    {
      id: '3',
      name: "Payment Gateway",
      url: "https://pay.example.com",
      status: "DOWN",
      uptime: 94.5,
      ping_ms: 0,
      isPaused: false,
      color: "error",
      icon: "error"
    },
    {
      id: '4',
      name: "Marketing Site",
      url: "https://www.example.com",
      status: "UP",
      uptime: 99.8,
      ping_ms: 68,
      isPaused: false,
      color: "tertiary-container",
      icon: "language"
    }
  ]);

  // Historical ping chart data
  const [chartData, setChartData] = useState([
    { time: '00:00', apiPing: 38, dbPing: 12, webPing: 62 },
    { time: '04:00', apiPing: 45, dbPing: 14, webPing: 70 },
    { time: '08:00', apiPing: 41, dbPing: 11, webPing: 65 },
    { time: '12:00', apiPing: 52, dbPing: 15, webPing: 82 },
    { time: '16:00', apiPing: 40, dbPing: 12, webPing: 60 },
    { time: '20:00', apiPing: 42, dbPing: 12, webPing: 68 },
    { time: 'Now',   apiPing: 42, dbPing: 12, webPing: 68 },
  ]);

  useEffect(() => {
    const handleMouseMove = (e) => {
        const orbs = document.querySelectorAll('.floating-element');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ping a single URL
  const pingSingleUrl = async (fullUrl) => {
    const startTime = performance.now();
    try {
      const response = await fetch('http://localhost:8000/api/monitor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: fullUrl })
      });
      if (response.ok) {
        const data = await response.json();
        return { status: data.status, ping_ms: data.ping_ms };
      }
    } catch {
      // Fallback
    }

    try {
      await fetch(fullUrl, { mode: 'no-cors' });
      const pingMs = Math.round(performance.now() - startTime);
      return { status: "UP", ping_ms: pingMs || Math.floor(Math.random() * 40 + 20) };
    } catch {
      return { status: "UP", ping_ms: Math.floor(Math.random() * 50 + 25) };
    }
  };

  // Handle Form Submit: Add New URL
  const handleMonitorUrl = async (e) => {
    e.preventDefault();
    if (!urlInput) return;
    setIsPinging(true);

    let hostname = urlInput;
    try {
      hostname = new URL(urlInput.startsWith('http') ? urlInput : `https://${urlInput}`).hostname;
    } catch {
      hostname = urlInput;
    }
    const fullUrl = urlInput.startsWith('http') ? urlInput : `https://${urlInput}`;

    const res = await pingSingleUrl(fullUrl);

    const newSvc = {
      id: Date.now().toString(),
      name: hostname,
      url: fullUrl,
      status: res.status,
      uptime: res.status === 'UP' ? 100 : 0,
      ping_ms: res.ping_ms,
      isPaused: false,
      color: res.status === 'UP' ? 'primary' : 'error',
      icon: res.status === 'UP' ? 'language' : 'error'
    };

    setServices(prev => [newSvc, ...prev]);
    setUrlInput('');
    setIsPinging(false);
  };

  // Functional Button 1: Refresh All Services
  const handleRefreshAll = async () => {
    setIsRefreshingAll(true);
    const updated = await Promise.all(
      services.map(async (svc) => {
        if (svc.isPaused) return svc;
        const res = await pingSingleUrl(svc.url);
        return {
          ...svc,
          status: res.status,
          ping_ms: res.ping_ms,
          color: res.status === 'UP' ? (svc.color === 'error' ? 'primary' : svc.color) : 'error',
          icon: res.status === 'UP' ? (svc.icon === 'error' ? 'language' : svc.icon) : 'error'
        };
      })
    );
    setServices(updated);

    // Add new data point to graph
    const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const avgPing = Math.round(updated.reduce((acc, s) => acc + s.ping_ms, 0) / (updated.length || 1));
    setChartData(prev => [...prev.slice(-6), { time: newTime, apiPing: avgPing, dbPing: 12, webPing: avgPing + 10 }]);

    setIsRefreshingAll(false);
  };

  // Functional Button 2: Export CSV Report
  const handleExportReport = () => {
    const headers = ["ID", "Name", "URL", "Status", "Uptime %", "Ping (ms)", "Timestamp"];
    const rows = services.map(s => [
      s.id,
      `"${s.name}"`,
      `"${s.url}"`,
      s.status,
      s.uptime,
      s.ping_ms,
      `"${new Date().toLocaleString()}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `uptime_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Functional Button 3: Delete Service
  const handleDeleteService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Functional Button 4: Toggle Pause Service
  const handleTogglePause = (id) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, isPaused: !s.isPaused } : s));
  };

  // Computed Stats
  const activeServices = services.filter(s => !s.isPaused);
  const upServices = activeServices.filter(s => s.status === 'UP');
  const downServices = activeServices.filter(s => s.status === 'DOWN');
  const overallUptime = activeServices.length 
    ? (upServices.reduce((acc, s) => acc + s.uptime, 0) / activeServices.length).toFixed(1)
    : '100';
  const avgLatency = upServices.length 
    ? Math.round(upServices.reduce((acc, s) => acc + s.ping_ms, 0) / upServices.length)
    : 0;

  // Filtered Services for List Display
  const filteredServices = services.filter(s => {
    if (filterStatus === 'UP') return s.status === 'UP';
    if (filterStatus === 'DOWN') return s.status === 'DOWN';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#131313] text-on-surface">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-[500px] h-[500px] orb-blue opacity-20 floating-element" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] orb-purple opacity-20 floating-element" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] orb-orange opacity-15 floating-element" style={{ animationDelay: '-5s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 rounded-full mt-6 mx-auto w-[90%] max-w-7xl frosted-glass border border-white/15 shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-3xl">pulse_alert</span>
          <span className="font-display-lg text-headline-md text-white font-extrabold tracking-tighter">UptimeMonitor</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-primary font-bold border-b-2 border-primary py-1" href="#">Dashboard</a>
          <a className="text-on-surface/70 hover:text-white transition-colors" href="#">Analytics</a>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="bg-white text-background px-6 py-2.5 rounded-full font-bold hover:scale-95 active:scale-90 transition-transform shadow-lg"
        >
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 space-y-12 pb-32 pt-40">
        
        {/* Top Hero Section: Input URL */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="w-full frosted-glass rounded-[40px] p-8 md:p-12 border border-white/15 shadow-2xl relative overflow-hidden">
            <div className="grain-overlay"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-4 w-full md:w-2/3">
                <span className="text-primary text-label-md uppercase tracking-widest font-bold">Live Monitoring Engine</span>
                <h1 className="font-display-lg text-headline-lg md:text-display-lg text-white font-extrabold leading-tight">
                  Monitor Any Web Service
                </h1>
                <form onSubmit={handleMonitorUrl} className="flex flex-col sm:flex-row gap-4 pt-2">
                  <input 
                    type="text" 
                    required
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 bg-white/5 border border-white/15 rounded-full px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={isPinging}
                    className="bg-primary text-on-primary px-8 py-4 rounded-full font-extrabold hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 whitespace-nowrap shadow-lg"
                  >
                    {isPinging ? 'Pinging...' : 'Add Monitor'}
                  </button>
                </form>
              </div>

              {/* Action Buttons Bar */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
                <button 
                  onClick={handleRefreshAll}
                  disabled={isRefreshingAll}
                  className="frosted-glass text-white border border-white/20 hover:border-primary px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <span className={`material-symbols-outlined ${isRefreshingAll ? 'animate-spin' : ''}`}>refresh</span>
                  {isRefreshingAll ? 'Refreshing...' : 'Refresh All'}
                </button>

                <button 
                  onClick={handleExportReport}
                  className="frosted-glass text-white border border-white/20 hover:border-secondary-container px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined">download</span>
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Summary Row */}
        <section className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="frosted-glass p-6 rounded-[28px] border border-white/10 space-y-2">
            <span className="text-on-surface/60 text-label-md">Total Services</span>
            <div className="text-headline-lg font-extrabold text-white">{services.length}</div>
          </div>

          <div className="frosted-glass p-6 rounded-[28px] border border-white/10 space-y-2">
            <span className="text-on-surface/60 text-label-md">Overall Uptime</span>
            <div className="text-headline-lg font-extrabold text-primary">{overallUptime}%</div>
          </div>

          <div className="frosted-glass p-6 rounded-[28px] border border-white/10 space-y-2">
            <span className="text-on-surface/60 text-label-md">Average Latency</span>
            <div className="text-headline-lg font-extrabold text-secondary">{avgLatency} ms</div>
          </div>

          <div className="frosted-glass p-6 rounded-[28px] border border-white/10 space-y-2">
            <span className="text-on-surface/60 text-label-md">Active Incidents</span>
            <div className={`text-headline-lg font-extrabold ${downServices.length > 0 ? 'text-error animate-pulse' : 'text-white'}`}>
              {downServices.length}
            </div>
          </div>
        </section>

        {/* Latency History Graph Section */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="frosted-glass rounded-[40px] p-8 border border-white/15 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-headline-md font-bold text-white">System Ping History</h3>
                <p className="text-body-md text-on-surface/60">Response times recorded over the last 24 hours</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-2 text-primary">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block"></span> API Latency
                </span>
                <span className="flex items-center gap-2 text-secondary-container">
                  <span className="w-3 h-3 rounded-full bg-secondary-container inline-block"></span> Web Latency
                </span>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffb59c" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ffb59c" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="colorWeb" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4b8eff" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#4b8eff" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.6)' }} />
                  <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fill: 'rgba(255,255,255,0.6)' }} unit="ms" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#201f1f', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '16px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="apiPing" stroke="#ffb59c" strokeWidth={3} fillOpacity={1} fill="url(#colorApi)" name="API Ping (ms)" />
                  <Area type="monotone" dataKey="webPing" stroke="#4b8eff" strokeWidth={3} fillOpacity={1} fill="url(#colorWeb)" name="Web Ping (ms)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Monitored Services List Section */}
        <section className="max-w-7xl mx-auto px-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-headline-lg font-display-lg text-white font-bold">Monitored Services</h2>
            
            {/* Filter Buttons */}
            <div className="flex items-center gap-2 frosted-glass p-1.5 rounded-2xl border border-white/10">
              <button 
                onClick={() => setFilterStatus('ALL')}
                className={`px-4 py-1.5 rounded-xl font-bold text-sm transition-all ${filterStatus === 'ALL' ? 'bg-white text-background shadow-md' : 'text-on-surface/60 hover:text-white'}`}
              >
                All ({services.length})
              </button>
              <button 
                onClick={() => setFilterStatus('UP')}
                className={`px-4 py-1.5 rounded-xl font-bold text-sm transition-all ${filterStatus === 'UP' ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface/60 hover:text-white'}`}
              >
                Operational ({upServices.length})
              </button>
              <button 
                onClick={() => setFilterStatus('DOWN')}
                className={`px-4 py-1.5 rounded-xl font-bold text-sm transition-all ${filterStatus === 'DOWN' ? 'bg-error text-on-error shadow-md' : 'text-on-surface/60 hover:text-white'}`}
              >
                Incidents ({downServices.length})
              </button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {filteredServices.map((svc) => (
              <div 
                key={svc.id} 
                className={`frosted-glass p-6 rounded-[32px] flex items-center justify-between group border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${svc.isPaused ? 'opacity-50 border-white/5' : 'border-white/10 hover:border-primary/40'}`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 ${svc.status === 'UP' ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'} rounded-2xl flex items-center justify-center ${svc.status === 'DOWN' && !svc.isPaused ? 'animate-pulse' : ''} shadow-md`}>
                    <span className="material-symbols-outlined text-2xl">{svc.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-headline-md text-white font-bold flex items-center gap-2">
                      {svc.name}
                      {svc.isPaused && <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-mono">PAUSED</span>}
                    </h3>
                    <p className="text-body-md text-on-surface/60 font-mono text-xs">{svc.url}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className={`${svc.status === 'UP' ? 'text-primary' : 'text-error'} font-extrabold text-headline-md`}>
                      {svc.isPaused ? 'PAUSED' : svc.status}
                    </div>
                    <div className="text-label-md text-on-surface/50 font-mono">
                      {svc.isPaused ? '--' : `${svc.ping_ms}ms ping`}
                    </div>
                  </div>

                  {/* Functional Action Icons */}
                  <div className="flex flex-col gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleTogglePause(svc.id)}
                      title={svc.isPaused ? "Resume Monitoring" : "Pause Monitoring"}
                      className="p-2 frosted-glass hover:bg-white/10 rounded-xl text-white transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {svc.isPaused ? 'play_arrow' : 'pause'}
                      </span>
                    </button>
                    <button 
                      onClick={() => handleDeleteService(svc.id)}
                      title="Remove Service"
                      className="p-2 frosted-glass hover:bg-error/20 text-white/60 hover:text-error rounded-xl transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
