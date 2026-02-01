import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => observer.observe(item));

    // Counter animation for statistics (only in About section)
    const counters = document.querySelectorAll('.about-stats .stat-number');

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          counter.textContent = target;
        }
      };

      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            counterObserver.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });

      counterObserver.observe(counter);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-bg-shape shape-1"></div>
      <div className="about-bg-shape shape-2"></div>

      <h2 className="section-title">Professional Journey</h2>

      <div className="about-container">
        <div className="about-content">
          <div className="about-intro card animate-on-scroll">
            <h3>Transforming Ideas into Intelligent Solutions</h3>
            <p>
              As an AIML engineering student with a passion for full-stack development,
              I specialize in creating intelligent systems that solve real-world problems.
              My approach combines academic excellence with practical implementation.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-number" data-target="7.94">0</div>
                <div className="stat-label">Current CGPA</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="80">0</div>
                <div className="stat-label">HSC Percentage</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-target="4">0</div>
                <div className="stat-label">Major Projects</div>
              </div>
            </div>
          </div>

          <div className="education-timeline card animate-on-scroll">
            <h3>Educational Excellence</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot">
                  <div className="dot-glow"></div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">2023 - 2027</div>
                  <h4>B.Tech in Artificial Intelligence & Machine Learning</h4>
                  <div className="timeline-institution">
                    <i className="fas fa-university"></i>
                    Kongu Engineering College
                  </div>
                  <div className="timeline-grade">
                    <span className="grade-badge">CGPA: 7.94</span>
                  </div>
                  <p>
                    Specializing in AI algorithms, neural networks, and intelligent systems.
                    Active participant in hackathons and technical symposiums.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">
                  <div className="dot-glow"></div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">2023</div>
                  <h4>Higher Secondary Certificate (HSC)</h4>
                  <div className="timeline-institution">
                    <i className="fas fa-school"></i>
                    Ponnu Matric Higher Secondary School
                  </div>
                  <div className="timeline-grade">
                    <span className="grade-badge">Percentage: 80%</span>
                  </div>
                  <p>
                    Graduated with distinction in Computer Science, laying the foundation
                    for programming and computational thinking.
                  </p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot">
                  <div className="dot-glow"></div>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">2021</div>
                  <h4>Secondary School Leaving Certificate (SSLC)</h4>
                  <div className="timeline-institution">
                    <i className="fas fa-school"></i>
                    Ponnu Matric Higher Secondary School
                  </div>
                  <p>
                    Completed schooling with strong fundamentals in mathematics and sciences,
                    sparking interest in technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-features">
          <div className="feature-grid">
            <div className="feature-card card animate-on-scroll">
              <div className="feature-icon">
                <i className="fas fa-laptop-code"></i>
              </div>
              <h4>Full Stack Development</h4>
              <p>
                Building end-to-end web applications with modern technologies
                like React, Node.js, and MongoDB.
              </p>
            </div>

            <div className="feature-card card animate-on-scroll">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h4>Machine Learning</h4>
              <p>
                Implementing ML models for data analysis, pattern recognition,
                and predictive analytics.
              </p>
            </div>

            <div className="feature-card card animate-on-scroll">
              <div className="feature-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h4>Deep Learning</h4>
              <p>
                Creating neural networks for complex problem-solving in computer
                vision and natural language processing.
              </p>
            </div>

            <div className="feature-card card animate-on-scroll">
              <div className="feature-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h4>Data Analysis</h4>
              <p>
                Extracting insights from data using statistical methods and
                visualization tools like Power BI.
              </p>
            </div>
          </div>

          <div className="tech-showcase card animate-on-scroll">
            <h3>Technology Philosophy</h3>
            <p>
              I believe in creating technology that not only solves problems but
              also enhances human capabilities. My work focuses on intuitive
              interfaces backed by powerful AI systems.
            </p>
            <div className="tech-tags">
              <span className="tech-tag">Innovation</span>
              <span className="tech-tag">User Experience</span>
              <span className="tech-tag">Scalability</span>
              <span className="tech-tag">Performance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;