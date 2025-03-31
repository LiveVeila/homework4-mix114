window.onload = init;

function init() {
    randomfood()
    .then(function(kategori) {
        hentKategoriCocktail(kategori);
    });
}

function randomfood() {
    return new Promise((resolve, reject) => {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            console.log(data)
    
            const meal = data.meals[0]; //henter første (og eneste) måltid
            
            //legg til bilde
            document.getElementById("foodimg").src = meal.strMealThumb
    
            //endre tittel
            const tittel = document.getElementById("titlefood")
            tittel.innerHTML = ""
            tittel.innerHTML = meal.strMeal
    
            //endre kategori
            const kategori = document.getElementById("category")
            kategori.innerHTML = ""
            kategori.innerHTML = "Category: " + meal.strCategory
    
            //legg til ingredientser
            const ingrlist = document.getElementById("ingredients");
            ingrlist.innerHTML = ""; //fjerner det som var der fra før
    
            for (i=1; i<=20; i++) {
                const ingr = meal["strIngredient" + i];
                const measure = meal["strMeasure" + i];
    
                if (ingr == "" ||  !ingr) {
                    continue;
                }
                const listitem = document.createElement("li");
                listitem.textContent = `${ingr} - ${measure}`;
                ingrlist.appendChild(listitem);
            }
    
            //legg til instruksjoner
            const instrks = document.getElementById("instructions");
            instrks.innerHTML = ""; //fjerner det som var der fra før
            instrks.innerHTML = meal.strInstructions;
    
            resolve(meal.strCategory);
        })
        .catch(error => reject(error));
    });
}

const mealCategoryToCocktailIngredient = {
    Beef: "whiskey",
    Chicken: "gin",
    Dessert: "amaretto",
    Lamb: "vodka",
    Miscellaneous: "vodka",
    Pasta: "tequila",
    Pork: "tequila",
    Seafood: "rum",
    Side: "brandy",
    Starter: "rum",
    Vegetarian: "gin",
    Breakfast: "vodka",
    Goat: "whiskey",
    Vegan: "rum",
    // Add more if needed; otherwise default to something like 'cola'
  };
  

function mapMealCategoryToDrinkIngredient(ktgr) {
    return mealCategoryToCocktailIngredient[ktgr] || "cola"
}

function hentKategoriCocktail (kategori) {
    const cocktialingr = mapMealCategoryToDrinkIngredient(kategori)
    
    if (cocktialingr === "cola") {
        const tittel = document.getElementById("titlecocktail")
        tittel.innerHTML = "cola"
    }else {
        fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktialingr}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            const drink = data.drinks[0];
            //legg til bilde
            document.getElementById("cocktailimg").src = drink.strDrinkThumb

            //legg til tittel
            const cockttitl = document.getElementById("titlecocktail")
            cockttitl.innerHTML = ""
            cockttitl.innerHTML = drink.strDrink

            //legg til ingredientser
            const ingredientslist = document.getElementById("ingredientscocktail")
            ingredientslist.innerHTML = ""

            for (i=1; i<=15; i++) {
                const ingr = drink["strIngredient" + i];
                const measure = drink["strMeasure" + i];
    
                if (ingr == "" ||  !ingr) {
                    continue;
                }
                const listitem = document.createElement("li");
                listitem.textContent = `${ingr} - ${measure}`;
                ingredientslist.appendChild(listitem);
            }

            //legg til instruksjoner
            const instruksjoner = document.getElementById("instrcsCocktail")
            instruksjoner.innerHTML = ""
            instruksjoner.innerHTML = drink.strInstructions
        });
    }

}