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

        //legg til ingredientser
        const ingrlist = document.getElementById("ingredients");
        ingrlist.innerHTML = ""; //fjerner det som var der fra før

        for (i=1; i<=20; i++) {
            const ingr = meal["strIngredient" + i];
            const measure = meal["strMeasure" + i];

            if (ingr.trim() === "" ||  !ingr) {
                continue;
            }
            const listitem = document.createElement("li");
            listitem.textContent = `${ingr}  -  ${measure}`;
            ingrlist.appendChild(listitem);
        }
    })
}