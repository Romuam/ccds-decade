// Generate past events HTML from EVENTS database
function generatePastEventsHTML() {
  // Group events by year
  const eventsByYear = {};
  
  Object.keys(EVENTS).forEach(eventId => {
    const match = eventId.match(/ev-(\d+)-/);
    if (match) {
      const year = parseInt(match[1]);
      if (!eventsByYear[year]) {
        eventsByYear[year] = [];
      }
      eventsByYear[year].push({ id: eventId, ...EVENTS[eventId] });
    }
  });
  
  // Sort years in descending order
  const years = Object.keys(eventsByYear).map(Number).sort((a, b) => b - a);
  
  let html = '<span class="section-label" style="margin-bottom:24px">Archive · Past Events by Year</span>\n';
  
  years.forEach((year, index) => {
    const events = eventsByYear[year];
    const isOpen = index === 0 ? 'open' : '';
    const arrow = index === 0 ? '▾' : '▶';
    
    html += `
      <!-- ${year} Events -->
      <div class="pub-year-group" ${index > 0 ? 'style="margin-top:24px"' : ''}>
        <button class="pub-year-toggle ${isOpen}" onclick="toggleYear(this)">
          <span class="yr">${year}</span>
          <span class="count">${events.length} event${events.length > 1 ? 's' : ''} <span class="arrow">${arrow}</span></span>
        </button>
        <div class="pub-year-body ${isOpen}">
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px">
`;
    
    events.forEach(event => {
      html += `
            <div class="past-ev-item" onclick="openEventModal('${event.id}')">
              <div class="past-ev-info">
                <div class="past-ev-title">${event.title}</div>
                <div class="past-ev-date">${event.date}${event.speakers ? ' · ' + event.speakers + ' speaker' + (event.speakers > 1 ? 's' : '') : ''}</div>
              </div>
            </div>
`;
    });
    
    html += `
          </div>
        </div>
      </div>
`;
  });
  
  return html;
}

// Replace the past events section on page load
document.addEventListener('DOMContentLoaded', function() {
  const pastEventsSection = document.querySelector('[style*="Archive"]')?.parentElement;
  if (pastEventsSection) {
    pastEventsSection.innerHTML = generatePastEventsHTML();
  }
});
