const loadData = async(searchText , isShowAll) => 
{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(phone)
    displayPhones(phone , isShowAll)
}

const displayPhones = (phones , isShowAll) =>
{
    const cardContainer = document.getElementById('card-container');
    
    // clear phone container cards before adding new cards.
    cardContainer.textContent='';

    // showing show all button if items are more than 12.
    const showAllButton = document.getElementById('show-all-btn');

    if(phones.length > 12 && !isShowAll)
    {
      showAllButton.classList.remove('hidden')
    }
    else{
        showAllButton.classList.add('hidden')
    }
//    console.log('is show all', isShowAll)
    // slicing so that we can show no more than 12 items.
    if(!isShowAll)
    {
        phones = phones.slice(0,12);
    }

phones.forEach(element => 
  {
   const divCard = document.createElement('div');
   divCard.classList=`card w-96 bg-base-100 shadow-xl`;
   divCard.innerHTML = 
   `
   <figure class="px-10 pt-10">
   <img src="${element.image}" alt="Shoes" class="rounded-xl" />
 </figure>
 <div class="card-body items-center text-center">
   <h2 class="card-title">${element.phone_name}</h2>
   <p>If a dog chews shoes whose shoes does he choose?</p>
   <div class="card-actions">
     <button onclick="showDetails('${element.slug}')" class="btn btn-primary">Details</button>
   </div>
 </div>
   `;
   cardContainer.appendChild(divCard)
  });

//   hide loading spinner
loadingData(false);

}

const showDetails = async(id) =>
{
    // console.log('clicked' , id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
    
}


const showPhoneDetails = (phoneInfo) =>
{
    console.log(phoneInfo)
    show_details_modal.showModal()

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML= 
    `
    <figure class="flex justify-center">
            <img src="${phoneInfo.image}" alt="">
        </figure>
        
        <h2 class="text-2xl font-bold">${phoneInfo.name}</h2>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

        <h3> <span class="font-bold">Storage: </span>${phoneInfo?.mainFeatures?.storage}</h3>
        <h3> <span class="font-bold">Display-Size: </span>${phoneInfo?.mainFeatures?.displaySize}</h3>
        <h3> <span class="font-bold">Chip-Set: </span>${phoneInfo?.mainFeatures?.chipSet}</h3>
        <h3> <span class="font-bold">Memory: </span>${phoneInfo?.mainFeatures?.memory}</h3>
        

    `
}


// handle search button

const handleSearch = (isShowAll) =>
{
    loadingData(true);
    const searchField= document.getElementById('search-filed');
    const searchText = searchField.value;
    // console.log(searchText)
    loadData(searchText , isShowAll);
}

const loader = document.getElementById('loader')
const loadingData = loading => 
{
   if(loading)
   {
    loader.classList.remove('hidden');
   }
   else
   {
    loader.classList.add('hidden')
   }
}

const handleShowAll = ()=> 
{
    handleSearch(true);
}

