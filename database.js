const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./campus.db');

db.serialize(() => {

    // =========================
    // STUDENT PROFILE TABLE
    // =========================
    db.run(`
        CREATE TABLE IF NOT EXISTS student_profile (
            id TEXT PRIMARY KEY,
            name TEXT,
            department TEXT,
            semester TEXT,
            cgpa REAL,
            academic_year TEXT
        )
    `);

    // =========================
    // ATTENDANCE TABLE
    // =========================
    db.run(`
        CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject TEXT,
            attended INTEGER,
            total INTEGER
        )
    `);

    // =========================
    // COMPLAINTS TABLE
    // =========================
    db.run(`
        CREATE TABLE IF NOT EXISTS complaints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            description TEXT,
            status TEXT DEFAULT 'Pending'
        )
    `);

    // =========================
    // CIVIL ENGINEERING MODULE
    // INFRASTRUCTURE TABLE
    // =========================
    db.run(`
        CREATE TABLE IF NOT EXISTS infrastructure (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            issue_type TEXT,
            location TEXT,
            severity TEXT,
            description TEXT,
            status TEXT DEFAULT 'Pending'
        )
    `);

    // =========================
    // STUDENT PROFILE DATA
    // =========================
    db.get(
        "SELECT COUNT(*) AS count FROM student_profile",
        (err, row) => {

            if (row.count === 0) {

                db.run(`
                    INSERT INTO student_profile
                    (id, name, department, semester, cgpa, academic_year)
                    VALUES
                    (
                        'STU-2026-4545',
                        'Virat Kohli',
                        'Information Science & Engineering',
                        'II Semester',
                        9.14,
                        '2025-2026'
                    )
                `);

                console.log("✅ Student Profile Created");
            }
        }
    );

    // =========================
    // ATTENDANCE DATA
    // =========================
    db.get(
        "SELECT COUNT(*) AS count FROM attendance",
        (err, row) => {

            if (row.count === 0) {

                db.run(`
                    INSERT INTO attendance
                    (subject, attended, total)
                    VALUES
                    ('11BAIA203 INTRO TO AI AND APPLICATIONS',24,26)
                `);

                db.run(`
                    INSERT INTO attendance
                    (subject, attended, total)
                    VALUES
                    ('21BCHES202 SMART MATERIALS FOR EMERGING TECH',31,35)
                `);

                db.run(`
                    INSERT INTO attendance
                    (subject, attended, total)
                    VALUES
                    ('11BENGL206 COMMUNICATION SKILLS',8,9)
                `);

                db.run(`
                    INSERT INTO attendance
                    (subject, attended, total)
                    VALUES
                    ('11BESC204B INTRO TO ELECTRICAL ENGINEERING',19,26)
                `);

                db.run(`
                    INSERT INTO attendance
                    (subject, attended, total)
                    VALUES
                    ('11BICO207 INDIAN CONSTITUTION & ETHICS',10,10)
                `);

                db.run(`
                    INSERT INTO attendance
                    (subject, attended, total)
                    VALUES
                    ('11BMATS201 MULTIVARIATE CALCULUS & STATS',28,36)
                `);

                db.run(`
                    INSERT INTO attendance
                    (subject, attended, total)
                    VALUES
                    ('11BPLC205B PYTHON PROGRAMMING',32,34)
                `);

                db.run(`
                    INSERT INTO attendance
                    (subject, attended, total)
                    VALUES
                    ('11BPRJ208 INTERDISCIPLINARY PBL',6,6)
                `);

                console.log("✅ Attendance Data Added");
            }
        }
    );

    // =========================
    // SAMPLE COMPLAINTS
    // =========================
    db.get(
        "SELECT COUNT(*) AS count FROM complaints",
        (err, row) => {

            if (row.count === 0) {

                db.run(`
                    INSERT INTO complaints
                    (category, description)
                    VALUES
                    (
                        'WiFi',
                        'Internet connection unavailable in Block B'
                    )
                `);

                db.run(`
                    INSERT INTO complaints
                    (category, description)
                    VALUES
                    (
                        'Projector',
                        'Projector not working in Classroom 204'
                    )
                `);

                console.log("✅ Complaint Data Added");
            }
        }
    );

    // =========================
    // INFRASTRUCTURE DATA
    // =========================
    db.get(
        "SELECT COUNT(*) AS count FROM infrastructure",
        (err, row) => {

            if (row.count === 0) {

                db.run(`
                    INSERT INTO infrastructure
                    (
                        issue_type,
                        location,
                        severity,
                        description
                    )
                    VALUES
                    (
                        'Wall Crack',
                        'Block A',
                        'High',
                        'Visible crack near staircase'
                    )
                `);

                db.run(`
                    INSERT INTO infrastructure
                    (
                        issue_type,
                        location,
                        severity,
                        description
                    )
                    VALUES
                    (
                        'Water Leakage',
                        'Hostel Block 2',
                        'Medium',
                        'Leakage detected in washroom'
                    )
                `);

                db.run(`
                    INSERT INTO infrastructure
                    (
                        issue_type,
                        location,
                        severity,
                        description
                    )
                    VALUES
                    (
                        'Road Damage',
                        'Main Gate',
                        'High',
                        'Large pothole causing inconvenience'
                    )
                `);

                console.log("✅ Infrastructure Data Added");
            }
        }
    );

});

module.exports = db;