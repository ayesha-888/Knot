/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { CampusWindowWidget } from './components/CampusWindowWidget';
import { EventCard } from './components/EventCard';
import { GoTogetherModal } from './components/GoTogetherModal';
import { LowPressureQuickPicks } from './components/LowPressureQuickPicks';
import { ClubImpactDashboard } from './components/ClubImpactDashboard';
import { DemoWalkthroughModal } from './components/DemoWalkthroughModal';
import { StudentProfileDrawer } from './components/StudentProfileDrawer';
import { SAMPLE_CAMPUS_EVENTS } from './data/sampleEvents';
import { DEMO_PRESET_USERS } from './data/sampleStudents';
import { CommuterUser, CampusEvent } from './types';
import { getRecommendedEvents } from './utils/matching';
import { Clock, Calendar, Sparkles, Filter, ExternalLink, AlertCircle, Compass, Users } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<CommuterUser>(DEMO_PRESET_USERS.maya);
  const [activeTab, setActiveTab] = useState<'window' | 'events' | 'clubs'>('window');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedEventForGroup, setSelectedEventForGroup] = useState<CampusEvent | null>(null);
  const [isGoTogetherOpen, setIsGoTogetherOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Compute matched events based on current user window, vibe, and interests
  const { fitting, lowPressure, nonFitting } = getRecommendedEvents(SAMPLE_CAMPUS_EVENTS, currentUser);

  const handleUpdateUser = (updated: Partial<CommuterUser>) => {
    setCurrentUser((prev) => ({ ...prev, ...updated }));
  };

  const handleSelectPreset = (key: string) => {
    if (DEMO_PRESET_USERS[key]) {
      setCurrentUser(DEMO_PRESET_USERS[key]);
    }
  };

  const handleOpenGoTogether = (event: CampusEvent) => {
    setSelectedEventForGroup(event);
    setIsGoTogetherOpen(true);
  };

  // Sync demo walkthrough steps with state
  const handleApplyDemoStep = (stepNumber: number) => {
    if (stepNumber === 1) {
      setCurrentUser(DEMO_PRESET_USERS.maya);
      setActiveTab('window');
    } else if (stepNumber === 2) {
      setActiveTab('window');
      setCurrentUser((prev) => ({ ...prev, minutesFree: 40 }));
    } else if (stepNumber === 3) {
      const tabletop = SAMPLE_CAMPUS_EVENTS.find((e) => e.id === 'evt-tabletop-lounge');
      if (tabletop) {
        setSelectedEventForGroup(tabletop);
      }
    } else if (stepNumber === 4 || stepNumber === 5) {
      const tabletop = SAMPLE_CAMPUS_EVENTS.find((e) => e.id === 'evt-tabletop-lounge');
      if (tabletop) {
        setSelectedEventForGroup(tabletop);
        setIsGoTogetherOpen(true);
      }
    }
  };

  // Filter full catalog by category
  const filteredCatalog = SAMPLE_CAMPUS_EVENTS.filter((e) => {
    if (selectedCategory === 'All') return true;
    return e.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenProfile={() => setIsProfileOpen(true)}
        onStartDemo={() => setIsDemoOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TAB 1: CAMPUS WINDOW (Signature Feature) */}
        {activeTab === 'window' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Campus Window Centerpiece */}
            <CampusWindowWidget
              user={currentUser}
              onUpdateUser={handleUpdateUser}
              matchingCount={fitting.length + lowPressure.length}
            />

            {/* Recommended Activities Grid (Matches available time) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    Recommended for Your {currentUser.minutesFree}-Minute Gap
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    UKNIGHTED-sourced campus events that end before your {currentUser.nextClassTime} class begins.
                  </p>
                </div>
                <div className="text-xs text-stone-500 font-medium">
                  Showing {fitting.length} safe schedule matches
                </div>
              </div>

              {fitting.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fitting.map(({ event, fitsWindow, explanation, sharedInterests }) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      fitsWindow={fitsWindow}
                      userMinutesFree={currentUser.minutesFree}
                      explanation={explanation}
                      sharedInterests={sharedInterests}
                      onOpenGoTogether={handleOpenGoTogether}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center space-y-3">
                  <Clock className="w-8 h-8 text-stone-400 mx-auto" />
                  <h3 className="font-bold text-base text-stone-800">
                    No club events under {currentUser.minutesFree} minutes right now
                  </h3>
                  <p className="text-xs text-stone-500 max-w-md mx-auto">
                    Try expanding your Campus Window slider above, or check out our low-pressure 15-minute quick picks below!
                  </p>
                </div>
              )}
            </div>

            {/* Low-Pressure Alternatives (15–30 Minute Windows) */}
            <LowPressureQuickPicks
              quickEvents={SAMPLE_CAMPUS_EVENTS.filter((e) => e.isLowPressureAlternative)}
              user={currentUser}
              onSelectEvent={handleOpenGoTogether}
            />

            {/* Non-Fitting Events Section (Clearly distinguished!) */}
            {nonFitting.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-stone-700 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-stone-400" />
                      Saved Campus Events (Exceeds Your {currentUser.minutesFree}m Window)
                    </h3>
                    <p className="text-[11px] text-stone-400">
                      These events conflict with your {currentUser.nextClassTime} class ({currentUser.nextClassName}). Shown for future reference.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nonFitting.map(({ event, fitsWindow, explanation, sharedInterests }) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      fitsWindow={fitsWindow}
                      userMinutesFree={currentUser.minutesFree}
                      explanation={explanation}
                      sharedInterests={sharedInterests}
                      onOpenGoTogether={handleOpenGoTogether}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CAMPUS EVENTS (UKNIGHTED PREVIEW CATALOG) */}
        {activeTab === 'events' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* UKNIGHTED Integration Banner */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>Campus Event Discovery · UKNIGHTED System Preview</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-stone-900 mt-1">
                    Queens College Campus Engagement Feed
                  </h2>
                  <p className="text-xs text-stone-600 mt-1 max-w-3xl leading-relaxed">
                    UKNIGHTED (Presence) is Queens College's official student organization and campus event platform.
                    Knot layers on top of UKNIGHTED to turn discovery into actual social groups, so commuter students
                    never have to walk into an event alone.
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 text-amber-950 p-3 rounded-xl text-xs max-w-xs shrink-0">
                  <div className="font-bold flex items-center gap-1 mb-0.5 text-amber-900">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Integration Architecture</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Sample UKNIGHTED event catalog. Event discovery is decoupled from friendship matching so official API feeds can be plugged in directly.
                  </p>
                </div>
              </div>

              {/* Category Filter Tabs (Zero-Pill Discipline: clean segmented functional control) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-stone-100 pb-1">
                <span className="text-xs font-semibold text-stone-500 mr-2 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Filter:
                </span>
                {['All', 'Gaming', 'Arts', 'Tech', 'Wellness', 'Study', 'Social', 'Career'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === cat
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCatalog.map((event) => {
                const fitsWindow = event.durationMinutes <= currentUser.minutesFree;
                const sharedInterests = event.tags.filter((t) => currentUser.selectedInterests.includes(t));
                const explanation = fitsWindow
                  ? `Comfortably finishes before your ${currentUser.nextClassTime} lecture. Great for commuters looking for a ${event.durationMinutes}-min campus stop.`
                  : `Duration of ${event.durationMinutes} min conflicts with your ${currentUser.nextClassTime} class.`;

                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    fitsWindow={fitsWindow}
                    userMinutesFree={currentUser.minutesFree}
                    explanation={explanation}
                    sharedInterests={sharedInterests}
                    onOpenGoTogether={handleOpenGoTogether}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: COMMUNITY IMPACT DASHBOARD (Club Facing) */}
        {activeTab === 'clubs' && <ClubImpactDashboard />}
      </main>

      {/* Modals & Drawers */}
      <GoTogetherModal
        event={selectedEventForGroup}
        isOpen={isGoTogetherOpen}
        onClose={() => setIsGoTogetherOpen(false)}
        currentUser={currentUser}
      />

      <StudentProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onSelectPreset={handleSelectPreset}
        onUpdateUser={handleUpdateUser}
      />

      <DemoWalkthroughModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onApplyDemoStep={handleApplyDemoStep}
        currentUser={currentUser}
      />

      {/* Prototype Footer with Disclaimer */}
      <footer className="mt-12 bg-white border-t border-stone-200 py-8 px-4 sm:px-6 lg:px-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800">Knot (Prototype)</span>
            <span aria-hidden="true">·</span>
            <span>Campus Friendship & Event Matching for CUNY Commuter Students</span>
          </div>

          <div className="text-center md:text-right text-[11px] text-stone-400 max-w-xl">
            Sample data prototype. UKNIGHTED links and student profiles are simulated for demonstration.
            Designed to bridge campus engagement platforms with commuter schedule availability.
          </div>
        </div>
      </footer>
    </div>
  );
}
