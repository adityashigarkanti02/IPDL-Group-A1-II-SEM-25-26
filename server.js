const express = require("express");
const path = require("path");

const {
    profile,
    attendance,
    complaints,
    infrastructureReports
} = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


// =====================
// PROFILE
// =====================

app.get("/api/profile", (req, res) => {
    res.json(profile);
});


// =====================
// ATTENDANCE
// =====================

app.get("/api/attendance", (req, res) => {
    res.json(attendance);
});


// =====================
// COMPLAINTS
// =====================

app.get("/api/complaints", (req, res) => {
    res.json(complaints);
});

app.post("/api/complaints", (req, res) => {

    const { category, description } = req.body;

    const complaint = {
        id: complaints.length + 1,
        category,
        description,
        status: "Pending"
    };

    complaints.unshift(complaint);

    res.json(complaint);
});


// =====================
// INFRASTRUCTURE
// =====================

app.get("/api/infrastructure", (req, res) => {
    res.json(infrastructureReports);
});

app.post("/api/infrastructure", (req, res) => {

    const {
        issueType,
        location,
        severity,
        description
    } = req.body;

    const report = {
        id: infrastructureReports.length + 1,
        issueType,
        location,
        severity,
        description
    };

    infrastructureReports.unshift(report);

    res.json(report);
});


// =====================
// AI CHATBOT
// =====================

app.post("/api/chatbot", (req, res) => {

    const message = req.body.message.toLowerCase();

    let response =
        "I can help with attendance, exams, complaints, infrastructure monitoring and SmartCampus services.";

    if (
        message.includes("hello") ||
        message.includes("hi")
    ) {

        response =
            "👋 Welcome to SmartCampus AI. How can I assist you today?";
    }

    else if (
        message.includes("attendance")
    ) {

        response =
            "📊 Students must maintain at least 75% attendance for exam eligibility.";
    }

    else if (
        message.includes("exam")
    ) {

        response =
            "📅 Examination schedules will be published through the student portal.";
    }

    else if (
        message.includes("python")
    ) {

        response =
            "🐍 Python Programming Lab submissions are evaluated weekly.";
    }

    else if (
        message.includes("ai")
    ) {

        response =
            "🤖 AI & Applications covers Machine Learning, Neural Networks and Intelligent Systems.";
    }

    else if (
        message.includes("civil") ||
        message.includes("infrastructure")
    ) {

        response =
            "🏗 Infrastructure Monitoring tracks wall cracks, water leakage, road damage and maintenance activities.";
    }

    res.json({
        reply: response
    });
});


// =====================
// START SERVER
// =====================

app.listen(PORT, () => {

    console.log(
        `🚀 SmartCampus AI running on http://localhost:${PORT}`
    );

});