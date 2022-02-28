//display searched phone
const searchPhone=()=>{
    const searchFeild=document.getElementById('search-feild');
    const searchFeildValue=searchFeild.value;
    // console.log(searchFeildValue);
    const url=` https://openapi.programming-hero.com/api/phones?search=${searchFeildValue}`;
    // console.log(url);
    fetch(url)
    .then(res=>res.json())
    .then(data=>console.log(data.data))
}




