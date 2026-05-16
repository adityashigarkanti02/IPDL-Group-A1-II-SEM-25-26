const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./campus.db');

db.serialize(() => {
    // 1. Initialize Student Profile Data Matrix Table
    db.run(`CREATE TABLE IF NOT EXISTS student_profile (
        id TEXT PRIMARY KEY,
        name TEXT,
        department TEXT,
        semester TEXT,
        cgpa REAL,
        academic_year TEXT
    )`);

    // 2. Initialize Course Attendance Data Table
    db.run(`CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject TEXT,
        attended INTEGER,
        total INTEGER
    )`);

    // 3. Initialize Operations Complaints Tracking Table
    db.run(`CREATE TABLE IF NOT EXISTS complaints (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        description TEXT,
        status TEXT DEFAULT 'Pending'
    )`);

    // 4. Seed Dynamic Student Data for Rohit Sharma (ISE Stream)
    db.get("SELECT COUNT(*) as count FROM student_profile", (err, row) => {
        if (row.count === 0) {
            db.run(`INSERT INTO student_profile (id, name, department, semester, cgpa, academic_year) 
                    VALUES ('STU-2026-4545', 'Rohit Sharma', 'Information Science & Engineering', 'II Semester', 9.14, '2025-2026')`);
        }
    });

    // 5. Populate Core Engineering Attendance Ledger Metrics
    db.get("SELECT COUNT(*) as count FROM attendance", (err, row) => {
        if (row.count === 0) {
            db.run("INSERT INTO attendance (subject, attended, total) VALUES ('11BAIA203 INTRO TO AI AND APPLICATIONS', 24, 26)");
            db.run("INSERT INTO attendance (subject, attended, total) VALUES ('21BCHES202 SMART MATERIALS FOR EMERGING TECH', 31, 35)");
            db.run("INSERT INTO attendance (subject, attended, total) VALUES ('11BENGL206 COMMUNICATION SKILLS', 8, 9)");
            db.run("INSERT INTO attendance (subject, attended, total) VALUES ('11BESC204B INTRO TO ELECTRICAL ENGINEERING', 19, 26)");
            db.run("INSERT INTO attendance (subject, attended, total) VALUES ('11BICO207 INDIAN CONSTITUTION & ETHICS', 10, 10)");
            db.run("INSERT INTO attendance (subject, attended, total) VALUES ('11BMATS201 MULTIVARIATE CALCULUS & STATS', 28, 36)");
            db.run("INSERT INTO attendance (subject, attended, total) VALUES ('11BPLC205B PYTHON PROGRAMMING', 32, 34)");
            db.run("INSERT INTO attendance (subject, attended, total) VALUES ('11BPRJ208 INTERDISCIPLINARY PBL', 6, 6)");
            
            console.log("✅ Academic database seeded successfully for Rohit Sharma.");
        }
    });
});

module.exports = db;