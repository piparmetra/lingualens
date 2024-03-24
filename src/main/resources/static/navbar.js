// wait for the entire document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // get references to various elements on the page
    const toggleMenu = document.getElementById('toggleMenu');
    const logoBefore = document.getElementById('logoBefore');
    const leftItems = document.getElementById('leftItems');
    const registerBtn = document.getElementById('registerBtn');

    let isAnimating = false; // Flag to prevent rapid clicks

    // add click event listener to the register button to navigate to the registration page
    document.getElementById('registerBtn').addEventListener('click', function() {
        window.location.href = 'registration.html';
    });

    // add click event listener to the toggle menu (hamburger icon)
    toggleMenu.addEventListener('click', () => {
        if (isAnimating) return; // Exit if an animation is already in progress
        isAnimating = true; // Set flag to true to prevent further clicks

        // check if the leftItems are not fully opaque indicating they're not visible
        if (leftItems.style.opacity !== '1') {
            // if not visible, fade out the centered logo by reducing opacity
            logoBefore.style.opacity = '0';
            setTimeout(() => {
                logoBefore.style.visibility = 'hidden';
            }, 500);

            // simultaneously, start making the left-aligned items visible
            leftItems.style.visibility = 'visible';
            setTimeout(() => {
                // increase opacity to make leftItems fully visible
                leftItems.style.opacity = '1';
            }, 10);

            // also, make the register button visible
            registerBtn.style.visibility = 'visible';
            setTimeout(() => {
                registerBtn.style.opacity = '1';
                isAnimating = false; // Reset flag after animations are complete
            }, 10);
        } else {
            // if the leftItems are already visible, reverse the process to hide them
            logoBefore.style.visibility = 'visible';
            logoBefore.style.opacity = '1';

            leftItems.style.opacity = '0';
            registerBtn.style.opacity = '0';
            setTimeout(() => {
                leftItems.style.visibility = 'hidden';
                registerBtn.style.visibility = 'hidden';
                isAnimating = false; // Reset flag after animations are complete
            }, 500);
        }
    });

    // add functionality for dropdown menus within the navbar
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        // add click event listeners to each dropdown
        dropdown.addEventListener('click', function() {
            // toggle the 'is-active' class to show or hide the dropdown content
            this.classList.toggle('is-active');
            let dropdownContent = this.querySelector('.dropdown-content');
            // toggle the display style between 'none' and 'block' to show or hide content
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        });
    });
});
