
window.addEventListener('load', () => {
    const supportsImports =  () => ('import' in document.createElement('link'));
    const landingRegBtn = document.getElementById('landing-reg-btn');
    const listingsSwitchInput = document.getElementById('listings-switch-input');
    const listingsCategoryInput = document.querySelector('#listings-category-input');
    const listingsLocationInput = document.querySelector('#listings-location-input');
    const addBusinessBtn = document.getElementById('add-business-btn');
    const postReview = document.getElementById('post-review');

    const listingsList = document.querySelector('#listings-list');

    /** login/register */
    if (landingRegBtn) {
        landingRegBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const regModal = document.getElementById('register-modal')
            if ( regModal ) {
                if ( regModal.style.display == "block" ) {
                    regModal.style.display = "none";
                } else {
                    regModal.style.display = "block"
                }
            }
        })
    }

    /** Post review */
    if (postReview) {
        postReview.addEventListener('click', (e) => {
            alert('Review added.')
        })
    }
    /**Register business */
    if (addBusinessBtn) {
        addBusinessBtn.addEventListener('click', (e) => {
            alert('Business successfully registered.')
        });
    }
    /**listings */
    if (listingsSwitchInput) {
        listingsSwitchInput.addEventListener('change', (e)=> {
            if (e.target.checked) {
                if (listingsLocationInput.style.display == 'none' ||
                  listingsLocationInput.style.display == "") {
                    listingsLocationInput.style.display = 'block'
                    listingsCategoryInput.style.display = 'none'
                }
                return
            }
            if (!e.target.checked){
              if ( listingsCategoryInput.style.display == 'none' ||
                listingsCategoryInput.style.display == "") {
                    listingsCategoryInput.style.display = 'block'
                    listingsLocationInput.style.display = 'none'
              }
              return
            }
            
        })
    }

    if ( listingsList ) {
        console.log(DB);
        let list = [];
        for ( let biz of DB) {
            let li = document.createElement("li");
            li.className = "collection-item"
            li.innerHTML = `
        <!-- <li class="collection-item avatar"> -->
        <div class="listings-list-groupings flex" >
        <div class="listings-list-groupings-items-left flex"> <i class="material-icons circle">business_center</i></div>
        <div class="listings-list-groupings-items-right"><h4><a href="businessprofile.html"><span class="title">${biz.businessName}</span></a></h4></div>
        </div>

        <div class="listings-list-groupings flex">
        <div class="listings-list-groupings-items-left flex"><i class="material-icons circle">place</i></div>
        <div class="listings-list-groupings-items-right"><p>${biz.address}</p></div>
        </div>

        <div class="listings-list-groupings flex">
        <div class="listings-list-groupings-items-left flex"><i class="material-icons circle">description</i></div>
        <div class="listings-list-groupings-items-right"><p>${biz.description}</p></div>
        </div>`;
        list.push(li);
        }
        for ( let ele of list) {
        listingsList.appendChild(ele);
        }
    }
    
    /** general */
    window.onclick = (e) => {
        const regModal = document.getElementById('register-modal');
        if (e.target === regModal ) {
            regModal.style.display = "none";
        }
    }
});