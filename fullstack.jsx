import React, { useMemo, useState } from "react";

const APP_NAME = "FarmNexus Workspace";

const ROLE_DATA = {
  farmer: {
    label: "Farmer Hub",
    subtitle: "Track crops, input costs, and scheme deadlines in one place.",
    accent: "#2f6f3e",
    modules: ["Overview", "Crop Planner", "Market Watch", "Subsidy Desk", "Weather"],
    metrics: [
      { id: "m1", title: "Field Health", value: "84%", note: "+6% this week" },
      { id: "m2", title: "Expected Yield", value: "6.2 t", note: "Paddy block A" },
      { id: "m3", title: "Input Budget", value: "Rs 42,000", note: "68% utilized" },
      { id: "m4", title: "Market Signal", value: "Upward", note: "Rice +3.1%" }
    ],
    actions: [
      { id: "a1", task: "Renew soil test", owner: "Lab pickup", due: "Mar 3" },
      { id: "a2", task: "Apply micronutrients", owner: "Plot B2", due: "Mar 5" },
      { id: "a3", task: "Claim insurance receipt", owner: "PMFBY", due: "Mar 8" }
    ],
    feed: [
      { id: "f1", title: "Irrigation window open", detail: "Best time 5:00 AM to 8:30 AM" },
      { id: "f2", title: "Mandis near you", detail: "2 mandis updated rates in last hour" },
      { id: "f3", title: "Scheme reminder", detail: "PM-KISAN verification pending" }
    ]
  },
  expert: {
    label: "Expert Console",
    subtitle: "Guide farmers with prioritized diagnostics and field advisories.",
    accent: "#0f5b7a",
    modules: ["Overview", "Cases", "Diagnosis", "Training", "Knowledge Base"],
    metrics: [
      { id: "m1", title: "Active Cases", value: "31", note: "8 urgent" },
      { id: "m2", title: "Response SLA", value: "92%", note: "Within 6 hours" },
      { id: "m3", title: "Field Visits", value: "12", note: "This week" },
      { id: "m4", title: "Success Rate", value: "87%", note: "Resolved advisories" }
    ],
    actions: [
      { id: "a1", task: "Review pest escalation", owner: "Cluster 4", due: "Today" },
      { id: "a2", task: "Publish sowing guide", owner: "Millet season", due: "Mar 1" },
      { id: "a3", task: "Host live Q and A", owner: "Community", due: "Mar 4" }
    ],
    feed: [
      { id: "f1", title: "New case burst", detail: "Leaf blight suspected in 5 villages" },
      { id: "f2", title: "Training uptake", detail: "42 farmers completed module 2" },
      { id: "f3", title: "Advisory ranked high", detail: "Soil recovery guide saved 190 times" }
    ]
  },
  public: {
    label: "Public Insight Board",
    subtitle: "Understand food systems, trace produce, and support local growers.",
    accent: "#7a4b10",
    modules: ["Overview", "Stories", "Sustainability", "Traceability", "Support"],
    metrics: [
      { id: "m1", title: "Local Farms", value: "128", note: "Within 100 km" },
      { id: "m2", title: "Verified Produce", value: "74%", note: "With trace tags" },
      { id: "m3", title: "Community Backers", value: "3,260", note: "Monthly active" },
      { id: "m4", title: "Waste Reduced", value: "19 t", note: "Year to date" }
    ],
    actions: [
      { id: "a1", task: "Join weekend farm tour", owner: "North circuit", due: "Mar 2" },
      { id: "a2", task: "Pledge seasonal basket", owner: "City co-op", due: "Mar 6" },
      { id: "a3", task: "Share nutrition brief", owner: "School network", due: "Mar 9" }
    ],
    feed: [
      { id: "f1", title: "Harvest story live", detail: "Smallholders doubled millet quality" },
      { id: "f2", title: "Traceability update", detail: "New QR lots from 14 producers" },
      { id: "f3", title: "Volunteer slots", detail: "Packaging drive now open" }
    ]
  },
  admin: {
    label: "Admin Control Room",
    subtitle: "Monitor platform health, moderation load, and compliance tasks.",
    accent: "#5f2a70",
    modules: ["Overview", "Users", "Moderation", "Compliance", "Reports"],
    metrics: [
      { id: "m1", title: "Active Users", value: "9,402", note: "+3.8% this month" },
      { id: "m2", title: "Open Flags", value: "47", note: "12 high priority" },
      { id: "m3", title: "Approval Queue", value: "63", note: "Avg 2.4h" },
      { id: "m4", title: "Platform Uptime", value: "99.97%", note: "Last 30 days" }
    ],
    actions: [
      { id: "a1", task: "Close abusive thread", owner: "Forum #18", due: "Today" },
      { id: "a2", task: "Audit new expert profiles", owner: "Verification", due: "Mar 1" },
      { id: "a3", task: "Export policy report", owner: "Compliance", due: "Mar 7" }
    ],
    feed: [
      { id: "f1", title: "Spike detected", detail: "Login retries crossed threshold" },
      { id: "f2", title: "Queue normalized", detail: "Pending posts down by 22%" },
      { id: "f3", title: "Report generated", detail: "Quarterly retention snapshot ready" }
    ]
  }
};

