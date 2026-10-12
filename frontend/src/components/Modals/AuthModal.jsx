import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function AuthModal({ initialMode = 'login', required = false }) {
  const { login, register, closeModal } = useApp();
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(name.trim(), email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="eyebrow">
        <span className="eyebrow-line"></span> YOUR CAMPUSLY ACCOUNT
      </div>
      <h2 id="modal-title">{isRegister ? 'Create your account' : 'Welcome back'}</h2>
      <p className="modal-org">
        {isRegister
          ? 'Your profile and applications will be saved to the campus server.'
          : 'Sign in to return to your saved workspace.'}
      </p>

      <div className="auth-tabs">
        <button
          type="button"
          className={!isRegister ? 'active' : ''}
          onClick={() => {
            setMode('login');
            setError('');
          }}
        >
          Sign in
        </button>
        <button
          type="button"
          className={isRegister ? 'active' : ''}
          onClick={() => {
            setMode('register');
            setError('');
          }}
        >
          Create account
        </button>
      </div>

      <form className="modal-form" id="auth-form" onSubmit={handleSubmit}>
        {isRegister && (
          <label>
            Full name
            <input
              name="name"
              required
              maxLength={80}
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        )}

        <label>
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            maxLength={100}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>Use at least 8 characters.</small>
        </label>

        {error && <div className="auth-error">{error}</div>}

        <button
          className="button primary auth-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Please wait…' : isRegister ? 'Create account ↗' : 'Sign in ↗'}
        </button>
      </form>

      <p className="auth-demo-note">
        Account information is sent to the Campusly backend running on this laptop.
      </p>
    </>
  );
}
