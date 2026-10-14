import React from 'react';
import { Clock, Sparkles, Smile, Coffee, Users2, Compass, AlertCircle } from 'lucide-react';
import { CommuterUser, SocialVibe } from '../types';
import { AVAILABLE_INTERESTS } from '../data/sampleEvents';

interface CampusWindowWidgetProps {
  user: CommuterUser;
  onUpdateUser: (updated: Partial<CommuterUser>) => void;
  matchingCount: number;
}

export const CampusWindowWidget: React.FC<CampusWindowWidgetProps> = ({
  user,
  onUpdateUser,
  matchingCount,
}) => {
  const windowPresets = [15, 30, 40, 60, 90];

  const handleInterestToggle = (interest: string) => {
    const exists = user.selectedInterests.includes(interest);
    let next: string[];
    if (exists) {
      next = user.selectedInterests.filter((i) => i !== interest);
      if (next.length === 0) next = [interest]; // keep at least 1
    } else {
      next = [...user.selectedInterests, interest];
    }
    onUpdateUser({ selectedInterests: next });
  };

  const vibes: { key: SocialVibe; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      key: 'feeling_social',
      label: "I'm feeling social",
      icon: <Users2 className="w-4 h-4 text-amber-700" />,
      desc: 'Clubs, lively games & group meetups',
    },
    {
      key: 'open',
      label: "I'm open to meeting people",
      icon: <Smile className="w-4 h-4 text-emerald-700" />,
      desc: 'Small groups, low-stress common ground',
    },
    {
      key: 'low_key',
      label: "I'd prefer something low-key",
      icon: <Coffee className="w-4 h-4 text-sky-700" />,
      desc: '1-on-1 coffee, quiet study buddy, quad walk',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Signature Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-1">
              <Compass className="w-4 h-4" />
              <span>Signature Feature</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              My Campus Window
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl">
              Turn awkward commute gaps into real friendships. Enter the time you have before class,
              and Knot finds welcoming peers and activities that fit your exact schedule.
            </p>
          </div>

          {/* Real commuter context badge */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/15 text-xs text-stone-200 shrink-0">
            <div className="font-semibold text-white flex items-center gap-1.5 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Commuter Gap Active
            </div>
            <div>Current: 12:10 PM</div>
            <div className="text-amber-200 font-medium">Next: {user.nextClassTime} ({user.nextClassName})</div>
          </div>
        </div>

        {/* Timeline Visualization Bar */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-stone-300 mb-2">
            <span>Free time available right now:</span>
            <span className="font-bold text-amber-300 text-base tabular-nums">
              {user.minutesFree} minutes
            </span>
          </div>
          
          <div className="relative w-full h-3 bg-stone-700/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (user.minutesFree / 90) * 100)}%` }}
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs text-stone-400 mr-1">Quick Gap:</span>
            {windowPresets.map((mins) => (
              <button
                key={mins}
                onClick={() => onUpdateUser({ minutesFree: mins })}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                  user.minutesFree === mins
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'bg-white/10 text-stone-200 hover:bg-white/20'
                }`}
              >
                {mins} mins {mins === 40 && '★ Demo'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Controls Section */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Control 1: Time Slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="time-window-slider" className="text-sm font-semibold text-stone-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Adjust available minutes before next class
            </label>
            <span className="text-xs font-medium text-stone-500">
              {matchingCount} activities match this time
            </span>
          </div>
          <input
            id="time-window-slider"
            type="range"
            min="15"
            max="90"
            step="5"
            value={user.minutesFree}
            onChange={(e) => onUpdateUser({ minutesFree: parseInt(e.target.value, 10) })}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
          />
          <div className="flex justify-between text-[11px] text-stone-400 mt-1 tabular-nums">
            <span>15 min (Quick coffee / walk)</span>
            <span>40 min (Typical class gap)</span>
            <span>90 min (Extended block)</span>
          </div>
        </div>

        {/* Control 2: Low-Pressure Social Mode */}
        <div>
          <label className="block text-sm font-semibold text-stone-800 mb-2">
            Low-Pressure Social Mode — How are you feeling today?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {vibes.map((v) => {
              const isSelected = user.socialVibe === v.key;
              return (
                <button
                  key={v.key}
                  onClick={() => onUpdateUser({ socialVibe: v.key })}
                  className={`text-left p-3.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-1 ring-amber-600/30'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium text-xs text-stone-900 mb-1">
                    {v.icon}
                    <span>{v.label}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    {v.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Control 3: Interests Selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-stone-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              What are you into?
            </label>
            <span className="text-xs text-stone-500">
              {user.selectedInterests.length} selected
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_INTERESTS.map((interest) => {
              const selected = user.selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                    selected
                      ? 'bg-stone-900 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* Safe Window Guarantee Notice */}
        <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 flex items-start gap-3 text-xs text-stone-600">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-stone-900">Zero-Lateness Guarantee: </span>
            Knot only matches you with activities that finish at or before{' '}
            <strong className="text-stone-900">{user.nextClassTime}</strong> ({user.nextClassName}). You will never have to leave an event in an awkward rush.
          </div>
        </div>
      </div>
    </div>
  );
};
