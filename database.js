const profile = {
    id: "STU-2026-4545",
    name: "Aditya S",
    department: "Information Science & Engineering",
    semester: "II Semester",
    cgpa: 9.14,
    academic_year: "2025-2026"
};

const attendance = [
    {
        subject: "11BAIA203 INTRO TO AI AND APPLICATIONS",
        attended: 24,
        total: 26
    },
    {
        subject: "21BCHES202 SMART MATERIALS FOR EMERGING TECH",
        attended: 31,
        total: 35
    },
    {
        subject: "11BENGL206 COMMUNICATION SKILLS",
        attended: 8,
        total: 9
    },
    {
        subject: "11BESC204B INTRO TO ELECTRICAL ENGINEERING",
        attended: 19,
        total: 26
    },
    {
        subject: "11BMATS201 MULTIVARIATE CALCULUS & STATS",
        attended: 28,
        total: 36
    },
    {
        subject: "11BPLC205B PYTHON PROGRAMMING",
        attended: 32,
        total: 34
    }
];

let complaints = [
    {
        id: 1,
        category: "WiFi Issue",
        description: "Poor connectivity in Block A",
        status: "Pending"
    }
];

let infrastructureReports = [
    {
        id: 1,
        issueType: "Wall Crack",
        location: "Civil Block",
        severity: "Medium",
        description: "Minor structural crack observed"
    }
];

module.exports = {
    profile,
    attendance,
    complaints,
    infrastructureReports
};