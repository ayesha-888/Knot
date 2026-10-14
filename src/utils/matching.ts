import { CampusEvent, CommuterUser, SocialVibe } from '../types';

export interface ScoredEvent {
  event: CampusEvent;
  fitsWindow: boolean;
  interestScore: number;
  sharedInterests: string[];
  explanation: string;
  isRecommended: boolean;
}

export function evaluateEventFit(
  event: CampusEvent,
  user: CommuterUser
): ScoredEvent {
  // Check if event strictly fits inside the user's available window
  // (e.g. 30 min event fits into 40 min window!)
  const fitsWindow = event.durationMinutes <= user.minutesFree;

  // Calculate shared interests
  const sharedInterests = event.tags.filter((tag) =>
    user.selectedInterests.includes(tag)
  );

  let interestScore = sharedInterests.length * 10;
  if (user.selectedInterests.includes(event.category)) {
    interestScore += 15;
  }

  // Adjust for social vibe
  if (user.socialVibe === 'low_key') {
    if (event.isLowPressureAlternative || event.category === 'Study' || event.category === 'Wellness') {
      interestScore += 20;
    }
  } else if (user.socialVibe === 'feeling_social') {
    if (event.category === 'Gaming' || event.category === 'Social' || event.category === 'Arts') {
      interestScore += 15;
    }
  }

  // Build high-clarity deterministic explanation
  const studentCount = event.interestedStudents.length;
  const studentNames = event.interestedStudents.map((s) => s.name).join(' & ');
  const primaryTopic = sharedInterests[0] || event.category;

  let explanation = '';
  if (fitsWindow) {
    if (user.minutesFree === 40 && event.durationMinutes <= 35) {
      explanation = `You have ${user.minutesFree} minutes before ${user.nextClassName || 'your next class'}. ${studentCount} students (${studentNames}) who enjoy ${primaryTopic} are interested in the same meetup. Join their group and walk over together with plenty of time to spare.`;
    } else if (user.socialVibe === 'low_key' && event.isLowPressureAlternative) {
      explanation = `Fits your ${user.minutesFree}-min window with zero performance pressure. ${studentNames || 'A peer'} is looking for a relaxed, low-key hangout before heading back to class.`;
    } else {
      explanation = `At ${event.durationMinutes} minutes, this comfortably fits your ${user.minutesFree}-minute campus gap. Connect with ${studentNames} over ${primaryTopic} without worrying about being late.`;
    }
  } else {
    explanation = `This ${event.durationMinutes}-minute event ends after your ${user.nextClassTime} class begins. Saved for reference, but outside your current ${user.minutesFree}-minute window.`;
  }

  const isRecommended = fitsWindow && (interestScore > 0 || Boolean(event.isLowPressureAlternative));

  return {
    event,
    fitsWindow,
    interestScore,
    sharedInterests,
    explanation,
    isRecommended,
  };
}

export function getRecommendedEvents(
  events: CampusEvent[],
  user: CommuterUser
): {
  fitting: ScoredEvent[];
  lowPressure: ScoredEvent[];
  nonFitting: ScoredEvent[];
} {
  const scored = events.map((e) => evaluateEventFit(e, user));

  const fitting = scored
    .filter((s) => s.fitsWindow && !s.event.isLowPressureAlternative)
    .sort((a, b) => b.interestScore - a.interestScore);

  const lowPressure = scored
    .filter((s) => s.fitsWindow && s.event.isLowPressureAlternative)
    .sort((a, b) => b.interestScore - a.interestScore);

  const nonFitting = scored
    .filter((s) => !s.fitsWindow)
    .sort((a, b) => b.interestScore - a.interestScore);

  return { fitting, lowPressure, nonFitting };
}
