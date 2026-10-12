import React from 'react';
import { useApp } from '../../context/AppContext';
import { daysLeft, dateLabel } from '../../data/seedData';

export default function AdminPage() {
  const {
    opportunities,
    applications,
    openModal,
    removeOpportunity,
    showToast
  } = useApp();

  const activeCount = opportunities.filter((o) => daysLeft(o.deadline) >= 0).length;

  const handleDelete = (opp) => {
    if (window.confirm(`Remove “${opp.title}” from the opportunity board?`)) {
      removeOpportunity(opp.id).catch((err) => {
        showToast(err.message || 'Failed to remove opportunity');
      });
    }
  };

  return (
    <section className="page active" id="admin-page">
      <div className="page-head">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line"></span> PLATFORM MANAGEMENT
          </div>
          <h1>Admin tools</h1>
          <p className="intro">Manage the opportunities students see across campus.</p>
        </div>
        <button
          className="button primary"
          id="add-opportunity"
          type="button"
          onClick={() => openModal('admin')}
        >
          ＋ Add opportunity
        </button>
      </div>

      <div className="admin-metrics">
        <div className="card">
          <small>ACTIVE OPPORTUNITIES</small>
          <b id="admin-active">{activeCount}</b>
        </div>
        <div className="card">
          <small>STUDENT APPLICATIONS</small>
          <b id="admin-applications">{applications.length}</b>
        </div>
        <div className="card">
          <small>DATABASE</small>
          <b>H2 · Local</b>
        </div>
      </div>

      <div className="admin-table-wrap card">
        <div className="table-heading">
          <div>
            <h2>Opportunity listings</h2>
            <p>Create, edit, or remove campus opportunities.</p>
          </div>
          <span className="admin-badge">SERVER ADMIN</span>
        </div>

        <div className="admin-table-scroll">
          <table>
            <thead>
              <tr>
                <th>OPPORTUNITY</th>
                <th>CATEGORY</th>
                <th>DEADLINE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="admin-table">
              {opportunities.length > 0 ? (
                opportunities.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <div className="table-org">
                        <span className={`org-mark ${o.tone || ''}`}>{o.mark}</span>
                        <span>
                          {o.title}
                          <small
                            style={{
                              display: 'block',
                              fontSize: '9px',
                              fontWeight: 400,
                              color: '#99a49d',
                              marginTop: '3px'
                            }}
                          >
                            {o.organization}
                          </small>
                        </span>
                      </div>
                    </td>
                    <td>{o.category}</td>
                    <td>{dateLabel(o.deadline)}</td>
                    <td>
                      <span className="status-live">● Active</span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          onClick={() =>
                            openModal('admin', { opportunityId: o.id })
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="delete-action"
                          type="button"
                          onClick={() => handleDelete(o)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No opportunities listed yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="demo-note">
        <span>ⓘ</span> Opportunity management is protected by your server-assigned
        administrator role.
      </div>
    </section>
  );
}
