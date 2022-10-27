const root = document.getElementById('root');

const Header = document.createElement('header');

const Title = document.createElement('h1');
Title.innerText = 'Consultar CEP';

Header.appendChild(Title);

const inputSearch = document.createElement('input');
inputSearch.name = 'CEP';
inputSearch.id = 'CEP';
inputSearch.placeholder = 'Digite seu cep';
inputSearch.addEventListener('keyup', cepFormatter);

const ButtonSubmit = document.createElement('button');
ButtonSubmit.innerText = 'Consultar'

const buttonNewSearch = document.createElement('button');
buttonNewSearch.innerText = 'Fazer nova consulta'
buttonNewSearch.id = 'btn-new-search';

const Card = document.createElement('div');
Card.classList.add('card')

const headerCard = document.createElement('div');
headerCard.classList.add('header-card');

const titleCard = document.createElement('h1');
titleCard.innerText = 'Endereço completo';

headerCard.appendChild(titleCard)
headerCard.appendChild(buttonNewSearch)
Card.appendChild(headerCard)

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
        contentCard.appendChild(spanBairro);

        const spanCep = document.createElement('span');
        spanCep.innerHTML = `<strong>CEP: </strong> ${data.cep}`;
        contentCard.appendChild(spanCep);

        const spanCidade = document.createElement('span');
        spanCidade.innerHTML = `<strong>Cidade: </strong> ${data.localidade}`;
        contentCard.appendChild(spanCidade);

        const spanUf = document.createElement('span');
        spanUf.innerHTML = `<strong>UF: </strong> ${data.uf}`;
        contentCard.appendChild(spanUf);

        const spanLogradouro = document.createElement('span');
        spanLogradouro.innerHTML = `<strong>Logradouro: </strong> ${data.logradouro}`;
        contentCard.appendChild(spanLogradouro);

        if (data.complemento) {
            const spanComplemento = document.createElement('span');
            spanComplemento.innerHTML = `<strong>Complemento: </strong> ${data.complemento}`;
            contentCard.appendChild(spanComplemento);
        } else {
            spanLogradouro.classList.add("last-item-grid");
        }

        Card.appendChild(contentCard);  
        root.appendChild(Card);
    })

    ButtonSubmit.disabled = true;
    ButtonSubmit.style.opacity = '0.5';
}

function reloadPage() {
    window.location.reload();
}

ButtonSubmit.onclick = consult;
buttonNewSearch.onclick = reloadPage;

Header.appendChild(inputSearch);
Header.appendChild(ButtonSubmit);
root.appendChild(Header);