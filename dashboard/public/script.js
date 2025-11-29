// Dashboard JavaScript - Rose Bot

// API Base URL
const API_BASE = '/api';

// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

// Section Navigation
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active from all
    navLinks.forEach(l => l.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));
    
    // Add active to clicked
    link.classList.add('active');
    const sectionId = link.getAttribute('href').substring(1);
    document.getElementById(sectionId).classList.add('active');
  });
});

// Fetch and display stats
async function loadStats() {
  try {
    const response = await fetch(`${API_BASE}/stats`);
    const data = await response.json();
    
    document.getElementById('usersCount').textContent = data.users || 0;
    document.getElementById('groupsCount').textContent = data.chats || 0;
    document.getElementById('commandsCount').textContent = data.commands || 0;
    document.getElementById('warningsCount').textContent = data.warnings || 0;
    document.getElementById('uptime').textContent = Math.floor((data.uptime || 0) / 3600);
    document.getElementById('memory').textContent = data.memory || 0;
  } catch (error) {
    console.error('Error loading stats:', error);
  }
}

// Fetch and display commands
async function loadCommands() {
  try {
    const response = await fetch(`${API_BASE}/commands`);
    const data = await response.json();
    
    const commandsList = document.getElementById('commandsList');
    
    if (!data.commands || data.commands.length === 0) {
      commandsList.innerHTML = '<p>No commands found</p>';
      return;
    }
    
    commandsList.innerHTML = data.commands.map(cmd => `
      <div class="command-item">
        <div class="command-name">/${cmd.name}</div>
        <div class="command-desc">${cmd.description}</div>
        <div>
          ${cmd.adminOnly ? '<span class="command-badge admin">ADMIN</span>' : '<span class="command-badge">USER</span>'}
          <span class="command-badge" style="background: #888; margin-left: 5px;">${cmd.author}</span>
        </div>
      </div>
    `).join('');
    
    // Search functionality
    const searchInput = document.getElementById('searchCommands');
    searchInput.addEventListener('input', (e) => {
      const search = e.target.value.toLowerCase();
      const items = document.querySelectorAll('.command-item');
      
      items.forEach(item => {
        const name = item.querySelector('.command-name').textContent.toLowerCase();
        const desc = item.querySelector('.command-desc').textContent.toLowerCase();
        
        if (name.includes(search) || desc.includes(search)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  } catch (error) {
    console.error('Error loading commands:', error);
    document.getElementById('commandsList').innerHTML = '<p>Error loading commands</p>';
  }
}

// Fetch and display groups
async function loadGroups() {
  try {
    const response = await fetch(`${API_BASE}/groups`);
    const data = await response.json();
    
    const groupsList = document.getElementById('groupsList');
    
    if (!data.groups || data.groups.length === 0) {
      groupsList.innerHTML = '<p>No groups connected yet</p>';
      return;
    }
    
    const table = `
      <table>
        <thead>
          <tr>
            <th>Chat ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Prefix</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          ${data.groups.map(group => `
            <tr>
              <td><code>${group.chat_id}</code></td>
              <td>${group.title || 'Private'}</td>
              <td>${group.type || 'N/A'}</td>
              <td><strong>${group.prefix || '/'}</strong></td>
              <td>${new Date(group.created_at).toLocaleDateString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    groupsList.innerHTML = table;
  } catch (error) {
    console.error('Error loading groups:', error);
    document.getElementById('groupsList').innerHTML = '<p>Error loading groups</p>';
  }
}

// Fetch and display usage
async function loadUsage() {
  try {
    const [usageRes, warningsRes] = await Promise.all([
      fetch(`${API_BASE}/usage`),
      fetch(`${API_BASE}/warnings`)
    ]);
    
    const usageData = await usageRes.json();
    const warningsData = await warningsRes.json();
    
    // Usage List
    const usageList = document.getElementById('usageList');
    if (usageData.usage && usageData.usage.length > 0) {
      usageList.innerHTML = usageData.usage.map(item => `
        <div class="usage-item">
          <span>/${item.command}</span>
          <span class="usage-count">${item.count}</span>
        </div>
      `).join('');
    } else {
      usageList.innerHTML = '<p>No usage data yet</p>';
    }
    
    // Warnings List
    const warningsList = document.getElementById('warningsList');
    if (warningsData.warnings && warningsData.warnings.length > 0) {
      warningsList.innerHTML = warningsData.warnings.map(item => `
        <div class="warning-item">
          <span>User ${item.user_id}</span>
          <span class="warning-count">${item.count}</span>
        </div>
      `).join('');
    } else {
      warningsList.innerHTML = '<p>No warnings yet</p>';
    }
  } catch (error) {
    console.error('Error loading usage:', error);
  }
}

// Initialize Dashboard
async function initDashboard() {
  await loadStats();
  await loadCommands();
  await loadGroups();
  await loadUsage();
  
  // Refresh stats every 30 seconds
  setInterval(loadStats, 30000);
}

// Start on page load
document.addEventListener('DOMContentLoaded', initDashboard);
