const apiKey = "0aHqwRW9";
const baseUrl = "https://api.rescuegroups.org/v5";

const searchButton = document.getElementById("search");
const zipcodeInput = document.getElementById("zipcode");
const dogInfo = document.getElementById("dog-info");
const dogImage = document.getElementById("dogImage");
const form = document.getElementById("search-form");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const xBtnModal = document.getElementById("x-btn");

searchButton.addEventListener("click", async () => {
  const zipcode = zipcodeInput.value;
  // localStorage.setItem("zipcode", zipcode);
  // Toggle Modal
  modal.classList.toggle("hidden");
  modal.classList.toggle("block");

  // If zip code is valid display the modal else display the search results
  if (isValidUSZipCode(zipcode)) {
    toggleModal();
  }

  const requestData = {
    data: {
      filterRadius: {
        miles: 10,
        postalcode: zipcode,
      },
    },
  };

  try {
    const response = await fetch(
      `${baseUrl}/public/animals/search/available/dogs/haspic?limit=5&sort=random`,
      {
        method: "POST",
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/vnd.api+json",
        },
        body: JSON.stringify(requestData),
      }
    );

    const data = await response.json();
    displayResults(data.data);
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
});

// Using regex to check if zip code is valid
const isValidUSZipCode = (zipcode) => {
  const usZipCode = /^\d{5}(-\d{4})?$/;
  return usZipCode.test(zipcode);
};

// Function to close modal
const toggleModal = () => {
  modal.classList.toggle("hidden");
  modal.classList.toggle("block");
};

const createDogImage = (baseURL, name) => {
  const dogImage = document.createElement("img");
  dogImage.src = baseURL;
  dogImage.alt = name;
  dogImage.classList.add("dogImage", "mr-4");
  return dogImage;
};

// Create div for dog info
const createDogInfo = (name, breedPrimary, ageGroup, adoptionFee, distance) => {
  const dogInfo = document.createElement("div");
  dogInfo.innerHTML = `<h2 class="text-xl"><strong>${name}</strong></h2>
    <p><strong>Breed:</strong> ${breedPrimary}</p>
    <p><strong>Age Group:</strong> ${ageGroup}</p>
    <p><strong>Adoption Fee:</strong> ${adoptionFee}</p>
    <p><strong>Distance (miles):</strong> ${distance}</p>`;
  dogInfo.classList.add("flex-1");
  return dogInfo;
};

const createDogResult = (result) => {
  const imageUrl = result.attributes.pictureThumbnailUrl;
  // Remove the width=100 parameter from the image URL
  const baseURL = imageUrl.split("?")[0];
  const name = result.attributes.name;
  const breedPrimary = result.attributes.breedPrimary;
  // Display an empty string if results are falsey
  const ageGroup = result.attributes.ageGroup || "";
  const adoptionFee = result.attributes.adoptionFeeString || "";
  const distance = result.attributes.distance;

  // Create elements for the image and data
  const dogImage = createDogImage(baseURL, name);
  const dogInfo = createDogInfo(
    name,
    breedPrimary,
    ageGroup,
    adoptionFee,
    distance
  );

  // Creating the style of the dog result container
  const dogResultContainer = document.createElement("div");
  dogResultContainer.classList.add("dog-result", "flex", "items-center");
  dogResultContainer.appendChild(dogImage);
  dogResultContainer.appendChild(dogInfo);

  return dogResultContainer;
};

// Display the results to the webpage
const displayResults = (results) => {
  const dogContainer = document.getElementById("dog-container");
  dogContainer.innerHTML = "";

  // Loop through each result and create a dog result container
  results.forEach((result) => {
    const dogResultContainer = createDogResult(result);
    dogContainer.appendChild(dogResultContainer);
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

closeModal.addEventListener("click", toggleModal);
xBtnModal.addEventListener("click", toggleModal);
