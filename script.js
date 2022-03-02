//display searched phone
const searchPhone = () => {
  const searchFeild = document.getElementById("search-feild");
  const searchFeildValue = searchFeild.value;
  const phoneDetilsDiv = document.getElementById("phone-details-click");
  phoneDetilsDiv.innerHTML = "";
  searchFeild.value = "";
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchFeildValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (searchFeildValue == "" || data.data == 0) {
        document.getElementById(
          "search-result"
        ).innerHTML = `<p class="text-danger mx-auto">Nothing Found.Search Valid Phones Only</p>`;
      } else {
        displaySearchedPhone(data.data);
      }
    });
};
const displaySearchedPhone = (data) => {
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  const len = data.length;
  if (len <= 20) {
    data.slice(0, 20).forEach((data) => {
      showPhone(data);
    });
  } else {
    data.slice(0, 20).forEach((data) => {
      showPhone(data);
    });
    const showMore = document.getElementById("show-more");
    showMore.style.display = "block";
    showMore.addEventListener("click", function () {
      data.slice(21, len).forEach((data) => {
        showPhone(data);
        showMore.style.display = "none";
      });
    });
  }
};
//function for showing phone after search
const showPhone = (data) => {
  const searchResult = document.getElementById("search-result");
  const col = document.createElement("div");
  col.classList.add("col");
  col.innerHTML = `<div id="searched-card" >
    <div class="card">
      <img src="${data.image}" class="card-img-top w-50 mt-3 mx-auto" alt="...">
      <div class="card-body">
        <h5 class="card-title">${data.phone_name}</h5>
        <h6 class="card-title">Brand : ${data.brand}</h6>
       <button onclick="showDetails('${data.slug}')" class="btn btn-warning mt-2">Details</button>
      </div>
    </div>
  </div>`;
  searchResult.appendChild(col);
};

//function for details button
const showDetails = (data) => {
  fetch(` https://openapi.programming-hero.com/api/phone/${data}`)
    .then((res) => res.json())
    .then((data) => showPhoneDetails(data));
};
//function for show phone details
const showPhoneDetails = (data) => {
  const phoneDetailsClick = document.getElementById("phone-details-click");
  const div = document.createElement("div");
  div.classList.add("card");

  div.innerHTML = ` 
    <img src="${
      data.data.image
    }" class="card-img-top w-25 mt-2 mx-auto"  alt="...">
    <div class="card-body">
        <h5 class="card-title">${data.data?.name || "Not found"}</h5>
        <p class="card-text">${
          data.data?.releaseDate || "Release date not found"
        }</p>
        <h6>Main Features</h6>
        <p>Storage : ${data.data?.mainFeatures?.storage || "Not found"}</p>
        <p>Display Size : ${
          data.data?.mainFeatures?.displaySize || "Not found"
        }</p>
        <p>Chip Set : ${data.data?.mainFeatures?.chipSet || "Not found"}</p>
        <p>Memory : ${data.data?.mainFeatures?.memory || "Not found"}</p>
        <h6>Sensors</h6>
        <p>${data.data?.mainFeatures?.sensors || "Not found"}</p>
        <h6>Others Information</h6>
        <p>WLAN : ${data.data?.others?.WLAN || "Not Specified"}</p>
        <p>Bluetooth : ${data.data?.others?.Bluetooth || "Not Specified"}</p>
        <p>GPS : ${data.data?.others?.GPS || "Not Specified"}</p>
        <p>NFC : ${data.data?.others?.NFC || "Not Specified"}</p>
        <p>Radio : ${data.data?.others?.Radio || "Not Specified"}</p>
        <p>USB : ${data.data?.others?.USB || "Not Specified"}</p>
  </div>
  `;
  phoneDetailsClick.appendChild(div);
};
