import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  demoOpportunities,
  seedProfile,
  STORE_KEY,
  TOKEN_KEY
} from '../data/seedData';
import { api, getStoredToken, setStoredToken, setOnAuthError } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Load initial local storage cache
  const getInitialState = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY));
      if (saved && saved.opportunities && saved.profile) {
        return saved;
      }
    } catch (e) {
      // ignore JSON parse error
    }
    return {
      opportunities: demoOpportunities,
      applications: [],
      saved: [],
      role: 'student',
      profile: { ...seedProfile }
    };
  };

  const initial = getInitialState();

  const [opportunities, setOpportunities] = useState(initial.opportunities || demoOpportunities);
  const [applications, setApplications] = useState(initial.applications || []);
  const [saved, setSaved] = useState(initial.saved || []);
  const [role, setRole] = useState(initial.role || 'student');
  const [profile, setProfile] = useState(initial.profile || { ...seedProfile });
  const [apiToken, setApiToken] = useState(() => getStoredToken());
  const [currentUser, setCurrentUser] = useState(null);

  // Navigation
  const [currentPage, setCurrentPage] = useState('discover');

  // Modals: { type: 'auth' | 'detail' | 'apply' | 'admin' | null, data: any }
  const [modal, setModal] = useState({ type: null, data: null });

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  const hideToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({
          opportunities,
          applications,
          saved,
          role,
          profile
        })
      );
    } catch (e) {
      // ignore
    }
  }, [opportunities, applications, saved, role, profile]);

  // Auth error handler
  useEffect(() => {
    setOnAuthError(() => {
      setApiToken('');
      setCurrentUser(null);
      setApplications([]);
      setRole('student');
      showToast('Session expired. Please sign in again.');
    });
  }, [showToast]);

  // Load backend data
  const loadBackendState = useCallback(async () => {
    try {
      const backendOpps = await api.getOpportunities();
      if (Array.isArray(backendOpps) && backendOpps.length > 0) {
        setOpportunities(backendOpps);
      }
    } catch (err) {
      // Backend might be offline; use local demo data
      console.warn('Backend unavailable, using local opportunities', err);
    }

    const currentToken = getStoredToken();
    if (currentToken) {
      try {
        const [userProfile, userApps] = await Promise.all([
          api.getProfile(),
          api.getApplications()
        ]);
        if (userProfile) {
          setProfile(userProfile);
          setRole((userProfile.role || 'student').toLowerCase());
          setCurrentUser(userProfile);
        }
        if (Array.isArray(userApps)) {
          setApplications(userApps);
        }
      } catch (err) {
        setStoredToken('');
        setApiToken('');
        setCurrentUser(null);
        setApplications([]);
        setRole('student');
      }
    } else {
      setApplications([]);
      setRole('student');
    }
  }, []);

  useEffect(() => {
    loadBackendState().catch(() => {
      showToast('Could not reach Campusly backend. Start the server and reload.');
    });
  }, [loadBackendState, showToast]);

  // Navigation page setter
  const setPage = useCallback((newPage) => {
    if (newPage === 'admin' && role !== 'admin') {
      showToast('Administrator role required to open these tools');
      setCurrentPage('discover');
      return;
    }
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [role, showToast]);

  // Modal helpers
  const openModal = useCallback((type, data = null) => {
    setModal({ type, data });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ type: null, data: null });
  }, []);

  // Saved toggle
  const toggleSaved = useCallback((id) => {
    setSaved((prev) => {
      const exists = prev.includes(id);
      return exists ? prev.filter((x) => x !== id) : [...prev, id];
    });
  }, []);

  // Auth functions
  const login = async (email, password) => {
    const result = await api.login(email, password);
    setStoredToken(result.token);
    setApiToken(result.token);
    setCurrentUser(result.user);
    if (result.user?.role) {
      setRole(result.user.role.toLowerCase());
    }
    closeModal();
    await loadBackendState();
    showToast('Signed in');
    return result;
  };

  const register = async (name, email, password) => {
    const result = await api.register(name, email, password);
    setStoredToken(result.token);
    setApiToken(result.token);
    setCurrentUser(result.user);
    if (result.user?.role) {
      setRole(result.user.role.toLowerCase());
    }
    closeModal();
    await loadBackendState();
    showToast('Account created');
    return result;
  };

  const logout = () => {
    setStoredToken('');
    setApiToken('');
    setCurrentUser(null);
    setApplications([]);
    setSaved([]);
    setProfile({ ...seedProfile });
    setRole('student');
    setPage('discover');
    openModal('auth', { mode: 'login', required: true });
  };

  // Profile update
  const updateProfileData = async (newProfile) => {
    if (!apiToken) {
      openModal('auth', { mode: 'login' });
      showToast('Sign in to save your profile');
      return;
    }
    const updated = await api.updateProfile(newProfile);
    setProfile(updated);
    setCurrentUser(updated);
    showToast('Profile saved');
  };

  // Opportunity CRUD (Admin)
  const addOpportunity = async (oppData) => {
    await api.createOpportunity(oppData);
    const updatedOpps = await api.getOpportunities();
    setOpportunities(updatedOpps);
    closeModal();
    showToast('Opportunity published');
  };

  const editOpportunity = async (id, oppData) => {
    await api.updateOpportunity(id, oppData);
    const updatedOpps = await api.getOpportunities();
    setOpportunities(updatedOpps);
    closeModal();
    showToast('Opportunity updated');
  };

  const removeOpportunity = async (id) => {
    await api.deleteOpportunity(id);
    const updatedOpps = await api.getOpportunities();
    setOpportunities(updatedOpps);
    setSaved((prev) => prev.filter((x) => x !== id));
    showToast('Opportunity removed');
  };

  // Apply to opportunity
  const submitApplication = async (opportunityId, note) => {
    await api.submitApplication(opportunityId, note);
    const updatedApps = await api.getApplications();
    setApplications(updatedApps);
    closeModal();
    showToast('Application submitted');
  };

  const value = {
    opportunities,
    applications,
    saved,
    role,
    profile,
    apiToken,
    currentUser,
    currentPage,
    modal,
    toastMessage,
    setPage,
    openModal,
    closeModal,
    showToast,
    hideToast,
    toggleSaved,
    login,
    register,
    logout,
    updateProfileData,
    addOpportunity,
    editOpportunity,
    removeOpportunity,
    submitApplication,
    loadBackendState
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
