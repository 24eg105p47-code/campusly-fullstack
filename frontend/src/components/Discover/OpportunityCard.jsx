import React from 'react';
import { useApp } from '../../context/AppContext';
import { daysLeft } from '../../data/seedData';

export default function OpportunityCard({ opportunity }) {
  const {
    applications,
    saved,
    toggleSaved,
    openModal,
    apiToken,
    showToast
  } = useApp();

  const o = opportunity;
  const remaining = daysLeft(o.deadline);
  const isApplied = applications.some((a) => a.opportunityId === o.id);
  const isSaved = saved.includes(o.id);

  const handleApplyClick = () => {
    if (!apiToken) {
      openModal('auth', { mode: 'login' });
      showToast('Sign in to submit an application');
      return;
    }
    openModal('apply', { opportunityId: o.id });
  };

  const truncatedDesc =
    o.description.length > 104
      ? `${o.description.slice(0, 104)}…`
      : o.description;

  return (
    <article className="opportunity-card">
      <div className="card-top">
        <div className="org-lockup">
          <div className={`org-mark ${o.tone || ''}`}>{o.mark}</div>
          <div>
            <div className="org-name">{o.organization}</div>
            <div className="org-sub">
              {o.subtitle || o.location || 'Campus opportunity'}
            </div>
          </div>
        </div>
        <button
          className={`save-button ${isSaved ? 'saved' : ''}`}
          aria-label={isSaved ? 'Remove saved opportunity' : 'Save opportunity'}
          onClick={() => toggleSaved(o.id)}
        >
          {isSaved ? '♥' : '♡'}
        </button>
      </div>

      <h3>{o.title}</h3>
      <p className="card-description">{truncatedDesc}</p>

      <div className="tag-row">
        <span className="tag category">{o.category}</span>
        {(o.skills || []).slice(0, 2).map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>

      <div className="card-bottom">
        <span className={`deadline ${remaining <= 7 ? 'soon' : ''}`}>
          ◷ <b>{remaining === 0 ? 'Closes today' : `Closes in ${remaining} days`}</b>
        </span>

        <div className="card-actions">
          <button
            className="details-link"
            onClick={() => openModal('detail', { opportunityId: o.id })}
          >
            Details
          </button>
          <button
            className={`apply-button ${isApplied ? 'applied' : ''}`}
            disabled={isApplied}
            onClick={handleApplyClick}
          >
            {isApplied ? 'Applied ✓' : 'Apply now ↗'}
          </button>
        </div>
      </div>
    </article>
  );
}
