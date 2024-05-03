const changeMode = document.querySelector(".change-mode");
const countrysData = document.querySelector(".country-data");
const searchByFilter = document.querySelector(".search-by-filter");
const searchInput = document.querySelector(".search-input");
//  dark mode and light mode

const savedMode = localStorage.getItem("mode");
if (savedMode) {
  document.body.classList.add(savedMode);
  if (savedMode === "dark-mode") {
    changeMode.innerText = "Dark Mode";
  } else {
    changeMode.innerText = "Light Mode";
  }
}
changeMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    changeMode.innerText = "Dark Mode";

    localStorage.setItem("mode", "dark-mode");
  } else {
    changeMode.innerText = "Light Mode";
    localStorage.setItem("mode", "light-mode");
  }
});

let allCountryData = fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountry(data);
    allCountryData = data;
  });

searchByFilter.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${searchByFilter.value}`)
    .then((res) => res.json())
    .then(renderCountry);
});

function renderCountry(data) {
  countrysData.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
    <img src="${country.flags.svg}" alt="flag">
    <div class="content">
        <h2 class="crountry-name">${country.name.common}</h2>
        <p><b>Population: </b>${country.population.toLocaleString("en-IN")}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital}</p>
    </div>
`;
    countrysData.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountries = allCountryData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountry(filteredCountries);
});
