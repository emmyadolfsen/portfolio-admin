"use strict"

// Variabler
let workEl = document.getElementById('work');
let submitWork = document.getElementById('submitwork');
let workNameInput = document.getElementById('workname');
let workPlaceInput = document.getElementById('workplace');
let workTitleInput = document.getElementById('worktitle');
let workDateInput = document.getElementById('workdate');
let addWorkMsg = document.getElementById('add-work');


// Händelsehanterare
window.addEventListener('load', getWork);           // Kör igång funktionen vid laddning av sida
submitwork.addEventListener('click', addWork);  
 

// Funktion för att hämta och skriva ut objekt
function getWork() {
    workEl.innerHTML = '';                          // Nollställ elementet
    fetch('http://www.raggmunkar.se/portfolio/rest/work.php')    // Hämta data från adress
        .then(response => response.json())
        .then(data => {
            data.forEach(object => {                  // Loopa igenom objekten och skriv ut
                workEl.innerHTML +=
                    `
                    <tr id="del${object.id}">
                    <th scope="row" id="${object.id}">${object.id}</th>
                    <td>${object.work_name}</td>
                    <td>${object.work_place}</td>
                    <td>${object.work_title}</td>
                    <td>${object.work_date}</td>
                    <td><button id="${object.id}" onClick="setWork(${object.id}); this.disabled='disabled';" class="btn btn-info mr-1" >Ändra</button><button id="${object.id}" onClick="deleteWork(${object.id})" class="btn btn-info">Ta bort</button></td>
                  </tr>
                  <tr id="newWorkDiv${object.id}">
                  </tr>
                `
            })
        })
}

// Funktion för att radera objekt
function deleteWork(id) {
    let newDivEl = document.getElementById('del' + id);
    fetch('http://www.raggmunkar.se/portfolio/rest/work.php?id=' + id, { // Skicka med id till adress för radering av specifikt objekt
            method: 'DELETE',
        })
        .then(response => response.json()
        .then(newDivEl.innerHTML = '<div class="alert alert-success">Jobb ' + id + ' raderat!</div>'))
        .catch(error => {
            console.log('Error:', error);
        })
}

// Funktion för att lägga till objekt
function addWork(event) {
    // Parametrar som hämtas från Variablerna längst upp i filen
    let workname = workNameInput.value;
    let workplace = workPlaceInput.value;
    let workdate = workDateInput.value;
    let worktitle = workTitleInput.value;
    // Variabel för att lägga till objekt i databastabell
    let work = { 'work_name': workname, 'work_place': workplace, 'work_title': worktitle, 'work_date': workdate };
    event.preventDefault();
    fetch('http://www.raggmunkar.se/portfolio/rest/work.php', {  // Skicka med variabeln till adress för skapande av objekt
            method: 'POST',
            body: JSON.stringify(work),
        })
        .then(response => response.json().then(addWorkMsg.innerHTML += '<p  class="alert alert-success">Job tillagt</p>'))
        .catch(error => {
            console.log('Error:', error);
        })
}

// Funktion för att ändra data i objekt
function setWork(id) {
    // Variabel för att peka på specifikt objekt
    let newWorkDivEl = document.getElementById('newWorkDiv' + id)

    fetch('http://www.raggmunkar.se/portfolio/rest/work.php?id=' + id, { // Skicka med id för att kunna uppdatera specifikt objekt
            method: 'GET',
        })
        .then(response => response.json())
        .then(object => {                       // Skriv ut data från objektet för ändring och kör igång funktion för uppdatering vid klick på button
            newWorkDivEl.innerHTML += 
                `
            <td>${object[0].id}</td>
            <td><input type="text" id="update-workname${object[0].id}" name="update-workname" value="${object[0].work_name}"></td>
            <td><input type="text" id="update-workplace${object[0].id}" name="update-workplace" value="${object[0].work_place}"></td>
            <td><input type="text" id="update-worktitle${object[0].id}" name="update-worktitle" value="${object[0].work_title}"></td>
            <td><input type="text" id="update-workdate${object[0].id}" name="update-workdate" value="${object[0].work_date}"></td>
            <td><button  class="btn btn-dark" id="update${object[0].id}" onClick="updateWork(${object[0].id}); this.onclick=null;">Ändra</button></td>
            `
        })
}

// Funktion för uppdatering av data i objekt
function updateWork(id) {
    // Variabler som hämtas från html
    let workname = document.getElementById('update-workname' + id).value;
    let workplace = document.getElementById('update-workplace' + id).value;
    let worktitle = document.getElementById('update-worktitle' + id).value;
    let workdate = document.getElementById('update-workdate' + id).value;
    let hideDiv = document.getElementById('newWorkDiv' + id);
    // Variabel för att uppdatera objekt i tabel
    let work = { 'id': id, 'work_name': workname, 'work_place': workplace, 'work_title': worktitle, 'work_date': workdate };

    fetch('http://www.raggmunkar.se/portfolio/rest/work.php?id=' + id, { // Skicka med variabel till adress för uppdatering av objekt
            method: 'PUT',
            body: JSON.stringify(work),
        })
        .then(response => response.json()
        .then(hideDiv.innerHTML = '<div class="alert alert-success">Jobb ' + id + ' ändrat!</div>'))

        .catch(error => {
            console.log('Error:', error);
        })

}