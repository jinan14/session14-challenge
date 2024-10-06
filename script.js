function showForm(){
    let form = document.getElementById('form');
    let body = document.body;
    form.style.display='flex';
    // body.style.filter='blur(100px)';
}

function removeForm(){
    let form = document.getElementById('form');
    form.style.display='none';
}

let drinksArray=[]
let sandwichesArray=[]
let generalArray=[]

let drinks = document.getElementById('Drinks');
let sandwiches = document.getElementById('Sandwiches')
let general = document.getElementById('General')

function addItem(){
    let category=document.getElementById('select');

    let imageInput = document.getElementById('imageInput');
    
    let itemName = document.getElementById('name');
    let itemPrice = document.getElementById('price');

    let itemDetails = document.getElementById('textArea');

    let file = imageInput.files[0];
    let reader = new FileReader();

    reader.addEventListener('load', function(event) {
        let imageData = event.target.result;
        let newItem = {
            image: imageData,
            name: itemName.value,
            description: itemDetails.value,
            price: itemPrice.value
        };

        if (category.value !== '' && validateInput(newItem)) {
            if(category.value === 'drinks'){
                drinksArray.push(newItem);
                updateDrinksHTML()
                removeForm();
            }else if(category.value === 'sandwiches'){
                sandwichesArray.push(newItem);
                updateSandwichesHTML()
                removeForm();
            }else if(category.value === 'general'){
                generalArray.push(newItem);
                updateGeneralHTML()
                removeForm();
            }

        }
    });

    reader.readAsDataURL(file);
}

function validateInput(item) {
    let isValid = true;
    let image = document.getElementById('imageInput');
    let name = document.getElementById('name');
    let description = document.getElementById('textArea');
    let price = document.getElementById('price');

    if (image && item.image === '') {
        image.style.borderColor = 'red';
        isValid = false;
    } else if (image) {
        image.style.borderColor = '';
    }

    if (name && item.name === '') {
        console.log('here')
        name.style.borderColor = 'red';
        console.log('skipped')
        isValid = false;
    } else if (name) {
        name.style.borderColor = '';
    }

    if (description && item.description === '') {
        description.style.borderColor = 'red';
        isValid = false;
    } else if (description) {
        description.style.borderColor = '';
    }

    if (price && (item.price === '' || isNaN(item.price) || item.price < 0)) {
        price.style.borderColor = 'red';
        isValid = false;
    } else if (price) {
        price.style.borderColor = '';
    }

    return isValid;
}

function updateDrinksHTML(){
    drinks.innerHTML=drinksArray.map(generateSingleItemHTML).join('');
}

function updateSandwichesHTML(){
    sandwiches.innerHTML=sandwichesArray.map(generateSingleItemHTML).join('');
}

function  updateGeneralHTML(){
    general.innerHTML=generalArray.map(generateSingleItemHTML).join('');
}

function generateSingleItemHTML(item){
    return`
        <div class='item'>
            <div class='image'>
                <img src='${item.image}'>
            </div>
            <div class='details'>
                <h2>${item.name}</h2>
                <p>${item.description}</p>
                <p>$${item.price}</p>
            </div>
        </div>
    `
}