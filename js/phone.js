const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = ''

        // show all btn if 

        const showAllContainer = document.getElementById('show-all-container');
    if( phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }

    if (!isShowAll) {
        phones = phones.slice(0,12)
    }
    



    for (const phone of phones) {
        const phoneCart = document.createElement('div');
        phoneCart.classList = `card p-4 bg-gray-100 shadow-xl`
        phoneCart.innerHTML = `
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onClick="handleShowDetails('${phone.slug}');" class="btn btn-primary">Show Details </button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCart);
        toggleLoadingSpinner(false)

    }
}


const handleShowDetails = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
   const phone = data.data
    showPhoneDetails(phone)
     
} 


const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name') 
    const phoneImage = document.getElementById('show-detail-phone-image')
    const phoneStorage = document.getElementById('show-detail-phone-storage')
    const phonerelageDate = document.getElementById('show-detail-phone-relageDate')
    const phonedisplaySize = document.getElementById('show-detail-phone-displaySize')
    const phoneGps = document.getElementById('show-detail-phone-Gps')

    phoneGps.innerText = phone.mainFeatures.sensors[1]


    phonedisplaySize.innerText = phone.mainFeatures.displaySize;

    phonerelageDate.innerText = phone.releaseDate

    phoneStorage.innerText =phone.mainFeatures.storage;


    phoneImage.src = phone.image

    phoneName.innerText = phone.name;
    show_details_modal.showModal()
}
// search 

const handleSearch = (isShowAll)=>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
    

}

// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true)
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);

// }

const toggleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}


const handleShowAll = ()=>{
    handleSearch(true)
}


loadPhone()