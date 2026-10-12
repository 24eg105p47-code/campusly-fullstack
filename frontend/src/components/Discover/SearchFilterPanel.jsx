import React, { useState } from 'react';

const CATEGORIES = [
  'All categories',
  'Internship',
  'Hackathon',
  'Workshop',
  'Competition',
  'Placement',
  'Certification'
];

export default function SearchFilterPanel({
  searchInputRef,
  filters,
  setFilters,
  availableSkills,
  availableOrganizations
}) {
  const [showOrgFilter, setShowOrgFilter] = useState(false);

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="search-panel">
      <label className="search-box">
        <span>⌕</span>
        <input
          ref={searchInputRef}
          id="search-input"
          type="search"
          placeholder="Search roles, skills, or organizations..."
          autoComplete="off"
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
        <kbd>⌘ K</kbd>
      </label>

      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="category-filter">CATEGORY</label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c === 'All categories' ? 'all' : c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="skill-filter">SKILL</label>
          <select
            id="skill-filter"
            value={filters.skill}
            onChange={(e) => handleChange('skill', e.target.value)}
          >
            <option value="all">Any skill</option>
            {availableSkills.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="eligibility-filter">ELIGIBILITY</label>
          <select
            id="eligibility-filter"
            value={filters.eligibility}
            onChange={(e) => handleChange('eligibility', e.target.value)}
          >
            <option value="all">All students</option>
            <option value="Eligible for me">Eligible for me</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="deadline-filter">DEADLINE</label>
          <select
            id="deadline-filter"
            value={filters.deadline}
            onChange={(e) => handleChange('deadline', e.target.value)}
          >
            <option value="all">Any time</option>
            <option value="7">Next 7 days</option>
            <option value="30">Next 30 days</option>
          </select>
        </div>

        <button
          type="button"
          className="filter-icon"
          id="org-filter-toggle"
          aria-label="Filter by organization"
          onClick={() => setShowOrgFilter((prev) => !prev)}
        >
          ☷
        </button>
      </div>

      <div className={`org-filter ${showOrgFilter ? '' : 'hidden'}`} id="org-filter">
        <label htmlFor="organization-filter">Organization</label>
        <select
          id="organization-filter"
          value={filters.organization}
          onChange={(e) => handleChange('organization', e.target.value)}
        >
          <option value="all">All organizations</option>
          {availableOrganizations.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
