import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for both Sign In and Sign Up
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#131313]">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] left-[10%] w-[450px] h-[450px] orb-blue opacity-25 floating-element" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute bottom-[15%] right-[10%] w-[500px] h-[500px] orb-purple opacity-20 floating-element" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-[50%] right-[30%] w-[300px] h-[300px] orb-orange opacity-15 floating-element" style={{ animationDelay: '-5s' }}></div>
      </div>

      <div className="w-full max-w-md frosted-glass rounded-[48px] overflow-hidden relative p-10 md:p-12 z-10 shadow-2xl border border-white/10 backdrop-blur-3xl">
        <div className="grain-overlay"></div>
        <div className="relative z-10 space-y-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="font-display-lg text-headline-lg text-white font-extrabold tracking-tight">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-body-md text-on-surface/60">
              {isSignUp ? 'Join UptimeMonitor today' : 'Sign in to UptimeMonitor'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-label-md text-white/80 block">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-label-md text-white/80 block">Email address</label>
              <input 
                type="email" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                placeholder="admin@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-label-md text-white/80 block">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <label className="text-label-md text-white/80 block">Confirm Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white text-background py-4 rounded-full font-bold hover:scale-95 active:scale-90 transition-transform text-body-md disabled:opacity-50 mt-4 shadow-lg"
            >
              {loading 
                ? (isSignUp ? 'Creating account...' : 'Authenticating...') 
                : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          {/* Toggle between Sign In and Sign Up */}
          <div className="text-center pt-2 border-t border-white/10">
            <p className="text-body-md text-on-surface/60">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
              <button 
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-bold hover:underline transition-all cursor-pointer ml-1"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