function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("farmer");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name: name.trim() || "User", role });
  };

  return (
    <div style={styles.loginWrap}>
      <form style={styles.loginCard} onSubmit={handleSubmit}>
        <h2 style={styles.loginTitle}>{APP_NAME}</h2>
        <p style={styles.loginSubtitle}>Sign in to continue</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={styles.input}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={styles.input}>
          <option value="farmer">Farmer</option>
          <option value="expert">Expert</option>
          <option value="public">Public</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={styles.loginButton}>
          Login
        </button>
      </form>
    </div>
  );
}

function RolePicker({ role, onChange }) {
  return (
    <div style={styles.rolePicker}>
      {Object.entries(ROLE_DATA).map(([key, data]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          style={{
            ...styles.roleButton,
            borderColor: role === key ? data.accent : "#d6dbe3",
            background: role === key ? "#ffffff" : "#f6f8fb",
            color: role === key ? data.accent : "#273341"
          }}
        >
          {data.label}
        </button>
      ))}
    </div>
  );
}

function Sidebar({ modules, activeModule, onSelect, accent }) {
  return (
    <aside style={styles.sidebar}>
      {modules.map((moduleName) => (
        <button
          key={moduleName}
          type="button"
          onClick={() => onSelect(moduleName)}
          style={{
            ...styles.navItem,
            background: activeModule === moduleName ? "#ffffff" : "transparent",
            borderLeftColor: activeModule === moduleName ? accent : "transparent",
            color: activeModule === moduleName ? accent : "#445064"
          }}
        >
          {moduleName}
        </button>
      ))}
    </aside>
  );
}

function MetricGrid({ metrics, accent }) {
  return (
    <section style={styles.metricGrid}>
      {metrics.map((metric) => (
        <article key={metric.id} style={styles.metricCard}>
          <p style={styles.metricTitle}>{metric.title}</p>
          <p style={{ ...styles.metricValue, color: accent }}>{metric.value}</p>
          <p style={styles.metricNote}>{metric.note}</p>
        </article>
      ))}
    </section>
  );
}

function ActionQueue({ actions, accent }) {
  return (
    <section style={styles.panel}>
      <div style={styles.panelHeader}>
        <h3 style={styles.panelTitle}>Action Queue</h3>
      </div>
      {actions.map((item) => (
        <div key={item.id} style={styles.rowItem}>
          <div>
            <p style={styles.rowTask}>{item.task}</p>
            <p style={styles.rowMeta}>{item.owner}</p>
          </div>
          <span style={{ ...styles.dueBadge, borderColor: accent, color: accent }}>{item.due}</span>
        </div>
      ))}
    </section>
  );
}

