// 🔍 Phishing detection based on keyword matching
function detectPhishing() {
  const email = document.getElementById("emailInput").value.toLowerCase();
  const phishingKeywords = ["click here", "urgent", "verify", "password", "account", "security alert"];
  const suspiciousPatterns = /(bit\.ly|tinyurl|[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+|\.cm|\.con)/gi;

  let score = 0;

  phishingKeywords.forEach(keyword => {
    if (email.includes(keyword)) score++;
  });

  const suspiciousLinks = email.match(suspiciousPatterns);
  const linkMessage = suspiciousLinks 
    ? `⚠️ Suspicious links found: ${suspiciousLinks.join(', ')}` 
    : "✅ No suspicious links.";

  let result = "✅ Safe";
  let threatLevel = "Low";

  if (score >= 3 || suspiciousLinks) {
    result = "⚠️ High Risk";
    threatLevel = "High";
  } else if (score > 0) {
    result = "⚠️ Moderate Risk";
    threatLevel = "Medium";
  }

  document.getElementById("emailResult").innerText = `Detection Result: ${result}\n${linkMessage}`;
  updateSystemStatus(threatLevel === "High" ? "Locked" : "Normal");
  updateThreatBar(threatLevel);
  logIncident("Phishing Email", threatLevel);
}

// 🧠 Simulated anomaly detection for user behavior
function simulateUserBehavior() {
  const behaviors = ["normal login", "access from new location", "multiple failed logins", "unusual data transfer"];
  const behavior = behaviors[Math.floor(Math.random() * behaviors.length)];

  let alert = "✅ Normal activity";
  let threatLevel = "Low";

  if (behavior !== "normal login") {
    alert = `⚠️ Suspicious behavior: ${behavior}`;
    updateSystemStatus("Locked");
    threatLevel = "High";
    logIncident("User Behavior", "High");
  }

  document.getElementById("behaviorResult").innerText = alert;
}

// 🔐 Automated system response
function updateSystemStatus(status) {
  const statusElement = document.getElementById("systemStatus");
  statusElement.innerText = status;
  statusElement.style.color = status === "Locked" ? "#ff4d4d" : "#2ea043";
}

// 🛡️ Update threat level bar
function updateThreatBar(level) {
  const bar = document.getElementById("threatBar");
  if (!bar) return; // In case element is missing
  if (level === "High") bar.style.background = "#ff4d4d";
  else if (level === "Medium") bar.style.background = "#ffa500";
  else bar.style.background = "#2ea043";
}

// 🧾 Log incidents to localStorage
function logIncident(type, level) {
  const incident = { type, level, time: new Date().toLocaleString() };
  const log = JSON.parse(localStorage.getItem("incidentLog")) || [];
  log.push(incident);
  localStorage.setItem("incidentLog", JSON.stringify(log));
}

// 📜 Show incident logs
function showIncidentLog() {
  const log = JSON.parse(localStorage.getItem("incidentLog")) || [];
  let html = "<ul>";
  log.forEach(entry => {
    html += `<li>${entry.time} - ${entry.type}: ${entry.level}</li>`;
  });
  html += "</ul>";
  document.getElementById("incidentLog").innerHTML = html;
}

// 🌐 Mock threat-sharing system
function shareThreat() {
  const threats = [
    "Shared threat: AI-generated phishing targeting HR departments.",
    "Shared threat: Deepfake voice scam detected in finance call.",
    "Shared threat: Botnet using generative scripts to bypass CAPTCHA."
  ];

  const randomThreat = threats[Math.floor(Math.random() * threats.length)];
  document.getElementById("sharedThreat").innerText = randomThreat;
}

// 📰 Fake threat feed rotator
const fakeThreats = [
  "🚨 AI-generated phishing attack detected in HR inbox",
  "🧠 Deepfake impersonation attempt flagged",
  "🚫 User blocked for abnormal data exfiltration",
  "🔐 MFA bypass attempt using synthetic voice detected"
];

let index = 0;
function rotateThreatFeed() {
  const feed = document.getElementById("threatFeed");
  feed.textContent = fakeThreats[index];
  index = (index + 1) % fakeThreats.length;
}
setInterval(rotateThreatFeed, 3000);

// 🌍 Simulate global login activity
function simulateLoginActivity() {
  const attempts = [
    { country: "USA", status: "✅ Normal" },
    { country: "Russia", status: "⚠️ Suspicious" },
    { country: "India", status: "✅ Normal" },
    { country: "Brazil", status: "⚠️ Suspicious" }
  ];
  let html = "<ul>";
  attempts.forEach(a => {
    html += `<li>${a.country} - ${a.status}</li>`;
  });
  html += "</ul>";
  document.getElementById("loginMap").innerHTML = html;
}
