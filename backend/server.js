
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// HOME ROUTE
app.get("/", (req, res) => {
    res.send("EcoCycle Backend is Running!");
});

// CHECK DATABASE
app.get("/test-db", (req, res) => {
    db.query("SELECT DATABASE() AS database_name", (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(result);
    });
});

// DISPLAY DATABASE TABLES
app.get("/api/test-db", (req, res) => {
    db.query("SHOW TABLES", (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            totalTables: results.length,
            tables: results
        });
    });
});

// REGISTER API
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const validRoles = [
            "household",
            "teacher",
            "authority",
            "agency"
        ];

        const cleanEmail = email.trim().toLowerCase();
        const selectedRole = role.trim().toLowerCase();

        if (!validRoles.includes(selectedRole)) {
            return res.status(400).json({
                message: "Invalid role"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users
            (full_name, email, password, role)
            VALUES (?, ?, ?, ?)
        `;

        db.query(
            sql,
            [name.trim(), cleanEmail, hashedPassword, selectedRole],
            (err, result) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({
                            message: "Email already registered"
                        });
                    }

                    console.log("Registration error:", err);

                    return res.status(500).json({
                        message: "Registration failed"
                    });
                }

                res.status(201).json({
                    message: "Registration successful",
                    userId: result.insertId
                });
            }
        );

    } catch (error) {
        console.log("Registration error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// LOGIN API
app.post("/api/login", (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({
            message: "Email, password and role are required"
        });
    }

    const cleanEmail = email.trim().toLowerCase();
    const selectedRole = role.trim().toLowerCase();

    const sql = `
        SELECT user_id, full_name, email, password, role
        FROM users
        WHERE email = ?
    `;

    db.query(sql, [cleanEmail], async (err, results) => {

        if (err) {
            console.log("Login database error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Email not registered"
            });
        }

        const user = results[0];

        try {
            let passwordMatch = false;

            // Support both old plain-text and bcrypt passwords
            if (user.password.startsWith("$2")) {
                passwordMatch = await bcrypt.compare(
                    password,
                    user.password
                );
            } else {
                passwordMatch = password === user.password;
            }

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Incorrect password"
                });
            }

            if (user.role.toLowerCase() !== selectedRole) {
                return res.status(401).json({
                    message: "Please select the correct role"
                });
            }

            console.log("Login successful:", cleanEmail);

            return res.json({
                message: "Login successful",
                user: {
                    user_id: user.user_id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role
                }
            });

        } catch (error) {
            console.log("Login error:", error);

            return res.status(500).json({
                message: "Login failed"
            });
        }
    });
});

// TEACHER DASHBOARD
app.get("/teacher-dashboard", (req, res) => {
    const sql = `
        SELECT
            (SELECT COUNT(*) FROM userdata) AS total_users,
            (SELECT COUNT(*) FROM items) AS total_items,
            (SELECT COUNT(*) FROM orders) AS total_orders,
            (SELECT COUNT(*) FROM addreview) AS total_reviews
    `;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result[0]);
    });
});

// START SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
