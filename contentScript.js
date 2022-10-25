(() => {
     
    window.addEventListener('load', function() {
        const loggedInterval = setInterval(() => { 
            removeStoriesBtn(loggedInterval); 
        }, 1000);
    }, true);
    
    function removeStoriesBtn(interval) {
        let storiesBtn = document.querySelector('[data-testid="menu-bar-status"]');
        if (storiesBtn) {
            storiesBtn.style.display = 'none';
            clearInterval(interval);
        }
    }
})();
