import React from 'react';
import { X, User, Train, Clock, BookOpen, Users, Compass, Check } from 'lucide-react';
import { CommuterUser } from '../types';
import { DEMO_PRESET_USERS } from '../data/sampleStudents';

interface StudentProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CommuterUser;
  onSelectPreset: (presetKey: string) => void;
  onUpdateUser: (updated: Partial<CommuterUser>) => void;
}

export const StudentProfileDrawer: React.FC<StudentProfileDrawerProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectPreset,
  onUpdateUser,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl border-l border-stone-200 flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
              {currentUser.name[0]}
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                {currentUser.name}
              </h3>
              <p className="text-xs text-stone-300">
                {currentUser.campus}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Preset Persona Switcher */}
          <div>
            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
              Switch Demo Commuter Persona
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(DEMO_PRESET_USERS).map(([key, persona]) => {
                const isSelected = currentUser.name === persona.name;
                return (
                  <button
                    key={key}
                    onClick={() => onSelectPreset(key)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50'
                    }`}
                  >
                    <div className="font-bold text-xs truncate">{persona.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-stone-500 truncate">{persona.minutesFree}m gap</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Commuter Schedule Context */}
          <div className="space-y-4 pt-2 border-t border-stone-100">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Transit & Class Schedule Context
            </h4>

            <div>
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1">
                <Train className="w-3.5 h-3.5 text-stone-400" />
                Commute Route
              </label>
              <input
                type="text"
                value={`${currentUser.commuteFrom} (${currentUser.transitLine})`}
                readOnly
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Next Class Time
                </label>
                <input
                  type="text"
                  value={currentUser.nextClassTime}
                  onChange={(e) => onUpdateUser({ nextClassTime: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white text-stone-900 font-medium focus:outline-amber-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                  Next Class
                </label>
                <input
                  type="text"
                  value={currentUser.nextClassName}
                  onChange={(e) => onUpdateUser({ nextClassName: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white text-stone-900 font-medium focus:outline-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-stone-400" />
                Preferred Group Size
              </label>
              <select
                value={currentUser.preferredGroupSize}
                onChange={(e) => onUpdateUser({ preferredGroupSize: e.target.value })}
                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 bg-white text-stone-900 font-medium focus:outline-amber-600"
              >
                <option value="1-2 people">1–2 people (Quiet & 1-on-1)</option>
                <option value="2-3 people">2–3 people (Small & Welcoming)</option>
                <option value="3-4 people">3–4 people (Interactive Crew)</option>
              </select>
            </div>
          </div>

          {/* CUNY Commuter Design Philosophy */}
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 text-xs text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>Built for CUNY Commuters</span>
            </div>
            <p className="text-stone-700 text-[11px] leading-relaxed">
              Knot never requires hours of endless messaging. It matches students who are physically on campus right now with the same availability gap.
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200">
          <button
            onClick={onClose}
            className="w-full py-2.5 text-xs font-bold rounded-xl bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Schedule & Return</span>
          </button>
        </div>
      </div>
    </div>
  );
};
