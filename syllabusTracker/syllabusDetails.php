<?php
	/*******************************************************************/
	/* This page will retrieve the syllabus for the provided course ID */
	/*******************************************************************/

	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	include '/resources/canvasAPI.php';
	$courseID = $_GET['courseID']; 

	// Get Course Name
    $courseInfo = getCourse($courseID, $tokenHeader);
    $workingList = json_decode($courseInfo,true);
	$courseName = $workingList['name'];

	?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Language" content="en">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title><? echo $courseName ?> Syllabus</title>
	<link rel="stylesheet" href="/canvasCustomTools/resources/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="/canvasCustomTools/resources/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="/canvasCustomTools/resources/font-awesome/css/font-awesome.min.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<style>
		body {padding: 0; margin: 0; background: #E4E4E4; }
		.heading { background: #003366; box-shadow: 0px 2px 2px #9C9C9C; color: #fff; position: fixed; top: 10px; width: 100%; }
		.heading a { color: #fff; text-decoration: underline; }
		.heading a:hover { text-decoration: none; }
		h1 { font-size: 25px; margin: 0; text-align: center; text-shadow: 0px 2px 2px #000; }
		.syllabusWrap { background: #fff; box-shadow: 2px 2px 5px #000; margin: 70px auto 50px; max-width: 800px; padding: 20px; }
		.syllabus { padding: 20px; }
		@media print{
			.heading { position: relative; }
			h1 { font-size: 20px; margin: 0; padding: 0; }
			.syllabusWrap { background: #fff; border-left: none; border-right: none; box-shadow: none; margin: 0 auto; max-width: 100%; padding: 0 10px; }
		}
	</style>
</head>
<body>
	<div class="heading">
		<h1><?php echo '<a href="https://usu.instructure.com/courses/'.$courseID.'" target="_blank" title="Go To Course">'.$courseName.'</a>' ?> Syllabus</h1>
	</div>
	<div class="syllabusWrap">
		<div class="syllabus">
			<?php
				$syllabusDetails = getCourseSyllabus($courseID, $tokenHeader);
				$syllabusDecoded = json_decode($syllabusDetails, true);
				$syllabusBody = $syllabusDecoded['syllabus_body'];
				echo($syllabusBody);
			?>
		</div>
	</div>
</body>
</html>