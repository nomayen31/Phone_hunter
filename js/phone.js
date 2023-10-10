const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones)
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = ''

        // show all btn if 

        const showAllContainer = document.getElementById('show-all-container');
    if( phones.length > 12){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }

    phones = phones.slice(0,12)
    



    for (const phone of phones) {
        const phoneCart = document.createElement('div');
        phoneCart.classList = `card p-4 bg-gray-100 shadow-xl`
        phoneCart.innerHTML = `

        <figure><img src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCart);
        toggleLoadingSpinner(false)

    }
}


// search 

const handleSearch = ()=>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhone(searchText);
    

}

const handleSearch2 = () =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field2');
    const searchText = searchField.value;
    loadPhone(searchText);

}

const toggleLoadingSpinner = (isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden')
    }
}



loadPhone()