import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { daysLeft } from '../../data/seedData';
import SummaryStrip from './SummaryStrip';
import SearchFilterPanel from './SearchFilterPanel';
import OpportunityCard from './OpportunityCard';

const INITIAL_FILTERS = {
  search: '',
  category: 'all',
  skill: 'all',
  eligibility: 'all',
  deadline: 'all',
  organization: 'all',
  sort: 'recommended'
};

export default function DiscoverPage() {
  const {
    opportunities,
    saved,
    profile,
    showToast
  } = useApp();

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [savedOnly, setSavedOnly] = useState(false);
  const searchInputRef = useRef(null);

  const firstName = (profile.name || 'there').split(' ')[0] || 'there';

  // Keyboard shortcut Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute available skills & organizations
  const { availableSkills, availableOrganizations } = useMemo(() => {
    const skills = [...new Set(opportunities.flatMap((o) => o.skills || []))].sort();
    const orgs = [...new Set(opportunities.map((o) => o.organization))].sort();
    return { availableSkills: skills, availableOrganizations: orgs };
  }, [opportunities]);

  // Filtered & sorted opportunities
  const filteredList = useMemo(() => {
    let list = opportunities.filter((o) => daysLeft(o.deadline) >= 0);

    if (savedOnly) {
      list = list.filter((o) => saved.includes(o.id));
    }

    const q = filters.search.trim().toLowerCase();
    if (q) {
      list = list.filter((o) =>
        [o.title, o.organization, o.description, ...(o.skills || [])]
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }

    if (filters.category !== 'all') {
      list = list.filter((o) => o.category === filters.category);
    }

    if (filters.skill !== 'all') {
      list = list.filter((o) => (o.skills || []).includes(filters.skill));
    }

    if (filters.eligibility === 'Eligible for me') {
      list = list.filter((o) => {
        const p = profile;
        return (
          o.eligibility.includes('Open to all') ||
          (p.program && o.eligibility.includes(p.program)) ||
          (p.year && o.eligibility.includes(p.year))
        );
      });
    }

    if (filters.deadline !== 'all') {
      const maxDays = Number(filters.deadline);
      list = list.filter((o) => daysLeft(o.deadline) <= maxDays);
    }

    if (filters.organization !== 'all') {
      list = list.filter((o) => o.organization === filters.organization);
    }

    if (filters.sort === 'deadline') {
      list = [...list].sort((a, b) => a.deadline.localeCompare(b.deadline));
    } else if (filters.sort === 'newest') {
      list = [...list].sort((a, b) => (b.posted || '').localeCompare(a.posted || ''));
    }

    return list;
  }, [opportunities, savedOnly, saved, filters, profile]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
    setSavedOnly(false);
    showToast('Filters cleared');
  };

  return (
    <section className="page active" id="discover-page">
      <div className="welcome-row">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line"></span> YOUR NEXT CHAPTER STARTS HERE
          </div>
          <h1>
            Good morning, <span id="welcome-name">{firstName}</span>
            <span className="wave">✳</span>
          </h1>
          <p className="intro">Find the opportunity that moves you forward.</p>
        </div>

        <button
          className="saved-shortcut"
          type="button"
          onClick={() => setSavedOnly((prev) => !prev)}
        >
          <span>{savedOnly ? '♥' : '♡'}</span> Saved{' '}
          <b id="saved-count">{saved.length}</b>
        </button>
      </div>

      <SummaryStrip />

      <div className="section-intro">
        <div>
          <h2>Explore opportunities</h2>
          <p>Handpicked ways to build skills, experience, and momentum.</p>
        </div>
        <button
          className="text-action"
          id="clear-filters"
          type="button"
          onClick={handleResetFilters}
        >
          Reset filters <span>↺</span>
        </button>
      </div>

      <SearchFilterPanel
        searchInputRef={searchInputRef}
        filters={filters}
        setFilters={setFilters}
        availableSkills={availableSkills}
        availableOrganizations={availableOrganizations}
      />

      <div className="results-row">
        <span>
          <b id="result-count">
            {filteredList.length} opportunit{filteredList.length === 1 ? 'y' : 'ies'}
          </b>{' '}
          <span id="result-description">
            {savedOnly ? 'saved by you' : 'matched to you'}
          </span>
        </span>

        <label>
          Sort by{' '}
          <select
            id="sort-filter"
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sort: e.target.value }))
            }
          >
            <option value="recommended">Recommended</option>
            <option value="deadline">Closing soon</option>
            <option value="newest">Recently added</option>
          </select>
        </label>
      </div>

      {filteredList.length > 0 ? (
        <div className="opportunity-grid" id="opportunity-grid">
          {filteredList.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      ) : (
        <div className="no-results" id="no-results">
          <span>⌕</span>
          <h3>No matches just yet</h3>
          <p>Try changing your filters or search terms.</p>
          <button
            className="button secondary"
            id="empty-reset"
            type="button"
            onClick={handleResetFilters}
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
}
