import React, { useEffect, useState } from 'react';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('programming');

  const skillsData = {
    programming: [
      { name: 'Python', level: 98, color: '#3776AB' },
      { name: 'Java', level: 95, color: '#007396' },
      { name: 'JavaScript', level: 96, color: '#F7DF1E' }
    ],
    web: [
      { name: 'React', level: 98, color: '#61DAFB' },
      { name: 'Node.js', level: 94, color: '#339933' },
      { name: 'Express.js', level: 92, color: '#000000' },
      { name: 'HTML/CSS', level: 99, color: '#E34F26' }
    ],
    database: [
      { name: 'MongoDB', level: 92, color: '#47A248' },
      { name: 'MySQL', level: 90, color: '#4479A1' }
    ],
    tools: [
      { name: 'Power BI', level: 88, color: '#F2C811' },
      { name: 'Git', level: 95, color: '#F05032' }
    ],
    soft: [
      { name: 'Problem Solving', level: 98 },
      { name: 'Team Collaboration', level: 99 },
      { name: 'Time Management', level: 95 }
    ]
  };

  useEffect(() => {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-level');
          entry.target.style.width = `${width}%`;
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));

    return () => observer.disconnect();
  }, [activeCategory]);

  const categories = [
    { id: 'programming', name: 'Programming', icon: 'fas fa-code' },
    { id: 'web', name: 'Web Development', icon: 'fas fa-globe' },
    { id: 'database', name: 'Database', icon: 'fas fa-database' },
    { id: 'tools', name: 'Tools', icon: 'fas fa-tools' },
    { id: 'soft', name: 'Soft Skills', icon: 'fas fa-users' }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="skills-bg-circle"></div>

      <h2 className="section-title">Technical Expertise</h2>

      <div className="skills-container">
        <div className="skills-categories card animate-on-scroll">
          <h3>Skill Categories</h3>
          <div className="category-buttons">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="skills-display card animate-on-scroll">
          <div className="skills-header">
            <h3>{categories.find(c => c.id === activeCategory)?.name}</h3>
            <div className="skills-count">
              {skillsData[activeCategory].length} Skills
            </div>
          </div>

          <div className="skills-list">
            {skillsData[activeCategory].map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-info">
                  <div className="skill-name">
                    {skill.name}
                    {skill.color && (
                      <span
                        className="skill-color"
                        style={{ backgroundColor: skill.color }}
                      ></span>
                    )}
                  </div>
                  <div className="skill-percentage">{skill.level}%</div>
                </div>
                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    data-level={skill.level}
                    style={{
                      background: skill.color || 'var(--gradient)',
                      width: '0%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LANGUAGES CARD - SEPARATE BUT IN SAME ROW */}
        <div className="skills-languages card animate-on-scroll">
          <h3>Languages</h3>
          <div className="language-items">
            <div className="language-item">
              <div className="language-flag">🇮🇳</div>
              <div className="language-info">
                <div className="language-name">Tamil</div>
                <div className="language-level">Native</div>
              </div>
            </div>
            <div className="language-item">
              <div className="language-flag">🇺🇸</div>
              <div className="language-info">
                <div className="language-name">English</div>
                <div className="language-level">Professional</div>
              </div>
            </div>
          </div>
          <div className="language-progress">
            <div className="progress-label">Communication</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;