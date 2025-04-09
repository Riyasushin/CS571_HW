// This is where your JS goes!

// You can fetch data from https://cs571.org/rest/s25/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571.org/rest/s25/ice/pasta
//  https://cs571.org/rest/s25/ice/pizza

let recipe;
let baseAmounts = [];
let reviewNum = 0;


function updateRecipe() {
    const selectedRecipe = document.getElementById("recipe-selector").value;
    fetch("https://cs571.org/rest/s25/ice/" + selectedRecipe, {
        headers: {
            "X-CS571-ID": CS571.getBadgerId() // you may hardcode your bid_
        }
    })
    .then(res => res.json())
    .then(data => {
        recipe = data; // make recipe available everywhere. this is a reference to the SAME object.
        console.log(data); // for debugging!
    
        // Set the name and author
        const nameHTML = document.getElementById("recipe-name");
        nameHTML.innerText = data.name;
        const authorHTML = document.getElementById("recipe-author");
        authorHTML.innerText = "by " + data.author;
    
        // Set the image
        const imageHTML = document.getElementById("recipe-img");
        imageHTML.src = data.img.location;
        imageHTML.alt = data.img.description;
    
        // Set the instructions
        const instructionsHTML = document.getElementById("instructions");
        instructionsHTML.innerHTML = ''; // clear out any existing instructions
        for(let step of data.recipe) {
            const node = document.createElement("li");
            node.innerText = step;
            instructionsHTML.appendChild(node)
        }
    
        // Set the ingredients
        // Remember! ingredients is an object of objects, not a list.
        const ingrsHTML = document.getElementById("ingredients-body");
        ingrsHTML.innerHTML = ''; // clear out any existing ingredients
        baseAmounts = [];         // as well as any existing base amounts
        let ingrNames = Object.keys(data.ingredients);
        for(let ingrName of ingrNames) {
            let ingr = data.ingredients[ingrName];
    
            const ingrRowHTML = document.createElement("tr")
            const ingrAmountHTML = document.createElement("td");
            const ingrUnitHTML = document.createElement("td");
            const ingrNameHTML = document.createElement("td");
    
            baseAmounts.push(ingr.amount);
    
            ingrAmountHTML.innerText = ingr.amount
            if (ingr.unit) {
                ingrUnitHTML.innerText = ingr.unit;
            }
            if (ingr.misc) {
                ingrNameHTML.innerText = ingrName + " (" + ingr.misc + ")";
            } else {
                ingrNameHTML.innerText = ingrName;
            }
    
            ingrRowHTML.appendChild(ingrAmountHTML);
            ingrRowHTML.appendChild(ingrUnitHTML);
            ingrRowHTML.appendChild(ingrNameHTML);
            ingrsHTML.appendChild(ingrRowHTML);
        }
    })
}


function updateYield() {
    if (!recipe) {
        alert("I'm still loading the recipe!")
    } else {
        const numServings = parseInt(document.getElementById("serving-selector").value);
        const rows = document
            .getElementById("ingredients-body")
            .getElementsByTagName("tr");
        for (let i = 0; i < rows.length; i++) {
            const ingrAmountHTML = rows[i].getElementsByTagName("td")[0];
            ingrAmountHTML.innerText = baseAmounts[i] * numServings;
        }
    }
}

function displayReview() {
    if (!recipe) {
        alert("I'm still loading the recipe!")
    } else {
        let reviews = recipe.reviews; // remember! this is a list of objects containing "txt" and "rating"
        alert(reviews[reviewNum].txt);
        reviewNum = (reviewNum + 1) % reviews.length;
    }
}

// run updateRecipe on script load
updateRecipe();
