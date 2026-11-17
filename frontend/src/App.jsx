
import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Code2,
  GraduationCap,
  BriefcaseBusiness,
  Send,
  Sparkles
} from 'lucide-react';

import { profile } from './data/profile';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export default function App() {
  const [projects, setProjects] = useState([]);
  const [projectsStatus, setProjectsStatus] = useState('loading');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState('');

  const nav = [
    ['Home', '#home'],
    ['About', '#about'],
    ['Skills', '#skills'],
    ['Projects', '#projects'],
    ['Contact', '#contact']
  ];

  // Load projects from backend
  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then(res => {
        if (!res.ok) throw new Error('Could not load projects');
        return res.json();
      })
      .then(data => {
        setProjects(data.data || []);
        setProjectsStatus('ready');
      })
      .catch(() => setProjectsStatus('error'));
  }, []);

  // Active navbar and scroll reveal animations
  useEffect(() => {
    const sections = document.querySelectorAll(
      '#home, #about, #skills, #projects, #contact'
    );

    const revealElements = document.querySelectorAll(
      '.hero-copy, .hero-art, .section-title, .about-card, .skill-pill, .project-card, .contact-form'
    );

    revealElements.forEach(element => {
      element.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach(element => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-25% 0px -60% 0px'
      }
    );

    sections.forEach(section => sectionObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const updateForm = event => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  // Contact form submission
  const submitContact = async event => {
    event.preventDefault();

    setSending(true);
    setNotice('');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Message could not be sent.');
      }

      setNotice(result.message);

      setForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setNotice(
        `${error.message} Check that the backend and MongoDB are running.`
      );
    } finally {
      setSending(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Navigation */}
      <header className="site-header">

        <a className="logo" href="#home" onClick={closeMenu}>
          RAMYA&nbsp;&nbsp;P
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav open' : 'nav'}>
          {nav.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className={activeSection === href.substring(1) ? 'active' : ''}
            >
              {label}
            </a>
          ))}

          <a
            className="nav-cta"
            href="#contact"
            onClick={closeMenu}
          >
            Let's talk <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>

      <main>

        {/* Home Section */}
        <section className="hero section-wrap" id="home">

          <div className="hero-copy">

            <div className="availability">
              <span />
              Open to learning and opportunities
            </div>

            <p className="eyebrow">
              HELLO, I'M {profile.name.toUpperCase()}
            </p>

            <h1>
              {profile.role.split(' Student')[0]}
              <br />
              <span>Developer in progress.</span>
            </h1>

            <p className="hero-description">
              {profile.intro} {profile.tagline}
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowUpRight size={18} />
              </a>

              <a className="button button-secondary" href="#contact">
                Contact me
              </a>
            </div>

            <div className="social-links">

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>

              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
              >
                <Mail />
              </a>

            </div>
          </div>

          {/* Developer Illustration */}
          <div className="hero-art" aria-label="Developer illustration">

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <div className="code-card">

              <div className="card-dots">
                <i />
                <i />
                <i />
              </div>

              <Code2 size={42} />

              <p>while (learning) {'{'}</p>
              <p className="code-indent">build();</p>
              <p className="code-indent">improve();</p>
              <p>{'}'}</p>

              <span className="cursor">_</span>
            </div>

            <div className="floating-tag tag-top">
              <Sparkles size={15} />
              Curious mind
            </div>

            <div className="floating-tag tag-bottom">
              <span className="tiny-dot" />
              Consistency matters
            </div>

          </div>

          <a className="scroll-cue" href="#about">
            SCROLL TO EXPLORE <span>↓</span>
          </a>

        </section>

        {/* About Section */}
        <section className="section-wrap section" id="about">

          <SectionTitle
            eyebrow="A LITTLE ABOUT ME"
            title="Curious mind. Consistent learner. Future developer."
            text="I am a third-year Computer Science Engineering student passionate about Java, problem-solving and full-stack development."
          />

          <div className="about-grid">

            <div className="about-card">
              <div className="icon-box">
                <GraduationCap />
              </div>

              <h3>Education</h3>
              <p>{profile.education}</p>
              <span>{profile.location}</span>
            </div>

            <div className="about-card about-highlight">
              <div className="icon-box">
                <BriefcaseBusiness />
              </div>

              <h3>My focus</h3>

              <p>
                Strengthening programming fundamentals, solving DSA
                problems and developing full-stack applications.
              </p>

              <span>Always learning · Always improving</span>
            </div>

            <div className="about-card">
              <div className="icon-box">
                <Code2 />
              </div>

              <h3>My approach</h3>

              <p>
                I believe in consistency, curiosity and learning from
                mistakes while turning ideas into working projects.
              </p>

              <span>Problem solving · Teamwork</span>
            </div>

          </div>
        </section>

        {/* Skills Section */}
        <section className="section-wrap section" id="skills">

          <SectionTitle
            eyebrow="WHAT I WORK WITH"
            title="Skills & technologies"
            text="Tools and technologies I am learning and using to build projects."
          />

          <div className="skills-grid">

            {profile.skills.map((skill, i) => (
              <div className="skill-pill" key={skill}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {skill}
              </div>
            ))}

          </div>
        </section>

        {/* Projects Section */}
        <section className="section-wrap section" id="projects">

          <SectionTitle
            eyebrow="SELECTED WORK"
            title="Projects I've worked on"
            text="A few projects that reflect my learning and practical experience."
          />

          {projectsStatus === 'loading' && (
            <p className="status">
              Loading projects from the database...
            </p>
          )}

          {projectsStatus === 'error' && (
            <p className="status">
              Projects could not load. Start the backend and connect MongoDB,
              then refresh.
            </p>
          )}

          {projectsStatus === 'ready' && projects.length === 0 && (
            <p className="status">
              No projects yet. Run the backend seed command to add sample projects.
            </p>
          )}

          <div className="projects-grid">

            {projects.map((project, i) => (
              <article className="project-card" key={project._id}>

                <div className={`project-visual visual-${i % 3}`}>
                  <span>0{i + 1}</span>
                  <Code2 size={42} />
                </div>

                <div className="project-content">

                  <div className="project-heading">
                    <h3>{project.title}</h3>

                    {project.featured && (
                      <span className="featured">FEATURED</span>
                    )}
                  </div>

                  <p>{project.description}</p>

                  <div className="tech-list">
                    {project.techStack?.map(tech => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub <ArrowUpRight size={15} />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live demo <ArrowUpRight size={15} />
                      </a>
                    )}

                  </div>
                </div>
              </article>
            ))}

          </div>
        </section>

        {/* Contact Section */}
        <section
          className="section-wrap section contact-section"
          id="contact"
        >

          <div className="contact-copy">

            <SectionTitle
              eyebrow="GET IN TOUCH"
              title="Have an idea? Let's connect."
              text="Have a project, opportunity or question? Send me a message using the form."
            />

            <a
              className="email-link"
              href={`mailto:${profile.email}`}
            >
              <Mail size={18} />
              {profile.email}
            </a>

            <p className="location-line">
              Based in {profile.location}
            </p>

          </div>

          <form className="contact-form" onSubmit={submitContact}>

            <label>
              Your name
              <input
                name="name"
                value={form.name}
                onChange={updateForm}
                required
                maxLength="80"
                placeholder="Enter your name"
              />
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={updateForm}
                required
                maxLength="120"
                placeholder="you@example.com"
              />
            </label>

            <label>
              Subject <span className="optional">(optional)</span>
              <input
                name="subject"
                value={form.subject}
                onChange={updateForm}
                maxLength="120"
                placeholder="What is this about?"
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={updateForm}
                required
                maxLength="2000"
                rows="5"
                placeholder="Write your message..."
              />
            </label>

            <button
              className="button button-primary submit-button"
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Send message'}
              <Send size={17} />
            </button>

            {notice && (
              <p className="form-notice" role="status">
                {notice}
              </p>
            )}

          </form>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">

        <a className="logo" href="#home">
          RAMYA P
        </a>

        <p>
          Designed & built with care. © {new Date().getFullYear()} {profile.name}
        </p>

        <a href="#home">
          Back to top ↑
        </a>

      </footer>
    </>
  );
}
