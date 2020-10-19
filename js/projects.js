"use strict"

// Variabler
let projectsEl = document.getElementById('projects');
let submitProject = document.getElementById('submitproject');
let projectNameInput = document.getElementById('projectname');
let projectUrlInput = document.getElementById('projecturl');
let projectdInput = document.getElementById('projectd');
let projectimgInput = document.getElementById('projectimg');
let addProjectMsg = document.getElementById('add-project');


// Händelsehanterare
window.addEventListener('load', getProjects);           // Kör igång funktionen vid laddning av sida
submitproject.addEventListener('click', addProject);    // Kör igång funktionen vid klick

// Funktion för att hämta och skriva ut objekt
function getProjects() {
    projectsEl.innerHTML = '';                          // Nollställ elementet
    fetch('http://www.raggmunkar.se/portfolio/rest/myprojects.php')  // Hämta data från adress
        .then(response => response.json())
        .then(data => {
            data.forEach(object => {                   // Loopa igenom objekten och skriv ut
                projectsEl.innerHTML +=
                    `
                    <tr id="del${object.id}">
                    <th scope="row" id="${object.id}">${object.id}</th>
                    <td>${object.project_name}</td>
                    <td>${object.project_url}</td>
                    <td>${object.project_d}</td>
                    <td>${object.project_img}</td>
                    <td><button id="${object.id}" onClick="setProject(${object.id}); this.disabled='disabled';" class="btn btn-info mr-1">Ändra</button><button id="${object.id}" onClick="deleteProject(${object.id})" class="btn btn-info">Ta bort</button></td>
                  </tr>
                  <tr id="newProjectDiv${object.id}">
                  </tr>

                `
            })
        })
}

// Funktion för att radera objekt
function deleteProject(id) {
    let newDivEl = document.getElementById('del' + id);
    fetch('http://www.raggmunkar.se/portfolio/rest/myprojects.php?id=' + id, {   // Skicka med id till adress för radering av specifikt objekt
            method: 'DELETE',
        })
        .then(response => response.json().then(newDivEl.innerHTML = '<div class="alert alert-success">Kurs ' + id + ' Raderad!</div>'))
        .catch(error => {
            console.log('Error:', error);
        })
}

// Funktion för att lägga till objekt
function addProject(event) {
    // Parametrar som hämtas från Variablerna längst upp i filen 
    let projectname = projectNameInput.value;
    let projecturl = projectUrlInput.value;
    let projectd = projectdInput.value;
    let projectimg = projectimgInput.value;
    // Variabel för att lägga till objekt i tabell
    let project = { 'project_name': projectname, 'project_url': projecturl, 'project_d': projectd, 'project_img': projectimg };
    event.preventDefault();                                              // Ladda inte om sidan
    fetch('http://www.raggmunkar.se/portfolio/rest/myprojects.php', {    // Skicka med variabeln till adress för skapande av objekt
            method: 'POST',
            body: JSON.stringify(project),
        })
        .then(response => response.json()
        .then(addProjectMsg.innerHTML += '<p  class="alert alert-success">Projekt tillagt</p>'))
        .catch(error => {
            console.log('Error:', error);
        })
}

// Funktion för att ändra data i objekt
function setProject(id) {
    // Variabel för att peka på specifikt objekt
    let newProjectDivEl = document.getElementById('newProjectDiv' + id)

    fetch('http://www.raggmunkar.se/portfolio/rest/myprojects.php?id=' + id, { // Skicka med id för att kunna uppdatera specifikt objekt
            method: 'GET',
        })
        .then(response => response.json())
        .then(object => {                      // Skriv ut data från objektet för ändring och kör igång funktion för uppdatering vid klick på button
            newProjectDivEl.innerHTML += 
                `
            <td>${object[0].id}</td>
            <td><input type="text" id="update-projectname${object[0].id}" name="update-projectname" value="${object[0].project_name}"></td>
            <td><input type="text" id="update-project_url${object[0].id}" name="update-project_url" value="${object[0].project_url}"></td>
            <td><input type="text" id="update-projectd${object[0].id}" name="update-projectd" value="${object[0].project_d}"></td>
            <td><input type="text" id="update-projectimg${object[0].id}" name="update-projectimg" value="${object[0].project_img}"></td>
            <td><button class="btn btn-dark" id="update${object[0].id}" onClick="updateProject(${object[0].id}); this.onclick=null;">Ändra</button></td>
            `
        })
}

// Funktion för uppdatering av data i objekt
function updateProject(id) {
    // Variabler som hämtas från html
    let projectname = document.getElementById('update-projectname' + id).value;
    let project_url = document.getElementById('update-project_url' + id).value;
    let projectd = document.getElementById('update-projectd' + id).value;
    let projectimg = document.getElementById('update-projectimg' + id).value;
    let hideDiv = document.getElementById('newProjectDiv' + id);
    // Variabel för att uppdatera objekt i tabell
    let project = { 'id': id, 'project_name': projectname, 'project_url': project_url, 'project_d': projectd, 'project_img': projectimg };

    fetch('http://www.raggmunkar.se/portfolio/rest/myprojects.php?id=' + id, {   // Skicka med variabel till adress för uppdatering av objekt
            method: 'PUT',
            body: JSON.stringify(project),
        })
        .then(response => response.json()
        .then(hideDiv.innerHTML = '<div class="alert alert-success">Projekt ' + id + ' ändrat!</div>'))
        .catch(error => {
            console.log('Error:', error);
        })

}