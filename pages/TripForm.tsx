import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronLeft, MapPin, Calendar, Wallet, Compass } from 'lucide-react';
import { TripDetails } from '../types';

export const TripForm: React.FC<{ onSubmit: (d: TripDetails) => void }> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<TripDetails>({
    origin: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: 'Modest',
    groupTravel: false,
    travelPace: 'relaxed'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    navigate('/results');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <button onClick={() => navigate('/impact-question')} className="flex items-center font-sans font-bold text-gray-400 hover:text-eco-green transition-colors mb-12">
        <ChevronLeft className="w-5 h-5 mr-1" /> Impact Choices
      </button>

      <div className="organic-card p-10 md:p-16">
        <div className="flex items-center space-x-4 mb-12">
          <div className="p-4 bg-eco-green rounded-full text-white shadow-lg shadow-eco-green/20">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900">Where next?</h2>
            <p className="font-sans text-gray-500">Tell us about your upcoming sprout journey.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <MapPin size={16} className="text-eco-green" /> Home Town
              </label>
              <input 
                required 
                type="text" 
                placeholder="Where are you starting?" 
                value={form.origin} 
                onChange={e => setForm({ ...form, origin: e.target.value })}
                className="w-full bg-eco-beige border-none rounded-soft p-5 font-sans font-semibold focus:ring-2 focus:ring-eco-green transition-all" 
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <MapPin size={16} className="text-eco-green" /> Dream Spot
              </label>
              <input 
                required 
                type="text" 
                placeholder="Where should we go?" 
                value={form.destination} 
                onChange={e => setForm({ ...form, destination: e.target.value })}
                className="w-full bg-eco-beige border-none rounded-soft p-5 font-sans font-semibold focus:ring-2 focus:ring-eco-green transition-all" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <Calendar size={16} className="text-eco-green" /> Departure
              </label>
              <input 
                required 
                type="date" 
                value={form.startDate} 
                onChange={e => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-eco-beige border-none rounded-soft p-5 font-sans font-semibold focus:ring-2 focus:ring-eco-green transition-all" 
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <Calendar size={16} className="text-eco-green" /> Returning
              </label>
              <input 
                required 
                type="date" 
                value={form.endDate} 
                onChange={e => setForm({ ...form, endDate: e.target.value })}
                className="w-full bg-eco-beige border-none rounded-soft p-5 font-sans font-semibold focus:ring-2 focus:ring-eco-green transition-all" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest">
                <Wallet size={16} className="text-eco-green" /> Budget Style
              </label>
              <div className="flex gap-4">
                {['Modest', 'Eco-Luxury'].map(tier => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setForm({...form, budget: tier})}
                    className={`flex-1 py-4 rounded-soft font-display font-bold text-sm tracking-widest uppercase transition-all ${form.budget === tier ? 'bg-eco-green text-white shadow-lg' : 'bg-eco-beige text-gray-400 hover:text-eco-green'}`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-6 bg-eco-beige rounded-soft">
               <div>
                 <span className="font-display font-bold text-gray-800 block">Party Mode</span>
                 <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Travel with others</span>
               </div>
               <button
                type="button"
                onClick={() => setForm({...form, groupTravel: !form.groupTravel})}
                className={`w-14 h-8 rounded-full transition-all relative ${form.groupTravel ? 'bg-eco-green' : 'bg-gray-300'}`}
               >
                 <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${form.groupTravel ? 'right-1' : 'left-1'}`}></div>
               </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-eco-green text-white py-8 rounded-soft font-display font-bold text-xl shadow-2xl shadow-eco-green/30 btn-grow flex items-center justify-center gap-4">
            Create My Sprout Plan <Sparkles size={24} />
          </button>
        </form>
      </div>
    </div>
  );
};