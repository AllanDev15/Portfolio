document.addEventListener('DOMContentLoaded', () => {
  scrollNavbar();
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
