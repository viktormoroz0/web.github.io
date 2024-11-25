const header = document.querySelector('header')
const section = document.querySelector('section')

const requestURL = 'https://semegenkep.github.io/json/example.json';

function fetchJSONData() {
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        const superHeroes = request.response;
        console.log(superHeroes); 
        populateHeader(superHeroes);
        showHeroes(superHeroes);
    };
}

function populateHeader(data) {
    const headerTitle = document.createElement('h1');
    headerTitle.textContent = data.squadName; 
    header.appendChild(headerTitle);

    const headerInfo = document.createElement('p');
    headerInfo.textContent = `Hometown: ${data.homeTown} // Formed: ${data.formed}`;
    header.appendChild(headerInfo);
}

function showHeroes(data) {
    const heroes = data.members;

    heroes.forEach(hero => {
        const heroCard = document.createElement('article');

        const heroName = document.createElement('h2');
        heroName.textContent = hero.name;
        heroCard.appendChild(heroName);

        const heroSecretIdentity = document.createElement('p');
        heroSecretIdentity.textContent = `Secret identify: ${hero.secretIdentity}`;
        heroCard.appendChild(heroSecretIdentity);

        const heroAge = document.createElement('p');
        heroAge.textContent = `Age: ${hero.age}`;
        heroCard.appendChild(heroAge);

        const heroPowers = document.createElement('p');
        heroPowers.textContent = 'Superpowers:';
        heroCard.appendChild(heroPowers);

        const powersList = document.createElement('ul');
        hero.powers.forEach(power => {
            const powerItem = document.createElement('li');
            powerItem.textContent = power;
            powersList.appendChild(powerItem);
        });
        heroCard.appendChild(powersList);

        section.appendChild(heroCard);
    });
}

fetchJSONData();
