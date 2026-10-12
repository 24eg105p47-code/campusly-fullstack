import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function ApplyModal({ opportunityId }) {
  const { opportunities, profile, submitApplication, closeModal, showToast } = useApp();
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const opportunity = opportunities.find((x) => x.id === opportunityId);
  if (!opportunity) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmed) return;
    setSubmitting(true);
    try {
      await submitApplication(opportunity.id, note);
    } catch (err) {
      showToast(err.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="eyebrow">
        <span className="eyebrow-line"></span> QUICK APPLICATION
      </div>
      <h2 id="modal-title">Apply to {opportunity.title}</h2>
      <p className="modal-org">
        {opportunity.organization} · {opportunity.type || opportunity.category}
      </p>

      <form className="modal-form" id="apply-form" onSubmit={handleSubmit}>
        <p className="auth-demo-note">
          Applying as {profile.name} · {profile.email}
        </p>

        <label>
          Why are you interested?
          <textarea
            name="note"
            rows={4}
            placeholder="Share a few words about what interests you..."
            required
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <label className="consent-row">
          <span>
            <input
              type="checkbox"
              required
              style={{ width: 'auto', marginRight: '7px' }}
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            I confirm my profile details are accurate.
          </span>
        </label>

        <div className="modal-bottom">
          <button
            type="button"
            className="button secondary"
            id="cancel-apply"
            onClick={closeModal}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            className="button primary"
            type="submit"
            disabled={submitting || !confirmed}
          >
            {submitting ? 'Submitting…' : 'Submit application ↗'}
          </button>
        </div>
      </form>
    </>
  );
}
