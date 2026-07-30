function makeElement(tag, props = {}, ...children) {
	const el = document.createElement(tag);
	Object.assign(el, props);
	children.forEach(child => {
		if (typeof child === 'string') {
			el.appendChild(document.createTextNode(child));
		} else if (child) {
			el.appendChild(child);
		}
	});

	return el;
}


function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.
	const resultLength = document.querySelector("#num-results");
	resultLength.textContent = studs.length;
	const students = document.querySelector("#students")
	students.innerHTML = '';
	studs.forEach(stud => {
		const fW = stud.fromWisconsin;
		const sfw = fW ? "is from Wisconsin" : "is NOT from Wisconsin";
		const cred = stud.numCredits;
		const newStudCol = makeElement('div', { className: 'col-12 col-md-6 col-lg-4 col-xl-3' },
			makeElement('h2', {}, `${stud.name.first} ${stud.name.last}`),
			makeElement('p', {},
				makeElement('strong', {}, stud.major)),
			makeElement('p', {}, `${stud.name.first} is taking ${cred} credits and ${sfw}`),
			makeElement('p', {}, `They have ${stud.interests.length} interests including...`),
			makeElement('ul', {},
				...stud.interests.map(int => makeElement('li', {}, int))
			)
		)
		students.appendChild(newStudCol)
	});
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	// TODO Implement the search

	const name = document.getElementById('search-name').value.trim().toLowerCase();
	const major = document.getElementById('search-major').value.trim().toLowerCase();
	const interest = document.getElementById('search-interest').value.trim().toLowerCase();

	// Ready to use!
	console.log(`Searching for Name: ${name} | Major: ${major} | Interest: ${interest}`);

	fetch('https://cs571.org/rest/s25/hw2/students', {
		headers: {
			"X-CS571-ID": CS571.getBadgerId()
		}
	}).then(res => {
		console.log(res.status, res.statusText);
		if (res.status === 200) {
			return res.json();
		} else {
			throw new Error();
		}
	}).then(data => {
		const filteredStudents = data.filter(s => {
			const matchesName = s.name.first.toLowerCase().includes(name) || s.name.last.toLowerCase().includes(name);
			const matchesMajor = s.major.toLowerCase().includes(major);
			const matchesInterest = s.interests.some(i => i.toLowerCase().includes(interest));

			return matchesName && matchesMajor && matchesInterest;
		});
		console.log(filteredStudents);
		buildStudents(filteredStudents);
	})
}

document.getElementById("search-btn").addEventListener("click", handleSearch);