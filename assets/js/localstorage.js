let zipcode = document.getElementById("zipcode");
let search = document.getElementById("search");
let searchHistory = [];

const saveToLocalStorage = () => {
  const recentSearches = {
    zipcode: zipcode.value,
  };
  searchHistory.push(recentSearches)
  localStorage.setItem("zipcode", JSON.stringify(recentSearches)) || [];
  console.log(recentSearches, searchHistory);
};

search.addEventListener("click", saveToLocalStorage);
