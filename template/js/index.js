window.addEventListener('load', () => {
    const supportsImports =  () => ('import' in document.createElement('link'));
    const landingRegBtn = document.getElementById('landing-reg-btn');
    const includeRegister = () => {
        const element = document.getElementById('registerInclude');
        const file = element.getAttribute("w3-include-html");
        let xhttp;
    
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4) {
                if (this.status == 200) {element.innerHTML = this.responseText;}
                if (this.status == 404) {element.innerHTML = "Page not found.";}
                /*remove the attribute, and call this function once more:*/
                element.removeAttribute("w3-include-html");
                includeRegister();
              }
            }      
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
          }
    }
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
    window.onclick = (e) => {
        const regModal = document.getElementById('register-modal');
        if (e.target === regModal ) {
            regModal.style.display = "none";
        }
    }
});