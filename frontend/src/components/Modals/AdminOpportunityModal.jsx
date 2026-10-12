import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { isoDay, plusDays } from '../../data/seedData';

const CATEGORIES = [
  'Internship',
  'Hackathon',
  'Workshop',
  'Competition',
  'Placement',
  'Certification'
];

export default function AdminOpportunityModal({ opportunityId }) {
  const {
    opportunities,
    addOpportunity,
    editOpportunity,
    closeModal,
    showToast
  } = useApp();

  const existing = opportunities.find((x) => x.id === opportunityId);
  const isEdit = !!existing;

  const [title, setTitle] = useState(existing?.title || '');
  const [organization, setOrganization] = useState(existing?.organization || '');
  const [category, setCategory] = useState(existing?.category || 'Internship');
  const [deadline, setDeadline] = useState(existing?.deadline || plusDays(14));
  const [eligibility, setEligibility] = useState(
    existing?.eligibility || 'Open to all undergraduate students'
  );
  const [skills, setSkills] = useState(
    existing?.skills ? existing.skills.join(', ') : ''
  );
  const [description, setDescription] = useState(existing?.description || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orgTrim = organization.trim();
    const markLetters = orgTrim
      .split(/\s+/)
      .map((x) => x[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const payload = {
      title: title.trim(),
      organization: orgTrim,
      category,
      deadline,
      eligibility: eligibility.trim(),
      skills: skills
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean),
      description: description.trim(),
      subtitle: existing?.subtitle || 'Campus opportunity',
      mark: existing?.mark || markLetters || 'NL',
      tone: existing?.tone || 'green',
      location: existing?.location || 'Campus listing',
      type: category,
      posted: existing?.posted || isoDay(new Date())
    };

    try {
      if (isEdit) {
        await editOpportunity(existing.id, payload);
      } else {
        await addOpportunity(payload);
      }
    } catch (err) {
      showToast(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="eyebrow">
        <span className="eyebrow-line"></span>{' '}
        {isEdit ? 'UPDATE LISTING' : 'NEW LISTING'}
      </div>
      <h2 id="modal-title">{isEdit ? 'Edit opportunity' : 'Add an opportunity'}</h2>

      <form className="modal-form" id="opportunity-form" onSubmit={handleSubmit}>
        <label>
          Opportunity title
          <input
            name="title"
            required
            maxLength={70}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Organization
          <input
            name="organization"
            required
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </label>

        <div className="modal-meta">
          <label>
            Category
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            Deadline
            <input
              name="deadline"
              type="date"
              required
              min={isoDay(new Date())}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>
        </div>

        <label>
          Eligibility
          <input
            name="eligibility"
            required
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
          />
        </label>

        <label>
          Required skills
          <input
            name="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. React, Python, UI Design"
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="modal-bottom">
          <button
            type="button"
            className="button secondary"
            id="cancel-admin"
            onClick={closeModal}
            disabled={loading}
          >
            Cancel
          </button>
          <button className="button primary" type="submit" disabled={loading}>
            {loading
              ? 'Saving…'
              : isEdit
              ? 'Save changes ↗'
              : 'Publish opportunity ↗'}
          </button>
        </div>
      </form>
    </>
  );
}
