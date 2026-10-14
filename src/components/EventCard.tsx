import React from 'react';
import { Clock, MapPin, Users, ExternalLink, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { CampusEvent, StudentProfile } from '../types';

interface EventCardProps {
  event: CampusEvent;
  fitsWindow: boolean;
  userMinutesFree: number;
  explanation: string;
  sharedInterests: string[];
  onOpenGoTogether: (event: CampusEvent) => void;
  onExplainAI?: (event: CampusEvent) => void;
  isAiExplaining?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  fitsWindow,
  userMinutesFree,
  explanation,
  sharedInterests,
  onOpenGoTogether,
}) => {
  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
        fitsWindow
          ? 'border-stone-200 hover:border-amber-400/80 hover:shadow-md'
          : 'border-stone-200/60 opacity-70 bg-stone-50/50'
      }`}
    >
      <div className="p-5 md:p-6 space-y-4">
        {/* Top Metadata Line (Zero-Pill Discipline: clean unboxed text with · separators) */}
        <div className="flex items-center justify-between text-xs text-stone-500 flex-wrap gap-y-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-stone-800">{event.organization}</span>
            <span aria-hidden="true">·</span>
            <span>{event.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-800 font-medium">UKNIGHTED Catalog</span>
          </div>

          {/* Time Fit Indicator */}
          <div className="flex items-center gap-1 text-xs">
            {fitsWindow ? (
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Fits your {userMinutesFree}m window
              </span>
            ) : (
              <span className="text-stone-500 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Needs {event.durationMinutes}m ({userMinutesFree}m free)
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-stone-900 tracking-tight leading-snug">
            {event.title}
          </h3>
          <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Logistics Line */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 pt-1 border-t border-stone-100">
          <div className="flex items-center gap-1.5 font-medium text-stone-800">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{event.startTime} – {event.endTime}</span>
            <span className="text-stone-400 font-normal">({event.durationMinutes} min)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Personalized "WHY THIS FITS YOU" Callout */}
        <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
          fitsWindow 
            ? 'bg-amber-50/60 border-amber-200/80 text-amber-950' 
            : 'bg-stone-100/70 border-stone-200 text-stone-600'
        }`}>
          <div className="font-semibold flex items-center gap-1.5 text-amber-900 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Why this fits your schedule & interests:</span>
          </div>
          <p className="text-stone-700 font-normal">
            {explanation}
          </p>
        </div>

        {/* Interested Commuter Peers (Go-Together preview) */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-medium text-stone-700 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-stone-500" />
              Peers interested in going:
            </span>
            <span className="text-stone-400 text-[11px]">
              {event.groupSpotsTaken} of {event.groupSpotsTotal} spots in group
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {event.interestedStudents.map((student: StudentProfile) => (
              <div
                key={student.id}
                className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-stone-200 text-xs shadow-2xs"
              >
                <div className={`w-5 h-5 rounded-full ${student.avatarBg} flex items-center justify-center font-bold text-[10px]`}>
                  {student.name[0]}
                </div>
                <span className="font-medium text-stone-800">{student.name.split(' ')[0]}</span>
                <span className="text-[10px] text-stone-400">· {student.major.split(' ')[0]}</span>
              </div>
            ))}

            {sharedInterests.length > 0 && (
              <span className="text-[11px] text-stone-500 italic ml-1">
                Share: {sharedInterests.join(', ')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-5 py-4 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between gap-3">
        {/* UKNIGHTED Link (clearly marked placeholder URL as requested) */}
        <a
          href={event.uknightedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors font-medium whitespace-nowrap"
          title="Opens sample UKNIGHTED campus engagement page (prototype placeholder)"
        >
          <span>View on UKNIGHTED</span>
          <ExternalLink className="w-3 h-3 text-stone-400" />
        </a>

        {/* Primary Action Button: Find people to go with */}
        <button
          onClick={() => onOpenGoTogether(event)}
          className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 active:scale-95 transition-all flex items-center gap-1.5 shadow-xs whitespace-nowrap"
        >
          <span>Find people to go with</span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
        </button>
      </div>
    </div>
  );
};
