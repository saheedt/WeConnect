// const { window } = this.window;
this.window.addEventListener('load', () => {
  const landingRegBtn = this.window.document.getElementById('landing-reg-btn');
  const signupBtn = this.window.document.getElementById('signup-btn');
  const listingsSwitchInput =
    this.window.document.getElementById('listings-switch-input');
  const listingsCategoryInput =
    this.window.document.querySelector('#listings-category-input');
  const listingsLocationInput =
    this.window.document.querySelector('#listings-location-input');
  const addBusinessBtn =
    this.window.document.getElementById('add-business-btn');
  const updateBusinessBtn =
    this.window.document.getElementById('update-business-btn');
  const postReview = this.window.document.getElementById('post-review');
  const backToPrevious = document.getElementById('update-business-cancel-btn');

  const listingsList = this.window.document.querySelector('#listings-list');

  if (backToPrevious) {
    backToPrevious.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.back();
    });
  }

  /** login/signup */
  if (landingRegBtn) {
    landingRegBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const regModal = this.window.document.getElementById('register-modal');
      if (regModal) {
        if (regModal.style.display === 'block') {
          regModal.style.display = 'none';
        } else {
          regModal.style.display = 'block';
        }
      }
    });
  }
  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      const regModal = this.window.document.getElementById('register-modal');
      e.preventDefault();
      regModal.style.display = 'none';
    });
  }
  /** Post review */
  if (postReview) {
    postReview.addEventListener('click', () => {
    });
  }
  /** Update business */
  if (updateBusinessBtn) {
    updateBusinessBtn.addEventListener('click', () => {
    });
  }
  /** Register business */
  if (addBusinessBtn) {
    addBusinessBtn.addEventListener('click', () => {
    });
  }
  /** listings */
  if (listingsSwitchInput) {
    listingsSwitchInput.addEventListener('change', (e) => {
      if (e.target.checked) {
        if (listingsLocationInput.style.display === 'none' ||
          listingsLocationInput.style.display === '') {
          listingsLocationInput.style.display = 'block';
          listingsCategoryInput.style.display = 'none';
        }
        return;
      }
      if (!e.target.checked) {
        if (listingsCategoryInput.style.display === 'none' ||
          listingsCategoryInput.style.display === '') {
          listingsCategoryInput.style.display = 'block';
          listingsLocationInput.style.display = 'none';
        }
      }
    });
  }
  if (listingsList) {
    const list = [];
    // for (let biz of DB) {
    this.window.DB.map((biz) => {
      const li = this.window.document.createElement('li');
      li.className = 'collection-item';
      li.innerHTML = `
        <!-- <li class="collection-item avatar"> -->
        <div class="listings-list-groupings flex" >
          <div class="listings-list-groupings-items-left flex">
            <i class="material-icons circle">business_center</i>
          </div>
          <div class="listings-list-groupings-items-right">
            <h4>
              <a href="businessprofile.html">
                <span class="title">${biz.businessName}</span>
              </a>
            </h4>
          </div>
        </div>

        <div class="listings-list-groupings flex">
          <div class="listings-list-groupings-items-left flex">
            <i class="material-icons circle">place</i>
          </div>
          <div class="listings-list-groupings-items-right">
            <p>${biz.address}</p>
          </div>
        </div>

        <div class="listings-list-groupings flex">
          <div class="listings-list-groupings-items-left flex">
            <i class="material-icons circle">description</i>
          </div>
          <div class="listings-list-groupings-items-right">
            <p>${biz.description}</p>
          </div>
        </div>`;
      return list.push(li);
    });
    list.map(ele => listingsList.appendChild(ele));
  }

  this.window.onclick = (e) => {
    const regModal = this.window.document.getElementById('register-modal');
    if (e.target === regModal) {
      regModal.style.display = 'none';
    }
  };
});
