const zipcode = document.getElementById("zipcode");
const search = document.getElementById("search");
const lastSearched = document.getElementById("lastSearched");
const clear = document.getElementById("clearSearches");
const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

const saveToLocalStorage = () => {
  const recentSearch = {
    zipcode: zipcode.value,
    timestamp: new Date().toLocaleString(),
  };

  searchHistory.push(recentSearch);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

  renderRecentSearches();
  console.log(recentSearch, searchHistory);
};

const renderRecentSearches = () => {
  // Clear existing content
  lastSearched.innerHTML = "";

  // Create a new element for all recent searches
  for (let i = 0; i < searchHistory.length; i++) {
    const searchItem = document.createElement("div");
    // Display the zipcode and timestamp to the page
    searchItem.innerHTML = `
    Zipcode: 
    <span class="font-semibold text-yellow-500">${searchHistory[i].zipcode}</span>,
    Date/Time: 
    <span class="text-gray-400">${searchHistory[i].timestamp}</span>
  `;
    lastSearched.appendChild(searchItem);
  }
};

// Clear all the local storage and refresh the page
const clearSearches = () => {
  localStorage.clear();
  window.location.reload();
};

clear.addEventListener("click", clearSearches);
search.addEventListener("click", saveToLocalStorage);
renderRecentSearches();
