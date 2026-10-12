import React from 'react';
import { useApp } from '../../context/AppContext';
import { initials } from '../../data/seedData';

const PAGE_TITLES = {
  discover: 'Discover',
  applications: 'My applications',
  profile: 'My profile',
  admin: 'Admin tools'
};

export default function Topbar() {
  const {
    currentPage,
    setPage,
    profile,
    apiToken,
    applications,
    openModal,
    showToast
  } = useApp();

  const userInitials = initials(profile.name);

  const handleNotificationsClick = () => {
    if (applications.length > 0) {
      showToast(
        `You have ${applications.length} application${
          applications.length === 1 ? '' : 's'
        } to track`
      );
    } else {
      showToast('You’re all caught up');
    }
  };

  const handleAccountClick = () => {
    if (apiToken) {
      setPage('profile');
    } else {
      openModal('auth', { mode: 'login' });
    }
  };

  return (
    <header className="topbar">
      <div className="mobile-brand" onClick={() => setPage('discover')}>
        <span className="brand-icon">c</span> campusly
      </div>

      <div className="breadcrumb">
        <span>Workspace</span>
        <i>/</i>
        <strong id="breadcrumb-current">
          {PAGE_TITLES[currentPage] || 'Discover'}
        </strong>
      </div>

      <div className="topbar-actions">
        <span className="campus-chip">
          <span className="online-dot"></span> Northstar University
        </span>

        <button
          className="account-access"
          id="account-access"
          onClick={handleAccountClick}
        >
          {apiToken ? 'Account' : 'Sign in / Create account'}
        </button>

        <button
          className="notification-button"
          id="notifications"
          aria-label="Notifications"
          onClick={handleNotificationsClick}
        >
          ♧<i></i>
        </button>

        <button
          className="avatar top-avatar"
          id="top-avatar"
          aria-label="Open profile"
          onClick={() => setPage('profile')}
        >
          {userInitials}
        </button>
      </div>
    </header>
  );
}
