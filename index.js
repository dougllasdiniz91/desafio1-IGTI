let inputName = null;
let allPeople = null;
let tabSearch = null;
let tabEstatistics = null;
let countMale = 0;
let countFemale = 0;
let sumAge = 0;
let avgAge = 0;

//Espera o DOM carregar totalmente
window.addEventListener('load', start);

function start() {
  inputName = document.querySelector('#name');
  tabSearch = document.querySelector('#search');
  tabEstatistics = document.querySelector('#estatistics');
  inputName.focus();
  inputName.addEventListener('keyup', handleActivitButton);
  fetchPeople();
}

//ativar botao de busca
function handleActivitButton(event) {
  const activitButton = document.querySelector('button');
  if (inputName.value !== '') {
    activitButton.disabled = false;
    if (event.key === 'Enter') {
      findPeople();
      clearValues();
    }
    activitButton.addEventListener('click', findPeople);
  } else {
    activitButton.disabled = true;
  }
}

//captura informaçõe da API
async function fetchPeople() {
  const result = await fetch(
    ' https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );

  const json = await result.json();

  allPeople = json.results.map((person) => {
    const { name, picture, dob, gender } = person;
    return {
      name: `${name.first} ${name.last}`,
      picture: picture.large,
      age: dob.age,
      gender: gender,
    };
  });
}

/*
  Faz a comparçao da string que 
  esta no input com a da api.
*/
function findPeople() {
  const compareString = allPeople.filter((person) => {
    let compare = false;
    const lowCaseNameNormalize = person.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const lowCaseName = person.name.toLowerCase();
    const lowCaseInput = inputName.value.toLowerCase();
    const compare1 = lowCaseNameNormalize.includes(lowCaseInput);
    const compare2 = lowCaseName.includes(lowCaseInput);

    if (compare1 || compare2) {
      compare = true;
    }

    return compare;
  });
  compareString.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  renderPeopleList(compareString);
  peopleEstatistic(compareString);
  clearValues();
}

/*Redenriza a lista de 
informaçoes das pessoas*/
function renderPeopleList(data) {
  let peopleHTML = '';
  data.forEach((person) => {
    const { name, age, picture } = person;
    const personHTML = `
        <div class = "col-sm-6 col-md-4 col-lg-3">
          <div class="grid-item">
            <image src="${picture}"/>
            <p>${name}, ${age} anos</p>
          </div>
        </div>
    `;
    peopleHTML += personHTML;
  });
  tabSearch.innerHTML = `
      <h1 class="text-center"> ${data.length} usuário(s) encontrado(s)</h1>
      <div class="text-center row">${peopleHTML}</di>`;
}

function renderPeopleEstatistics() {
  const iconPerson = `
  <h4 class="mb-2 mr-sm-2">
    <svg class="bi bi-people-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
      <path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
      <path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd"/>
    </svg>
  </h4>`;
  const estatisticHTML = `
      <div class="list-group list-group-flush">
        <div>
          <h1>Estatísticas</h1>
          <div class="row">
            <div class="col-sm form-inline">
              ${iconPerson}
              <h4 class="mb-2 mr-sm-2">Sexo masculino:</h4> 
              <h4>${countMale}</h4>
            </div>
            <div class="col-sm form-inline">
              <h4 class="mb-2 mr-sm-2">
                  <svg class="bi bi-plus-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>
                    <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                  </svg>
              </h4>            
              <h4 class="mb-2 mr-sm-2">Soma das idades: </h4>
              <h4>${sumAge}</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-sm form-inline">
              ${iconPerson}
              <h4 class="mb-2 mr-sm-2">Sexo feminino:</h4>
              <h4>${countFemale}</h4>
            </div>
            <div class="col-sm form-inline">
              <h4 class="mb-2 mr-sm-2">
                <svg class="bi bi-plus-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
                </svg>
              </h4>            
              <h4 class="mb-2 mr-sm-2">Média das idades:</h4>
              <h4>${avgAge}</h4>
            </div>
          <div>
        </div>
      </div>
    `;
  tabEstatistics.innerHTML = estatisticHTML;
}

function peopleEstatistic(data) {
  data.forEach((estatistic) => {
    if (estatistic.gender === 'male') {
      countMale++;
    } else {
      countFemale++;
    }
    sumAge += estatistic.age;
  });
  if (data.length !== 0) {
    avgAgeUnformat = sumAge / data.length;
    avgAge = avgAgeUnformat.toFixed(2);
  } else {
    avgAge = 0;
  }

  //renderPeopleEstatistics();

  teste();
}

function clearValues() {
  countFemale = 0;
  countMale = 0;
  sumAge = 0;
  avgAge = 0;
}

function teste() {
  const iconPerson = `
  <h4 class="mb-2 mr-sm-2">
    <svg class="bi bi-people-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/>
      <path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
      <path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd"/>
    </svg>
  </h4>`;
  const iconPlus = `
  <h4 class="mb-2 mr-sm-2">
    <svg class="bi bi-plus-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
      <path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>
      <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>
    </svg>
  </h4>
  `;
  const estatisticHTML = `
      <div class="list-group list-group-flush">
        <div>
          <h1>Estatísticas</h1>
          <div class="row">
            <div class="col-sm form-inline">
              ${iconPerson}
              <h4 class="mb-2 mr-sm-2">Sexo masculino:</h4> 
              <h4>${countMale}</h4>
            </div>
            <div class="col-sm form-inline">
              ${iconPlus}            
              <h4 class="mb-2 mr-sm-2">Soma das idades: </h4>
              <h4>${sumAge}</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-sm form-inline">
              ${iconPerson}
              <h4 class="mb-2 mr-sm-2">Sexo feminino:</h4>
              <h4>${countFemale}</h4>
            </div>
            <div class="col-sm form-inline">
             ${iconPlus}       
              <h4 class="mb-2 mr-sm-2">Média das idades:</h4>
              <h4>${avgAge}</h4>
            </div>
          <div>
        </div>
      </div>
    `;
  tabEstatistics.innerHTML = estatisticHTML;
}
