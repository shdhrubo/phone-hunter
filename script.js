//display searched phone
const searchPhone = () => {
  const searchFeild = document.getElementById("search-feild");
  const searchFeildValue = searchFeild.value;

  // console.log(searchFeildValue);
  searchFeild.value = "";
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchFeildValue}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (searchFeildValue == "" || data.data == 0) {
        alert("Enter valid phone name to search");
      } else {
        displaySearchedPhone(data.data);
      }
    });
};
const displaySearchedPhone = (data) => {
  console.log(data);
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
const showDetails=(data)=>{
    console.log(data);
}