const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Profile Data Endpoint
app.get('/api/profile', (req, res) => {
    db.get("SELECT * FROM student_profile LIMIT 1", [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// Attendance Data Endpoint
app.get('/api/attendance', (req, res) => {
    db.all("SELECT * FROM attendance", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Complaints Fetch Endpoint
app.get('/api/complaints', (req, res) => {
    db.all("SELECT * FROM complaints ORDER BY id DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Complaint Submission Endpoint
app.post('/api/complaints', (req, res) => {
    const { category, description } = req.body;
    db.run("INSERT INTO complaints (category, description) VALUES (?, ?)", [category, description], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, category, description, status: 'Pending' });
    });
});

// AI Chatbot Logic Node
app.post('/api/chatbot', (req, res) => {
    const message = req.body.message.toLowerCase();
    let response = "I'm sorry, I don't have instructions for that item. Try asking about 'exams', 'hostel', or specific subjects like 'AI', 'Python', or 'Calculus'!";

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        response = "👋 Hello! I am your AI Assistant workspace concierge. How can I assist your engineering study cycle today?";
    } else if (message.includes('exam') || message.includes('schedule') || message.includes('date sheet')) {
        response = "📅 Mid-Term evaluations approach next month. Detailed schedules and seating arrangements will update directly to your student portal shortly.";
    } else if (message.includes('hostel') || message.includes('wifi') || message.includes('mess')) {
        response = "🏢 For Campus infrastructure support or Hostel Warden check-ins, visit Block A, Room 102, or open an official support desk ticket.";
    } else if (message.includes('attendance') || message.includes('criteria') || message.includes('detain')) {
        response = "📈 Academic Policy Reminder: Students must maintain a minimum threshold of 75% attendance across all registered courses to clear exam eligibility flags.";
    } else if (message.includes('python') || message.includes('bplc205b')) {
        response = "🐍 [11BPLC205B] Python Programming lab uploads are evaluated weekly. Ensure your data structures portfolio scripts run without syntax errors before submission deadlines.";
    } else if (message.includes('ai') || message.includes('baia203') || message.includes('application')) {
        response = "🤖 [11BAIA203] For Intro to AI and Applications, reference materials for Machine Learning models and neural network logic arrays are accessible in the Digital Library directory.";
    } else if (message.includes('electrical') || message.includes('ee') || message.includes('besc204b')) {
        response = "⚡ [11BESC204B] Introduction to Electrical Engineering tutorial guidelines and Circuit Analysis notes have been refreshed. Review AC/DC networking problems ahead of the next seminar.";
    } else if (message.includes('math') || message.includes('calculus') || message.includes('mats201')) {
        response = "📐 [11BMATS201] Multivariate Calculus tutorial problems focusing on Partial Derivatives and Numerical Statistics models have been uploaded by the department chair.";
    } else if (message.includes('materials') || message.includes('bches202')) {
        response = "🔬 [21BCHES202] Smart Materials for Emerging Tech lab modules require proper research safety protocol compliance forms signed by your instructor.";
    } else if (message.includes('project') || message.includes('pbl') || message.includes('bprj208')) {
        response = "💡 [11BPRJ208] Interdisciplinary Project-Based Learning phase assessments evaluate project architecture maps, dynamic schema design, and operational software logic.";
    }

    res.json({ reply: response });
});

app.listen(PORT, () => {
    console.log(`🚀 AI Assistant System Server spinning up live at: http://localhost:3000`);
});