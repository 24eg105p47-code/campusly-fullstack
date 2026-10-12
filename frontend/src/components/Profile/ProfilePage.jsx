import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { initials } from '../../data/seedData';

const YEARS = ['2026', '2027', '2028', '2029'];

export default function ProfilePage() {
  const { profile, updateProfileData, logout, apiToken, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    program: profile.program || '',
    year: profile.year || '2027',
    bio: profile.bio || '',
    skills: profile.skills || ''
  });

  const [saveMessage, setSaveMessage] = useState(
    apiToken
      ? 'Your profile is saved on the Campusly server.'
      : 'Sign in to save your profile to the server.'
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData({
      name: profile.name || '',
      email: profile.email || '',
      program: profile.program || '',
      year: profile.year || '2027',
      bio: profile.bio || '',
      skills: profile.skills || ''
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfileData({
        name: formData.name.trim(),
        email: formData.email.trim(),
        program: formData.program.trim(),
        year: formData.year,
        bio: formData.bio.trim(),
        skills: formData.skills.trim()
      });
      setSaveMessage('Saved to the campus server');
    } catch (err) {
      showToast(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  // Calculate profile completeness
  const filledFields = [
    formData.name,
    formData.email,
    formData.program,
    formData.bio,
    formData.skills
  ].filter(Boolean).length;

  const userInitials = initials(formData.name || 'Alex Morgan');

  return (
    <section className="page active" id="profile-page">
      <div className="page-head">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line"></span> YOUR PROFESSIONAL STORY
          </div>
          <h1>My profile</h1>
          <p className="intro">Help opportunities find the right version of you.</p>
        </div>
        <span className="profile-complete">
          <span>◌</span> Profile strength{' '}
          <b>{filledFields >= 4 ? 'Strong profile' : 'Good start'}</b>
        </span>
      </div>

      <form id="profile-form" className="profile-layout" onSubmit={handleSubmit}>
        <div className="card profile-card">
          <div className="profile-banner">
            <span>✦</span>
          </div>

          <div className="profile-identity">
            <div className="avatar profile-avatar" id="profile-avatar">
              {userInitials}
            </div>
            <div>
              <h2 id="profile-display-name">{formData.name || 'Student'}</h2>
              <p>Student · Northstar University</p>
            </div>
          </div>

          <div className="form-grid">
            <label>
              Full name
              <input
                name="name"
                id="profile-name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              University email
              <input
                name="email"
                id="profile-email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Degree program
              <input
                name="program"
                id="profile-program"
                value={formData.program}
                onChange={handleChange}
              />
            </label>

            <label>
              Graduation year
              <select
                name="year"
                id="profile-year"
                value={formData.year}
                onChange={handleChange}
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>

            <label className="full-field">
              About you
              <textarea
                name="bio"
                id="profile-bio"
                rows={3}
                placeholder="A short introduction about your interests and goals..."
                value={formData.bio}
                onChange={handleChange}
              />
            </label>

            <label className="full-field">
              Skills <small>Separate skills with commas</small>
              <input
                name="skills"
                id="profile-skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="profile-footer">
            <span id="profile-save-message">{saveMessage}</span>
            <div className="profile-actions">
              <button
                className="button secondary"
                type="button"
                id="logout-button"
                onClick={logout}
              >
                Log out
              </button>
              <button
                className="button primary"
                type="submit"
                disabled={saving}
              >
                {saving ? 'Saving…' : 'Save profile'} <span>↗</span>
              </button>
            </div>
          </div>
        </div>

        <aside className="card profile-tip">
          <span className="tip-icon">✧</span>
          <h3>Make your profile count</h3>
          <p>
            Keep your skills and study details up to date so you can quickly spot
            opportunities that fit.
          </p>
          <div className="tip-meter">
            <span style={{ width: `${(filledFields / 5) * 100}%` }}></span>
          </div>
          <small>{filledFields} of 5 profile details added</small>
        </aside>
      </form>
    </section>
  );
}
