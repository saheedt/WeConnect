
window.addEventListener('load', () => {
    const supportsImports =  () => ('import' in document.createElement('link'));
    const landingRegBtn = document.getElementById('landing-reg-btn');
    const listingsSwitchInput = document.getElementById('listings-switch-input');
    const listingsCategoryInput = document.querySelector('#listings-category-input');
    const listingsLocationInput = document.querySelector('#listings-location-input');

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
        <!-- <i class="material-icons circle">business_center</i> -->
            <h4><a href="#"><span class="title">${biz.businessName}</span></a></h4>
        <!-- <i class="material-icons circle">place</i> -->
            <p>${biz.address}</p> <!--<br /><br /> -->
            <!-- <i class="material-icons circle">description</i> -->
            <p>${biz.description}</p> <!--<br />-->
       <!--</li>-->`;
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