import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#131313] flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] orb-blue opacity-20 floating-element"></div>
      </div>
      <div className="relative z-10 frosted-glass p-12 rounded-[40px] max-w-lg space-y-6 border border-white/10">
        <h1 className="text-display-lg font-extrabold text-primary">404</h1>
        <h2 className="text-headline-md font-bold">Page Not Found</h2>
        <p className="text-on-surface/60 text-body-md">The page you are looking for does not exist or has been moved.</p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-white text-background px-8 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
