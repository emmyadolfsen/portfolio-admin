<?php session_start(); ?>
<?php 
    if(!isset($_SESSION['username'])) {
        header("Location: http://www.raggmunkar.se/portfolio/admin/login.php?msg=Logga in");
    }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Emmys Admin</title>
</head>

<body>

<div class="d-flex flex-row">
<h1 class="p-3">Emmy Adolfsén</h1>
<button class="btn btn-outline-primary m-4"><a href="http://www.raggmunkar.se/portfolio/admin/logout.php">Logga ut</a></button>
</div>    
<h2 id="toggle-courses" class="p-3">Kurser jag läst</h2>
    <article id="courses-read">
<table class="table m-3 mw-100 bg-light">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Universitet</th>
      <th scope="col">Kursnamn</th>
      <th scope="col">År</th>
      <th scope="col">Kursplan</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="courses">
  </tbody>
</table>

    <h3 class="p-3">Lägg till kurs:</h3>
    <div id="add-course"></div>
    <form class="m-3 p-3 bg-light">
    <div class="form-group">
        <label for="university">Universitet:</label>
        <input type="text" id="university" class="form-control" name="university">
    </div>
    <div class="form-group">
        <label for="coursename">Kursnamn:</label>
        <input type="text" id="coursename" class="form-control" name="coursename">
    </div>
    <div class="form-group">
        <label for="coursedate">År:</label>
        <input type="text" id="coursedate" class="form-control" name="coursedate">
    </div>
    <div class="form-group">
        <label for="syllabus">Kursplan</label>
        <input type="text" id="syllabus" class="form-control" name="syllabus">
    </div>
        <button type="submit" class="btn btn-dark" id="submitCourse">Lägg Till</button>
    </form>
    </article>

    <!-----------------------JOBB---------------------------------->

    <h2 id="toggle-work" class="p-3 mt-3">Jobb</h2>
    <article id="work-toggle">

    <table class="table m-3 mw-100 bg-light">
        <thead>
        <tr>
        <th scope="col">Id</th>
        <th scope="col">Företag</th>
        <th scope="col">Plats</th>
        <th scope="col">Titel</th>
        <th scope="col">År</th>
        <th scope="col"></th>
        </tr>
        </thead>
    <tbody id="work">
    </tbody>
    </table>    

    <h3 class="p-3">Lägg till jobb:</h3>
    <div id="add-work"></div>
    <form class="m-3 p-3 bg-light">
    <div class="form-group">
        <label for="workname">Företag:</label>
        <input type="text" id="workname" class="form-control" name="workname">
    </div>
    <div class="form-group">
        <label for="workplace">Plats:</label>
        <input type="text" id="workplace" class="form-control" name="workplace">
    </div>
    <div class="form-group">
        <label for="worktitle">Titel:</label>
        <input type="text" id="worktitle" class="form-control" name="worktitle">
    </div>
    <div class="form-group">
        <label for="workdate">År:</label>
        <input type="text" id="workdate" class="form-control" name="workdate">
    </div>
        <button type="submit" class="btn btn-dark" id="submitwork">Lägg Till</button>
    </form>
    </article>


    <h2 id="toggle-projects" class="p-3 mt-3">Projekt</h2>
    <article id="projects-toggle">

    <table class="table m-3 mw-100 bg-light">
        <thead>
        <tr>
        <th scope="col">Id</th>
        <th scope="col">Projektnamn</th>
        <th scope="col">URL</th>
        <th scope="col">Beskrivning</th>
        <th scope="col">Bildnamn</th>
        <th scope="col"></th>
        </tr>
        </thead>
    <tbody id="projects">
    </tbody>
    </table>    


    <h3 class="p-3">Lägg till projekt:</h3>
    <div id="add-project"></div>
    <form class="m-3 p-3 bg-light">
    <div class="form-group">
        <label for="projectname">Projektnamn:</label>
        <input type="text" id="projectname" class="form-control" name="projectname">
    </div>
    <div class="form-group">
        <label for="projecturl">URL:</label>
        <input type="text" id="projecturl" class="form-control" name="projecturl">
    </div>
    <div class="form-group">
        <label for="projectd">Beskrivning:</label>
        <input type="text" id="projectd" class="form-control" name="projectd">
    </div>
    <div class="form-group">
        <label for="projectimg">Bildnamn:</label>
        <input type="text" id="projectimg" class="form-control" name="projectimg">
    </div>
        <button type="submit" class="btn btn-dark" id="submitproject">Lägg Till</button>
    </form>

    </article>

<script src="js/main.js"></script>
<script src="js/courses.js"></script>
<script src="js/projects.js"></script>
<script src="js/work.js"></script>

</body>
</html>