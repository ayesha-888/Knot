import React from 'react';
import { Coffee, BookOpen, Footprints, Users, Clock, ArrowRight } from 'lucide-react';
import { CampusEvent, CommuterUser } from '../types';

interface LowPressureQuickPicksProps {
  quickEvents: CampusEvent[];
  user: CommuterUser;
  onSelectEvent: (event: CampusEvent) => void;
}

export const LowPressureQuickPicks: React.FC<LowPressureQuickPicksProps> = ({
  quickEvents,
  user,
  onSelectEvent,
}) => {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Wellness':
        return <Footprints className="w-4 h-4 text-emerald-700" />;
      case 'Study':
        return <BookOpen className="w-4 h-4 text-sky-700" />;
      default:
        return <Coffee className="w-4 h-4 text-amber-700" />;
    }
  };

  return (
    <div className="bg-stone-100/90 rounded-2xl p-6 border border-stone-200/90 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
            <Coffee className="w-3.5 h-3.5 text-amber-700" />
            <span>Low-Pressure Commuter Hangouts (15–30 Mins)</span>
          </div>
          <h3 className="text-lg font-bold text-stone-900 tracking-tight">
            Only have a few minutes or feeling low-key?
          </h3>
        </div>
        <p className="text-xs text-stone-500 max-w-sm">
          No mandatory group games or loud rooms. Just quiet focus buddies, coffee runs, or fresh-air walks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {quickEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs hover:border-amber-400 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-stone-100">
                    {getIcon(event.category)}
                  </div>
                  <span className="text-xs font-bold text-stone-800">
                    {event.durationMinutes} min activity
                  </span>
                </div>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Fits {user.minutesFree}m
                </span>
              </div>

              <h4 className="font-bold text-sm text-stone-900 leading-snug">
                {event.title}
              </h4>
              <p className="text-xs text-stone-500 line-clamp-2">
                {event.description}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-100 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-400" />
                  {event.startTime}
                </span>
                <span className="flex items-center gap-1 font-medium text-stone-700">
                  <Users className="w-3 h-3 text-stone-400" />
                  {event.interestedStudents.map((s) => s.name.split(' ')[0]).join(' & ')}
                </span>
              </div>

              <button
                onClick={() => onSelectEvent(event)}
                className="w-full py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center justify-center gap-1"
              >
                <span>Join Low-Key Hangout</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
