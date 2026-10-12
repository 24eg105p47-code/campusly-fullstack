import React from 'react';
import { useApp } from '../../context/AppContext';
import { daysLeft, initials } from '../../data/seedData';

export default function Sidebar() {
  const {
    currentPage,
    setPage,
    opportunities,
    applications,
    role,
    profile,
    apiToken,
    showToast
  } = useApp();

  const activeCount = opportunities.filter((o) => daysLeft(o.deadline) >= 0).length;
  const displayName = profile.name || 'Campus guest';
  const userInitials = initials(displayName);

  const roleLabel = apiToken
    ? role === 'admin'
      ? 'Administrator account'
      : 'Student account'
    : 'Guest preview';

  const roleSubtitle = apiToken
    ? role === 'admin'
      ? 'Administrator'
      : 'Student account'
    : 'Not signed in';

  const handleRoleSwitch = () => {
    if (role === 'admin') {
      setPage('admin');
    } else {
      showToast('Admin access is assigned by the server administrator');
    }
  };

  return (
    <aside className="sidebar">
      <a
        className="brand"
        href="#discover"
        aria-label="Campusly home"
        onClick={(e) => {
          e.preventDefault();
          setPage('discover');
        }}
      >
        <span className="brand-icon">c</span>
        <span>campusly</span>
      </a>

      <div className="campus-label">YOUR CAREER, IN MOTION</div>

      <nav className="main-nav" aria-label="Main navigation">
        <button
          className={`nav-link ${currentPage === 'discover' ? 'active' : ''}`}
          onClick={() => setPage('discover')}
        >
          <span className="nav-icon">⌕</span> Discover{' '}
          <span className="nav-count" id="opportunity-count">
            {String(activeCount).padStart(2, '0')}
          </span>
        </button>

        <button
          className={`nav-link ${currentPage === 'applications' ? 'active' : ''}`}
          onClick={() => setPage('applications')}
        >
          <span className="nav-icon">▤</span> My applications{' '}
          <span className="nav-count" id="application-count">
            {applications.length}
          </span>
        </button>

        <button
          className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
          onClick={() => setPage('profile')}
        >
          <span className="nav-icon">◉</span> My profile
        </button>

        {role === 'admin' && (
          <button
            className={`nav-link admin-link ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => setPage('admin')}
          >
            <span className="nav-icon">⚙</span> Admin tools
          </button>
        )}
      </nav>

      <div className="sidebar-bottom">
        <div className="profile-mini">
          <div className="avatar" id="side-avatar">
            {userInitials}
          </div>
          <div>
            <strong id="side-name">{displayName}</strong>
            <small>{roleSubtitle}</small>
          </div>
          <button
            className="more-button"
            aria-label="Profile options"
            onClick={() => setPage('profile')}
          >
            ···
          </button>
        </div>

        <button className="role-switch" id="role-switch" onClick={handleRoleSwitch}>
          <span className="switch-dot"></span>
          <span id="role-label">{roleLabel}</span>
          <span>↗</span>
        </button>
      </div>
    </aside>
  );
}
