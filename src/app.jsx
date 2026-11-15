
import React, { useState } from "react";
import TeacherDashboard from "./TeacherDashboard.jsx";
import AuthorityDashboard from "./AuthorityDashboard.jsx";
import AgencyDashboard from "./AgencyDashboard.jsx";
import HouseholdDashboard from "./HouseholdDashboard.jsx";
import "./app.css";

const roles = {
  Household: {
    icon: "🏠",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200",
    badge: "HOUSEHOLD",
    heading: "Make Your Home a Part of a Cleaner Future.",
    description: "Turn your plastic waste into rewards and help build a sustainable community.",
    features: [
      "Register your household",
      "Schedule plastic waste collection",
      "Track collected plastic and rewards",
      "Earn points for responsible recycling",
    ],
    welcome: "Welcome Back!",
    subtitle: "Sign in to manage your household rewards.",
  },

  Teacher: {
    icon: "🏫",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200",
    badge: "TEACHER / SCHOOL",
    heading: "Inspire Students. Build a Cleaner Future.",
    description: "Empower students to participate in plastic recycling and create a greener tomorrow.",
    features: [
      "Register and manage school participation",
      "Track plastic collected by students",
      "View school reward points",
      "Encourage sustainable habits",
    ],
    welcome: "Welcome, Teacher!",
    subtitle: "Sign in to manage your school's activities.",
  },

  Authority: {
    icon: "🏛️",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200",
    badge: "LOCAL AUTHORITY",
    heading: "Manage Communities. Drive Real Impact.",
    description: "Monitor waste management activities and create cleaner communities.",
    features: [
      "Monitor household participation",
      "Track plastic collection records",
      "Manage sanitation workers",
      "Monitor rewards and recycling activities",
    ],
    welcome: "Authority Login",
    subtitle: "Access your Gram Panchayat control room.",
  },

  Agency: {
    icon: "♻️",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200",
    badge: "RECYCLING AGENCY",
    heading: "Transform Plastic Waste Into New Value.",
    description: "Connect recycling agencies with communities for a sustainable future.",
    features: [
      "View assigned plastic transfers",
      "Confirm received plastic weight",
      "Track recycling records",
      "Support transparent waste management",
    ],
    welcome: "Agency Login",
    subtitle: "Sign in to manage your recycling operations.",
  },
};

