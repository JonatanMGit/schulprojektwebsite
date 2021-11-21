
//sehr guter Code, aber dies wären sehr viele Bilder

window.onscroll = function () {
	if ((window.innerHeight + window.pageYOffset + 2000) >= document.body.offsetHeight) {
		document.body.appendChild(document.createElement('br'))
		document.body.appendChild(document.createElement('br'))
		var img = document.createElement('img')
		img.src = "capybara.jpg"
		img.className = "capybara center"
		document.body.appendChild(img)
	}
};