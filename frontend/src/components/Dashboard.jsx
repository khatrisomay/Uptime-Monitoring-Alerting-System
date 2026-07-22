import React, { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    // Subtle mouse tracking parallax for background orbs
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

  return (
    <>
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Floating 3D Orbs */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] orb-blue opacity-30 floating-element" style={{ animationDelay: '-1s' }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] orb-purple opacity-20 floating-element" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] orb-orange opacity-25 floating-element" style={{ animationDelay: '-5s' }}></div>
        {/* Ribbons and Images */}
        <div className="absolute inset-0 z-0 mix-blend-screen opacity-40">
          <div className="absolute top-1/4 -right-1/4 w-full h-full transform -rotate-12">
            <img alt="3D ribbon" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFz3x92Xg7EDTZxXty_3RY5TF9f4yBS-YkJGUsez2UaF1KQevXUhfJiBNPmZMvrR_OIstUp6jocmkELYjW1liMtWLwpxINObmgwfWtVO0o6ZgMp-PQYPqdmnNNxBl-gx8jSOmTvsdCXOUFNxOSkwX8YalIJNjue-E8DyBIfLf_ZAKjb0dgIS2z1m4Z-91An8Bnq_GNC34-hNg0ovRt3L6yIsG5i1ET3HwRg16xWgQqakaBfJ4gRpwTBfWykN0MavLfyA1EMjSh8cXY"/>
          </div>
          <div className="absolute -bottom-1/4 -left-1/4 w-full h-full transform rotate-12">
            <img alt="3D orb" className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLB1BIA9ux0_zhuOuABw8_LV_fpxfFZbbiIjTIuRILYzzblkB8qTeLfEn-p03WA0Q-IPPX2HjA7NPcBPt2QZZq4JuhGpvrlbjcxH9-ZqChFMxbLjbq6C6FHzDjrbkgER9ipE2seac8YCL5uvQgdZ8upez0oSQ7cDqdN1a5r_ifhBIgrPcbLEgi2SFdhLJEbBF42To9RbE8h5YTiu2msdUzCZlbyDMij25QpLlsz8gvcIdvniQGm_6jTXXIjHUvGSM6m58ufO5KhQmP"/>
          </div>
        </div>
      </div>

      {/* Navigation Shell */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 rounded-full mt-6 mx-auto w-[90%] max-w-7xl frosted-glass border border-white/20 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="font-display-lg text-headline-md text-on-surface tracking-tighter">UptimeMonitor</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-primary font-bold border-b border-primary font-body-md text-body-md" href="#">Dashboard</a>
          <a className="text-on-surface/70 hover:text-on-surface transition-colors font-body-md text-body-md" href="#">Incidents</a>
          <a className="text-on-surface/70 hover:text-on-surface transition-colors font-body-md text-body-md" href="#">Settings</a>
        </div>
        <button className="bg-white text-background px-6 py-2 rounded-full font-bold hover:scale-95 active:scale-90 transition-transform font-body-md text-body-md">
            Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 space-y-32 pb-32 pt-48">
        
        {/* Status Overview */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="w-full frosted-glass rounded-[48px] overflow-hidden relative p-12 md:p-16">
            <div className="grain-overlay"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
                <div className="space-y-4">
                  <h1 className="font-display-lg text-display-lg text-white leading-tight">
                      All Systems<br/>Operational
                  </h1>
                  <p className="font-headline-md text-headline-md text-on-surface/80 max-w-md">
                      Monitoring 12 services globally.
                  </p>
                </div>
                
                <div className="relative w-48 h-48 mt-8 md:mt-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-tertiary-container rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <div className="absolute inset-0 frosted-glass rounded-full border border-white/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[80px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-headline-lg font-display-lg text-white">Monitored Services</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Service Card 1 */}
            <div className="frosted-glass p-8 rounded-[32px] flex items-center justify-between group hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-[0_0_15px_rgba(255,181,156,0.5)]">
                  <span className="material-symbols-outlined text-3xl">public</span>
                </div>
                <div>
                  <h3 className="text-headline-md text-white">Production API</h3>
                  <p className="text-body-md text-on-surface/60">api.example.com</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-primary font-bold text-headline-md">99.9%</div>
                <div className="text-label-md text-on-surface/50">42ms ping</div>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="frosted-glass p-8 rounded-[32px] flex items-center justify-between group hover:border-secondary-container/40 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-secondary-container/20 rounded-2xl flex items-center justify-center text-secondary-container shadow-[0_0_15px_rgba(75,142,255,0.5)]">
                  <span className="material-symbols-outlined text-3xl">dns</span>
                </div>
                <div>
                  <h3 className="text-headline-md text-white">Main Database</h3>
                  <p className="text-body-md text-on-surface/60">db-cluster.example.com</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-secondary-container font-bold text-headline-md">100%</div>
                <div className="text-label-md text-on-surface/50">12ms ping</div>
              </div>
            </div>
            
            {/* Service Card 3 */}
            <div className="frosted-glass p-8 rounded-[32px] flex items-center justify-between group border-error/40 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-error/20 rounded-2xl flex items-center justify-center text-error shadow-[0_0_15px_rgba(255,180,171,0.5)] animate-pulse">
                  <span className="material-symbols-outlined text-3xl">error</span>
                </div>
                <div>
                  <h3 className="text-headline-md text-white">Payment Gateway</h3>
                  <p className="text-body-md text-on-surface/60">pay.example.com</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-error font-bold text-headline-md">DOWN</div>
                <div className="text-label-md text-on-surface/50">Timeout</div>
              </div>
            </div>

             {/* Service Card 4 */}
             <div className="frosted-glass p-8 rounded-[32px] flex items-center justify-between group hover:border-tertiary-container/40 transition-colors">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-tertiary-container/20 rounded-2xl flex items-center justify-center text-tertiary-container shadow-[0_0_15px_rgba(194,108,255,0.5)]">
                  <span className="material-symbols-outlined text-3xl">language</span>
                </div>
                <div>
                  <h3 className="text-headline-md text-white">Marketing Site</h3>
                  <p className="text-body-md text-on-surface/60">www.example.com</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-tertiary-container font-bold text-headline-md">99.8%</div>
                <div className="text-label-md text-on-surface/50">156ms ping</div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
