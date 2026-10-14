export interface MetricItem {
  label: string;
  value: string;
  change: string;
  context: string;
}

export interface ClubBreakdown {
  clubName: string;
  category: string;
  windowMatchRate: string;
  goTogetherJoins: number;
  totalViews: number;
  averageGroupSize: string;
}

export const SAMPLE_IMPACT_METRICS: MetricItem[] = [
  {
    label: 'Campus Window Matches',
    value: '1,420',
    change: '+38% vs prev month',
    context: 'Commuters searching for activities fitting a 15–45 min gap',
  },
  {
    label: 'Go-Together Groups Formed',
    value: '384',
    change: '+52% adoption',
    context: 'Pairs & small groups of 2–4 students attending events together',
  },
  {
    label: 'Social Confidence Rating',
    value: '89%',
    change: 'Student feedback survey',
    context: 'Reported feeling significantly less anxious attending with a peer',
  },
  {
    label: 'Midday Attendance Density',
    value: '+42%',
    change: 'Sample telemetry',
    context: 'Turnout boost during 12:00 PM – 1:30 PM commuter lunch blocks',
  },
];

export const SAMPLE_CLUB_ENGAGEMENT: ClubBreakdown[] = [
  {
    clubName: 'QC Tabletop & Strategy Club',
    category: 'Gaming',
    windowMatchRate: '94%',
    goTogetherJoins: 112,
    totalViews: 420,
    averageGroupSize: '3.1 students',
  },
  {
    clubName: 'Animation & Manga Guild',
    category: 'Arts & Culture',
    windowMatchRate: '88%',
    goTogetherJoins: 94,
    totalViews: 380,
    averageGroupSize: '2.8 students',
  },
  {
    clubName: 'CUNY Tech Guild & ACM',
    category: 'STEM & Career',
    windowMatchRate: '91%',
    goTogetherJoins: 86,
    totalViews: 340,
    averageGroupSize: '2.6 students',
  },
  {
    clubName: 'Commuter Wellness Coalition',
    category: 'Wellness',
    windowMatchRate: '96%',
    goTogetherJoins: 64,
    totalViews: 260,
    averageGroupSize: '2.4 students',
  },
  {
    clubName: 'Commuter Academic Peer Network',
    category: 'Academic',
    windowMatchRate: '92%',
    goTogetherJoins: 48,
    totalViews: 210,
    averageGroupSize: '2.0 students',
  },
];

export const COMMUTER_BARRIERS_INSIGHT = [
  {
    barrier: "Didn't want to show up to an event alone",
    percentage: 68,
    solution: 'Knot pre-matches small welcoming groups of 2–4 with common interests.',
  },
  {
    barrier: 'Event duration exceeded class gap time',
    percentage: 54,
    solution: 'Campus Window filter guarantees students never get caught late for class.',
  },
  {
    barrier: 'Felt social fatigue after transit commute',
    percentage: 43,
    solution: 'Low-Pressure Social Mode recommends gentle coffee or quiet study options.',
  },
];
