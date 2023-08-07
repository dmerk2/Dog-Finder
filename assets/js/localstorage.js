let dogName = document.getElementById("dog-name");
let search = document.getElementById("search");
let searchHistory = [];

const saveToLocalStorage = () => {
  const recentSearches = {
    breed: dogName.value,
  };
  searchHistory.push(recentSearches)
  localStorage.setItem("breed", JSON.stringify(recentSearches)) || [];
  console.log(recentSearches, searchHistory);
};

search.addEventListener("click", saveToLocalStorage);
