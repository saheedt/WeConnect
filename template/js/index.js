window.addEventListener('load', () => {
    const supportsImports =  () => ('import' in document.createElement('link'));
    const landingRegBtn = document.getElementById('landing-reg-btn');
    const listingsSwitchInput = document.getElementById('listings-switch-input');
    const listingsCategoryInput = document.querySelector('#listings-category-input');
    const listingsLocationInput = document.querySelector('#listings-location-input');

    //fuction for importing register.html into landing page.
    /** login/register */
    const includeRegister = () => {
        const element = document.getElementById('registerInclude');
        const file = element.getAttribute("w3-include-html");
        let xhttp;
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4) {
                if (this.status == 200) {element.innerHTML = this.responseText;}
                if (this.status == 404) {element.innerHTML = "Page not found.";}
                element.removeAttribute("w3-include-html");
                includeRegister();
              }
            }      
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
          }
    }
    if (landingRegBtn) {
        landingRegBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // if (supportsImports()) {
            //     const link = document.querySelector('link[rel="import"]'),
            //         imp = link.import,
            //         element = imp.querySelector('.generic-modal');
            //     document.body.appendChild(element.cloneNode(true));
            // }
            const regModal = document.getElementById('register-modal')
            if ( regModal ){
                if ( regModal.style.display == "none" ){
                    regModal.style.display = "block";
                }
                return;
            }
            includeRegister();
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
    
    /** general */
    window.onclick = (e) => {
        const regModal = document.getElementById('register-modal');
        if (e.target === regModal ) {
            regModal.style.display = "none";
        }
    }
});