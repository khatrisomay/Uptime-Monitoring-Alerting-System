import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] orb-blue opacity-30 floating-element" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] orb-purple opacity-20 floating-element" style={{ animationDelay: '-3s' }}></div>
      </div>

      <div className="w-full max-w-md frosted-glass rounded-[48px] overflow-hidden relative p-12 z-10">
        <div className="grain-overlay"></div>
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <h1 className="font-display-lg text-headline-lg text-white">Welcome Back</h1>
            <p className="text-body-md text-on-surface/60">Sign in to UptimeMonitor</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-label-md text-white/80 block">Email address</label>
              <input 
                type="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                placeholder="admin@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-label-md text-white/80 block">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-background py-4 rounded-full font-bold hover:scale-95 active:scale-90 transition-transform text-body-md disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
