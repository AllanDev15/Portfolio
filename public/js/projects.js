const projectsContainer = document.querySelector('.projects__content');
let projectsObj;

fetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    projectsObj = data.projects;
    for (let i = 0; i < 3; i++) {
      showProjectCard(projectsObj[i]);
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

function showProjectCard(project) {
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

function createProjectModal(projectName) {
  let projectObj = projectsObj.filter((project) => project.name === projectName);
  projectObj = projectObj[0];

  const projectContainer = document.createElement('article');
  projectContainer.className = 'project project--show container container--modal';
  projectContainer.id = projectName;

  const closeButton = document.createElement('button');
  closeButton.className = 'close-modal';
  closeButton.innerHTML = `
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="0.69em" height="1em"
        preserveAspectRatio="xMidYMid meet" viewBox="0 0 352 512">
        <path
          d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28L75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256L9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
          fill="currentColor" />
      </svg>`;

  const projectImgContainer = document.createElement('figure');
  projectImgContainer.className = 'project__img';
  const projectImg = document.createElement('img');
  projectImg.src = projectObj.preview;
  projectImg.alt = 'Imagen preview del proyecto';

  const projectContent = document.createElement('div');
  projectContent.className = 'project__content';
  const projectInfo = document.createElement('div');
  projectInfo.className = 'project__info';
  const projectTitle = document.createElement('h3');
  projectTitle.className = 'project__title title';
  projectTitle.textContent = projectObj.title;
  const projectDescription = document.createElement('p');
  projectDescription.className = 'project__description principal-text';
  projectDescription.textContent = projectObj.description;

  const projectTools = document.createElement('div');
  projectTools.className = 'project__tools';
  const p = document.createElement('p');
  p.textContent = 'Lenguajes y herramientas utilizados:';
  const tools = document.createElement('div');
  tools.className = 'tools';

  projectObj.technologies.forEach((technology) => {
    const tool = document.createElement('div');
    tool.className = 'tool';
    const icon = document.createElement('img');
    icon.className = 'icon';
    icon.src = technology.icon;
    icon.alt = `${technology.name}-icon`;
    tool.appendChild(icon);
    const techName = document.createElement('p');
    techName.textContent = technology.name;
    tool.appendChild(techName);
    // tool.innerText = technology.name;

    tools.appendChild(tool);
  });

  const projectButtons = document.createElement('div');
  projectButtons.className = 'project__buttons';

  const githubButton = document.createElement('a');
  githubButton.className = 'button button--icon';
  githubButton.href = projectObj.repository;
  githubButton.target = '_blank';
  githubButton.rel = 'noopener noreferrer';
  githubButton.innerHTML = `
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="0.97em"
        height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 496 512">
        <path
          d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6c-3.3.3-5.6-1.3-5.6-3.6c0-2 2.3-3.6 5.2-3.6c3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9c2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9c.3 2 2.9 3.3 5.9 2.6c2.9-.7 4.9-2.6 4.6-4.6c-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2c12.8 2.3 17.3-5.6 17.3-12.1c0-6.2-.3-40.4-.3-61.4c0 0-70 15-84.7-29.8c0 0-11.4-29.1-27.8-36.6c0 0-22.9-15.7 1.6-15.4c0 0 24.9 2 38.6 25.8c21.9 38.6 58.6 27.5 72.9 20.9c2.3-16 8.8-27.1 16-33.7c-55.9-6.2-112.3-14.3-112.3-110.5c0-27.5 7.6-41.3 23.6-58.9c-2.6-6.5-11.1-33.3 2.6-67.9c20.9-6.5 69 27 69 27c20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27c13.7 34.7 5.2 61.4 2.6 67.9c16 17.7 25.8 31.5 25.8 58.9c0 96.5-58.9 104.2-114.8 110.5c9.2 7.9 17 22.9 17 46.4c0 33.7-.3 75.4-.3 83.6c0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252C496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2c1.6 1.6 3.9 2.3 5.2 1c1.3-1 1-3.3-.7-5.2c-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9c1.6 1 3.6.7 4.3-.7c.7-1.3-.3-2.9-2.3-3.9c-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2c2.3 2.3 5.2 2.6 6.5 1c1.3-1.3.7-4.3-1.3-6.2c-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9c1.6 2.3 4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2c-1.4-2.3-4-3.3-5.6-2z"
          fill="currentColor" />
      </svg>
      `;

  const projectButton = document.createElement('a');
  projectButton.className = 'button button--primary';
  projectButton.href = projectObj.link;
  projectButton.target = '_blank';
  projectButton.rel = 'noopener noreferrer';
  projectButton.textContent = 'Visitar';

  modal.appendChild(projectContainer);
  projectContainer.appendChild(closeButton);
  projectContainer.appendChild(projectImgContainer);
  projectImgContainer.appendChild(projectImg);
  projectContainer.appendChild(projectContent);
  projectContent.appendChild(projectInfo);
  projectInfo.appendChild(projectTitle);
  projectInfo.appendChild(projectDescription);
  projectInfo.appendChild(projectTools);
  projectTools.appendChild(p);
  projectTools.appendChild(tools);
  projectContent.appendChild(projectButtons);
  projectButtons.appendChild(githubButton);
  projectButtons.appendChild(projectButton);
  return projectContainer;
}

export { createProjectModal, calcPreviewAutoscroll };
