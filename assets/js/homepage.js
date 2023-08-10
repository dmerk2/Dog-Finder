const apiKey = '0aHqwRW9';
const baseUrl = 'https://api.rescuegroups.org/v5';

const searchButton = document.getElementById('search');
const zipcodeInput = document.getElementById('zipcode');
const dogInfo = document.getElementById('dog-info');
const dogImage = document.getElementById('dogImage');
const form = document.getElementById('search-form');

searchButton.addEventListener('click', async () => {
    const zipcode = zipcodeInput.value;

    const requestData = {
        data: {
            filterRadius: {
                miles: 10,
                postalcode: zipcode
            }
        }
    };

    try {
        const response = await fetch(`${baseUrl}/public/animals/search/available/dogs/haspic?limit=5&sort=random`, {
            method: 'POST',
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/vnd.api+json'
              },
            body: JSON.stringify(requestData)
        });

    const data = await response.json();
        displayResults(data.data);
        console.log(data)
    } catch (error) {
        console.error('Error:', error);
        // const resultDiv = document.getElementById('result');
        // resultDiv.innerHTML = '<p>Invalid Zip Code</p>';
    }
});

function displayResults(results) {
    dogImage.src = '';
    dogInfo.innerHTML = '';

    results.forEach(result => {
    
    const imageUrl = result.attributes.pictureThumbnailUrl;
    const name = result.attributes.name;
    const breedPrimary = result.attributes.breedPrimary;
    const ageGroup = result.attributes.ageGroup;
    const adoptionFee = result.attributes.adoptionFeeString;
    const distance = result.attributes.distance;

    dogImage.src = imageUrl;
    dogInfo.innerHTML = `<p><strong>${name}</strong></p><p><strong>Breed:</strong> ${breedPrimary}</p><p><strong>Age Group:</strong> ${ageGroup}</p><p><strong>Adoption Fee:</strong> ${adoptionFee}</p><p><strong>Distance (miles):</strong> ${distance}</p>`;

        
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
});

