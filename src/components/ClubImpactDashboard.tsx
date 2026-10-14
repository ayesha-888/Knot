import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, AlertCircle, Sparkles, Building2 } from 'lucide-react';
import { SAMPLE_IMPACT_METRICS, SAMPLE_CLUB_ENGAGEMENT, COMMUTER_BARRIERS_INSIGHT } from '../data/impactStats';

export const ClubImpactDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Overview Banner */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 md:p-8 border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Campus Partner View · Student Life & Club Organizations</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Community Impact & Commuter Engagement Dashboard
            </h2>
            <p className="text-stone-300 text-sm mt-1 max-w-3xl leading-relaxed">
              CUNY is over 80% commuter students. Traditional club flyering and evening events often miss
              students who rush between transit and class. Knot provides clubs with actionable data on
              midday student demand and eliminates the anxiety of attending alone.
            </p>
          </div>

          {/* Sample Data Disclaimer Box */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-xs text-stone-300 max-w-xs shrink-0">
            <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Sample Prototype Data</span>
            </div>
            <p className="text-[11px] text-stone-300 leading-snug">
              Demonstrative metrics for student government and club leaders. Demonstrates how Knot tracks commuter time windows and group formation.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SAMPLE_IMPACT_METRICS.map((metric) => (
          <div
            key={metric.label}
            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs space-y-2"
          >
            <div className="text-xs font-medium text-stone-500">
              {metric.label}
            </div>
            <div className="text-3xl font-bold text-stone-900 tracking-tight tabular-nums">
              {metric.value}
            </div>
            <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{metric.change}</span>
            </div>
            <p className="text-[11px] text-stone-400 pt-1 border-t border-stone-100 leading-normal">
              {metric.context}
            </p>
          </div>
        ))}
      </div>

      {/* Two Column Section: Why Commuters Skip Events + Peak Windows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Why Commuters Don't Attend Today */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              Commuter Participation Barriers (Survey Data)
            </h3>
            <span className="text-xs text-stone-400">Sample N=450</span>
          </div>
          <p className="text-xs text-stone-500">
            Why commuter students report skipping on-campus club activities:
          </p>

          <div className="space-y-4 pt-1">
            {COMMUTER_BARRIERS_INSIGHT.map((item) => (
              <div key={item.barrier} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-800">
                  <span>{item.barrier}</span>
                  <span className="text-amber-800 tabular-nums">{item.percentage}%</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-500 italic">
                  <strong>Knot Solution:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Commuter Window Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Commuter Time Gap Heatmap
            </h3>
            <span className="text-xs text-stone-400">Midday Concentration</span>
          </div>
          <p className="text-xs text-stone-500">
            When commuter students have free campus time between CUNY class schedules:
          </p>

          <div className="space-y-3 pt-2">
            {[
              { block: '12:00 PM – 1:30 PM (Midday Common Hour)', pct: 84, note: 'Highest demand for 30–45 min drop-ins' },
              { block: '10:30 AM – 11:45 AM (Morning Gap)', pct: 58, note: 'Prefers quick coffee or study focus' },
              { block: '1:45 PM – 3:00 PM (Afternoon Block)', pct: 64, note: 'Ideal for workshops & board games' },
              { block: '3:30 PM – 5:00 PM (Pre-Rush Hour)', pct: 32, note: 'Most commuters head straight to subway' },
            ].map((slot) => (
              <div key={slot.block} className="p-3 rounded-xl bg-stone-50 border border-stone-100">
                <div className="flex justify-between text-xs font-bold text-stone-900 mb-1">
                  <span>{slot.block}</span>
                  <span className="text-stone-700">{slot.pct}% on campus</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-1.5 mb-1.5 overflow-hidden">
                  <div
                    className="bg-stone-800 h-1.5 rounded-full"
                    style={{ width: `${slot.pct}%` }}
                  />
                </div>
                <div className="text-[11px] text-stone-500">{slot.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Club Breakdown Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-base text-stone-900">
              Student Organization Engagement Telemetry (Sample)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              How registered campus clubs benefit from Knot's time-window and go-together matching
            </p>
          </div>
          <div className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 shrink-0">
            5 Registered Student Clubs
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Club / Organization</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Window Fit Rate</th>
                <th className="py-3 px-6">Go-Together Joins</th>
                <th className="py-3 px-6">Catalog Views</th>
                <th className="py-3 px-6">Avg Group Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {SAMPLE_CLUB_ENGAGEMENT.map((row) => (
                <tr key={row.clubName} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-stone-900">
                    {row.clubName}
                  </td>
                  <td className="py-3.5 px-6 text-stone-600">
                    {row.category}
                  </td>
                  <td className="py-3.5 px-6 font-bold text-emerald-700 tabular-nums">
                    {row.windowMatchRate}
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-stone-900 tabular-nums">
                    {row.goTogetherJoins} students
                  </td>
                  <td className="py-3.5 px-6 text-stone-500 tabular-nums">
                    {row.totalViews} views
                  </td>
                  <td className="py-3.5 px-6 text-stone-600 tabular-nums">
                    {row.averageGroupSize}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
