import { courses } from './main.js';

const coursesContainer = document.querySelector('.courses__content');
const loadAllCoursesBtn = document.querySelector('#loadAllCourses');

coursesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('course__header')) {
    const active = coursesContainer.querySelector('.course--active');
    const course = e.target.parentElement;
    course.classList.toggle('course--active');

    if (active) {
      active.classList.remove('course--active');
    }
  }
});

loadAllCoursesBtn.addEventListener('click', () => {
  for (let i = 5; i < 10; i++) {
    showCourses(courses[i], true);
  }
  loadAllCoursesBtn.remove();
});

export function showCourses(course, isFade) {
  const courseContainer = document.createElement('div');
  courseContainer.className = 'course';

  const courseHeader = document.createElement('div');
  courseHeader.className = 'course__header';

  const courseTitle = document.createElement('div');
  courseTitle.className = 'course__title';
  courseTitle.innerHTML = `
    <p>${course.name}</p>
    <span>${course.hours}</span>`;

  const coursePlatform = document.createElement('div');
  coursePlatform.className = 'course__platform';
  coursePlatform.innerHTML = `
  <p>${course.platform}</p>
  <svg class="logo" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="0.63em"
    height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 320 512">
    <path fill="currentColor"
      d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4l96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
  </svg>`;

  const courseContent = document.createElement('div');
  courseContent.className = 'course__content';

  courseHeader.appendChild(courseTitle);
  courseHeader.appendChild(coursePlatform);
  courseContainer.appendChild(courseHeader);

  if (course.technologies.length > 0) {
    const courseLearnings = document.createElement('div');
    courseLearnings.className = 'course__learnings';
    courseLearnings.innerHTML = `<p>Lo que aprendí:</p>`;
    const courseTechnologies = document.createElement('div');
    courseTechnologies.className = 'course__technologies';

    course.technologies.forEach((technologie) => {
      const tech = document.createElement('div');
      tech.className = 'course__technology';

      const techIcon = document.createElement('img');
      techIcon.src = technologie.icon;
      tech.appendChild(techIcon);

      const techName = document.createElement('p');
      techName.textContent = technologie.name;
      tech.appendChild(techName);

      courseTechnologies.appendChild(tech);
    });

    courseLearnings.appendChild(courseTechnologies);
    courseContent.appendChild(courseLearnings);
  }

  const courseCertificate = document.createElement('div');
  courseCertificate.className = 'course__certificate';
  courseCertificate.innerHTML = `
  <a class="link" href="${course.certificate}" target="_blank" rel="noopener noreferrer">Certificado</a>`;

  courseContent.appendChild(courseCertificate);
  courseContainer.appendChild(courseContent);
  coursesContainer.appendChild(courseContainer);

  if (isFade) {
    courseContainer.classList.add('fade');
    setTimeout(() => {
      courseContainer.classList.remove('fade');
    }, 50);
  }
}
