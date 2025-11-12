// Sample data
let currentUser = 'John Doe';
let currentRole = 'resident';
let complaints = [
    { id: 'C001', location: '123 Main St', description: 'Complete power outage', status: 'pending', date: '2025-11-05', priority: 'high', crew: 'Not assigned' },
    { id: 'C002', location: '456 Oak Ave', description: 'Voltage fluctuation', status: 'progress', date: '2025-11-04', priority: 'medium', crew: 'Crew A' },
    { id: 'C003', location: '789 Pine Rd', description: 'Partial outage', status: 'resolved', date: '2025-11-03', priority: 'low', crew: 'Crew B' }
];

// Login function (F3)
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('userRole').value;

    if (username && password) {
        // Simple mock authentication
        currentUser = username;
        currentRole = role;
        document.getElementById('currentUser').textContent = username;
        document.getElementById('currentRole').textContent = role.charAt(0).toUpperCase() + role.slice(1);
        
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        
        // Show appropriate dashboard
        showDashboard(role);
    } else {
        alert('Please enter username and password');
    }
}

// Show registration screen (F3)
function showRegister() {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.remove('hidden');
}

// Register function (F3)
function register() {
    alert('Registration successful! You can now login with your credentials.');
    backToLogin();
}

// Back to login
function backToLogin() {
    document.getElementById('registerScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
}

// Logout
function logout() {
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

// Show dashboard based on role
function showDashboard(role) {
    // Hide all dashboards first
    document.getElementById('residentDashboard').classList.add('hidden');
    document.getElementById('officerDashboard').classList.add('hidden');
    document.getElementById('technicianDashboard').classList.add('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');

    // Show the selected dashboard and perform initial load actions
    if (role === 'resident') {
        document.getElementById('residentDashboard').classList.remove('hidden');
        loadPastComplaints();
    } else if (role === 'officer') {
        document.getElementById('officerDashboard').classList.remove('hidden');
    } else if (role === 'technician') {
        document.getElementById('technicianDashboard').classList.remove('hidden');
    } else if (role === 'admin') {
        document.getElementById('adminDashboard').classList.remove('hidden');
    }
}

// Resident tab switching
function switchResidentTab(tab, element) {
    document.querySelectorAll('#residentDashboard .nav-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    
    document.getElementById('residentSubmit').classList.add('hidden');
    document.getElementById('residentStatus').classList.add('hidden');
    document.getElementById('residentHistory').classList.add('hidden');
    
    if (tab === 'submit') {
        document.getElementById('residentSubmit').classList.remove('hidden');
    } else if (tab === 'status') {
        document.getElementById('residentStatus').classList.remove('hidden');
    } else if (tab === 'history') {
        document.getElementById('residentHistory').classList.remove('hidden');
        loadPastComplaints(); // Reload when history tab is clicked
    }
}

// Submit complaint (F2)
function submitComplaint() {
    const location = document.getElementById('complaintLocation').value;
    const description = document.getElementById('complaintDescription').value;
    const dateTime = document.getElementById('complaintDateTime').value;
    const priority = document.getElementById('complaintPriority').value;

    if (location && description && dateTime) {
        // Generate a simple complaint ID
        const complaintId = 'C' + String(Math.floor(Math.random() * 900) + 100);
        document.getElementById('generatedId').textContent = complaintId;
        document.getElementById('submitSuccess').classList.remove('hidden');
        
        // Clear form
        document.getElementById('complaintLocation').value = '';
        document.getElementById('complaintDescription').value = '';
        document.getElementById('complaintDateTime').value = '';
        
        // Add to complaints array
        complaints.push({
            id: complaintId,
            location: location,
            description: description,
            status: 'pending',
            date: new Date().toISOString().split('T')[0],
            priority: priority,
            crew: 'Not assigned'
        });
        
        setTimeout(() => {
            document.getElementById('submitSuccess').classList.add('hidden');
        }, 5000);
    } else {
        alert('Please fill all required fields');
    }
}

// Check status (F1)
function checkStatus() {
    const complaintId = document.getElementById('statusComplaintId').value;
    const complaint = complaints.find(c => c.id === complaintId);
    
    if (complaint) {
        document.getElementById('statusId').textContent = complaint.id;
        document.getElementById('statusLocation').textContent = complaint.location;
        document.getElementById('statusDesc').textContent = complaint.description;
        document.getElementById('statusCrew').textContent = complaint.crew;
        document.getElementById('statusUpdated').textContent = new Date().toLocaleString();
        
        const badge = document.getElementById('statusBadge');
        badge.textContent = complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1);
        badge.className = 'status-badge status-' + complaint.status;
        
        document.getElementById('statusResult').classList.remove('hidden');
    } else {
        alert('Complaint ID not found');
        document.getElementById('statusResult').classList.add('hidden');
    }
}

// Load past complaints (F4)
function loadPastComplaints() {
    const list = document.getElementById('complaintsList');
    list.innerHTML = '';
    
    // Filter by current user (mock data is shared, so this will show all for now)
    // In a real app, you would filter by a resident ID associated with the complaints
    complaints.forEach(complaint => {
        const item = document.createElement('div');
        item.className = 'complaint-item';
        // Capitalize the first letter of status for display
        const displayStatus = complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1);
        item.innerHTML = `
            <h4>Complaint #${complaint.id}</h4>
            <p><strong>Location:</strong> ${complaint.location}</p>
            <p><strong>Description:</strong> ${complaint.description}</p>
            <p><strong>Date:</strong> ${complaint.date}</p>
            <p><strong>Priority:</strong> ${complaint.priority}</p>
            <p><strong>Status:</strong> <span class="status-badge status-${complaint.status}">${displayStatus}</span></p>
        `;
        list.appendChild(item);
    });
}

// Officer tab switching
function switchOfficerTab(tab, element) {
    document.querySelectorAll('#officerDashboard .nav-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    
    document.getElementById('officerDashboardView').classList.add('hidden');
    document.getElementById('officerAssign').classList.add('hidden');
    document.getElementById('officerReports').classList.add('hidden');
    
    if (tab === 'dashboard') {
        document.getElementById('officerDashboardView').classList.remove('hidden');
    } else if (tab === 'assign') {
        document.getElementById('officerAssign').classList.remove('hidden');
    } else if (tab === 'reports') {
        document.getElementById('officerReports').classList.remove('hidden');
    }
}

// Update complaint status (F10)
function updateComplaintStatus(complaintId) {
    const newStatus = prompt('Enter new status (pending/progress/resolved):').toLowerCase();
    const validStatuses = ['pending', 'progress', 'resolved', 'assigned']; // Added assigned for completeness
    
    if (newStatus && validStatuses.includes(newStatus)) {
        alert(`Complaint ${complaintId} status updated to: ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`);
        const complaint = complaints.find(c => c.id === complaintId);
        if (complaint) {
            complaint.status = newStatus;
            // A real update would involve re-rendering the table, but this is a mock.
            // You can manually re-load the officer dashboard view if needed.
        }
    } else if (newStatus !== null) {
         alert('Invalid status entered. Please use: pending, progress, or resolved.');
    }
}

// Filter complaints (F8 feature mock)
function filterComplaints(status) {
    alert(`Filtering complaints by status: ${status}`);
    // A real implementation would filter the data and redraw the table.
}

// Assign crew (F11)
function assignCrew() {
    const complaintId = document.getElementById('assignComplaintId').value;
    const crewId = document.getElementById('assignCrewId').value;
    
    document.getElementById('assignSuccess').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('assignSuccess').classList.add('hidden');
    }, 3000);
    
    const complaint = complaints.find(c => c.id === complaintId);
    if (complaint) {
        complaint.crew = crewId;
        complaint.status = 'assigned'; // Update status to assigned upon crew assignment
    }
}

