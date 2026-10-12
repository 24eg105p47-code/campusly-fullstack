import { API_BASE } from '../config';
import { TOKEN_KEY } from '../data/seedData';

let onAuthErrorCallback = null;

export function setOnAuthError(cb) {
  onAuthErrorCallback = cb;
}

export function getStoredToken() {
  return sessionStorage.getItem(TOKEN_KEY) || '';
}

export function setStoredToken(token) {
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  } else {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

export async function apiRequest(path, options = {}) {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const body = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && token) {
      setStoredToken('');
      if (onAuthErrorCallback) {
        onAuthErrorCallback();
      }
    }
    throw new Error(body?.message || `Request failed (${response.status})`);
  }

  return body;
}

export const api = {
  // Opportunities
  getOpportunities: () => apiRequest('/opportunities'),
  createOpportunity: (data) => apiRequest('/opportunities', { method: 'POST', body: JSON.stringify(data) }),
  updateOpportunity: (id, data) => apiRequest(`/opportunities/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteOpportunity: (id) => apiRequest(`/opportunities/${id}`, { method: 'DELETE' }),

  // Auth
  login: (email, password) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
  register: (name, email, password) =>
    apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    }),

  // Profile
  getProfile: () => apiRequest('/profile'),
  updateProfile: (profileData) =>
    apiRequest('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    }),

  // Applications
  getApplications: () => apiRequest('/applications'),
  submitApplication: (opportunityId, note) =>
    apiRequest('/applications', {
      method: 'POST',
      body: JSON.stringify({ opportunityId, note })
    })
};
