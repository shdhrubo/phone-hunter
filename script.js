//display searched phone
const searchPhone = () => {
  const searchFeild = document.getElementById("search-feild");
  const searchFeildValue = searchFeild.value;
  const phoneDetilsDiv = document.getElementById("phone-details-click");
  phoneDetilsDiv.innerHTML = "";
  // console.log(searchFeildValue);
  searchFeild.value = "";
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchFeildValue}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (searchFeildValue == "" || data.data == 0) {
        // alert("Enter valid phone name to search");
        document.getElementById(
          "search-result"
        ).innerHTML = `<p class="text-danger mx-auto">Nothing Found.Search Valid Phones Only</p>`;
      } else {
        displaySearchedPhone(data.data);
      }
    });
};
const displaySearchedPhone = (data) => {
  //   console.log(data);
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";
  const len = data.length;
  data.slice(0, 20).forEach((data) => {
    const col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML = `<div class="col">
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
  });
};
//details button
const showDetails = (data) => {
  fetch(` https://openapi.programming-hero.com/api/phone/${data}`)
    .then((res) => res.json())
    .then((data) => showPhoneDetails(data));
};
const showPhoneDetails = (data) => {
  const phoneDetailsClick = document.getElementById("phone-details-click");
  //   phoneDetailsClick.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  if (data.data.releaseDate == "") {
    data.data.releaseDate = "Release date not found";
  }
  //   if(data.data==''){
  //       data.data.name="Empty";
  //       data.data.releaseDate="Empty";
  //       data.data.mainFeatures.storage="Empty";
  //       data.data.mainFeatures.displaySize="Empty";
  //       data.data.mainFeatures.chipSet="Empty";
  //       data.data.mainFeatures.memory="Empty";

  //   }
  div.innerHTML = ` 
    <img src="${data.data.image}" class="card-img-top w-25 mt-2 mx-auto"  alt="...">
    <div class="card-body">
        <h5 class="card-title">${data.data?.name}</h5>
        <p class="card-text">${data.data?.releaseDate}</p>
        <h6>Main Features</h6>
        <p>Storage : ${data.data?.mainFeatures?.storage}</p>
        <p>Display Size : ${data.data?.mainFeatures?.displaySize}</p>
        <p>Chip Set : ${data.data?.mainFeatures?.chipSet}</p>
        <p>Memory : ${data.data?.mainFeatures?.memory}</p>
        <h6>Sensors</h6>
        <p>${data.data?.mainFeatures?.sensors}</p>
        <h6>Others Information</h6>
        <p>WLAN : ${data.data?.others?.WLAN}</p>
        <p>Bluetooth : ${data.data?.others?.Bluetooth}</p>
        <p>GPS : ${data.data?.others?.GPS}</p>
        <p>NFC : ${data.data?.others?.NFC}</p>
        <p>Radio : ${data.data?.others?.Radio}</p>
        <p>USB : ${data.data?.others?.USB}</p>
   
  </div>`;

  phoneDetailsClick.appendChild(div);
};
