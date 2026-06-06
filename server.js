const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// =========================
// PROFILE API
// =========================
app.get('/api/profile', (req, res) => {

    db.get(
        "SELECT * FROM student_profile LIMIT 1",
        [],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(row);
        }
    );

});


// =========================
// ATTENDANCE API
// =========================
app.get('/api/attendance', (req, res) => {

    db.all(
        "SELECT * FROM attendance",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);
        }
    );

});


// =========================
// COMPLAINTS API
// =========================
app.get('/api/complaints', (req, res) => {

    db.all(
        "SELECT * FROM complaints ORDER BY id DESC",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);
        }
    );

});


app.post('/api/complaints', (req, res) => {

    const {
        category,
        description
    } = req.body;

    db.run(
        `
        INSERT INTO complaints
        (category, description)
        VALUES (?, ?)
        `,
        [category, description],
        function(err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                id: this.lastID,
                category,
                description,
                status: 'Pending'
            });
        }
    );

});


// =========================
// INFRASTRUCTURE API
// =========================
app.get('/api/infrastructure', (req, res) => {

    db.all(
        "SELECT * FROM infrastructure ORDER BY id DESC",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);
        }
    );

});


app.post('/api/infrastructure', (req, res) => {

    const {
        issue_type,
        location,
        severity,
        description
    } = req.body;

    db.run(
        `
        INSERT INTO infrastructure
        (
            issue_type,
            location,
            severity,
            description
        )
        VALUES (?, ?, ?, ?)
        `,
        [
            issue_type,
            location,
            severity,
            description
        ],
        function(err) {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                success: true
            });
        }
    );

});


// =========================
// AI CHATBOT API
// =========================
app.post('/api/chatbot', (req, res) => {

    const message =
        req.body.message.toLowerCase();

    let response =
        "Sorry, I don't understand. Try asking about exams, hostel, attendance, AI, Python, or infrastructure.";

    if (
        message.includes('hello') ||
        message.includes('hi')
    ) {
        response =
            "👋 Hello! Welcome to Smart Campus Assistant.";
    }

    else if (
        message.includes('exam')
    ) {
        response =
            "📅 Mid-term examinations begin next month.";
    }

    else if (
        message.includes('hostel')
    ) {
        response =
            "🏢 Hostel Office: Block A, Room 102.";
    }

    else if (
        message.includes('attendance')
    ) {
        response =
            "📈 Minimum attendance required is 75%.";
    }

    else if (
        message.includes('python')
    ) {
        response =
            "🐍 Python Lab submissions are evaluated weekly.";
    }

    else if (
        message.includes('ai')
    ) {
        response =
            "🤖 AI study materials are available in the Digital Library.";
    }

    else if (
        message.includes('crack') ||
        message.includes('wall')
    ) {
        response =
            "🏗 Wall crack issues can be reported through Infrastructure Monitoring.";
    }

    else if (
        message.includes('water') ||
        message.includes('leakage')
    ) {
        response =
            "💧 Water leakage issues should be reported immediately through the Infrastructure Portal.";
    }

    res.json({
        reply: response
    });

});


// =========================
// HOME PAGE
// =========================
app.get('/', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'public',
            'index.html'
        )
    );

});


// =========================
// START SERVER
// =========================
app.listen(PORT, () => {

    console.log(
        `🚀 Server Running:
http://localhost:${PORT}`
    );

});