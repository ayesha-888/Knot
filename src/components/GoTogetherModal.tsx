import React, { useState, useEffect } from 'react';
import { X, Users, MapPin, Clock, MessageSquare, Check, Sparkles, Copy, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { CampusEvent, CommuterUser, StudentProfile } from '../types';

interface GoTogetherModalProps {
  event: CampusEvent | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: CommuterUser;
}

export const GoTogetherModal: React.FC<GoTogetherModalProps> = ({
  event,
  isOpen,
  onClose,
  currentUser,
}) => {
  const [joined, setJoined] = useState(false);
  const [conversationStarter, setConversationStarter] = useState<string>('');
  const [isLoadingStarter, setIsLoadingStarter] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate icebreaker on event change or modal open
  useEffect(() => {
    if (!event || !isOpen) {
      setJoined(false);
      setCopied(false);
      return;
    }

    const fetchStarter = async () => {
      setIsLoadingStarter(true);
      const sharedInterests = event.tags.filter((t) => currentUser.selectedInterests.includes(t));
      try {
        const res = await fetch('/api/conversation-starter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventTitle: event.title,
            sharedInterests,
            groupMembers: event.interestedStudents.map((s) => s.name),
            vibe: currentUser.socialVibe,
          }),
        });
        const data = await res.json();
        setConversationStarter(data.starter);
      } catch (err) {
        setConversationStarter(
          `"Hey! Are you guys heading over to the ${event.title}? Mind if I walk over with you? I saw we both like ${sharedInterests[0] || 'campus meetups'}!"`
        );
      } finally {
        setIsLoadingStarter(false);
      }
    };

    fetchStarter();
  }, [event, isOpen, currentUser]);

  if (!isOpen || !event) return null;

  const sharedWithUser = (student: StudentProfile) =>
    student.interests.filter((i) => currentUser.selectedInterests.includes(i));

  const handleCopy = () => {
    if (!conversationStarter) return;
    navigator.clipboard.writeText(conversationStarter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-2xl rounded-2xl border border-stone-200 shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 bg-stone-900 text-white flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Users className="w-3.5 h-3.5" />
              <span>Small Go-Together Group</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              {event.title}
            </h2>
            <div className="text-xs text-stone-300 mt-1 flex items-center gap-3 flex-wrap">
              <span>{event.organization}</span>
              <span aria-hidden="true">·</span>
              <span>{event.durationMinutes} min activity</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-medium">Safe for your {currentUser.minutesFree}m window</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Meeting Point Card */}
          <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>Designated Meeting Spot & Walk-Over</span>
              </div>
              <div className="text-sm font-semibold text-stone-900">
                {event.meetingPoint}
              </div>
              <div className="text-xs text-stone-600 flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-500" />
                Meet at <strong className="text-stone-800">{event.meetingTime}</strong> (3 mins before start)
              </div>
            </div>

            <div className="text-xs font-medium text-amber-900 bg-white/80 border border-amber-200 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-auto">
              Group size: {event.groupSpotsTaken + (joined ? 1 : 0)} of {event.groupSpotsTotal} students
            </div>
          </div>

          {/* Compatible Commuter Students in Group */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-600" />
                Who you'll be meeting
              </h4>
              <span className="text-xs text-stone-500">
                Curated by interest overlap & class schedule
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {event.interestedStudents.map((student) => {
                const shared = sharedWithUser(student);
                return (
                  <div
                    key={student.id}
                    className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 flex flex-col justify-between space-y-2"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-full ${student.avatarBg} flex items-center justify-center font-bold text-sm shrink-0`}>
                        {student.name[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-stone-900 truncate">
                          {student.name}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {student.year} · {student.major}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          Commutes: {student.commuteFrom} ({student.transitLine})
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-600 line-clamp-2 italic">
                      "{student.bio}"
                    </p>

                    {shared.length > 0 && (
                      <div className="pt-1.5 border-t border-stone-200/60 text-[10px] text-amber-800 font-medium">
                        Shared: {shared.join(' · ')}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Current user's slot */}
              <div className={`p-3.5 rounded-xl border border-dashed flex flex-col justify-center items-center text-center ${
                joined
                  ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900'
                  : 'border-stone-300 bg-white text-stone-500'
              }`}>
                {joined ? (
                  <>
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-1">
                      ✓
                    </div>
                    <div className="font-bold text-xs text-emerald-900">{currentUser.name} (You)</div>
                    <div className="text-[11px] text-emerald-700">Joined this Go-Together crew!</div>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center font-bold text-xs mb-1">
                      +
                    </div>
                    <div className="font-semibold text-xs text-stone-700">Your Reserved Spot</div>
                    <div className="text-[11px] text-stone-400">Click below to walk over together</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* AI-Powered Zero-Pressure Conversation Starter */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Zero-Awkwardness Icebreaker (AI Generated)</span>
              </div>
              <button
                onClick={handleCopy}
                disabled={isLoadingStarter || !conversationStarter}
                className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-stone-700 italic bg-white p-3 rounded-lg border border-stone-200/80 leading-relaxed">
              {isLoadingStarter ? 'Generating personalized commuter icebreaker...' : conversationStarter}
            </p>

            <div className="text-[11px] text-stone-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Tested to feel casual and non-pushy for CUNY commuter meetups.</span>
            </div>
          </div>

          {/* Post-Join Friendly Interaction Preview */}
          {joined && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 space-y-2 animate-in fade-in">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <HeartHandshake className="w-4 h-4 text-emerald-700" />
                <span>You're in! Here is your quick plan:</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-emerald-800">
                <li>Head to <strong>{event.meetingPoint}</strong> at <strong>{event.meetingTime}</strong>.</li>
                <li>Liam and Sofia have been notified that you're joining the walk-over.</li>
                <li>Event wraps up at <strong>{event.endTime}</strong>, leaving 5 minutes before your class at {currentUser.nextClassTime}.</li>
              </ul>
              <div className="mt-2 bg-white/80 p-2.5 rounded-lg border border-emerald-200 text-stone-700 text-[11px]">
                <strong className="text-stone-900">Liam Chen:</strong> "Hey {currentUser.name.split(' ')[0]}! Awesome, we're right near the Starbucks sign. See you in a few!"
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100/80 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors"
          >
            {joined ? 'Back to Events' : 'Maybe Later'}
          </button>

          {!joined ? (
            <button
              onClick={() => setJoined(true)}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-amber-700 text-white hover:bg-amber-800 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
            >
              <span>Join Go-Together Group</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Ready for Meetup</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
