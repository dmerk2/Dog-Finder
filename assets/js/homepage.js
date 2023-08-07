const form = document.getElementById('search-form');
const dogNameInput = document.getElementById('dog-name');
const dogInfoDiv = document.getElementById('dog-info');
const dogPicture = document.getElementById('dogImage');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dogName = dogNameInput.value;
    fetch('https://api.api-ninjas.com/v1/dogs?name=' + dogName, {
        headers: {
            'X-API-Key': 'JuQCfArU0jStAtqE7xItBg==9oTAST1gtMu6RMJj'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const imageUrl = data[0].image_link;
        const name = data[0].name;
        const maxHeightFemale = data[0].max_height_female;
        const maxHeightMale = data[0].max_height_male;
        const maxLifeExpectancy = data[0].max_life_expectancy;
        
        dogPicture.src = imageUrl;
        dogInfoDiv.innerHTML = `<p><strong>Name:</strong> ${name}</p><p><strong>Max height female:</strong> ${maxHeightFemale}</p><p><strong>Max height male:</strong> ${maxHeightMale}</p><p><strong>Max life expectancy:</strong> ${maxLifeExpectancy}</p>`;
    })
    .catch(error => {
        console.error('Error fetching dog data:', error);
    });
});