function LiveFeed({ entries, accent }) {
  return (
    <section style={styles.panel}>
      <div style={styles.panelHeader}>
        <h3 style={styles.panelTitle}>Live Feed</h3>
      </div>
      {entries.map((entry) => (
        <div key={entry.id} style={styles.feedItem}>
          <span style={{ ...styles.feedDot, background: accent }} />
          <div>
            <p style={styles.feedTitle}>{entry.title}</p>
            <p style={styles.feedDetail}>{entry.detail}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function SectionBanner({ title, subtitle, moduleName, accent }) {
  return (
    <section style={{ ...styles.banner, borderColor: accent }}>
      <div>
        <p style={styles.bannerLabel}>{moduleName}</p>
        <h2 style={styles.bannerTitle}>{title}</h2>
        <p style={styles.bannerSubtitle}>{subtitle}</p>
      </div>
      <button type="button" style={{ ...styles.primaryButton, background: accent }}>
        Create Update
      </button>
    </section>
  );
}

export default function FullstackApp() {
  const [role, setRole] = useState("farmer");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const roleState = ROLE_DATA[role];
  const [activeModule, setActiveModule] = useState(roleState.modules[0]);

  const currentState = useMemo(() => ROLE_DATA[role], [role]);

  const handleRoleChange = (nextRole) => {
    setRole(nextRole);
    setActiveModule(ROLE_DATA[nextRole].modules[0]);
  };

  if (!loggedInUser) {
    return (
      <LoginScreen
        onLogin={({ name, role: selectedRole }) => {
          setLoggedInUser(name);
          handleRoleChange(selectedRole);
        }}
      />
    );
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.appTitle}>{APP_NAME}</h1>
        <RolePicker role={role} onChange={handleRoleChange} />
        <button type="button" style={styles.logoutButton} onClick={() => setLoggedInUser(null)}>
          Logout {loggedInUser}
        </button>
      </header>

      <div style={styles.layout}>
        <Sidebar
          modules={currentState.modules}
          activeModule={activeModule}
          onSelect={setActiveModule}
          accent={currentState.accent}
        />

        <main style={styles.main}>
          <SectionBanner
            title={currentState.label}
            subtitle={currentState.subtitle}
            moduleName={activeModule}
            accent={currentState.accent}
          />

          <MetricGrid metrics={currentState.metrics} accent={currentState.accent} />

          <div style={styles.splitLayout}>
            <ActionQueue actions={currentState.actions} accent={currentState.accent} />
            <LiveFeed entries={currentState.feed} accent={currentState.accent} />
          </div>
        </main>
      </div>

      <footer style={styles.footer}>FarmNexus 2026. Unified planning, faster execution.</footer>
    </div>
  );
}

const styles = {
  loginWrap: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(140deg, #eef2f7 0%, #ecf5eb 100%)",
    padding: "20px"
  },
  loginCard: {
    width: "100%",
    maxWidth: "360px",
    background: "#ffffff",
    border: "1px solid #d7dee8",
    borderRadius: "12px",
    padding: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  loginTitle: {
    margin: "0 0 2px 0",
    fontSize: "24px"
  },
  loginSubtitle: {
    margin: "0 0 10px 0",
    color: "#5d6a7c"
  },
  input: {
    border: "1px solid #cfd8e4",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "14px"
  },
  loginButton: {
    border: "none",
    borderRadius: "8px",
    background: "#2f6f3e",
    color: "#ffffff",
    padding: "10px 12px",
    fontWeight: 600,
    cursor: "pointer"
  },
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #edf3f8 0%, #f9fafc 45%, #eff5ec 100%)",
    color: "#1f2b3a",
    fontFamily: "Segoe UI, Tahoma, sans-serif",
    padding: "20px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    gap: "16px",
    flexWrap: "wrap"
  },
  appTitle: {
    margin: 0,
    fontSize: "30px",
    letterSpacing: "0.4px"
  },
  rolePicker: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  },
  roleButton: {
    border: "1px solid",
    borderRadius: "999px",
    padding: "8px 14px",
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: 600
  },
  logoutButton: {
    border: "1px solid #d3dbe7",
    background: "#ffffff",
    color: "#2f3a49",
    borderRadius: "8px",
    padding: "8px 10px",
    cursor: "pointer",
    fontWeight: 600
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: "16px"
  },
  sidebar: {
    background: "#f7f9fc",
    border: "1px solid #dfe4eb",
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    minHeight: "560px"
  },
  navItem: {
    textAlign: "left",
    border: "1px solid #e8edf3",
    borderLeft: "4px solid transparent",
    padding: "10px 12px",
    borderRadius: "8px",
    background: "transparent",
    cursor: "pointer",
    fontWeight: 600
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  banner: {
    border: "1px solid",
    borderRadius: "12px",
    background: "#ffffff",
    padding: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap"
  },
  bannerLabel: {
    margin: "0 0 6px 0",
    fontSize: "12px",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
    color: "#667180"
  },
  bannerTitle: {
    margin: "0 0 6px 0",
    fontSize: "22px"
  },
  bannerSubtitle: {
    margin: 0,
    color: "#4c596a"
  },
  primaryButton: {
    border: "none",
    color: "#ffffff",
    borderRadius: "8px",
    padding: "10px 14px",
    fontWeight: 600,
    cursor: "pointer"
  },
  metricGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "12px"
  },
  metricCard: {
    background: "#ffffff",
    border: "1px solid #dfe4eb",
    borderRadius: "10px",
    padding: "12px"
  },
  metricTitle: {
    margin: "0 0 8px 0",
    color: "#607083",
    fontSize: "13px"
  },
  metricValue: {
    margin: "0 0 5px 0",
    fontSize: "26px",
    fontWeight: 700
  },
  metricNote: {
    margin: 0,
    color: "#586678",
    fontSize: "13px"
  },
  splitLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "12px"
  },
  panel: {
    background: "#ffffff",
    border: "1px solid #dfe4eb",
    borderRadius: "10px",
    padding: "12px"
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px"
  },
  panelTitle: {
    margin: 0,
    fontSize: "16px"
  },
  rowItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #edf1f6",
    padding: "10px 0",
    gap: "10px"
  },
  rowTask: {
    margin: "0 0 4px 0",
    fontWeight: 600
  },
  rowMeta: {
    margin: 0,
    color: "#657387",
    fontSize: "13px"
  },
  dueBadge: {
    border: "1px solid",
    borderRadius: "999px",
    padding: "4px 10px",
    fontSize: "12px",
    fontWeight: 600,
    whiteSpace: "nowrap"
  },
  feedItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    borderTop: "1px solid #edf1f6",
    padding: "10px 0"
  },
  feedDot: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    marginTop: "7px",
    flexShrink: 0
  },
  feedTitle: {
    margin: "0 0 4px 0",
    fontWeight: 600
  },
  feedDetail: {
    margin: 0,
    color: "#5e6a7b",
    fontSize: "13px"
  },
  footer: {
    marginTop: "16px",
    color: "#516172",
    fontSize: "13px",
    textAlign: "center"
  }
};
