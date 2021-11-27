/* hier kommt das Essen */

/* Diese variablen holen HTML tags aus dem DOM (Document Object Model)*/
const button = document.getElementById("get_meal")
const container = document.getElementById("essen")

/* Diese Funktion wird ausgeführt, wenn der Button geklickt wird */
button.addEventListener('click', () => {
	/* Diese Funktion holen die Daten aus der MealdDB API */
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		/* Dies Funktion packt die zurückgegebenen Daten in ein Array */
		.then(res => {
			makemeals(res.meals[0]);
		});
});
/* Diese Funktion führt dazu, dass ein Essen direkt beim Laden der Seite angezeigt wird */
button.click();

const makemeals = (meal) => {
	/* Automatische Tabelle der Zutaten */
	const ingredients = [];

	/* Sollte hier nicht nach der größe des Arrays gesucht werden? Egal*/
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			break;
		}
	}
	/* Dies holt die Domäne des Quelle
	Aus https://www.example.com/example.html?param=value
	wird www.example.com
	*/
	let domain = meal.strSource.split("/")[2]

	/* HTML-Template für das Essen */
	const newInnerHTML = `
		<div>
		<table>
			<tr>
			<div>
			<td class="EssenTabelleLBreite contentEssen">
				<img class="EssenBild" src="${meal.strMealThumb}" width="100%" alt="Bild von ${meal.strMeal}" title="${meal.strMeal}">
				</td>
				<td class="EssenBeschreibung">
				<h4>Name: ${meal.strMeal}</h4>
				${meal.strCategory ? `<p><strong>Kategorie:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Herkunft:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				${meal.strSource ? `<p><strong>Quelle: </strong><a href="${meal.strSource}">${domain}</a></p>` : ''}
				<h4>Zutaten:</h4>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div>
			
			<details open="true">
			<summary>Anleitung:</summary>
			<p>${meal.strInstructions}</p>
			</details>
			</div>
			</td>
			</tr>
			</table>
		</div>
	`;

	// Mach halt 
	container.innerHTML = newInnerHTML;
}