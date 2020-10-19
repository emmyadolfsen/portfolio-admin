// Funktion för att hämta och skriva ut objekt
function getCourses() {
    coursesEl.innerHTML = '';                           // Nollställ elementet
    fetch('http://www.raggmunkar.se/portfolio/rest/courses.php')     // Hämta data från adress
        .then(response => response.json())
        .then(data => {
            data.forEach(object => {                    // Loopa igenom objekten och skriv ut
                coursesEl.innerHTML +=
                    `
                    <tr>
                    <th scope="row" id="${object.id}">${object.id}</th>
                    <td>${object.university}</td>
                    <td>${object.course_name}</td>
                    <td>${object.course_date}</td>
                    <td><button id="${object.id}" onClick="setCourse(${object.id}); this.disabled='disabled';" class="btn btn-info mr-1">Ändra</button><button id="${object.id}" onClick="deleteCourse(${object.id})" class="btn btn-info">Ta bort</button></td>
                  </tr>
                  <tr id="newDiv${object.id}">
                  </tr>
                `
            })
        })
}