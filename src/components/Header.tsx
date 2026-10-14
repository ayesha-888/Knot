import React from 'react';
import { Clock, Users, Calendar, BarChart3, Sparkles } from 'lucide-react';
import { CommuterUser } from '../types';

interface HeaderProps {
  activeTab: 'window' | 'events' | 'clubs';
  setActiveTab: (tab: 'window' | 'events' | 'clubs') => void;
  currentUser: CommuterUser;
  onOpenProfile: () => void;
  onStartDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenProfile,
  onStartDemo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('window')}
              className="text-left group flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                K
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
                  Knot
                </span>
                <span className="hidden sm:inline-block text-xs text-stone-400 font-normal ml-2">
                  CUNY Commuter Connection
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={() => setActiveTab('window')}
              className={`whitespace-nowrap transition-colors py-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'window'
                  ? 'text-amber-800 border-amber-600 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              Campus Window
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`whitespace-nowrap transition-colors py-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'events'
                  ? 'text-amber-800 border-amber-600 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Campus Events (UKNIGHTED)
            </button>

            <button
              onClick={() => setActiveTab('clubs')}
              className={`whitespace-nowrap transition-colors py-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'clubs'
                  ? 'text-amber-800 border-amber-600 font-semibold'
                  : 'border-transparent hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Club Impact
            </button>

            <button
              onClick={onOpenProfile}
              className="whitespace-nowrap text-stone-600 hover:text-stone-900 transition-colors py-1 border-b-2 border-transparent flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              Profile: {currentUser.name.split(' ')[0]} ({currentUser.minutesFree}m)
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onStartDemo}
              className="px-4 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 active:scale-95 rounded-lg transition-all shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0"
              title="Run 90-second student commuter demo"
            >
              <Sparkles className="w-3.5 h-3.5" />
              90s Demo Tour
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
