import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>© 2026 Campusly</span>
      <span>
        Made for what's next <b>✦</b>
      </span>
      <a href="#help" onClick={(e) => e.preventDefault()}>
        Help &amp; support
      </a>
    </footer>
  );
}
