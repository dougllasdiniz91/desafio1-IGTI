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
      <div class="text-center row justify-content-center">${peopleHTML}</di>`;
}

function renderPeopleEstatistics() {
  const estatisticHTML = `
        <div class="text-center">
          <h1 class="p-2  badge-success border">Estatísticas</h1>
        </div>       
        <div class=" text-center row justify-content-center ">          
          <div class="col-sm-12 col-md-6 col-lg-6">              
            <h4 class="p-2  badge-primary border"> Sexo masculino: ${countMale}</h4>              
            <h4 class="p-2  badge-primary border">Sexo feminino: ${countFemale}</h4>            
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 ">
            <h4 class="p-2  badge-primary border">Soma das idades: ${sumAge} </h4>
            <h4 class="p-2  badge-primary border">Média das idades: ${avgAge}</h4>
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

  renderPeopleEstatistics();
  //teste();
}

function clearValues() {
  countFemale = 0;
  countMale = 0;
  sumAge = 0;
  avgAge = 0;
}

function teste() {
  const estatisticHTML = `
        <div class="text-center">
          <h1 class="p-2  badge-success border">Estatísticas</h1>
        </div>       
        <div class=" text-center row justify-content-center ">          
          <div class="col-sm-12 col-md-6 col-lg-6">              
            <h4 class="p-2  badge-primary border"> Sexo masculino: ${countMale}</h4>              
            <h4 class="p-2  badge-primary border">Sexo feminino: ${countFemale}</h4>            
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 ">
            <h4 class="p-2  badge-primary border">Soma das idades: ${sumAge} </h4>
            <h4 class="p-2  badge-primary border">Média das idades: ${avgAge}</h4>
          </div>
        </div>
    `;
  tabEstatistics.innerHTML = estatisticHTML;
}
