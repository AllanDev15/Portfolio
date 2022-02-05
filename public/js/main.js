import { createProjectModal, calcPreviewAutoscroll } from './projects.js';

scrollNavbar();
window.addEventListener('resize', () => calcPreviewAutoscroll());

// Modal projects
const projects = document.querySelector('.projects__content');
const modal = document.querySelector('#modal');
let modalProject;

projects.addEventListener('click', (e) => {
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
      navigationLinks.forEach((link) => {
        link.classList.remove('whiteLink');
        link.classList.add('blackLink');
      });
    } else {
      navbar.classList.remove('navbar--scroll');
      navigationLinks.forEach((link) => {
        link.classList.remove('blackLink');
        link.classList.add('whiteLink');
      });
    }
  });
}
