const root = document.getElementById('root');

const leftCard = document.createElement('div');
leftCard.classList.add('card')

const headerCard = document.createElement('div');
headerCard.classList.add('header-card');

const Title = document.createElement('h1');
Title.innerText = 'Consultar CEP';

headerCard.appendChild(Title)
leftCard.appendChild(headerCard);

const containerSearch = document.createElement('div');
containerSearch.classList.add('container-search');

const labelInput = document.createElement('label');
labelInput.innerText = 'CEP:'

const inputSearch = document.createElement('input');
inputSearch.name = 'CEP';
inputSearch.id = 'CEP';
inputSearch.placeholder = 'Digite seu cep';
inputSearch.addEventListener('keyup', cepFormatter);

containerSearch.appendChild(labelInput)
containerSearch.appendChild(inputSearch)

const RightCard = document.createElement('div');
RightCard.classList.add('card')

const headerRightCard = document.createElement('div');
headerRightCard.classList.add('header-card');

const titleRightCard = document.createElement('h1');
titleRightCard.innerText = 'Endereço completo';

headerRightCard.appendChild(titleRightCard)
RightCard.appendChild(headerRightCard)

const contentCard = document.createElement('div');
contentCard.classList.add("content-card");

function cepFormatter(event) {
    let cep = event.target.value.replace(/\D/g,"");
    cep = cep.replace(/^(\d{5})(\d)/,"$1-$2");
    event.target.value = cep;
}

function consult() {
    let cep = inputSearch.value.replace(/\D/g,"")

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
    
        const spanBairro = document.createElement('span');
        spanBairro.innerHTML = `<strong>Bairro: </strong> ${data.bairro}`;
        RightCard.appendChild(spanBairro);

        const spanCep = document.createElement('span');
        spanCep.innerHTML = `<strong>CEP: </strong> ${data.cep}`;
        RightCard.appendChild(spanCep);

        const spanCidade = document.createElement('span');
        spanCidade.innerHTML = `<strong>Cidade: </strong> ${data.localidade}`;
        RightCard.appendChild(spanCidade);

        const spanLogradouro = document.createElement('span');
        spanLogradouro.innerHTML = `<strong>Logradouro: </strong> ${data.logradouro}`;
        RightCard.appendChild(spanLogradouro);

        const spanUf = document.createElement('span');
        spanUf.innerHTML = `<strong>UF: </strong> ${data.uf}`;
        RightCard.appendChild(spanUf);

        root.appendChild(RightCard);
    })
}

const ButtonSubmit = document.createElement('button');
ButtonSubmit.innerText = 'Consultar'
ButtonSubmit.onclick = consult;

leftCard.appendChild(containerSearch);
leftCard.appendChild(ButtonSubmit);
root.appendChild(leftCard);