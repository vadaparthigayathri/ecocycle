
import React, { useState } from "react";
import "./HouseholdDashboard.css";

function HouseholdDashboard({ onLogout, pickupRequests = [], onNewPickup }) {
  const [showForm, setShowForm] = useState(false);
  const [wasteType, setWasteType] = useState("Plastic");
  const [quantity, setQuantity] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [address, setAddress] = useState("");

  const collections = [
    { id: "ECO-201", date: "10 Nov 2026", weight: "12 kg", status: "Collected" },
    { id: "ECO-202", date: "12 Nov 2026", weight: "8 kg", status: "Processing" },
    { id: "ECO-203", date: "14 Nov 2026", weight: "15 kg", status: "Scheduled" },
    ...pickupRequests
  ];

  const handlePickupRequest = (e) => {
    e.preventDefault();

    const newRequest = {
      wasteType,
      date: pickupDate,
      weight: quantity + " kg",
      address
    };

    onNewPickup(newRequest);

    alert("Your pickup request has been submitted successfully!");

    setWasteType("Plastic");
    setQuantity("");
    setPickupDate("");
    setAddress("");
    setShowForm(false);
  };

  return (
    <div className="household-dashboard">
      <aside className="household-sidebar">
        <h2>♻️ EcoCycle</h2>
        <small>PLASTIC REWARDS</small>

        <div className="household-profile">
          <span>🏠</span>
          <div>
            <strong>My Household</strong>
            <small>Registered Member</small>
          </div>
        </div>

        <nav>
          <a href="#home-overview">▦ Dashboard</a>
          <a href="#home-collection">♻️ My Collections</a>
          <a href="#home-schedule">📅 Schedule Pickup</a>
          <a href="#home-rewards">🏆 My Rewards</a>
          <a href="#home-history">📊 Collection History</a>
        </nav>

        <button onClick={onLogout}>↪ Sign Out</button>
      </aside>

      <main className="household-main">
        <header>
          <div>
            <h1>Household Dashboard</h1>
            <p>Manage your plastic recycling activities.</p>
          </div>
          <span>🏠 Household Portal</span>
        </header>

        {/* Dashboard Welcome Image */}
        <section id="home-overview" className="household-welcome">
          <div className="household-welcome-content">
            <h1>Welcome Back! 🌱</h1>
            <p>
              Every plastic bottle you recycle makes a difference.
              Keep recycling and earn more rewards!
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1000"
            alt="Recycling bins and plastic waste collection"
          />
        </section>

        <section className="household-stats">
          <div>
            <span>♻️</span>
            <p>Total Plastic Recycled</p>
            <h2>125 kg</h2>
          </div>
          <div>
            <span>🏆</span>
            <p>Reward Points</p>
            <h2>1,250</h2>
          </div>
          <div>
            <span>🚚</span>
            <p>Total Collections</p>
            <h2>{15 + pickupRequests.length}</h2>
          </div>
          <div>
            <span>📅</span>
            <p>Upcoming Pickup</p>
            <h2>
              {pickupRequests.length > 0
                ? pickupRequests[pickupRequests.length - 1].date
                : "16 Nov"}
            </h2>
          </div>
        </section>

        {/* My Plastic Collection */}
        <section id="home-collection" className="household-panel">
          <h2>♻️ My Plastic Collection</h2>
          <p>Track your plastic waste collection records.</p>

          <img
            className="household-section-image"
            src="https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?w=1000"
            alt="Plastic bottles sorted for recycling"
          />

          <div className="household-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Collection ID</th>
                  <th>Date</th>
                  <th>Waste Type / Weight</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((item, index) => (
                  <tr key={item.id || `${item.date}-${index}`}>
                    <td>{item.id || `ECO-${204 + index - 3}`}</td>
                    <td>{item.date}</td>
                    <td>
                      {item.wasteType
                        ? `${item.wasteType} - ${item.weight}`
                        : item.weight}
                    </td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Schedule Pickup */}
        <section id="home-schedule" className="household-panel">
          <h2>📅 Schedule Plastic Pickup</h2>
          <p>Request a plastic waste collection from your home.</p>

          <div className="household-schedule">
            <img
              src="https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=1000"
              alt="Waste collection and recycling service"
            />

            <div>
              <span>🚚</span>
              <h3>Request Collection</h3>
              <p>Arrange a pickup for your recyclable waste.</p>

              <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close Form" : "Schedule Pickup"}
              </button>
            </div>
          </div>

          {showForm && (
            <form onSubmit={handlePickupRequest}>
              <h3>New Pickup Request</h3>

              <label>Waste Type</label>
              <select
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
              >
                <option value="Plastic">Plastic</option>
                <option value="Wet Waste">Wet Waste</option>
                <option value="Dry Waste">Dry Waste</option>
                <option value="E-Waste">E-Waste</option>
              </select>

              <label>Waste Quantity (kg)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />

              <label>Pickup Date</label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
              />

              <label>Pickup Address</label>
              <textarea
                placeholder="Enter your complete address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <button type="submit">
                Submit Pickup Request
              </button>
            </form>
          )}
        </section>

        {/* Rewards */}
        <section id="home-rewards" className="household-panel">
          <h2>🏆 My Recycling Rewards</h2>

          <div className="household-reward">
            <img
              src="https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=700"
              alt="Green plant representing environmental rewards"
            />

            <div>
              <h1>1,250 Points</h1>
              <p>Keep recycling plastic to earn more rewards!</p>
            </div>
          </div>
        </section>

        {/* Recycling Impact */}
        <section id="home-history" className="household-panel">
          <h2>📊 Recycling Impact</h2>
          <p>Your contribution helps create a cleaner community.</p>

          <img
            className="household-section-image"
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000"
            alt="People helping protect the environment"
          />

          <div className="household-impact">
            <div>
              <strong>125 kg</strong>
              <span>Plastic Recycled</span>
            </div>
            <div>
              <strong>15</strong>
              <span>Successful Collections</span>
            </div>
            <div>
              <strong>1,250</strong>
              <span>Points Earned</span>
            </div>
          </div>
        </section>

        <footer>♻️ EcoCycle | Household Recycling Portal</footer>
      </main>
    </div>
  );
}

export default HouseholdDashboard;
