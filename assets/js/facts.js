const form = document.getElementById("search-form");
const dogBreedInput = document.getElementById("dog-breed");
const dogInfo = document.getElementById("dog-facts-results");
const dogPicture = document.getElementById("dogImage");
const breedTitle = document.getElementById("breed-title");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dogBreed = dogBreedInput.value;
  dogPicture.src = "";
  breedTitle.innerHTML = "";
  dogInfo.innerHTML = "";
  errorMessage.innerHTML = "";
  localStorage.setItem("dog breed", dogBreed);
  fetch("https://api.api-ninjas.com/v1/dogs?name=" + dogBreed, {
    headers: {
      "X-API-Key": "JuQCfArU0jStAtqE7xItBg==9oTAST1gtMu6RMJj",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

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
      breedTitle.innerHTML = `<h2 class="text-3xl pb-2 font-semibold text-gray-800">${breed}</h2>`;

      dogInfo.innerHTML = `
  <div class="space-y-2 text-gray-700">
    <p><strong class="text-gray-900">Max Height (Female):</strong> ${maxHeightFemale} in</p>
    <p><strong class="text-gray-900">Max Height (Male):</strong> ${maxHeightMale} in</p>
    <p><strong class="text-gray-900">Max Weight (Female):</strong> ${maxWeightFemale} lb</p>
    <p><strong class="text-gray-900">Max Weight (Male):</strong> ${maxWeightMale} lb</p>
    <p><strong class="text-gray-900">Max Life Expectancy:</strong> ${maxLifeExpectancy} years</p>
    <p><strong class="text-gray-900">Good with Children:</strong> ${goodChildren}</p>
    <p><strong class="text-gray-900">Good with Other Dogs:</strong> ${goodDogs}</p>
    <p><strong class="text-gray-900">Good with Strangers:</strong> ${goodStrangers}</p>
    <p><strong class="text-gray-900">Playfulness:</strong> ${playfulness}</p>
    <p><strong class="text-gray-900">Trainability:</strong> ${trainability}</p>
  </div>
  <p class="mt-2 text-gray-600">(*) Ratings from 1 (low) to 5 (high)</p>
`;
    })
    .catch((error) => {
      console.error("Error fetching dog data:", error);
      errorMessage.innerHTML = `
      <div class="flex justify-center items-center">
        <h2 class="text-2xl text-center bg-red-500 text-white py-3 px-6 shadow-lg rounded">
          No breed known by that name. Please check your spelling and try again.
        </h2>
      </div>
    `;
    });
});