// Generate report (F9)
function generateReport() {
    const type = document.getElementById('reportType').value;
    const format = document.getElementById('reportFormat').value;
    alert(`Generating ${type} report in ${format} format... (This is a mock action)`);
}

// Technician tab switching
function switchTechTab(tab, element) {
    document.querySelectorAll('#technicianDashboard .nav-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    
    document.getElementById('techTasks').classList.add('hidden');
    document.getElementById('techReports').classList.add('hidden');
    
    if (tab === 'tasks') {
        document.getElementById('techTasks').classList.remove('hidden');
    } else if (tab === 'reports') {
        document.getElementById('techReports').classList.remove('hidden');
    }
}

// Update task status (F5)
function updateTaskStatus(taskId, selectId) {
    const status = document.getElementById(selectId).value;
    alert(`Task ${taskId} status updated to: ${status.charAt(0).toUpperCase() + status.slice(1)}`);
    // In a real app, this would update the complaint status in the main data array
}

// View report (F6)
function viewReport(reportId) {
    alert(`Opening report ${reportId}... (This is a mock action)`);
}

// Download report (F6)
function downloadReport(reportId) {
    alert(`Downloading report ${reportId}... (This is a mock action)`);
}

// Admin tab switching
function switchAdminTab(tab, element) {
    document.querySelectorAll('#adminDashboard .nav-tab').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    
    document.getElementById('adminMonitoring').classList.add('hidden');
    document.getElementById('adminBackup').classList.add('hidden');
    document.getElementById('adminMaintenance').classList.add('hidden');
    
    if (tab === 'monitoring') {
        document.getElementById('adminMonitoring').classList.remove('hidden');
    } else if (tab === 'backup') {
        document.getElementById('adminBackup').classList.remove('hidden');
    } else if (tab === 'maintenance') {
        document.getElementById('adminMaintenance').classList.remove('hidden');
    }
}

// Perform backup (F12)
function performBackup() {
    const type = document.getElementById('backupType').value;
    alert(`Performing ${type} backup... This may take a few minutes. (Mock action)`);
}

// Restore backup (F12)
function restoreBackup(backupId) {
    if (confirm(`Are you sure you want to restore backup ${backupId}? This will overwrite current data.`)) {
        alert(`Restoring backup ${backupId}... (Mock action)`);
    }
}

// Perform maintenance (F13)
function performMaintenance() {
    const type = document.getElementById('maintenanceType').value;
    const desc = document.getElementById('maintenanceDesc').value;
    alert(`Performing ${type} maintenance...\nDescription: ${desc} (Mock action)`);
}