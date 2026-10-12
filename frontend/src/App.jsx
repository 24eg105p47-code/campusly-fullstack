import React from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Layout/Sidebar';
import Topbar from './components/Layout/Topbar';
import Footer from './components/Layout/Footer';
import DiscoverPage from './components/Discover/DiscoverPage';
import ApplicationsPage from './components/Applications/ApplicationsPage';
import ProfilePage from './components/Profile/ProfilePage';
import AdminPage from './components/Admin/AdminPage';
import Modal from './components/Common/Modal';
import Toast from './components/Common/Toast';
import AuthModal from './components/Modals/AuthModal';
import OpportunityDetailModal from './components/Modals/OpportunityDetailModal';
import ApplyModal from './components/Modals/ApplyModal';
import AdminOpportunityModal from './components/Modals/AdminOpportunityModal';

export default function App() {
  const { currentPage, modal, closeModal } = useApp();

  return (
    <>
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <Topbar />

          {currentPage === 'discover' && <DiscoverPage />}
          {currentPage === 'applications' && <ApplicationsPage />}
          {currentPage === 'profile' && <ProfilePage />}
          {currentPage === 'admin' && <AdminPage />}

          <Footer />
        </main>
      </div>

      <Modal
        isOpen={!!modal.type}
        onClose={closeModal}
        hideCloseButton={!!modal.data?.required}
      >
        {modal.type === 'auth' && (
          <AuthModal
            initialMode={modal.data?.mode || 'login'}
            required={!!modal.data?.required}
          />
        )}
        {modal.type === 'detail' && (
          <OpportunityDetailModal opportunityId={modal.data?.opportunityId} />
        )}
        {modal.type === 'apply' && (
          <ApplyModal opportunityId={modal.data?.opportunityId} />
        )}
        {modal.type === 'admin' && (
          <AdminOpportunityModal opportunityId={modal.data?.opportunityId} />
        )}
      </Modal>

      <Toast />
    </>
  );
}
