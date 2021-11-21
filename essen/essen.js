/* hier kommt das Essen */
const button = document.getElementById("get_meal")
const container = document.getElementById("essen")

button.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
			makemeals(res.meals[0]);
		});
});
button.click();

const makemeals = (meal) => {
	/* Automatische Tabelle der Zutaten */
	const ingredients = [];
	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			break;
		}
	}
	/* Dies holt die Domäne des Quelle */
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

	container.innerHTML = newInnerHTML;
}