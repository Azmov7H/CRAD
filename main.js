// Define variables
const price = document.getElementById("price");
const ads = document.getElementById("ads");
const taxes = document.getElementById("taxes");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const submit = document.getElementById("submit");
const title = document.getElementById("title");
const category = document.getElementById("category");
const count = document.getElementById("count");
const tb = document.getElementById("tb");

// Array to store products
let productData = [];
let updateIndex = null; // Track the index of the product being updated




// Check for existing products in localStorage
if (localStorage.product) {
    productData = JSON.parse(localStorage.product);
}


// Function to calculate total price
function calculateTotal() {
    if (price.value !== "") {
        const totalValue = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.innerHTML = totalValue;
        total.style.background = "green";
    } else {
        total.innerHTML = "0";
        total.style.background = "red";
    }
}

// Add or update product
submit.onclick = function () {
    const newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value,
        count: count.value,
    };

    if (updateIndex !== null) {
        // Update existing product
        productData[updateIndex] = newProduct;
        updateIndex = null;
    } else {
        // Add new product
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                productData.push(newProduct);
            }
        } else {
            productData.push(newProduct);
        }
    }

    // Save products to localStorage
    localStorage.setItem("product", JSON.stringify(productData));

    // Clear inputs and refresh table
    clearInputs();
    displayProducts();
};


// Function to clear input fields
function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.innerHTML = "0";
    total.style.background = "red";
    submit.innerHTML = "Add Product"; // Reset button text
    updateIndex = null; // Reset update state
}



// Function to load a product into input fields for updating
function updateProduct(i) {
    const product = productData[i];
    title.value = product.title;
    price.value = product.price;
    taxes.value = product.taxes;
    ads.value = product.ads;
    discount.value = product.discount;
    category.value = product.category;
   //count.value = product.count;
    count.style.display = "none"
    total.innerHTML = product.total;
    total.style.background = "green";

    updateIndex = index; // Set the index of the product being updated
    submit.innerHTML = "Update Product"; // Change button text
    calculateTotal() 
}

// Function to delete a single product
function deleteProduct(i) {
    productData.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(productData));
    displayProducts();
}

// Function to delete all products
function deleteAll() {
    localStorage.clear();
    productData = [];
    displayProducts();
}

//serach by titel our catogre
//
let seachMode = "titel"

function searchMode(id){

    if (id === "titel") {
        seachMode = "titel"
        
        
    }
    else(

        seachMode = "catgory"
        
    )
    search.placeholder("Serach By "+seachMode)
    const search = document.getElementById("search")
    console.log(seachMode)
search.focus()
}



// Function to display products in the table
function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear table before adding rows

    if (productData.length === 0) {
        productList.innerHTML = "<tr><td colspan='10'>No Products Found</td></tr>";
        return;
    }

    productData.forEach((product, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.taxes}</td>
            <td>${product.ads}</td>
            <td>${product.discount}</td>
            <td>${product.total}</td>
            <td>${product.category}</td>
            <td><button onclick="updateProduct(${i})" class="but">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="but">Delete</button></td>
        `;
        productList.appendChild(row);
    });

    const deleteAllButton = document.getElementById("deleteAllButton");
    if (productData.length > 0) {
        deleteAllButton.innerHTML = `<button class="but" id="but" onclick="deleteAll()">Delete All (${productData.length})</button>`;
    } 
    else {
        deleteAllButton.style.display ="none"
    }
}

// Initial display of products
displayProducts();


