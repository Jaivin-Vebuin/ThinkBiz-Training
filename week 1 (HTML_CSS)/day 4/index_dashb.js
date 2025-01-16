let products = [];
let categories = [];

// Fetch products and categories
fetch("https://dummyjson.com/products?limit=21")
    .then((response) => response.json())
    .then((fetchedData) => {
        // separate the products array
        products = fetchedData.products;

        // separate the categories
        // used Set for define unique categories
        categories = [...new Set(products.map(product => product.category))];
        populateCategories(categories);
        displayProducts(products);
    })
    .catch((error) => console.error("Error fetching data:", error));

// this function is to add all the unique category to option list
function populateCategories(categories) {
    const categoryDropdown = document.getElementById('categoryDropdown');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });
}

// this function is to add the card details and create the new card for each product from products array
function displayProducts(products) {
    const masterCard = document.getElementById('masterCard');
    masterCard.innerHTML = '';
    products.forEach(product => {
        const containerCard = document.createElement('div');
        containerCard.className = 'containerCard';

        const wrapperCard = document.createElement('div');
        wrapperCard.className = 'wrapperCard';

        const cardImage = document.createElement('img');
        cardImage.className = 'card-image';
        cardImage.src = product.thumbnail;
        cardImage.alt = product.title;

        const titleCard = document.createElement('h1');
        titleCard.className = 'title-card';
        titleCard.textContent = product.title;

        const detailsCard = document.createElement('p');
        detailsCard.className = 'details-card';
        detailsCard.textContent = product.description;

        const buttonWrapper = document.createElement('div');
        buttonWrapper.className = 'button-wrapperCard';

        const detailsButton = document.createElement('button');
        detailsButton.className = 'btn-details';
        detailsButton.textContent = 'DETAILS';

        const buyButton = document.createElement('button');
        buyButton.className = 'btn-buy';
        buyButton.textContent = 'BUY NOW';

        // appendchild function appends the created elemnt to the parent
        buttonWrapper.appendChild(detailsButton);
        buttonWrapper.appendChild(buyButton);

        wrapperCard.appendChild(cardImage);
        wrapperCard.appendChild(titleCard);
        wrapperCard.appendChild(detailsCard);

        containerCard.appendChild(wrapperCard);
        containerCard.appendChild(buttonWrapper);

        masterCard.appendChild(containerCard);
    });
}

// for filtering the products for selected category from the list
document.getElementById('categoryDropdown').addEventListener('change', (event) => {
    // on changing the selected option extract the value
    const selectedCategory = event.target.value;
    // by default => all
    if (selectedCategory === "") {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    }
});

// for filtering the products according to search input
document.getElementById('searchBar').addEventListener('input', (event) => {
    // get the value on inputting
    const searchWord = event.target.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        return product.category.toLowerCase().includes(searchWord) ||
            product.title.toLowerCase().includes(searchWord)
        // extra functionality : 
        // product.description.toLowerCase().includes(searchWord) || 
        // product.category.toLowerCase().includes(searchWord);
    });
    displayProducts(filteredProducts);
})

// for changing the sign ☰ to < Go back
document.getElementById('sidebarToggle').addEventListener('click', (event) => {
    var label = document.getElementsByClassName('sidebarToggleLabel')[0];
    if (event.target.checked) {
        label.innerHTML = "< Go Back";
    } else {
        label.innerHTML = "☰";
    }
});