function App() {
  const [isTeacherDashboard, setIsTeacherDashboard] = useState(false);
  const [isAuthorityDashboard, setIsAuthorityDashboard] = useState(false);
  const [isAgencyDashboard, setIsAgencyDashboard] = useState(false);
  const [isHouseholdDashboard, setIsHouseholdDashboard] = useState(false);

  const [role, setRole] = useState("Household");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pickup requests
  const [pickupRequests, setPickupRequests] = useState([]);

  const handleNewPickup = (request) => {
    const newRequest = {
      ...request,
      id: `ECO-${204 + pickupRequests.length}`,
      status: "Scheduled",
    };

    setPickupRequests((previous) => [...previous, newRequest]);
  };

  const handleUpdateStatus = (id) => {
    setPickupRequests((previous) =>
      previous.map((request) =>
        request.id === id
          ? { ...request, status: "Collected" }
          : request
      )
    );
  };

  const current = roles[role];

  // REGISTER AND LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const url = isRegister
      ? "http://localhost:5000/api/register"
      : "http://localhost:5000/api/login";

    const data = isRegister
      ? {
          name: fullName.trim(),
          email: email.trim(),
          password,
          role,
        }
      : {
          email: email.trim(),
          password,
          role,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Something went wrong");
        return;
      }

      alert(result.message);

      if (isRegister) {
        setIsRegister(false);
        setFullName("");
        setEmail("");
        setPassword("");
        return;
      }

      if (role === "Teacher") {
        setIsTeacherDashboard(true);
      } else if (role === "Authority") {
        setIsAuthorityDashboard(true);
      } else if (role === "Agency") {
        setIsAgencyDashboard(true);
      } else if (role === "Household") {
        setIsHouseholdDashboard(true);
      }

    } catch (error) {
      console.error("API Error:", error);
      alert("Cannot connect to backend. Check whether server.js is running.");
    } finally {
      setLoading(false);
    }
  };

  // DASHBOARDS
  if (isTeacherDashboard) {
    return (
      <TeacherDashboard
        onLogout={() => setIsTeacherDashboard(false)}
      />
    );
  }

  if (isAuthorityDashboard) {
    return (
      <AuthorityDashboard
        onLogout={() => setIsAuthorityDashboard(false)}
      />
    );
  }

  if (isAgencyDashboard) {
    return (
      <AgencyDashboard
        onLogout={() => setIsAgencyDashboard(false)}
        pickupRequests={pickupRequests}
        onUpdateStatus={handleUpdateStatus}
      />
    );
  }

  if (isHouseholdDashboard) {
    return (
      <HouseholdDashboard
        onLogout={() => setIsHouseholdDashboard(false)}
        pickupRequests={pickupRequests}
        onNewPickup={handleNewPickup}
      />
    );
  }

  return (
    <div className="page">
      <div className="login-container">

        {/* LEFT SIDE */}
        <section
          className="hero"
          style={{
            backgroundImage: `
              linear-gradient(
                145deg,
                rgba(5, 65, 32, 0.88),
                rgba(28, 145, 70, 0.72)
              ),
              url("${current.image}")
            `,
          }}
        >
          <div className="hero-content">

            <div className="brand">
              <div className="brand-icon">♻️</div>
              <div>
                <h2>EcoCycle</h2>
                <span>PLASTIC REWARDS</span>
              </div>
            </div>

            <div className="hero-text">
              <span className="role-badge">
                {current.icon} {current.badge}
              </span>

              <h1>{current.heading}</h1>
              <p>{current.description}</p>

              <div className="features">
                {current.features.map((feature, index) => (
                  <div className="feature" key={index}>
                    <span className="check">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-footer">
              🌱 Together for a cleaner and greener tomorrow.
            </div>

          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="form-section">
          <div className="form-content">

            <div className="mobile-brand">
              ♻️ EcoCycle
            </div>

            <span className="small-label">
              PLASTIC REWARDS PLATFORM
            </span>

            <h1>
              {isRegister ? "Create Your Account" : current.welcome}
            </h1>

            <p className="form-subtitle">
              {isRegister
                ? "Join EcoCycle and start recycling."
                : current.subtitle}
            </p>

            <label className="field-label">
              Select Your Role
            </label>

            <div className="role-selector">
              {Object.keys(roles).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    role === item
                      ? "role-option active"
                      : "role-option"
                  }
                  onClick={() => {
                    setRole(item);
                    setIsRegister(false);
                    setFullName("");
                    setEmail("");
                    setPassword("");
                  }}
                >
                  <span>{roles[item].icon}</span>
                  {item}
                </button>
              ))}
            </div>

            <button
              className="google-button"
              type="button"
              onClick={() =>
                alert("Google sign-in will be connected later.")
              }
            >
              <span className="google-g">G</span>
              Continue with Google
            </button>

            <div className="divider">
              <span>OR CONTINUE WITH EMAIL</span>
            </div>

            <form onSubmit={handleSubmit}>

              {isRegister && (
                <>
                  <label className="field-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </>
              )}

              <label className="field-label">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="field-label">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {!isRegister && (
                <div className="forgot">
                  <a href="#forgot">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                className="submit-button"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : isRegister
                    ? "Create Account →"
                    : "Sign In →"}
              </button>

            </form>

            <p className="register-text">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}

              <button
                type="button"
                className="register-link"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setFullName("");
                  setEmail("");
                  setPassword("");
                }}
              >
                {isRegister ? "Sign In" : "Create Account"}
              </button>
            </p>

            <p className="terms">
              By continuing, you agree to our Terms of Service
              and Privacy Policy.
            </p>

          </div>
        </section>

      </div>
    </div>
  );
}

export default App;
