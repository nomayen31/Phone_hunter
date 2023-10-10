const loadPhone = async (searchText, isShowAll) => {
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

        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details </button>
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
    console.log(data);
     
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