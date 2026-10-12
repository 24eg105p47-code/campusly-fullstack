import React from 'react';
import { useApp } from '../../context/AppContext';
import { daysLeft } from '../../data/seedData';

export default function SummaryStrip() {
  const { opportunities, applications } = useApp();

  const active = opportunities.filter((o) => daysLeft(o.deadline) >= 0);
  const closingThisWeek = active.filter((o) => daysLeft(o.deadline) <= 7).length;
  const inProgress = applications.filter((a) => a.status !== 'Rejected').length;

  return (
    <div className="summary-strip">
      <div className="summary-item">
        <span className="summary-icon mint-icon">✦</span>
        <div>
          <b id="summary-open">{String(active.length).padStart(2, '0')}</b>
          <small>open opportunities</small>
        </div>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-item">
        <span className="summary-icon lilac-icon">◷</span>
        <div>
          <b id="summary-deadline">{closingThisWeek}</b>
          <small>closing this week</small>
        </div>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-item">
        <span className="summary-icon peach-icon">↗</span>
        <div>
          <b id="summary-applied">{inProgress}</b>
          <small>applications in progress</small>
        </div>
      </div>

      <div className="summary-note">
        <span>✧</span> New opportunities picked for you
      </div>
    </div>
  );
}
