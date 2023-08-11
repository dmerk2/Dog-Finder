const form = document.getElementById('search-form');
const dogBreedInput = document.getElementById('dog-breed');
const dogInfo = document.getElementById('dog-facts-results');
const dogPicture = document.getElementById('dogImage');
const breedTitle = document.getElementById('breed-title');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dogBreed = dogBreedInput.value;
    fetch('https://api.api-ninjas.com/v1/dogs?name=' + dogBreed, {
        headers: {
            'X-API-Key': 'JuQCfArU0jStAtqE7xItBg==9oTAST1gtMu6RMJj'
        }
    })
    .then(response => response.json())
    .then(data => {

        console.log(data)
        
        const imageUrl = data[0].image_link;
        const breed = data[0].name;
        const maxHeightFemale = data[0].max_height_female;
        const maxHeightMale = data[0].max_height_male;
        const maxWeightFemale = data[0].max_weight_female;
        const maxWeightMale = data[0].max_weight_male;
        const maxLifeExpectancy = data[0].max_life_expectancy;
        const goodChildren = data[0].good_with_children;
        const goodDogs = data[0].good_with_other_dogs;
        const goodStrangers = data[0].good_with_strangers;
        const playfulness = data[0].playfulness;
        const trainability = data[0].trainability;


        dogPicture.src = imageUrl;
        breedTitle.innerHTML = `<h2><strong>${breed}</strong> </h2>`;
        dogInfo.innerHTML = `
            <p><strong>Max height female:</strong> ${maxHeightFemale} in.</p>
            <p><strong>Max height male:</strong> ${maxHeightMale} in.</p>
            <p><strong>Max weight female:</strong> ${maxWeightFemale} lb.</p>
            <p><strong>Max weight male:</strong> ${maxWeightMale} lb.</p>
            <p><strong>Max life expectancy:</strong> ${maxLifeExpectancy} years</p>
            <p><strong>Good with children:</strong> ${goodChildren}* </p>
            <p><strong>Good with other dogs:</strong> ${goodDogs}* </p>
            <p><strong>Good with strangers:</strong> ${goodStrangers}* </p>
            <p><strong>Playfulness:</strong> ${playfulness}* </p>
            <p><strong>Trainability:</strong> ${trainability}* </p>

            <p> (*) Rating from 1-5 with 1 being the lowest and 5 being the highest.</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching dog data:', error);
    });
});
