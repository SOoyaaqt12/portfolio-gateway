// ===== DYNAMIC EXPERIENCE RENDERING =====
function renderExperience() {
    const experienceTimeline = document.getElementById('experience-timeline');

    if (!experienceTimeline || typeof experienceData === 'undefined') return;

    experienceTimeline.innerHTML = '';

    experienceData.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.animationDelay = `${(index + 1) * 0.1}s`;

        timelineItem.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-date">${exp.date}</span>
        <h3>${exp.title}</h3>
        <h4>${exp.company}</h4>
        <p>${exp.description}</p>
      </div>
    `;

        experienceTimeline.appendChild(timelineItem);
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Render experience
    renderExperience();
});
