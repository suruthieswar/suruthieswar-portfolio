import React, { useEffect, useState } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Interactive Tamil Chatbot",
      description: "AI-powered Tamil chatbot supporting both text and voice-based interaction with speech-to-text and text-to-speech features for seamless bilingual communication.",
      technologies: ["Python", "NLP", "Speech Recognition", "React"],
      category: "ai",
      github: "https://github.com/suruthieswar",
      demo: "#",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      awards: ["1st Prize - Internal Club"]
    },
    {
      id: 2,
      title: "Care Connect System",
      description: "Full-stack platform for elderly support with video calling, SOS alerts, Amazon purchase links, personal notes, and age-based exercise recommendations.",
      technologies: ["React", "Node.js", "WebRTC", "MongoDB"],
      category: "fullstack",
      github: "https://github.com/suruthieswar",
      demo: "#",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "VisualMath: AI Learning",
      description: "AI-powered web app that visualizes and solves math problems from equation images using OCR and NLP-based chatbot for step-by-step solutions.",
      technologies: ["Python", "OCR", "Computer Vision", "React"],
      category: "ai",
      github: "https://github.com/suruthieswar",
      demo: "#",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Sentiment Analysis System",
      description: "ML system that analyzes text sentiment to classify opinions as positive, negative, or neutral using NLP techniques and ML models.",
      technologies: ["Python", "ML", "NLP", "TensorFlow"],
      category: "ml",
      github: "https://github.com/suruthieswar",
      demo: "#",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'ai', name: 'AI Projects' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'fullstack', name: 'Full Stack' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    // Parallax effect for project cards
    const projectCards = document.querySelectorAll('.project-card');

    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      const tiltX = (yPercent - 0.5) * 20;
      const tiltY = (xPercent - 0.5) * -20;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseLeave = (card) => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => handleMouseLeave(card));
    });

    return () => {
      projectCards.forEach(card => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e, card));
        card.removeEventListener('mouseleave', () => handleMouseLeave(card));
      });
    };
  }, [filteredProjects]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-grid-bg"></div>

      <h2 className="section-title">Innovative Projects</h2>

      <div className="projects-container">
        <div className="projects-filter card animate-on-scroll">
          <h3>Filter by Category</h3>
          <div className="filter-buttons">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.name}
                <span className="filter-count">
                  {filter.id === 'all'
                    ? projects.length
                    : projects.filter(p => p.category === filter.id).length}
                </span>
              </button>
            ))}
          </div>

          <div className="projects-stats">
            <div className="stat">
              <div className="stat-number">3+</div>
              <div className="stat-label">Total Projects</div>
            </div>
            <div className="stat">
              <div className="stat-number">10+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat">
              <div className="stat-number">3</div>
              <div className="stat-label">Completion</div>
            </div>
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="project-card card"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-category">
                    {project.category.toUpperCase()}
                  </div>
                  {project.awards && (
                    <div className="project-award">
                      <i className="fas fa-trophy"></i>
                      Award Winner
                    </div>
                  )}
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <div className="project-links">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    <a
                      href={project.demo}
                      className="project-link"
                    >
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-hover-content">
                  <div className="hover-details">
                    <div className="detail-item">
                      <i className="fas fa-code"></i>
                      <span>AI & ML Integration</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-users"></i>
                      <span>User-friendly UI</span>
                    </div>
                  </div>
                  <button
                    className="project-view-btn"
                    onClick={() => window.open(project.github, '_blank')}
                  >
                    View Code
                    <i className="fab fa-github" style={{ marginLeft: '8px' }}></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-features card animate-on-scroll">
          <h3>Project Methodology</h3>
          <div className="features-list">
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h4>Concept & Planning</h4>
              <p>Thorough research and planning phase to ensure project success.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-code"></i>
              </div>
              <h4>Development</h4>
              <p>Agile development with modern technologies and best practices.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h4>Deployment</h4>
              <p>Seamless deployment with continuous integration and testing.</p>
            </div>
          </div>
        </div>

        {/* Core Tech Stack Shelf */}
        <div className="tech-shelf-container card animate-on-scroll">
          <h3>Core Technology Stack</h3>
          <div className="tech-shelf-wrapper">
            <div className="tech-shelf">
              {/* First Set */}
              <div className="tech-shelf-item"><i className="fab fa-react react-icon"></i><span>React</span></div>
              <div className="tech-shelf-item"><i className="fab fa-node-js node-icon"></i><span>Node.js</span></div>
              <div className="tech-shelf-item"><i className="fas fa-database mongo-icon"></i><span>MongoDB</span></div>
              <div className="tech-shelf-item"><i className="fab fa-python python-icon"></i><span>Python</span></div>
              <div className="tech-shelf-item"><i className="fab fa-html5 html-icon"></i><span>HTML5</span></div>
              <div className="tech-shelf-item"><i className="fab fa-css3-alt css-icon"></i><span>CSS3</span></div>
              <div className="tech-shelf-item"><i className="fab fa-js-square js-icon"></i><span>JavaScript</span></div>
              <div className="tech-shelf-item"><i className="fas fa-brain ai-icon"></i><span>AI/ML</span></div>
              {/* Duplicate Set for seamless loop */}
              <div className="tech-shelf-item"><i className="fab fa-react react-icon"></i><span>React</span></div>
              <div className="tech-shelf-item"><i className="fab fa-node-js node-icon"></i><span>Node.js</span></div>
              <div className="tech-shelf-item"><i className="fas fa-database mongo-icon"></i><span>MongoDB</span></div>
              <div className="tech-shelf-item"><i className="fab fa-python python-icon"></i><span>Python</span></div>
              <div className="tech-shelf-item"><i className="fab fa-html5 html-icon"></i><span>HTML5</span></div>
              <div className="tech-shelf-item"><i className="fab fa-css3-alt css-icon"></i><span>CSS3</span></div>
              <div className="tech-shelf-item"><i className="fab fa-js-square js-icon"></i><span>JavaScript</span></div>
              <div className="tech-shelf-item"><i className="fas fa-brain ai-icon"></i><span>AI/ML</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;