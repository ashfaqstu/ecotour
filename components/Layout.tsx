import React from 'react';
import { Leaf, Heart, Mail, Moon, Sun, Flower2, Bird, Home, Map } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const FloatingDecor: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-20 -left-10 text-eco-green/10 plant-float">
      <Leaf size={120} />
    </div>
    <div className="absolute bottom-20 -right-10 text-eco-green/10 plant-float" style={{ animationDelay: '2s' }}>
      <Flower2 size={100} />
    </div>
    <div className="absolute top-1/2 right-10 text-eco-green/5 plant-float" style={{ animationDelay: '4s' }}>
      <Bird size={60} />
    </div>
  </div>
);

const Navbar: React.FC<{ darkMode: boolean; setDarkMode: (val: boolean) => void }> = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="h-20 mx-6 mt-4 px-8 flex items-center justify-between rounded-organic bg-white/70 backdrop-blur-md border border-white/20 shadow-sm relative z-50 transition-colors">
      <Link to="/" className="flex items-center space-x-2">
        <div className="bg-eco-green p-2 rounded-full shadow-lg shadow-eco-green/20">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-eco-green">EcoQuest</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-10">
        <Link to="/" className="font-sans font-semibold text-sm text-gray-600 hover:text-eco-green transition-colors flex items-center gap-1">
          <Home size={16} /> Home
        </Link>
        <Link to="/trip-form" className="font-sans font-semibold text-sm text-gray-600 hover:text-eco-green transition-colors flex items-center gap-1">
          <Map size={16} /> Plan
        </Link>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-eco-green-light transition-colors text-gray-500 hover:text-eco-green"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="bg-eco-green text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg shadow-eco-green/20 btn-grow">
          Log In
        </button>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-12 px-10 border-t border-eco-green/10 bg-eco-beige relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Leaf className="w-5 h-5 text-eco-green" />
            <span className="font-display font-bold text-lg text-eco-green">EcoQuest</span>
          </div>
          <p className="font-sans text-sm text-gray-500">Helping you bloom where you travel.</p>
        </div>
        <div className="flex space-x-8">
          <a href="#" className="text-gray-400 hover:text-eco-green transition-colors"><Mail size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-eco-green transition-colors"><Heart size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-eco-green transition-colors font-bold text-sm uppercase tracking-widest">Privacy</a>
        </div>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          &copy; 2024 Sprout Travel Co.
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children, darkMode, setDarkMode }) => {
  return (
    <div className="app-canvas min-h-screen flex flex-col relative">
      <FloatingDecor />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};