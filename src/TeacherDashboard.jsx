
import React, { useEffect, useState } from "react";
import "./TeacherDashboard.css";

function TeacherDashboard({ onLogout }) {
  const [stats, setStats] = useState({
    total_users: 0,
    total_items: 0,
    total_orders: 0,
    total_reviews: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard data from backend
  useEffect(() => {
    fetch("http://localhost:5000/teacher-dashboard")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        return response.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const collections = [
    { date: "14 Nov 2026", className: "Class 8", weight: "25 kg", points: 250 },
    { date: "12 Nov 2026", className: "Class 9", weight: "35 kg", points: 350 },
    { date: "10 Nov 2026", className: "Class 7", weight: "18 kg", points: 180 },
    { date: "08 Nov 2026", className: "Class 10", weight: "42 kg", points: 420 },
  ];

  return (
    <div className="teacher-dashboard">

      {/* Sidebar */}
      <aside className="teacher-sidebar">

        <div className="teacher-brand">
          <span>♻️</span>
          <div>
            <h2>EcoCycle</h2>
            <small>PLASTIC REWARDS</small>
          </div>
        </div>

        <div className="teacher-profile">
          <div className="teacher-avatar">👩‍🏫</div>
          <div>
            <strong>Teacher</strong>
            <small>School Administrator</small>
          </div>
        </div>

        <nav className="teacher-nav">
          <a href="#overview" className="selected">▦ Dashboard</a>
          <a href="#school">🏫 School Profile</a>
          <a href="#students">👨‍🎓 Students</a>
          <a href="#collections">♻️ Collections</a>
          <a href="#rewards">🏆 Rewards</a>
          <a href="#reports">📊 Reports</a>
        </nav>

        <button className="teacher-logout" onClick={onLogout}>
          ↪ Sign Out
        </button>

      </aside>

      {/* Main Dashboard */}
      <main className="teacher-main">

        {/* Header */}
        <header className="teacher-header">
          <div>
            <h2>Teacher Dashboard</h2>
            <p>Welcome back! Let's make our school greener. 🌱</p>
          </div>
          <div className="teacher-date">📅 14 November 2026</div>
        </header>

        {/* Welcome Section */}
        <section id="overview" className="teacher-welcome">
          <div>
            <span>TEACHER CONTROL PANEL</span>
            <h1>Welcome to EcoCycle! 🌿</h1>
            <p>
              Every piece of plastic collected makes a difference.
              Keep inspiring your students!
            </p>
          </div>
          <div className="welcome-emoji">🏫</div>
        </section>

        {/* Database Statistics */}
        <section className="teacher-stats">

          <div className="teacher-stat">
            <span>👨‍🎓</span>
            <small>Total Users</small>
            <h2>{loading ? "Loading..." : stats.total_users}</h2>
            <p>Registered users</p>
          </div>

          <div className="teacher-stat">
            <span>♻️</span>
            <small>Total Items</small>
            <h2>{loading ? "Loading..." : stats.total_items}</h2>
            <p>Items in database</p>
          </div>

          <div className="teacher-stat">
            <span>📦</span>
            <small>Total Orders</small>
            <h2>{loading ? "Loading..." : stats.total_orders}</h2>
            <p>Orders recorded</p>
          </div>

          <div className="teacher-stat">
            <span>⭐</span>
            <small>Total Reviews</small>
            <h2>{loading ? "Loading..." : stats.total_reviews}</h2>
            <p>Customer reviews</p>
          </div>

        </section>

        {error && (
          <p style={{ color: "red" }}>
            Dashboard Error: {error}
          </p>
        )}

        {/* School Information */}
        <section id="school" className="teacher-panel">
          <div className="panel-heading">
            <div>
              <h3>🏫 School Information</h3>
              <p>Your school's EcoCycle participation details</p>
            </div>
            <span className="school-status">● Active</span>
          </div>

          <div className="school-details">
            <div>
              <small>School Name</small>
              <strong>Green Valley Public School</strong>
            </div>
            <div>
              <small>School ID</small>
              <strong>ECO-SCH-001</strong>
            </div>
            <div>
              <small>Location</small>
              <strong>Hyderabad, Telangana</strong>
            </div>
            <div>
              <small>School Coordinator</small>
              <strong>Teacher Administrator</strong>
            </div>
          </div>
        </section>

        {/* Student Participation */}
        <section id="students" className="teacher-panel">
          <div className="panel-heading">
            <div>
              <h3>👨‍🎓 Student Participation</h3>
              <p>Student involvement in recycling activities</p>
            </div>
          </div>

          <div className="participation">
            <div>
              <h2>125</h2>
              <span>Total Students</span>
            </div>
            <div>
              <h2>98</h2>
              <span>Active Students</span>
            </div>
            <div>
              <h2>27</h2>
              <span>Yet to Participate</span>
            </div>
          </div>
        </section>

        {/* Recent Collections */}
        <section id="collections" className="teacher-panel">
          <div className="panel-heading">
            <div>
              <h3>♻️ Recent Plastic Collections</h3>
              <p>Latest plastic collection activities</p>
            </div>
            <span className="record-count">4 Records</span>
          </div>

          <div className="table-scroll">
            <table className="collection-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Class</th>
                  <th>Plastic Weight</th>
                  <th>Points Earned</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {collections.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.className}</td>
                    <td>{item.weight}</td>
                    <td>{item.points}</td>
                    <td>
                      <span className="verified">Verified</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rewards */}
        <section id="rewards" className="teacher-panel">
          <div className="panel-heading">
            <div>
              <h3>🏆 School Rewards</h3>
              <p>Your school's recycling achievements</p>
            </div>
          </div>

          <div className="reward-box">
            <span>🌟</span>
            <div>
              <h2>3,450 Points</h2>
              <p>Keep collecting plastic to earn more rewards!</p>
            </div>
          </div>
        </section>

        {/* Reports */}
        <section id="reports" className="teacher-panel">
          <h3>📊 School Reports</h3>
          <p>Review school collection, participation and reward records.</p>
          <p className="report-note">
            Dashboard statistics are connected to the database.
            Collection, participation and reward details currently
            contain sample data.
          </p>
        </section>

        {/* Footer */}
        <footer className="teacher-footer">
          ♻️ EcoCycle Plastic Rewards | Together for a Greener Future
        </footer>

      </main>
    </div>
  );
}

export default TeacherDashboard;
