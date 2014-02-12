<?php
	// Display any php errors (for development purposes)
		error_reporting(E_ALL);
		ini_set('display_errors', '1');

	// Limit use to instructors or administrators
	if(strpos($_POST["roles"],'Instructor') !== false || strpos($_POST["roles"],'Administrator') !== false) {
		session_start();
		$_SESSION['allowed'] = true;
		$_SESSION['courseID'] = $_POST['custom_canvas_course_id'];
	} else {
		echo "Sorry, this tool is for administrators only.";
		return false;
	}
	if ($_SESSION['allowed']){
	} else {
		echo "Sorry, this tool is for administrators only.";
		return false;
	}

	include 'resources/wizardAPI.php';

	// Get the POST information and turn it into variables for future use
		if (isset($_POST["lis_person_name_full"])){
			$userFullName = $_POST["lis_person_name_full"];
			$userID = $_POST["custom_canvas_user_id"];
			$currentCourseID = $_POST["custom_canvas_course_id"];
			$userRole = $_POST["roles"];
		}
?>


<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>USU Template Wizard</title>
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="resources/font-awesome/css/font-awesome.min.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" charset="utf-8">
	</script>
	<style>
		.well {text-align: center; max-width: 600px; margin: auto;}
	</style>
</head>
<body>
	<div class="navbar navbar-inverse">
		<div class="navbar-inner">
			<ul class="nav">
				<li><a href="resources/wikiPages.php">Wiki Page Templates</a></li>
				<li><a href="resources/modules.php">Modules</a></li>
				<li><a href="resources/imageCrop.php?task=selectImage">Front Page Banner Image</a></li>
			</ul>
		</div>
	</div>
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="well">
				<a href="resources/wikiPages.php" class="btn btn-primary btn-block btn-large">Wiki Page Templates</a>
				<a href="resources/modules.php" class="btn btn-primary btn-block btn-large">Modules</a>
				<a href="resources/imageCrop.php?task=selectImage" class="btn btn-primary btn-block btn-large">Front Page Banner Image</a>
			</div>
		</div>
	</div>
</body>
</html>