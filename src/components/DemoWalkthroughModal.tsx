import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, Clock, Users, MessageSquare, Compass, ShieldCheck } from 'lucide-react';
import { CommuterUser, CampusEvent } from '../types';
import { SAMPLE_CAMPUS_EVENTS } from '../data/sampleEvents';

interface DemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDemoStep: (step: number) => void;
  currentUser: CommuterUser;
}

export const DemoWalkthroughModal: React.FC<DemoWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onApplyDemoStep,
  currentUser,
}) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Commuter Schedule & Interests',
      kicker: 'Step 1 of 6 · The Commuter Reality',
      desc: 'Maya Lin has a 40-minute gap before her CS 211 lecture in Remsen Hall. Instead of waiting alone in the cafeteria, she sets her 40-minute Campus Window and selects her interests: Board Games, Anime & Manga, and Tech.',
      insight: 'Commuters don\'t have endless free time. They have precise gaps between subway commutes and lectures.',
    },
    {
      num: 2,
      title: 'Smart Window Fit Filtering',
      kicker: 'Step 2 of 6 · Zero-Lateness Guarantee',
      desc: 'Knot queries the sample UKNIGHTED campus catalog. It immediately filters out the 2.5-hour Smash tournament (which would make Maya late) and highlights activities running 20–35 minutes that comfortably finish before 12:50 PM.',
      insight: 'Traditional event feeds fail commuters by suggesting 3-hour events that clash with class times.',
    },
    {
      num: 3,
      title: 'Choosing a Shared Activity',
      kicker: 'Step 3 of 6 · Shared Activity First',
      desc: 'Maya selects the "Midday Tabletop & Board Game Drop-In" at the Student Union Room 302 (12:15 PM – 12:45 PM). Knot explains why it fits her 40-minute gap and interest in strategy games.',
      insight: 'Real friendships form around doing activities together, not swiping through dating-style headshots.',
    },
    {
      num: 4,
      title: 'Go-Together Peer Matching',
      kicker: 'Step 4 of 6 · Never Walk In Alone',
      desc: 'Knot introduces two compatible peers interested in the same session: Liam Chen (CS junior, LIRR commuter) and Sofia Morales (Graphic design sophomore, 7 train commuter). They also love anime and board games.',
      insight: '68% of commuters skip campus events simply because they don\'t want to show up alone.',
    },
    {
      num: 5,
      title: 'Join Small Group & AI Icebreaker',
      kicker: 'Step 5 of 6 · Low-Pressure Connection',
      desc: 'Maya joins the 3-person Go-Together crew with a designated walk-over spot at the Student Union Starbucks kiosk. Knot generates a friendly, non-awkward conversation starter.',
      insight: 'A small, welcoming group of 2–3 students creates instant psychological safety.',
    },
    {
      num: 6,
      title: 'The Knot Commuter Insight',
      kicker: 'Step 6 of 6 · Lasting Campus Friendships',
      desc: 'In under 90 seconds, Maya turned an isolated 40-minute campus dead-time into a real-life friendship meetup. Liam and Sofia now become familiar faces across campus and on the commute home.',
      insight: 'Commuters don\'t need more digital chats. They need the right people to do the right activity with in the exact time they have.',
    },
  ];

  const currentStep = steps[step - 1];

  const handleNext = () => {
    if (step < 6) {
      const nextStep = step + 1;
      setStep(nextStep);
      onApplyDemoStep(nextStep);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      onApplyDemoStep(prevStep);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-stone-900 to-amber-950 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>90-Second Guided Tour</span>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h3 className="text-xl font-bold mt-2 text-white">
            {currentStep.title}
          </h3>
          <p className="text-xs text-stone-300 mt-1">
            {currentStep.kicker}
          </p>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5 mt-4">
            {steps.map((s) => (
              <div
                key={s.num}
                className={`h-1.5 rounded-full transition-all ${
                  s.num === step
                    ? 'w-8 bg-amber-400'
                    : s.num < step
                    ? 'w-4 bg-emerald-400'
                    : 'w-4 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-stone-700 leading-relaxed font-normal">
            {currentStep.desc}
          </p>

          {/* Deep Insight Box */}
          <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-3.5 text-xs text-amber-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>The Commuter Student Insight:</span>
            </div>
            <p className="text-stone-700 leading-relaxed">
              {currentStep.insight}
            </p>
          </div>

          {/* Visual Step Highlights */}
          {step === 1 && (
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs flex items-center justify-between">
              <span className="font-medium text-stone-700">Demo User: Maya Lin (Flushing Commuter)</span>
              <span className="font-bold text-amber-800">40 Minutes Free</span>
            </div>
          )}

          {step === 2 && (
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs space-y-1">
              <div className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>3 Events Fit 40m Window (30m Tabletop, 35m Anime Sketch, 20m Walk)</span>
              </div>
              <div className="text-stone-400 text-[11px]">
                ✕ Filtered out: 150m Smash Tournament (Too long for gap)
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs flex items-center justify-between">
              <span className="font-medium text-stone-700">Matched Peers: Liam Chen & Sofia Morales</span>
              <span className="text-amber-800 font-semibold">Shared: Board Games & Anime</span>
            </div>
          )}

          {step === 5 && (
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs italic text-stone-700">
              "Hey! Are you guys heading over to the Tabletop Drop-In? Mind if I walk over with you? I saw we both like Catan and anime!"
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1 ${
              step === 1
                ? 'text-stone-300 cursor-not-allowed'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-amber-700 text-white hover:bg-amber-800 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>{step === 6 ? 'Complete Walkthrough' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
