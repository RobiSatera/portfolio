const projectLabels = [
  { title: 'Front End' },
  { title: 'Back End' }
];

const projectCards = [
  {
    title: 'Online Fitness Platform',
    description: 'An online fitness platform designed to provide a seamless and user-friendly way to access workouts, fitness services, and training resources. Built with a modern and responsive design, it delivers a smooth experience across all devices.'
  },
  {
    title: 'Mobile Fitness App',
    description: 'A mobile fitness application designed to showcase clean UI design, intuitive navigation, and mobile-first usability principles.'
  }
];

const skillsCards = [
  {
    title: 'Front End',
    description: 'HTML, Javascript, React - Crafting modern web applications with responsive layouts, smooth interactions, and engaging user interfaces.'
  },
  {
    title: 'Back End',
    description: 'PHP, MySQL - Creating robust web applications, managing databases, and developing server-side functionality for seamless user experiences.'
  },
  {
    title: 'Tools',
    description: 'GIT, GitHub, VS Code, Figma - Managing code versions, collaborating with teams, and writing clean, maintainable code.'
  }
];

function createCard(item) {
  const card = document.createElement('article');
  card.className = 'card';

  const title = document.createElement('h2');
  title.textContent = item.title;
  card.appendChild(title);

  if (item.description) {
    const description = document.createElement('p');
    description.textContent = item.description;
    card.appendChild(description);
  }

  return card;
}

function renderCards(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  items.forEach(item => {
    container.appendChild(createCard(item));
  });
}

function setActiveNavLink(link) {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(navLink => navLink.classList.remove('active'));
  if (link) {
    link.classList.add('active');
  }
}

function getCurrentSection() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const scrollPosition = window.scrollY + window.innerHeight * 0.22;

  return sections.reduce((closest, section) => {
    const rect = section.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    if (sectionTop <= scrollPosition) {
      return section;
    }
    return closest;
  }, sections[0]);
}

function updateActiveNavOnScroll() {
  const currentSection = getCurrentSection();
  const activeLink = currentSection
    ? document.querySelector(`nav a[href="#${currentSection.id}"]`)
    : null;
  setActiveNavLink(activeLink);
}

window.addEventListener('DOMContentLoaded', () => {
  renderCards('projectLabels', projectLabels);
  renderCards('projectCards', projectCards);
  renderCards('skillsCards', skillsCards);

  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        setActiveNavLink(link);
      }
    });
  });

  updateActiveNavOnScroll();
  window.addEventListener('scroll', updateActiveNavOnScroll);
});
