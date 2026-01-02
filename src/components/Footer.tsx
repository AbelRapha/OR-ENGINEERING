import { Truck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Truck className="h-6 w-6 text-accent" />
              <span className="font-display font-bold text-xl tracking-tighter uppercase">OR Engineering</span>
            </div>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-8">
              Operational Research tool for logistics optimization. Built for transport engineers and network planners.
            </p>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/20">
              © 2024 OR Engineering Systems. All rights reserved.
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Contact</h4>
            <ul className="text-sm space-y-2 text-white/60">
              <li>support@orengineering.com</li>
              <li>+55 11 9999-9999</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Technical Data</h4>
            <div className="p-4 border border-white/10 bg-white/5 text-[10px] font-mono leading-relaxed text-white/40">
              API STATUS: ONLINE <br />
              OSRM VERSION: 5.27.0 <br />
              MAPS: OPENSTREETMAP
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};