// API Configuration - Update this with your backend URL
const API_URL = "https://jobflow-backend-7wjj.onrender.com";

let editingId = null;

// Login Function
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageEl = document.getElementById("loginMessage");

    if (!username || !password) {
        showMessage(messageEl, "Please enter both username and password", "error");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();
        
        if (data.success || response.ok) {
            showMessage(messageEl, "Login successful!", "success");
            // Store token if your backend returns one
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
        } else {
            showMessage(messageEl, "Login failed. Please check your credentials.", "error");
        }
    } catch (error) {
        console.error("Login error:", error);
        showMessage(messageEl, "Login failed. Please try again.", "error");
    }
}

// Load all jobs
async function loadJobs() {
    const jobList = document.getElementById("jobList");
    jobList.innerHTML = '<p class="loading">Loading applications...</p>';

    try {
        const response = await fetch(`${API_URL}/jobs`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch jobs");
        }

        const jobs = await response.json();
        
        if (jobs.length === 0) {
            jobList.innerHTML = '<p class="loading">No applications yet. Add your first one!</p>';
            return;
        }

        jobList.innerHTML = "";
        
        jobs.forEach(job => {
            const jobItem = createJobElement(job);
            jobList.appendChild(jobItem);
        });
    } catch (error) {
        console.error("Error loading jobs:", error);
        jobList.innerHTML = '<p class="error">Failed to load applications. Please refresh the page.</p>';
    }
}

// Create job element
function createJobElement(job) {
    const div = document.createElement("div");
    div.className = "job-item";
    
    const statusClass = `status-${job.status.toLowerCase().replace(/\s+/g, '-')}`;
    
    div.innerHTML = `
        <div class="job-header">
            <div class="job-company">${escapeHtml(job.company)}</div>
            <div class="job-status ${statusClass}">${escapeHtml(job.status)}</div>
        </div>
        <div class="job-details">
            <div class="job-role">Role: ${escapeHtml(job.role)}</div>
            <div class="job-date">Applied: ${formatDate(job.applied_date)}</div>
        </div>
        <div class="job-actions">
            <button class="edit-btn" onclick="editJob(${job.id}, '${escapeHtml(job.company)}', '${escapeHtml(job.role)}', '${escapeHtml(job.status)}', '${job.applied_date}')">
                Edit
            </button>
            <button class="delete-btn" onclick="deleteJob(${job.id})">
                Delete
            </button>
        </div>
    `;
    
    return div;
}

// Add or Update job
async function addJob() {
    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const status = document.getElementById("status").value.trim();
    const date = document.getElementById("date").value;

    if (!company || !role || !status || !date) {
        alert("Please fill in all fields");
        return;
    }

    const payload = {
        company: company,
        role: role,
        status: status,
        applied_date: date
    };

    try {
        let response;
        
        if (editingId) {
            // Update existing job
            response = await fetch(`${API_URL}/jobs/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } else {
            // Create new job
            response = await fetch(`${API_URL}/jobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        }

        if (!response.ok) {
            throw new Error("Failed to save job");
        }

        // Clear form and reset editing state
        clearForm();
        loadJobs();
        
        alert(editingId ? "Job updated successfully!" : "Job added successfully!");
    } catch (error) {
        console.error("Error saving job:", error);
        alert("Failed to save job. Please try again.");
    }
}

// Delete job
async function deleteJob(id) {
    if (!confirm("Are you sure you want to delete this application?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/jobs/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete job");
        }

        loadJobs();
        alert("Job deleted successfully!");
    } catch (error) {
        console.error("Error deleting job:", error);
        alert("Failed to delete job. Please try again.");
    }
}

// Edit job - populate form
function editJob(id, company, role, status, date) {
    editingId = id;
    
    document.getElementById("company").value = company;
    document.getElementById("role").value = role;
    document.getElementById("status").value = status;
    document.getElementById("date").value = date;
    
    document.getElementById("formTitle").textContent = "Edit Job Application";
    document.getElementById("submitBtn").textContent = "Update Application";
    document.getElementById("cancelBtn").style.display = "block";
    
    // Scroll to form
    document.getElementById("addJobSection").scrollIntoView({ behavior: "smooth" });
}

// Cancel edit
function cancelEdit() {
    clearForm();
}

// Clear form
function clearForm() {
    editingId = null;
    document.getElementById("company").value = "";
    document.getElementById("role").value = "";
    document.getElementById("status").value = "";
    document.getElementById("date").value = "";
    
    document.getElementById("formTitle").textContent = "Add Job Application";
    document.getElementById("submitBtn").textContent = "Add Application";
    document.getElementById("cancelBtn").style.display = "none";
}

// Utility: Show message
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `message ${type}`;
    
    setTimeout(() => {
        element.textContent = "";
        element.className = "message";
    }, 5000);
}

// Utility: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load jobs when page loads
document.addEventListener("DOMContentLoaded", () => {
    loadJobs();
});
