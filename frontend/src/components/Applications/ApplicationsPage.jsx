import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dateLabel } from '../../data/seedData';

const TABS = [
  { key: 'all', label: 'All', status: 'all' },
  { key: 'submitted', label: 'Submitted', status: 'Submitted' },
  { key: 'review', label: 'In review', status: 'In review' },
  { key: 'interview', label: 'Interview', status: 'Interview' }
];

export default function ApplicationsPage() {
  const { applications, opportunities, setPage } = useApp();
  const [activeTab, setActiveTab] = useState('all');

  const filteredApps =
    activeTab === 'all'
      ? applications
      : applications.filter((a) => a.status === activeTab);

  const getStatusCount = (status) =>
    status === 'all'
      ? applications.length
      : applications.filter((a) => a.status === status).length;

  return (
    <section className="page active" id="applications-page">
      <div className="page-head">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line"></span> KEEP YOUR MOMENTUM
          </div>
          <h1>My applications</h1>
          <p className="intro">Everything you’ve applied for, all in one place.</p>
        </div>
        <div className="application-total">
          <strong id="application-total">{applications.length}</strong>
          <span>total applications</span>
        </div>
      </div>

      <div className="application-tabs" id="application-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.status ? 'active' : ''}`}
            type="button"
            onClick={() => setActiveTab(tab.status)}
          >
            {tab.label} <span>{getStatusCount(tab.status)}</span>
          </button>
        ))}
      </div>

      <div className="application-list" id="application-list">
        {filteredApps.length > 0 ? (
          filteredApps.map((a, idx) => {
            const opp = opportunities.find((o) => o.id === a.opportunityId) || {};
            const tone = opp.tone || 'green';
            const mark = opp.mark || '✦';

            const statusClass =
              a.status === 'In review'
                ? 'review'
                : a.status === 'Interview'
                ? 'interview'
                : '';

            return (
              <article key={a.id || idx} className="application-card">
                <div className={`org-mark ${tone}`}>{mark}</div>
                <div className="application-info">
                  <h3>{a.title}</h3>
                  <p>
                    {a.organization} · {a.category}
                  </p>
                </div>
                <span className={`application-status ${statusClass}`}>
                  {a.status}
                </span>
                <span className="application-date">
                  Applied {dateLabel(a.appliedAt)}
                </span>
              </article>
            );
          })
        ) : (
          <div className="applications-empty">
            <span>▤</span>
            <h3>
              {applications.length
                ? 'No applications in this group'
                : 'Your next step starts with one application'}
            </h3>
            <p>
              {applications.length
                ? 'Choose another status to see more.'
                : 'Explore opportunities and submit an application to track it here.'}
            </p>
            {applications.length === 0 && (
              <button
                className="button primary"
                type="button"
                onClick={() => setPage('discover')}
              >
                Explore opportunities ↗
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
