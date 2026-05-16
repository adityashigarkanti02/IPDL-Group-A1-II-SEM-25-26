let globalAttendanceData = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchStudentProfile();
    fetchAttendance();
    fetchComplaints();

    // Event hooks for Predictive Simulator Engine
    document.getElementById('target-threshold').addEventListener('input', (e) => {
        document.getElementById('threshold-val').innerText = `${e.target.value}%`;
        runPredictiveSimulation();
    });
    
    document.getElementById('sim-subject-select').addEventListener('change', runPredictiveSimulation);

    // Complaint Forms
    document.getElementById('complaint-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const category = document.getElementById('comp-category').value;
        const description = document.getElementById('comp-desc').value;

        const res = await fetch('/api/complaints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, description })
        });
        
        if(res.ok) {
            document.getElementById('complaint-form').reset();
            fetchComplaints();
        }
    });

    // Chat Actions
    const sendChat = async () => {
        const inputEl = document.getElementById('chat-input');
        const text = inputEl.value.trim();
        if(!text) return;

        appendMessage(text, 'user', 'Me');
        inputEl.value = '';

        const res = await fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        appendMessage(data.reply, 'bot', 'AI');
    };

    document.getElementById('send-chat-btn').addEventListener('click', sendChat);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendChat();
    });
});

async function fetchStudentProfile() {
    const res = await fetch('/api/profile');
    const data = await res.json();
    
    document.getElementById('student-name').innerText = data.name;
    document.getElementById('student-id').innerText = `ID: ${data.id}`;
    document.getElementById('student-dept').innerText = data.department;
    document.getElementById('student-sem').innerText = data.semester;
    document.getElementById('student-year').innerText = data.academic_year;
    document.getElementById('student-cgpa').innerText = data.cgpa.toFixed(2);
}

async function fetchAttendance() {
    const res = await fetch('/api/attendance');
    globalAttendanceData = await res.json();
    
    const container = document.getElementById('attendance-list');
    const selectDropdown = document.getElementById('sim-subject-select');
    
    container.innerHTML = '';
    selectDropdown.innerHTML = '';

    globalAttendanceData.forEach((item, index) => {
        const percentage = Math.round((item.attended / item.total) * 100);
        const statusClass = percentage < 75 ? 'low-attendance' : 'good-attendance';
        const barColor = percentage < 75 ? 'var(--danger)' : 'var(--success)';
        
        container.innerHTML += `
            <div class="subject-row">
                <div class="subject-info">
                    <span class="course-title-truncate"><strong>${item.subject}</strong></span>
                    <span class="${statusClass}">${percentage}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${percentage}%; background: ${barColor}"></div>
                </div>
            </div>
        `;

        const option = document.createElement('option');
        option.value = item.id;
        option.innerText = item.subject.split(' ').slice(0,2).join(' ') + '...';
        if(index === 0) option.selected = true;
        selectDropdown.appendChild(option);
    });

    runPredictiveSimulation();
}

function runPredictiveSimulation() {
    if(globalAttendanceData.length === 0) return;
    
    const selectedId = parseInt(document.getElementById('sim-subject-select').value);
    const targetThreshold = parseInt(document.getElementById('target-threshold').value);
    
    const course = globalAttendanceData.find(c => c.id === selectedId);
    if(!course) return;

    const currentPercentage = (course.attended / course.total) * 100;
    const metricDisplay = document.getElementById('prediction-metric');
    const titleDisplay = document.getElementById('prediction-title');
    const instructionDisplay = document.getElementById('prediction-instruction');

    if(currentPercentage < targetThreshold) {
        let additionalAttendedNeeded = 0;
        let simulatedAttended = course.attended;
        let simulatedTotal = course.total;

        while((simulatedAttended / simulatedTotal) * 100 < targetThreshold) {
            additionalAttendedNeeded++;
            simulatedAttended++;
            simulatedTotal++;
        }

        titleDisplay.innerText = "CRITICAL METRIC SHORTFALL DETECTED";
        metricDisplay.innerText = `+${additionalAttendedNeeded}`;
        metricDisplay.className = "metric-highlight danger-zone";
        instructionDisplay.innerHTML = `You must attend the next <strong>${additionalAttendedNeeded} classes consecutively</strong> without absence to secure the minimum target of ${targetThreshold}%.`;
    } else {
        let safeMissesAllowed = 0;
        let simulatedTotal = course.total;

        while(((course.attended) / (simulatedTotal + 1)) * 100 >= targetThreshold) {
            safeMissesAllowed++;
            simulatedTotal++;
        }

        titleDisplay.innerText = "COMPLIANCE STATUS: SECURE";
        metricDisplay.innerText = `${safeMissesAllowed}`;
        metricDisplay.className = "metric-highlight safe-zone";
        instructionDisplay.innerHTML = `Your attendance matrix holds a buffer. You can safely miss up to <strong>${safeMissesAllowed} upcoming classes</strong> and stay above your ${targetThreshold}% limit.`;
    }
}

async function fetchComplaints() {
    const res = await fetch('/api/complaints');
    const data = await res.json();
    const container = document.getElementById('complaints-list');
    container.innerHTML = '';

    data.forEach(item => {
        container.innerHTML += `
            <div class="ticket-item">
                <span class="status-badge pending">${item.status}</span>
                <span class="ticket-category">${item.category}</span>
                <p class="ticket-desc">${item.description}</p>
            </div>
        `;
    });
}

function appendMessage(text, side, avatarLabel) {
    const chatBox = document.getElementById('chat-box');
    const wrapper = document.createElement('div');
    wrapper.className = `msg-wrapper ${side}`;
    
    wrapper.innerHTML = `
        <div class="avatar">${avatarLabel}</div>
        <div class="msg-bubble">
            <p class="msg-text">${text}</p>
        </div>
    `;
    
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}