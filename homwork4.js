window.onload = randomfood;

function randomfood() {
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
    })
}

function hentKategoriCocktail (randomfood) {

    const drinkIngredient = mapMealCategoryToDrinkIngredient(mealCategory);

    fetch ("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkIngredientVariable}")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.drinks && data.drinks.length > 0) {
            const cocktail = data.drinks[0]
            visCocktail(cocktail);
        } else {
            fetch ("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then(response => response.json())
            .then (data => visCocktail(data.drinks[0]));
        }
    });
}

function visCocktail(cocktail){

}