const apiKey = "0aHqwRW9";
const baseUrl = "https://api.rescuegroups.org/v5";

const searchButton = document.getElementById("search");
const zipcodeInput = document.getElementById("zipcode");
const dogInfo = document.getElementById("dog-info");
const dogImage = document.getElementById("dogImage");
//var images= document.querySelectorAll("dog-image");
//var dogInfo= document.querySelectorAll("dogInfo");
//var image1 = document.querySelectorAll("dogImage1");

const form = document.getElementById("search-form");



const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const xBtnModal = document.getElementById("x-btn");

searchButton.addEventListener("click", async () => {
  const zipcode = zipcodeInput.value;
  //localStorage.setItem("zipcode", zipcode);
  //Toggle Modal
  modal.classList.toggle("hidden");
  modal.classList.toggle("flex");

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
    console.log("data");
    console.log(data.data);
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
  modal.classList.toggle("flex");
};

function displayResults(results) {
  dogImage.src = "";
  dogInfo.innerHTML = "";


  results.forEach((result) => {

    //imgIndex = 0;
    //console.log(imgIndex);

    const imageUrl = result.attributes.pictureThumbnailUrl;
    // Remove the parameter ?width=100 for better viewing and clarity on webpage
    const baseURL = imageUrl.split("?")[0];
    const name = result.attributes.name;
    const breedPrimary = result.attributes.breedPrimary;
    // If ageGroup displays undefined, display nothing
    const ageGroup = result.attributes.ageGroup
      ? result.attributes.ageGroup
      : "";
    // If adoptionFee displays undefined, display nothing
    const adoptionFee = result.attributes.adoptionFeeString
      ? result.attributes.adoptionFeeString
      : "";
    const distance = result.attributes.distance;

    dogImage.src = baseURL;
    dogInfo.innerHTML = `<h2 class="text-xl"><strong>${name}</strong></h2>
    <p><strong>Breed:</strong> ${breedPrimary}</p>
    <p><strong>Age Group:</strong> ${ageGroup}</p>
    <p><strong>Adoption Fee:</strong> ${adoptionFee}</p>
    <p><strong>Distance (miles):</strong> ${distance}</p>`;
    






  });
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
});

closeModal.addEventListener("click", toggleModal);
xBtnModal.addEventListener("click", toggleModal);
