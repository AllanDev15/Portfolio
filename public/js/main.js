document.addEventListener('DOMContentLoaded', () => {
  scrollNavbar();

  // Control the amount of autoscroll in the preview of projects according to the element height
  const cardPreview = document.querySelector('.project-card__preview');
  let cardPreviewHeight = cardPreview.offsetHeight;
  window.addEventListener('resize', () => (cardPreviewHeight = cardPreview.offsetHeight));
  const translateProperty = `translateY(calc(-100% + ${cardPreviewHeight}px))`;
  document.querySelector('.projects__content').style.setProperty('--translate', translateProperty);

  // Modal projects
  const projects = document.querySelector('.projects__content');
  const modal = document.querySelector('#modal');
  let modalProject;

  projects.addEventListener('click', (e) => {
    const selected = e.target;
    const projectSelected = e.target.dataset.project;
    if (selected.classList.contains('project-card')) {
      modal.classList.add('modal--show');
      modalProject = modal.querySelector(`#${projectSelected}`);
      modalProject.classList.add('project--show');
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
