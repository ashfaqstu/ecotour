import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, ArrowRight, Loader2, Sprout } from 'lucide-react';
import { User } from '../types';

export const LoginPage: React.FC<{ onLogin: (u: User) => void }> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call and authentication delay
    setTimeout(() => {
      onLogin({
        name: email.split('@')[0] || 'Eco Explorer',
        email,
        avatar: `https://i.pravatar.cc/150?u=${email}`
      });
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-6">
      <div className="organic-card p-10 md:p-16 max-w-lg w-full relative overflow-hidden bg-white/90 dark:bg-eco-dark-surface/90 backdrop-blur-md">
        {/* Decor */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-eco-green/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 text-center mb-10">
          <div className="inline-flex p-4 bg-eco-green rounded-full text-white shadow-lg shadow-eco-green/20 mb-6 animate-pulse">
            <Leaf size={32} />
          </div>
          <h2 className="text-3xl font-display font-extrabold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-sans">Continue your journey to a greener world.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-eco-beige dark:bg-eco-dark/50 dark:text-white border-none rounded-soft py-4 pl-12 pr-4 font-sans font-semibold focus:ring-2 focus:ring-eco-green transition-all placeholder-gray-300 dark:placeholder-gray-600 outline-none"
                placeholder="sprout@eco.tour"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-eco-beige dark:bg-eco-dark/50 dark:text-white border-none rounded-soft py-4 pl-12 pr-4 font-sans font-semibold focus:ring-2 focus:ring-eco-green transition-all placeholder-gray-300 dark:placeholder-gray-600 outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-eco-green text-white py-4 rounded-soft font-display font-bold text-lg shadow-2xl shadow-eco-green/30 btn-grow flex items-center justify-center gap-2 mt-8 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <>Log In <ArrowRight size={20} /></>}
          </button>

          <div className="text-center pt-4 flex flex-col gap-2">
             <a href="#" className="text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-eco-green dark:hover:text-eco-green transition-colors">Forgot your password?</a>
             <div className="text-xs text-gray-400 dark:text-gray-600 flex items-center justify-center gap-1">
                New to EcoQuest? <span className="font-bold text-eco-green cursor-pointer hover:underline">Plant a seed (Sign Up)</span>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};