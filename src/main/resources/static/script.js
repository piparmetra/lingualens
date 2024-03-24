// wait until the document is fully loaded to execute the code inside
document.addEventListener('DOMContentLoaded', () => {

    // SECTION MINIMISATION
    // Target each 'mainsection' within the main content area
    const sections = document.querySelectorAll('main .mainsection');

    sections.forEach(section => {
        // Assuming the first child of each section is the header/title
        const header = section.querySelector('h1, h2, h3, h4, h5, h6');

        // Create and append the toggle icon to the header
        const toggleIcon = document.createElement('span');
        toggleIcon.innerHTML = '[-]';
        toggleIcon.style.cursor = 'pointer';
        toggleIcon.style.marginLeft = '10px';
        header.appendChild(toggleIcon);

        // Initially, all sections are expanded
        let isExpanded = true;
        toggleIcon.addEventListener('click', () => {
            // Select all content except the header to toggle visibility
            const content = Array.from(section.children).slice(1);
            if (isExpanded) {
                content.forEach(el => el.style.display = 'none');
                toggleIcon.innerHTML = '[+]';
                isExpanded = false;
            } else {
                content.forEach(el => el.style.display = '');
                toggleIcon.innerHTML = '[-]';
                isExpanded = true;
            }
        });
    });

    // IMAGE PREVIEWER ON CLICK
// add a click event listener to every image on the page
    document.querySelectorAll('img').forEach(function(img) {
        // Change cursor to pointer on hover to indicate the image is clickable
        img.style.cursor = 'pointer';

        img.addEventListener('click', function() {
            // create a new div element to serve as an overlay
            const overlay = document.createElement('div');
            overlay.classList.add('image-overlay'); // add class for styling

            // create a new Image object for the full-screen image
            const fullScreenImage = new Image();
            fullScreenImage.src = this.src; // set its source to the clicked image's source
            fullScreenImage.style.maxWidth = "80%"; // restrict its max width
            fullScreenImage.style.maxHeight = "80%"; // restrict its max height

            // add the full-screen image to the overlay
            overlay.appendChild(fullScreenImage);

            // add the overlay to the document body
            document.body.appendChild(overlay);

            // remove the overlay when it's clicked
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    });


    // BORDER HOVER INCREASER
    // select all elements with the class 'mainsection'
    const mainSections = document.querySelectorAll('.mainsection');

    // define a function to increase the border thickness of an element
    function increaseBorder() {
        this.style.border = "3px solid black";
    }

    // define a function to decrease the border thickness of an element
    function decreaseBorder() {
        this.style.border = "2px solid black";
    }

    // add mouseover and mouseout event listeners to each 'mainsection' element
    // these listeners call increaseBorder and decreaseBorder, respectively
    mainSections.forEach(function(section) {
        section.addEventListener('mouseover', increaseBorder);
        section.addEventListener('mouseout', decreaseBorder);
    });

    // LOCAL STORAGE PREVIEWER
    // function to display the entries popup
    function showEntriesPopup() {
        console.log('showEntriesPopup function called');
        var entries = JSON.parse(localStorage.getItem('entries') || '[]'); // retrieve entries from local storage
        var registrations = JSON.parse(localStorage.getItem('registrations') || '[]'); // retrieve registrations from local storage

        var entriesTableBody = document.getElementById('entriesTable').getElementsByTagName('tbody')[0];
        var usersTableBody = document.getElementById('usersTable').getElementsByTagName('tbody')[0];

        entriesTableBody.innerHTML = ''; // clear existing word entries
        usersTableBody.innerHTML = ''; // clear existing user registrations

        // populate the word entries table with data from local storage
        entries.forEach(entry => {
            var newRow = entriesTableBody.insertRow();
            newRow.insertCell(0).innerHTML = entry.word;
            newRow.insertCell(1).innerHTML = entry.definition;
            newRow.insertCell(2).innerHTML = entry.partOfSpeech;
            newRow.insertCell(3).innerHTML = entry.exampleSentence;
            newRow.insertCell(4).innerHTML = entry.origin;
        });

        // populate the user registrations table with data from local storage
        registrations.forEach(user => {
            var newRow = usersTableBody.insertRow();
            newRow.insertCell(0).innerHTML = user.username;
            newRow.insertCell(1).innerHTML = user.email;
            newRow.insertCell(2).innerHTML = user.phone;
            // parse the dob as a date object
            const dobDate = new Date(user.dob);
            // format the date as YYYY-MM-DD
            newRow.insertCell(3).innerHTML = dobDate.toISOString().split('T')[0]; // use the formatted date of birth
        });

        // display the entries popup
        document.getElementById('entriesPopup').style.display = 'block';
    }

    // close the entries popup when the close button is clicked
    document.getElementsByClassName('close')[0].onclick = function() {
        document.getElementById('entriesPopup').style.display = 'none';
    };

    // close the entries popup when clicking outside of it
    window.onclick = function(event) {
        if (event.target === document.getElementById('entriesPopup')) {
            document.getElementById('entriesPopup').style.display = 'none';
        }
    };

    // function to clear all entries from local storage
    function clearAllEntries() {
        localStorage.clear(); // remove all data stored in localStorage
        document.getElementById('entriesPopup').style.display = 'none'; // hide the popup
        alert('All entries have been cleared.'); // show confirmation
    }

    // add click event listeners for the view entries and clear entries buttons
    document.getElementById('viewEntriesBtn').addEventListener('click', showEntriesPopup);
    document.getElementById('clearEntriesBtn').addEventListener('click', clearAllEntries);
});
