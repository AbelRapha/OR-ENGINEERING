import { Truck } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Truck className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-xl tracking-tighter uppercase">OR Engineering</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest">
          <a href="#methodology" className="hover:text-primary transition-colors">Metodologia</a>
          <Link to="/documentation" className="hover:text-primary transition-colors">Documentação</Link>
          <a href="#engine" className="bg-primary text-white px-6 py-2 hover:bg-black transition-colors">Motor OR</a>
        </div>
      </div>
    </nav>
  );
};