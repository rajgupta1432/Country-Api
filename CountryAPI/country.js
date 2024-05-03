const countryName = new URLSearchParams(location.search).get("name");
const countryFlagImage = document.querySelector(".country-flag-img");
const countryNameHeading = document.querySelector(".country-details h2");
const countryNativeName = document.querySelector(".native-name");
const countryPopulation = document.querySelector(".population");
const countryRegion = document.querySelector(".region");
const countrySubRegion = document.querySelector(".sub-region");
const countryCapital = document.querySelector(".capital");
const countryTopLevelDomain = document.querySelector(".top-level-domain");
const countryCurrencies = document.querySelector(".currencies");
const countryLanguages = document.querySelector(".languages");
const countryOtherTag = document.querySelector(".other-tags");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    countryFlagImage.src = country.flags.svg;
    countryNameHeading.innerText = country.name.common;
    countryPopulation.innerText = country.population.toLocaleString("en-IN");
    countryRegion.innerText = country.region;
    countryTopLevelDomain.innerText = country.tld.join(", ");

    if (country.capital) {
      countryCapital.innerText = country.capital?.[0];
    }

    if (country.subregion) {
      countrySubRegion.innerText = country.subregion;
    }
    if (country.name.nativeName) {
      countryNativeName.innerText = Object.values(
        country.name.nativeName
      )[0].common;
    } else {
      countryNativeName.innerText = country.name.common;
    }
    if (country.currencies) {
      countryCurrencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }
    if (country.languages) {
      countryLanguages.innerText = Object.values(country.languages).join(", ");
    }
    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}` 
            countryOtherTag.append(borderCountryTag)
          });
      });
    }
  });
