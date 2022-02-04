const projectsContainer = document.querySelector('.projects__content');
let projectsObj;

fetch('/public/data.json')
  .then((response) => response.json())
  .then((data) => {
    projectsObj = data.projects;
    for (let i = 0; i < 3; i++) {
      showProject(projectsObj[i]);
    }
  })
  .then(() => calcPreviewAutoscroll());

function calcPreviewAutoscroll() {
  // Control the amount of autoscroll in the preview of projects according to the element height
  const cardPreview = document.querySelector('.project-card__preview');
  const cardPreviewHeight = cardPreview.offsetHeight;
  const translateProperty = `translateY(calc(-100% + ${cardPreviewHeight}px))`;
  document.querySelector('.projects__content').style.setProperty('--translate', translateProperty);
}

function showProject(project) {
  const projectCard = document.createElement('div');
  projectCard.className = 'project-card';
  projectCard.dataset.project = project.name;

  const cardPreview = document.createElement('div');
  cardPreview.className = 'project-card__preview';

  const cardImg = document.createElement('img');
  cardImg.className = 'project-card__img';
  cardImg.src = project.preview;
  cardImg.alt = 'Imagen preview del proyecto';

  const cardInfo = document.createElement('div');
  cardInfo.className = 'project-card__info';
  const projectTitle = document.createElement('p');
  projectTitle.textContent = project.title;

  const cardTechnologies = document.createElement('div');
  cardTechnologies.className = 'project-card__technologies';

  project.mainTechnologies.forEach((technology) => {
    const cardTechnology = document.createElement('div');
    cardTechnology.className = 'project-card__technology';
    cardTechnology.textContent = technology;
    cardTechnologies.appendChild(cardTechnology);
  });

  projectCard.appendChild(cardPreview);
  cardPreview.appendChild(cardImg);
  cardInfo.appendChild(projectTitle);
  cardInfo.appendChild(cardTechnologies);
  projectCard.appendChild(cardInfo);
  projectsContainer.appendChild(projectCard);
}

export { projectsObj, calcPreviewAutoscroll };
