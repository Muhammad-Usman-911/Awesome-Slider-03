document.addEventListener('DOMContentLoaded', () => {
   
    // Function to remove the activeCard class from all cards
    function removeActiveClass() {
        let cards = document.querySelectorAll('.cards');
        cards.forEach(card => {
            card.classList.remove('activeCard');
        });
    }

    // Add click event listener to each card
    function addCardEvent(){
        let cards = document.querySelectorAll('.cards');
        cards.forEach(card => {
            card.addEventListener('click', (event) => {
                // Prevent the click event from bubbling up to the document
                event.stopPropagation();

                // Remove the activeCard class from all cards
                removeActiveClass();

                // Add the activeCard class to the clicked card
                card.classList.add('activeCard');
                console.log(card);
            });
        });
    }
    

    // Add click event listener to the document
    document.addEventListener('click', () => {
        // Remove the activeCard class from all cards
        removeActiveClass();
    });
    
    // Initial Add Card Event
    addCardEvent();

    const urlRadio = document.querySelector('input[name="imageSource"][value="url"]');
    const fileRadio = document.querySelector('input[name="imageSource"][value="file"]');
    const urlInput = document.getElementById('urlInput');
    const fileInput = document.getElementById('fileInput');
    const form = document.getElementById('addForm');

    // Function to toggle visibility based on selected radio button
    function toggleImageSource() {
        if (urlRadio.checked) {
            urlInput.style.display = 'flex';
            fileInput.style.display = 'none';
        } else {
            urlInput.style.display = 'none';
            fileInput.style.display = 'flex';
        }
    }

    // Attach event listeners to radio buttons
    urlRadio.addEventListener('change', toggleImageSource);
    fileRadio.addEventListener('change', toggleImageSource);

    // Initial call to set the correct visibility on page load
    toggleImageSource();
    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get the values from the form
        const imageSource = document.querySelector('input[name="imageSource"]:checked').value;
        const imageUrl = document.getElementById('imageUrl').value;
        const imageFile = document.getElementById('imageFile').files[0];
        const heading = document.getElementById('heading').value;
        const content = document.getElementById('content').value;

        // Log the values to the console
        console.log('Image Source:', imageSource);
        if (imageSource === 'url') {
            console.log('Image URL:', imageUrl);
        } else {
            console.log('Image File:', imageFile);
        }
        console.log('Heading:', heading);
        console.log('Content:', content);
        // Create the card with the provided values
        makeCard(imageSource, imageUrl, imageFile, heading, content);
        
        // Add All Card Event
        addCardEvent();

        closeForm();

    });

    function makeCard(imageSource, imageUrl, imageFile, heading, content) {
        let parentCard = document.querySelector('.cardContainer');
        let newCard = document.createElement('div');
        newCard.classList.add('cards');

        let coverDiv = document.createElement('div');
        coverDiv.classList.add('cover');

        let img = document.createElement('img');
        if (imageSource === 'url') {
            img.src = imageUrl;
        } else {
            img.src = URL.createObjectURL(imageFile);
        }
        img.alt = 'Card image';

        let contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        let h1 = document.createElement('h1');
        h1.textContent = heading;

        let p = document.createElement('p');
        p.textContent = content;

        contentDiv.appendChild(h1);
        contentDiv.appendChild(p);

        newCard.appendChild(coverDiv);
        newCard.appendChild(img);
        newCard.appendChild(contentDiv);

        parentCard.appendChild(newCard);
    }


});


function showForm(){
    let formModal = document.querySelector('.modal');
    formModal.style.display='block';
}
function closeForm(){
    let formModal = document.querySelector('.modal');
    formModal.style.display='none';
}
document.getElementById('browseButton').addEventListener('click', function() {
    document.getElementById('imageFile').click();
});

document.getElementById('imageFile').addEventListener('change', function() {
    var fileName = this.files.length ? this.files[0].name : 'No File Here...';
    document.getElementById('fileName').textContent = fileName;
});
