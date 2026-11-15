
import React from "react";
import "./AuthorityDashboard.css";

function AuthorityDashboard({ onLogout }) {
  const households = [
    { id: "ECO-H001", name: "Ravi Kumar", area: "Ward 1", weight: "32 kg", status: "Active" },
    { id: "ECO-H002", name: "Sita Devi", area: "Ward 2", weight: "25 kg", status: "Active" },
    { id: "ECO-H003", name: "Arun Kumar", area: "Ward 3", weight: "18 kg", status: "Pending" },
    { id: "ECO-H004", name: "Lakshmi Rao", area: "Ward 1", weight: "40 kg", status: "Active" },
  ];

  const workers = [
    { name: "Ramesh", ward: "Ward 1", collections: 18, status: "On Duty" },
    { name: "Suresh", ward: "Ward 2", collections: 15, status: "On Duty" },
    { name: "Mahesh", ward: "Ward 3", collections: 12, status: "On Duty" },
  ];

  return (
    <div className="authority-dashboard">

      <aside className="authority-sidebar">
        <div className="authority-brand">
          <span>♻️</span>
          <div>
            <h2>EcoCycle</h2>
            <small>PLASTIC REWARDS</small>
          </div>
        </div>

        <div className="authority-profile">
          <div className="authority-avatar">🏛️</div>
          <div>
            <strong>Local Authority</strong>
            <small>Gram Panchayat Admin</small>
          </div>
        </div>

        <nav className="authority-nav">
          <a href="#authority-overview" className="selected">▦ Control Room</a>
          <a href="#authority-households">🏠 Households</a>
          <a href="#authority-workers">👷 Sanitation Workers</a>
          <a href="#authority-collection">♻️ Plastic Collection</a>
          <a href="#authority-agencies">🏭 Recycling Agencies</a>
          <a href="#authority-rewards">🏆 Rewards</a>
          <a href="#authority-reports">📊 Reports</a>
        </nav>

        <button className="authority-logout" onClick={onLogout}>
          ↪ Sign Out
        </button>
      </aside>

      <main className="authority-main">

        <header className="authority-header">
          <div>
            <h2>Gram Panchayat Control Room</h2>
            <p>Monitor community waste management activities.</p>
          </div>
          <div className="authority-date">📅 14 November 2026</div>
        </header>

        <section id="authority-overview" className="authority-welcome">
          <div>
            <span>LOCAL AUTHORITY ADMINISTRATION</span>
            <h1>Welcome, Administrator! 🏛️</h1>
            <p>
              Manage households, workers and recycling operations
              for a cleaner and greener community.
            </p>
          </div>
          <div className="authority-welcome-icon">🌳</div>
        </section>

        <section className="authority-stats">
          <div className="authority-stat">
            <span>🏠</span>
            <small>Registered Households</small>
            <h2>850</h2>
            <p>Community participation</p>
          </div>

          <div className="authority-stat">
            <span>♻️</span>
            <small>Total Plastic Collected</small>
            <h2>2,450 kg</h2>
            <p>Total collected waste</p>
          </div>

          <div className="authority-stat">
            <span>👷</span>
            <small>Sanitation Workers</small>
            <h2>32</h2>
            <p>Registered workers</p>
          </div>

          <div className="authority-stat">
            <span>🏭</span>
            <small>Recycling Agencies</small>
            <h2>8</h2>
            <p>Connected agencies</p>
          </div>
        </section>

        <section id="authority-households" className="authority-panel">
          <div className="authority-panel-heading">
            <div>
              <h3>🏠 Household Monitoring</h3>
              <p>Monitor registered households and their plastic contributions.</p>
            </div>
            <span className="authority-count">4 Records</span>
          </div>

          <div className="authority-table-scroll">
            <table className="authority-table">
              <thead>
                <tr>
                  <th>Household ID</th>
                  <th>Household Name</th>
                  <th>Ward</th>
                  <th>Plastic Collected</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {households.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.area}</td>
                    <td>{item.weight}</td>
                    <td>
                      <span className={item.status === "Active" ? "authority-active" : "authority-pending"}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="authority-workers" className="authority-panel">
          <div className="authority-panel-heading">
            <div>
              <h3>👷 Sanitation Worker Management</h3>
              <p>Monitor worker assignments and collection activities.</p>
            </div>
            <span className="authority-count">3 Records</span>
          </div>

          <div className="authority-table-scroll">
            <table className="authority-table">
              <thead>
                <tr>
                  <th>Worker Name</th>
                  <th>Assigned Ward</th>
                  <th>Collections</th>
                  <th>Duty Status</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.name}>
                    <td>{worker.name}</td>
                    <td>{worker.ward}</td>
                    <td>{worker.collections}</td>
                    <td><span className="authority-active">{worker.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="authority-collection" className="authority-panel">
          <h3>♻️ Plastic Collection Overview</h3>
          <p>Community plastic collection performance.</p>

          <div className="authority-collection-cards">
            <div>
              <span>🏠</span>
              <strong>1,200 kg</strong>
              <small>Household Collection</small>
            </div>
            <div>
              <span>🏫</span>
              <strong>750 kg</strong>
              <small>School Collection</small>
            </div>
            <div>
              <span>👷</span>
              <strong>500 kg</strong>
              <small>Community Collection</small>
            </div>
          </div>
        </section>

        <section id="authority-agencies" className="authority-panel">
          <h3>🏭 Recycling Agency Management</h3>
          <p>Monitor connected recycling agencies and plastic transfers.</p>

          <div className="agency-overview">
            <div>
              <strong>8</strong>
              <span>Registered Agencies</span>
            </div>
            <div>
              <strong>6</strong>
              <span>Active Agencies</span>
            </div>
            <div>
              <strong>2,100 kg</strong>
              <span>Plastic Transferred</span>
            </div>
          </div>
        </section>

        <section id="authority-rewards" className="authority-panel">
          <h3>🏆 Community Rewards</h3>
          <div className="authority-reward">
            <span>🌟</span>
            <div>
              <h2>25,600 Reward Points</h2>
              <p>Total community points earned through recycling activities.</p>
            </div>
          </div>
        </section>

        <section id="authority-reports" className="authority-panel">
          <h3>📊 Reports and Performance</h3>
          <p>
            Review household participation, worker performance,
            plastic collection and recycling transfers.
          </p>
          <div className="authority-report-note">
            Report information currently uses sample data.
            Database and downloadable reports will be added later.
          </div>
        </section>

        <footer className="authority-footer">
          ♻️ EcoCycle Plastic Rewards | Gram Panchayat Control Room
        </footer>

      </main>
    </div>
  );
}

export default AuthorityDashboard;
