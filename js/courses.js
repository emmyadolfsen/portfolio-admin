"use strict"

// Variabler
let coursesEl = document.getElementById('courses');
let submitCourse = document.getElementById('submitCourse');
let idInput = document.getElementById('courseid');
let nameInput = document.getElementById('coursename');
let universityInput = document.getElementById('university');
let courseDateInput = document.getElementById('coursedate');

// Händelsehanterare
window.addEventListener('load', getCourses);            // Kör igång funktionen vid laddning av sida
submitCourse.addEventListener('click', addCourse);      // Kör igång funktionen vid klick


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

// Funktion för att radera objekt
function deleteCourse(id) {
    fetch('http://www.raggmunkar.se/portfolio/rest/courses.php?id=' + id, {  // Skicka med id till adress för radering av specifikt objekt
            method: 'DELETE',
        })
        .then(response => response.json())
    location.reload()
        .catch(error => {
            console.log('Error:', error);
        })
}

// Funktion för att lägga till objekt
function addCourse() {
    // Parametrar som hämtas från Variablerna längst upp i filen 
    let coursename = nameInput.value;
    let university = universityInput.value;
    let coursedate = courseDateInput.value;
    // Variabel för att lägga till objekt i tabell
    let course = {'course_name': coursename, 'university': university, 'course_date': coursedate };

    fetch('http://www.raggmunkar.se/portfolio/rest/courses.php', {   // Skicka med variabeln till adress för skapande av objekt
            method: 'POST',
            body: JSON.stringify(course),
        })
        .then(response => response.json())
        .catch(error => {
            console.log('Error:', error);
        })
}

// Funktion för att ändra data i objekt
function setCourse(id) {
    // Variabel
    let newDivEl = document.getElementById('newDiv' + id)

    fetch('http://www.raggmunkar.se/portfolio/rest/courses.php?id=' + id, {  // Skicka med id för att uppdatera specifikt objekt
            method: 'GET',
        })
        .then(response => response.json())
        .then(course => {                           // Skriv ut data från objektet för ändring och kör igång funktion för uppdatering vid klick på button
            newDivEl.innerHTML += 
                `
            <td><input type="text" id="update-courseid${course[0].id}" name="update-courseid" value="${course[0].id}"></td>
            <td><input type="text" id="update-coursename${course[0].id}" name="update-coursename" value="${course[0].course_name}"></td>
            <td><input type="text" id="update-university${course[0].id}" name="update-university" value="${course[0].university}"></td>
            <td><input type="text" id="update-coursedate${course[0].id}" name="update-coursedate" value="${course[0].course_date}"></td>
            <td><button class="btn btn-dark" id="update${course[0].id}" onClick="updateCourse(${course[0].id});">Ändra</button></td>
            `
        })
}

// Funktion för uppdatering av data i objekt
function updateCourse(id) {
    // Variabler som hämtas från html
    let courseid = document.getElementById('update-courseid' + id).value;
    let coursename = document.getElementById('update-coursename' + id).value;
    let university = document.getElementById('update-university' + id).value;
    let coursedate = document.getElementById('update-coursedate' + id).value;
    // Variabel för att uppdatera objekt i tabell
    let course = { 'id': courseid, 'course_name': coursename, 'university': university, 'course_date': coursedate };

    fetch('http://www.raggmunkar.se/portfolio/rest/courses.php?id=' + id, {      // Skicka med variabel till adress för uppdatering av objekt
            method: 'PUT',
            body: JSON.stringify(course),
        })
        .then(response => response.json())
    location.reload()
        .catch(error => {
            console.log('Error:', error);
        })

}