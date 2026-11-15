
import React from "react";
import "./AgencyDashboard.css";

function AgencyDashboard({ onLogout, pickupRequests = [], onUpdateStatus }) {
  const collections = [
    { id: "ECO-101", source: "Ward 1", weight: "120 kg", status: "Received" },
    { id: "ECO-102", source: "Ward 2", weight: "85 kg", status: "Processing" },
    { id: "ECO-103", source: "Ward 3", weight: "150 kg", status: "Received" },
    { id: "ECO-104", source: "School Collection", weight: "75 kg", status: "Completed" }
  ];

  return (
    <div className="agency-dashboard">
      <aside className="agency-sidebar">
        <h2>♻️ EcoCycle</h2>
        <small>RECYCLING AGENCY</small>

        <div className="agency-profile">
          <span>🏭</span>
          <div>
            <strong>Green Recycling Agency</strong>
            <small>Agency Administrator</small>
          </div>
        </div>

        <nav>
          <a href="#agency-overview">▦ Dashboard</a>
          <a href="#agency-collections">♻️ Plastic Collections</a>
          <a href="#agency-household">🏠 Household Requests</a>
          <a href="#agency-processing">🏭 Recycling Process</a>
          <a href="#agency-payments">💰 Payments</a>
          <a href="#agency-reports">📊 Reports</a>
        </nav>

        <button onClick={onLogout}>↪ Sign Out</button>
      </aside>

      <main className="agency-main">
        <header>
          <div>
            <h1>Recycling Agency Dashboard</h1>
            <p>Manage plastic collection and recycling operations.</p>
          </div>
          <span>🏭 Agency Control Room</span>
        </header>

        <section id="agency-overview" className="agency-welcome">
          <h1>Welcome, Recycling Partner! 🌱</h1>
          <p>
            Together, let's transform plastic waste into valuable
            recycled products and build a cleaner environment.
          </p>
        </section>

        <section className="agency-stats">
          <div>
            <span>♻️</span>
            <p>Total Plastic Received</p>
            <h2>2,450 kg</h2>
          </div>
          <div>
            <span>🏭</span>
            <p>Plastic Processed</p>
            <h2>1,850 kg</h2>
          </div>
          <div>
            <span>⏳</span>
            <p>Pending Processing</p>
            <h2>{pickupRequests.filter(r => r.status !== "Collected").length}</h2>
          </div>
          <div>
            <span>🏠</span>
            <p>Household Requests</p>
            <h2>{pickupRequests.length}</h2>
          </div>
        </section>

        <section id="agency-household" className="agency-panel">
          <h2>🏠 Household Pickup Requests</h2>
          <p>View and manage pickup requests submitted by households.</p>

          {pickupRequests.length === 0 ? (
            <p>No household pickup requests available yet.</p>
          ) : (
            <div className="agency-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Waste Type</th>
                    <th>Quantity</th>
                    <th>Pickup Date</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pickupRequests.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.wasteType}</td>
                      <td>{item.weight}</td>
                      <td>{item.date}</td>
                      <td>{item.address}</td>
                      <td>{item.status}</td>
                      <td>
                        {item.status !== "Collected" && (
                          <button
                            onClick={() => onUpdateStatus(item.id)}
                          >
                            Mark Collected
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section id="agency-collections" className="agency-panel">
          <h2>♻️ Plastic Collection Records</h2>
          <p>Monitor plastic received from different collection sources.</p>

          <div className="agency-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Collection ID</th>
                  <th>Source</th>
                  <th>Plastic Weight</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.source}</td>
                    <td>{item.weight}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="agency-processing" className="agency-panel">
          <h2>🏭 Recycling Process</h2>
          <div className="agency-process">
            <div>📥<h3>Collection</h3><p>2,450 kg</p></div>
            <div>⚙️<h3>Processing</h3><p>1,850 kg</p></div>
            <div>✅<h3>Completed</h3><p>1,500 kg</p></div>
          </div>
        </section>

        <section id="agency-payments" className="agency-panel">
          <h2>💰 Payment & Rewards</h2>
          <h1>₹24,500</h1>
          <p>Total sample earnings from recycling activities.</p>
        </section>

        <section id="agency-reports" className="agency-panel">
          <h2>📊 Agency Reports</h2>
          <p>
            View plastic received, processed quantity, pending
            materials and recycling performance.
          </p>
          <div className="agency-note">
            Dashboard figures are sample data. Live database,
            payment integration and reports will be added later.
          </div>
        </section>

        <footer>♻️ EcoCycle | Recycling Agency Portal</footer>
      </main>
    </div>
  );
}

export default AgencyDashboard;
