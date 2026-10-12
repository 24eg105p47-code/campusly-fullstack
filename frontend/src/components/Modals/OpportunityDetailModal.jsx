import React from 'react';
import { useApp } from '../../context/AppContext';
import { dateLabel } from '../../data/seedData';

export default function OpportunityDetailModal({ opportunityId }) {
  const {
    opportunities,
    applications,
    saved,
    toggleSaved,
    openModal,
    apiToken,
    showToast
  } = useApp();

  const opportunity = opportunities.find((x) => x.id === opportunityId);
  if (!opportunity) return null;

  const isApplied = applications.some((a) => a.opportunityId === opportunity.id);
  const isSaved = saved.includes(opportunity.id);

  const handleApplyClick = () => {
    if (!apiToken) {
      openModal('auth', { mode: 'login' });
      showToast('Sign in to submit an application');
      return;
    }
    openModal('apply', { opportunityId: opportunity.id });
  };

  return (
    <>
      <div className="org-lockup">
        <div className={`org-mark ${opportunity.tone || ''}`}>{opportunity.mark}</div>
        <div>
          <div className="org-name">{opportunity.organization}</div>
          <div className="org-sub">{opportunity.subtitle || opportunity.location}</div>
        </div>
      </div>

      <h2 id="modal-title">{opportunity.title}</h2>
      <div className="modal-org">
        {opportunity.type || opportunity.category} ·{' '}
        {opportunity.location || 'Campus opportunity'}
      </div>

      <p className="modal-description">{opportunity.description}</p>

      <div className="modal-meta">
        <div>
          <small>APPLICATION DEADLINE</small>
          <b>{dateLabel(opportunity.deadline)}</b>
        </div>
        <div>
          <small>ELIGIBILITY</small>
          <b>{opportunity.eligibility}</b>
        </div>
        <div>
          <small>CATEGORY</small>
          <b>{opportunity.category}</b>
        </div>
        <div>
          <small>ORGANIZATION</small>
          <b>{opportunity.organization}</b>
        </div>
      </div>

      <div className="modal-section">
        <h3>Skills you’ll use</h3>
        <div className="tag-row">
          {(opportunity.skills || []).map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="modal-section">
        <h3>Who can apply</h3>
        <p>{opportunity.eligibility}</p>
      </div>

      <div className="modal-bottom">
        <button
          className="button secondary"
          type="button"
          onClick={() => toggleSaved(opportunity.id)}
        >
          {isSaved ? '♥ Saved' : '♡ Save opportunity'}
        </button>
        <button
          className="button primary"
          type="button"
          disabled={isApplied}
          onClick={handleApplyClick}
        >
          {isApplied ? 'Already applied' : 'Start application ↗'}
        </button>
      </div>
    </>
  );
}
