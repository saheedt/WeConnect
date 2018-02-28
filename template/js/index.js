window.addEventListener('load', () => {
    const landingRegBtn = document.getElementById('landing-reg-btn');
    landingRegBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('clicked sign up');
    })
});