import { createProjectModal, calcPreviewAutoscroll, showProjectCard } from './projects.js';
import { showCourses } from './courses.js';

fetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    projects = data.projects.sort((a, b) => a['order'] - b['order']);
    courses = data.courses.sort((a, b) => a['order'] - b['order']);
    for (let i = 0; i < 3; i++) {
      showProjectCard(projects[i]);
    }
    for (let i = 0; i < 5; i++) {
      showCourses(courses[i]);
    }
  })
  .then(() => calcPreviewAutoscroll());

let projects,
  courses,
  theme = 'theme--dark';

// Theme

const body = document.querySelector('body');
const darkTheme = document.querySelector('#themeDark');
const lightTheme = document.querySelector('#themeLight');
const preferedTheme = localStorage.getItem('preferedTheme');
setTheme();

function setTheme() {
  if (preferedTheme) {
    theme = preferedTheme;
  } else if (window.matchMedia('(prefers-color-scheme:light)').matches) {
    theme = 'theme--light';
  }

  if (theme === 'theme--light') {
    darkTheme.parentElement.style.display = 'block';
    lightTheme.parentElement.style.display = 'none';
  } else if (theme === 'theme--dark') {
    lightTheme.parentElement.style.display = 'block';
  }

  body.className = theme;
}

darkTheme.addEventListener('click', () => colorThemeChange('theme--dark'));
lightTheme.addEventListener('click', () => colorThemeChange('theme--light'));

function colorThemeChange(newTheme) {
  theme = newTheme;
  body.className = theme;

  if (newTheme === 'theme--dark') {
    darkTheme.parentElement.style.display = 'none';
    lightTheme.parentElement.style.display = 'flex';
  } else if (newTheme === 'theme--light') {
    lightTheme.parentElement.style.display = 'none';
    darkTheme.parentElement.style.display = 'flex';
  }

  localStorage.setItem('preferedTheme', theme);

  body.classList.add('color-transition');
  setTimeout(() => {
    body.classList.remove('color-transition');
  }, 800);
}

scrollNavbar();
window.addEventListener('resize', () => calcPreviewAutoscroll());

// Navbar Intersection
const navigationList = document.querySelector('.navigation__list');
const sections = document.querySelectorAll('section');
const parallax = document.querySelector('.parallax');
const aboutLink = document.querySelector('.navigation__list li:nth-child(1)');
const skillsLink = document.querySelector('.navigation__list li:nth-child(2)');
const projectsLink = document.querySelector('.navigation__list li:nth-child(3)');
const trainingLink = document.querySelector('.navigation__list li:nth-child(4)');
const indicator = document.querySelector('.navigation__indicator');
sections.forEach(setIntersection);
let linkActive;

// Links click
navigationList.addEventListener('click', (e) => {
  if (e.target.classList.contains('navigation__link')) {
    e.preventDefault();

    const target = document.querySelector(e.target.hash);
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }
});

// Intersection Observer
function navbarIntersection(entries) {
  entries.forEach((entry) => {
    linkActive = navigationList.querySelector('li.active');
    if (entry.isIntersecting) {
      indicator.classList.add('active');
      if (linkActive) {
        linkActive.classList.remove('active');
      }
      const element = entry.target;

      if (element.classList.contains('about')) {
        aboutLink.classList.add('active');
      } else if (element.classList.contains('technical-skills')) {
        skillsLink.classList.add('active');
      } else if (element.classList.contains('projects')) {
        projectsLink.classList.add('active');
      } else if (element.classList.contains('training')) {
        trainingLink.classList.add('active');
      }
    }
  });
}

function setIntersection(target) {
  let observer;
  if (target.id === 'training') {
    observer = new IntersectionObserver(navbarIntersection, {
      root: parallax,
      threshold: [0.7, 0.8, 0.9, 1],
    });
  } else {
    observer = new IntersectionObserver(navbarIntersection, {
      root: parallax,
      threshold: [0.9, 1],
    });
  }
  observer.observe(target);
}

parallax.addEventListener('scroll', () => {
  if (parallax.scrollTop <= parallax.offsetHeight / 2) {
    if (linkActive) {
      linkActive.classList.remove('active');
    }
    indicator.classList.remove('active');
  }
});

// Interests
const interestList = document.querySelector('.interests__list');
interestList.addEventListener('mouseover', (e) => {
  if (e.target.classList.contains('interests__item')) {
    const item = e.target;
    const expanded = interestList.querySelector('.expand');

    if (expanded) {
      expanded.classList.remove('expand');
    }
    item.classList.add('expand');
  }
});

// CV buttons
const cvBtn = document.querySelector('#cv');
const cvBtnMobile = document.querySelector('#cv-mobile');
let digitalBtn, printBtn;

cvBtn.addEventListener('click', () => showCvButtons(cvBtn));
cvBtnMobile.addEventListener('click', () => showCvButtons(cvBtnMobile));

function showCvButtons(element) {
  digitalBtn = element.parentElement.querySelector('.about__button--digital');
  printBtn = element.parentElement.querySelector('.about__button--print');
  digitalBtn.style.display = 'flex';
  printBtn.style.display = 'flex';

  setTimeout(() => {
    digitalBtn.classList.add('show');
    printBtn.classList.add('show');
  }, 100);

  element.classList.add('hide');
}

// Modal projects
const projectsContainer = document.querySelector('.projects__content');
const modal = document.querySelector('#modal');
let modalProject;

projectsContainer.addEventListener('click', (e) => {
  const selected = e.target;
  const projectSelected = e.target.dataset.project;
  if (selected.classList.contains('project-card')) {
    modal.classList.add('modal--show');
    // Si existe el proyecto lo muestra sino lo crea
    if ((modalProject = modal.querySelector(`#${projectSelected}`))) {
      modalProject.classList.add('project--show');
    } else {
      modalProject = createProjectModal(projectSelected);
    }
  }
});

modal.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('modal--show');
    modalProject.classList.remove('project--show');
  }

  if (e.target.classList.contains('close-modal')) {
    modal.classList.remove('modal--show');
    modalProject.classList.remove('project--show');
  }
});

function scrollNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarHeight = navbar.offsetHeight;
  const navigationLinks = navbar.querySelectorAll('.whiteLink');
  const parallax = document.querySelector('.parallax');

  parallax.addEventListener('scroll', () => {
    const parallaxScroll = parallax.scrollTop;

    if (parallaxScroll > navbarHeight * 2) {
      navbar.classList.add('navbar--scroll');
    } else {
      navbar.classList.remove('navbar--scroll');
    }
  });
}

export { projects, courses };
