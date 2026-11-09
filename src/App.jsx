import React, { useState } from 'react';
import {
  Briefcase,
  Award,
  Cpu,
  Layers,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Terminal,
  Copy,
  Check,
  X,
  Mail,
  MapPin,
  Phone,
  GraduationCap,
  Sun,
  Moon,
  ArrowUpRight,
  Users,
  Download,
  Send,
  Heart
} from 'lucide-react';
import {
  PROFILE,
  IMPACT_METRICS,
  EDUCATION,
  EXPERIENCE,
  LEADERSHIP,
  SKILL_GROUPS,
  CASE_STUDIES,
  CERTIFICATIONS
} from './data/portfolioData';

const LinkedInLogo = ({ size = 16, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M6.94 8.5A1.75 1.75 0 1 1 6.94 5a1.75 1.75 0 0 1 0 3.5ZM5.89 10.45h2.1v8.55h-2.1V10.45Zm6.15 0h2.01v1.17h.03c.28-.53 1.01-1.09 2.08-1.09 2.22 0 2.63 1.46 2.63 3.36v4.91h-2.1v-4.6c0-1.09-.02-2.5-1.52-2.5-1.53 0-1.76 1.19-1.76 2.42v4.68h-2.1V10.45Z" />
  </svg>
);

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activePage, setActivePage] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [modalTab, setModalTab] = useState('summary');
  const [copiedId, setCopiedId] = useState(null);

  // Ask Portfolio AI Assistant State (Public Recruiter-Ready Chat Simulator)
  const [chatQuery, setChatQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: "Hi there! I'm Nitin's portfolio AI assistant. Feel free to ask me anything about his product management experience, Agile metrics at Amdocs, case studies (like OpenAI or Caterpillar), or his leadership background!"
    }
  ]);

  const categories = [
    'All',
    'Technical & AI Builds',
    'Product & GTM Strategy',
    'Systems, PLM & Supply Chain'
  ];

  const filteredProjects = React.useMemo(() => {
    if (selectedCategory === 'All') return CASE_STUDIES;
    return CASE_STUDIES.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const copyCertId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;

    const userMsg = chatQuery;
    setChatQuery('');
    setChatHistory((prev) => [...prev, { sender: 'user', text: userMsg }]);

    // Add a temporary loading message
    setChatHistory((prev) => [...prev, { sender: 'ai', text: 'Thinking...' }]);

    try {
      // Replace with your actual Render backend URL
      const response = await fetch('https://pm-portfolio-backend-1qdk.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      const data = await response.json();
      
      // Remove the "Thinking..." message and add the real AI reply
      setChatHistory((prev) => {
        const newHistory = [...prev];
        newHistory.pop(); // remove thinking
        return [...newHistory, { sender: 'ai', text: data.reply || 'Sorry, no response received.' }];
      });
    } catch (error) {
      setChatHistory((prev) => {
        const newHistory = [...prev];
        newHistory.pop();
        return [...newHistory, { sender: 'ai', text: 'Error connecting to the AI assistant. Please try again later.' }];
      });
    }
  };

  return (
    <div className={`app-shell ${theme === 'dark' ? 'dark-theme' : ''}`}>
      {/* Sticky Top Header */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand" onClick={() => setActivePage('overview')}>
            <div className="brand-avatar">NV</div>
            <div>
              <div className="brand-name">
                {PROFILE.name}
                <span className="badge">{PROFILE.credentialsBadge}</span>
              </div>
              <div className="brand-role">{PROFILE.role}</div>
            </div>
          </div>

          <nav className="nav-bar">
            {[
              { id: 'overview', label: 'Overview', icon: Layers },
              { id: 'experience', label: 'Experience & Bio', icon: GraduationCap },
              { id: 'projects', label: 'Projects & Case Studies (10)', icon: Briefcase },
              { id: 'ai-assistant', label: 'Ask My Portfolio AI', icon: Cpu },
              { id: 'certifications', label: 'Credentials (4)', icon: Award }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`nav-tab ${activePage === item.id ? 'active' : ''}`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="theme-btn"
              title="Toggle Light / Dark Mode"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Router View */}
      <main className="container main-content">
        {/* ==================== PAGE 1: OVERVIEW ==================== */}
        {activePage === 'overview' && (
          <div className="stack-lg">
            {/* Hero Section */}
            <section className="card card-lg stack-md">
              <div>
                <span className="badge">
                  Seeking Product Manager, Technical Program Manager & Project Manager Roles
                </span>
                <h1 className="hero-title">
                  Hi, I’m {PROFILE.shortName} — <span className="hero-highlight">{PROFILE.tagline}</span>
                </h1>
                <p className="text-secondary" style={{ fontSize: '1.02rem', lineHeight: '1.6' }}>
                  {PROFILE.bio}
                </p>
              </div>

              <div className="btn-row">
                <button onClick={() => setActivePage('projects')} className="btn btn-primary">
                  Explore All 10 Projects & Case Studies
                  <ChevronRight size={16} />
                </button>
                <button onClick={() => setActivePage('experience')} className="btn btn-secondary">
                  View Work Experience & Education
                </button>
                <a
                  href={PROFILE.resumePdfPath}
                  target="_blank"
                  rel="noreferrer"
                  download="Nitin_Jeremiah_Vedanand_Resume.pdf"
                  className="btn btn-outline"
                >
                  <Download size={16} />
                  Download Resume PDF
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  <LinkedInLogo size={16} />
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="meta-strip">
                <span className="meta-link">
                  <MapPin size={14} /> {PROFILE.location}
                </span>
                <a href={`tel:${PROFILE.phone}`} className="meta-link">
                  <Phone size={14} /> {PROFILE.phone}
                </a>
                <a href={`mailto:${PROFILE.emailPrimary}`} className="meta-link">
                  <Mail size={14} /> {PROFILE.emailPrimary}
                </a>
                <a href={`mailto:${PROFILE.emailAcademic}`} className="meta-link">
                  <GraduationCap size={14} /> {PROFILE.emailAcademic}
                </a>
              </div>

              {/* Subtle Faith & Servant Leadership Callout Card */}
              <div className="subcard" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.15rem', borderColor: 'var(--border-color)' }}>
                <div style={{ padding: '0.45rem', borderRadius: '0.4rem', background: 'var(--primary-soft)', color: 'var(--primary)' }}>
                  <Heart size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                    Community & Ministry Leadership
                  </div>
                  <p className="text-secondary" style={{ fontSize: '0.84rem', marginTop: '0.15rem' }}>
                    Grounded in Christian values and servant leadership. Active as a student leader at <strong>Ignite Campus Ministry</strong> and a young adult leader & worship team member at <strong>CityMovement Church Raleigh</strong>.
                  </p>
                </div>
              </div>

              <div className="grid-4 divider-top">
                {IMPACT_METRICS.map((m, idx) => (
                  <div key={idx} className="subcard">
                    <div className="metric-value">{m.value}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '0.25rem' }}>
                      {m.label}
                    </div>
                    <div className="text-muted" style={{ fontSize: '0.78rem', marginTop: '0.2rem' }}>
                      {m.sub}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience & Education Split */}
            <section className="grid-split">
              <div className="card stack-md">
                <div className="flex-between">
                  <div>
                    <span className="eyebrow">Career Track Record</span>
                    <h2 className="section-title">Work Experience</h2>
                  </div>
                  <button
                    onClick={() => setActivePage('experience')}
                    className="btn btn-outline"
                    style={{ padding: '0.4rem 0.75rem', fontSize: '0.78rem' }}
                  >
                    Full Resume View <ChevronRight size={14} />
                  </button>
                </div>

                <div className="stack-md">
                  {EXPERIENCE.map((exp) => (
                    <div key={exp.id} className="subcard stack-sm">
                      <div className="flex-between">
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                            {exp.role} <span className="text-accent">@ {exp.company}</span>
                          </div>
                          <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                            {exp.type} • {exp.location}
                          </div>
                        </div>
                        <span className="tag font-mono">{exp.period}</span>
                      </div>
                      <ul className="stack-sm text-secondary" style={{ fontSize: '0.84rem', paddingLeft: '1rem' }}>
                        {exp.highlights.map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="stack-md">
                <div className="card stack-md">
                  <div>
                    <span className="eyebrow">Academic Foundation</span>
                    <h2 className="section-title">Education</h2>
                  </div>
                  <div className="stack-md">
                    {EDUCATION.map((edu, idx) => (
                      <div key={idx} className="subcard stack-sm">
                        <div className="flex-between">
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{edu.school}</div>
                            <div className="text-accent" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                              {edu.degree}
                            </div>
                          </div>
                          <span className="badge font-mono">GPA: {edu.gpa}</span>
                        </div>
                        <div className="text-muted font-mono" style={{ fontSize: '0.75rem' }}>
                          {edu.period} • {edu.location}
                        </div>
                        <div className="btn-row" style={{ gap: '0.4rem', marginTop: '0.25rem' }}>
                          {edu.coursework.map((cw, cIdx) => (
                            <span key={cIdx} className="tag">{cw}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card stack-md">
                  <h2 className="section-title">Product, Technical & Analytics Toolkit</h2>
                  {SKILL_GROUPS.map((grp, idx) => (
                    <div key={idx} className="stack-sm">
                      <div className="eyebrow">{grp.title}</div>
                      <div className="btn-row" style={{ gap: '0.4rem' }}>
                        {grp.items.map((skill, sIdx) => (
                          <span key={sIdx} className="tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Projects Grid */}
            <section className="stack-md">
              <div className="flex-between">
                <div>
                  <span className="eyebrow">Selected Work & Strategic Blueprints</span>
                  <h2 className="section-title">Featured Product Builds & Case Studies</h2>
                </div>
                <button onClick={() => setActivePage('projects')} className="btn btn-outline">
                  View All 10 Projects <ChevronRight size={15} />
                </button>
              </div>

              <div className="grid-3">
                {CASE_STUDIES.slice(0, 6).map((study) => (
                  <div
                    key={study.id}
                    onClick={() => {
                      setActiveCaseStudy(study);
                      setModalTab('summary');
                    }}
                    className="card card-interactive"
                  >
                    <div className="stack-sm">
                      <div className="flex-between">
                        <span className="badge">{study.category}</span>
                        <span className="text-muted font-mono" style={{ fontSize: '0.75rem' }}>
                          {study.date}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.25rem' }}>
                        {study.title}
                      </h3>
                      <p className="text-secondary" style={{ fontSize: '0.84rem' }}>
                        {study.summary}
                      </p>
                    </div>

                    <div className="divider-top stack-sm">
                      <div className="grid-2" style={{ gap: '0.5rem' }}>
                        {study.heroStats.slice(0, 2).map((st, idx) => (
                          <div key={idx} className="subcard" style={{ padding: '0.6rem' }}>
                            <div className="text-muted" style={{ fontSize: '0.68rem' }}>{st.label}</div>
                            <div className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                              {st.value}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex-between text-accent" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                        <span>Inspect Full Case Study</span>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== PAGE 2: EXPERIENCE & BIO ==================== */}
        {activePage === 'experience' && (
          <div className="stack-lg">
            <div className="page-header">
              <div>
                <span className="eyebrow">Curriculum Vitae & Leadership</span>
                <h1 className="page-title">Work Experience, Education & Community Impact</h1>
                <p className="text-muted" style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>
                  {PROFILE.location} • {PROFILE.phone} • {PROFILE.emailPrimary}
                </p>
              </div>
              <div className="btn-row">
                <a
                  href={PROFILE.resumePdfPath}
                  target="_blank"
                  rel="noreferrer"
                  download="Nitin_Jeremiah_Vedanand_Resume.pdf"
                  className="btn btn-secondary"
                >
                  <Download size={15} />
                  Download Resume PDF
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  <LinkedInLogo size={15} />
                  Connect on LinkedIn
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            <section className="stack-md">
              <h2 className="section-title">
                <Briefcase size={20} className="text-accent" /> Professional Experience
              </h2>
              <div className="stack-md">
                {EXPERIENCE.map((exp) => (
                  <div key={exp.id} className="card stack-md">
                    <div className="flex-between">
                      <div>
                        <span className="eyebrow">{exp.type}</span>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                          {exp.role} — <span className="text-accent">{exp.company}</span>
                        </h3>
                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>{exp.location}</div>
                      </div>
                      <span className="tag font-mono">{exp.period}</span>
                    </div>

                    <ul className="stack-sm text-secondary" style={{ paddingLeft: '1.2rem', fontSize: '0.9rem' }}>
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>

                    <div className="btn-row">
                      {exp.metrics.map((m, i) => (
                        <span key={i} className="badge font-mono">{m}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="stack-md">
              <h2 className="section-title">
                <GraduationCap size={20} className="text-accent" /> Academic Background
              </h2>
              <div className="grid-2">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="card stack-sm">
                    <div className="flex-between">
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{edu.school}</h3>
                        <p className="text-accent" style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                          {edu.degree}
                        </p>
                      </div>
                      <span className="badge font-mono">CGPA: {edu.gpa}</span>
                    </div>
                    <div className="text-muted font-mono" style={{ fontSize: '0.78rem' }}>
                      {edu.period} • {edu.location}
                    </div>
                    <div className="btn-row" style={{ gap: '0.4rem', marginTop: '0.5rem' }}>
                      {edu.coursework.map((c, idx) => (
                        <span key={idx} className="tag">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="stack-md">
              <h2 className="section-title">
                <Users size={20} className="text-accent" /> Leadership & Community Engagement
              </h2>
              <div className="grid-3">
                {LEADERSHIP.map((item, idx) => (
                  <div key={idx} className="card stack-sm">
                    <span className="eyebrow">{item.period}</span>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.role}</h3>
                    <div className="text-muted" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                      {item.org}
                    </div>
                    <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== PAGE 3: PROJECTS & CASE STUDIES ==================== */}
        {activePage === 'projects' && (
          <div className="stack-lg">
            <div className="page-header">
              <div>
                <span className="eyebrow">Complete Portfolio Directory</span>
                <h1 className="page-title">
                  Product Builds, AI Pipelines & Strategic Case Studies ({filteredProjects.length})
                </h1>
                <p className="text-muted" style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>
                  Click any project card to open the full interactive dossier, architecture breakdown, and financial model.
                </p>
              </div>

              <div className="btn-row" style={{ gap: '0.4rem' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`nav-tab ${selectedCategory === cat ? 'active' : ''}`}
                    style={{ border: '1px solid var(--border-color)' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid-2">
              {filteredProjects.map((study) => (
                <div
                  key={study.id}
                  onClick={() => {
                    setActiveCaseStudy(study);
                    setModalTab('summary');
                  }}
                  className="card card-interactive"
                >
                  <div className="stack-md">
                    <div className="flex-between">
                      <span className="badge">{study.category}</span>
                      <span className="text-muted font-mono" style={{ fontSize: '0.75rem' }}>
                        {study.organization} • {study.date}
                      </span>
                    </div>

                    <div>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{study.title}</h2>
                      <p className="text-muted" style={{ fontSize: '0.82rem', marginTop: '0.2rem' }}>
                        {study.subtitle}
                      </p>
                    </div>

                    <p className="text-secondary" style={{ fontSize: '0.88rem' }}>
                      {study.summary}
                    </p>

                    <div className="grid-4">
                      {study.heroStats.map((st, i) => (
                        <div key={i} className="subcard" style={{ padding: '0.65rem' }}>
                          <div className="text-muted" style={{ fontSize: '0.68rem' }}>{st.label}</div>
                          <div className="font-mono" style={{ fontSize: '0.78rem', fontWeight: 700, marginTop: '0.2rem' }}>
                            {st.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="divider-top flex-between" style={{ fontSize: '0.8rem' }}>
                    <span className="text-muted">
                      My Role: <strong style={{ color: 'var(--text-main)' }}>{study.role}</strong>
                    </span>
                    <span className="text-accent" style={{ fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      Open Full Case Study <ChevronRight size={15} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== PAGE 4: ASK MY PORTFOLIO AI ASSISTANT ==================== */}
        {activePage === 'ai-assistant' && (
          <div className="stack-lg">
            <div className="page-header">
              <div>
                <span className="eyebrow">Recruiter AI Assistant</span>
                <h1 className="page-title">Ask My Portfolio AI (Recruiter Assistant)</h1>
                <p className="text-muted" style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>
                  Recruiters and hiring managers can instantly query Nitin's experience, leadership style, and strategic case studies.
                </p>
              </div>
            </div>

            <div className="card stack-md" style={{ display: 'flex', flexDirection: 'column', height: '560px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
              <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="brand-avatar" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>AI</div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Nitin's Portfolio Assistant</h3>
                    <div className="text-muted" style={{ fontSize: '0.72rem' }}>Trained on resume, metrics, and case studies</div>
                  </div>
                </div>
                <span className="badge font-mono">Ready for Visitors</span>
              </div>

              <div className="stack-md" style={{ flex: 1, overflowY: 'auto', paddingRight: '0.25rem' }}>
                {chatHistory.map((msg, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      className="subcard"
                      style={{
                        maxWidth: '85%',
                        background: msg.sender === 'user' ? 'var(--primary-soft)' : 'var(--card-bg)',
                        borderColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--border-color)',
                        fontSize: '0.86rem'
                      }}
                    >
                      <strong style={{ display: 'block', fontSize: '0.72rem', marginBottom: '0.2rem', color: 'var(--text-muted)' }}>
                        {msg.sender === 'user' ? 'Recruiter / You' : 'Portfolio Assistant'}
                      </strong>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="btn-row" style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                <input
                  type="text"
                  placeholder="Ask a question about Nitin's experience (e.g., Agile metrics, OpenAI strategy)..."
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  className="input-field"
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary">
                  <Send size={15} />
                  Send
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ==================== PAGE 5: CERTIFICATIONS ==================== */}
        {activePage === 'certifications' && (
          <div className="stack-lg">
            <div className="page-header">
              <div>
                <span className="eyebrow">Verified Professional Credentials</span>
                <h1 className="page-title">Certifications & Product Leadership Credentials</h1>
                <p className="text-muted" style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>
                  Scrum Alliance CSPO®, Aha! Product Management Professional, HRCI®, and SHRM® Engineering Management credentials.
                </p>
              </div>
            </div>

            <div className="grid-2">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.id} className="card stack-md" style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
                  <div className="stack-md">
                    <div className="flex-between">
                      <span className="badge">{cert.provider}</span>
                      <span className="text-accent" style={{ fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <ShieldCheck size={15} /> {cert.status}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{cert.name}</h2>

                    <div className="grid-2" style={{ gap: '0.75rem' }}>
                      <div className="subcard">
                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>Issued On</div>
                        <div className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700 }}>{cert.issued}</div>
                      </div>
                      <div className="subcard">
                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>Valid Until</div>
                        <div className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700 }}>{cert.validUntil}</div>
                      </div>
                    </div>

                    <div className="stack-sm">
                      <div className="eyebrow">Core Competencies Verified</div>
                      <div className="btn-row" style={{ gap: '0.4rem' }}>
                        {cert.skills.map((sk, i) => (
                          <span key={i} className="tag">{sk}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="divider-top stack-sm">
                    <div className="eyebrow" style={{ marginBottom: 0 }}>Verification Certificate ID</div>
                    <div className="subcard flex-between" style={{ padding: '0.6rem 0.85rem' }}>
                      <code className="font-mono" style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
                        {cert.certId}
                      </code>
                      <button
                        onClick={() => copyCertId(cert.certId)}
                        className="btn btn-outline"
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      >
                        {copiedId === cert.certId ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ==================== CASE STUDY DEEP-DIVE MODAL ==================== */}
      {activeCaseStudy && (
        <div className="modal-backdrop" onClick={() => setActiveCaseStudy(null)}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="stack-sm">
                <div className="btn-row">
                  <span className="badge">{activeCaseStudy.category}</span>
                  <span className="text-muted font-mono" style={{ fontSize: '0.75rem' }}>
                    {activeCaseStudy.organization} • {activeCaseStudy.date}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{activeCaseStudy.title}</h2>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>{activeCaseStudy.subtitle}</p>
              </div>
              <button onClick={() => setActiveCaseStudy(null)} className="theme-btn">
                <X size={18} />
              </button>
            </div>

            <div className="modal-tabs">
              {[
                { id: 'summary', label: '1. Executive Summary & Problem' },
                { id: 'architecture', label: '2. Product Architecture & Solution' },
                { id: 'gtm', label: '3. Execution, GTM & Governance' },
                { id: 'financials', label: '4. Metrics, P&L & Tradeoff Matrix' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setModalTab(t.id)}
                  className={`nav-tab ${modalTab === t.id ? 'active' : ''}`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="modal-body stack-md">
              <div className="grid-4">
                {activeCaseStudy.heroStats.map((st, i) => (
                  <div key={i} className="subcard">
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>{st.label}</div>
                    <div className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700, marginTop: '0.2rem' }}>
                      {st.value}
                    </div>
                  </div>
                ))}
              </div>

              {modalTab === 'summary' && (
                <div className="stack-md">
                  <div className="subcard stack-sm">
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Executive Summary</h3>
                    <p className="text-secondary" style={{ fontSize: '0.88rem' }}>{activeCaseStudy.summary}</p>
                  </div>

                  <div className="stack-sm">
                    <h3 className="section-title" style={{ fontSize: '1rem' }}>
                      <AlertTriangle size={17} className="text-accent" /> Problem Statement & Structural Constraints
                    </h3>
                    {activeCaseStudy.problem.map((prob, idx) => (
                      <div key={idx} className="subcard" style={{ fontSize: '0.86rem' }}>
                        <strong className="font-mono text-accent">0{idx + 1}. </strong>
                        <span className="text-secondary">{prob}</span>
                      </div>
                    ))}
                  </div>

                  <div className="stack-sm">
                    <h3 className="section-title" style={{ fontSize: '1rem' }}>
                      <CheckCircle2 size={17} className="text-accent" /> Key Product & Program Takeaways
                    </h3>
                    <div className="grid-3">
                      {activeCaseStudy.takeaways.map((tk, idx) => (
                        <div key={idx} className="subcard" style={{ fontSize: '0.82rem' }}>
                          {tk}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modalTab === 'architecture' && (
                <div className="grid-2">
                  {activeCaseStudy.solutionPillars.map((pillar, idx) => (
                    <div key={idx} className="subcard stack-sm">
                      <span className="eyebrow">Pillar 0{idx + 1}</span>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>{pillar.name}</h4>
                      <p className="text-secondary" style={{ fontSize: '0.84rem' }}>{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {modalTab === 'gtm' && (
                <div className="stack-md">
                  <div className="subcard stack-sm">
                    <span className="eyebrow">Core Execution Thesis</span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{activeCaseStudy.gtmStrategy.headline}</h3>
                    <p className="text-secondary" style={{ fontSize: '0.86rem' }}>{activeCaseStudy.gtmStrategy.metrics}</p>
                  </div>

                  <div className="stack-sm">
                    {activeCaseStudy.gtmStrategy.channels.map((ch, idx) => (
                      <div key={idx} className="subcard stack-sm">
                        <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{ch.channel}</div>
                        <p className="text-secondary" style={{ fontSize: '0.84rem' }}>{ch.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalTab === 'financials' && (
                <div className="stack-md">
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead>
                        <tr>
                          {activeCaseStudy.financials.headers.map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeCaseStudy.financials.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={cIdx === 0 ? '' : 'font-mono'}
                                style={cIdx === 0 ? { fontWeight: 700, color: 'var(--text-main)' } : {}}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="subcard" style={{ fontSize: '0.84rem' }}>
                    <strong className="text-accent">Executive Model Note: </strong>
                    <span className="text-secondary">{activeCaseStudy.financials.note}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                Authored by <strong style={{ color: 'var(--text-main)' }}>{PROFILE.name}</strong>
              </div>
              <div className="btn-row">
                {activeCaseStudy.liveUrl && (
                  <a
                    href={activeCaseStudy.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Open Live Project Link <ExternalLink size={14} />
                  </a>
                )}
                <button onClick={() => setActiveCaseStudy(null)} className="btn btn-secondary">
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="site-footer">
        <div className="container flex-between">
          <div>
            © {new Date().getFullYear()} <strong style={{ color: 'var(--text-main)' }}>{PROFILE.name}</strong> • {PROFILE.role}
          </div>
          <div className="btn-row" style={{ gap: '1rem' }}>
            <a href={`mailto:${PROFILE.emailPrimary}`} className="meta-link">{PROFILE.emailPrimary}</a>
            <span>•</span>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="meta-link">linkedin.com/in/nitinjv</a>
            <span>•</span>
            <span>CSPO® Certified (ID: 1812492)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}