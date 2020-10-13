<?php
session_start();
session_unset();
session_destroy();

header("Location: http://www.raggmunkar.se/portfolio/admin/login.php");
exit();