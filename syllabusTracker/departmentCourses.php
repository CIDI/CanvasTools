<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	include '../resources/canvasAPI.php';
	$accountID = $_GET['accountID']; 
	$publishedState = $_GET['publishedState'];

	// Get Account Info
	$accountInfo = getAccountInfo($accountID, $tokenHeader, $canvasURL);
	$accountInfoDetails = json_decode($accountInfo, true);
	$accountName = $accountInfoDetails['name'];

	?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Language" content="en">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>Syllabus List</title>
	<link rel="stylesheet" href="/canvasCustomTools/resources/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="/canvasCustomTools/resources/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="/canvasCustomTools/resources/font-awesome/css/font-awesome.min.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" src="/canvasCustomTools/resources/bootstrap/js/bootstrap.js"></script>
	<style>
		.dataTables_filter label { float:right; }
		.noContent i{color: red; }
		ol { list-style-type: none; column-count: 4; -moz-column-count: 4; -webkit-column-count: 4; }
		@media screen and (max-width: 1000px) {
			ol { column-count: 3; -moz-column-count: 3; -webkit-column-count: 3; } }
		@media screen and (max-width: 800px) {
			ol { column-count: 2; -moz-column-count: 2; -webkit-column-count: 2; }
		}
		@media screen and (max-width: 500px) {
			ol { column-count: 1; -moz-column-count: 1; -webkit-column-count: 1; }
		}
	</style>
</head>
<body>
	<div class="container-fluid">
		<div class="row-fluid">
			<h2><?php echo $accountName ?> Course Syllabus'</h2>
				<ol id="courseList">
					<?php

						
						$pageNum = 1; // We will use this to bypass paginated results
						$perPage = 50; // This needs to match the ?per_page in the API url call (default is 10)

						$term = $_GET['term'];
						$termID = "sis_term_id:".$term;

						// To handle paginated results we will loop through these commands a number of times
							// 5x50per page will cover <= 250 results

							for ($k=0; $k<50; $k++){
								// return published or unpublished courses
								$accountCourses = listActiveCoursesByTerm($accountID, $termID, $pageNum, $publishedState, $tokenHeader);	
								$workingList = json_decode($accountCourses,true);

								// Get a count of how many courses were returned
								$courseCount = count($workingList);
								if($courseCount == 0 && $pageNum == 1){
									echo 'No courses this term.';
								} else {
									// Loop through each course
									for ($i=0; $i<$courseCount; $i++){
									  	// set up necessary variables
									  	$courseID = $workingList[$i]['id'];
									  	$courseName = $workingList[$i]['name'];
									  	// The following breaks up the course name to return the campus and section codes for filtering
									  	$courseNameParts = explode("-", $courseName);
									  	if(isset($courseNameParts[2])){
										  	$sectionCode = $courseNameParts[2];
										  	$campusCode = substr($sectionCode, 0, 1);
										  	$deliveryMethod = substr($sectionCode, 1, 1);
									  	} else {
									  		$sectionCode = "undefined";
									  		$campusCode = "undefined";
									  		$deliveryMethod = "undefined";
									  	}
										echo '<li class="'.$courseID.' CC-'.$campusCode.' DM-'.$deliveryMethod.'"><a class="course" href="syllabusDetails.php?courseID='.$courseID.'" target="_blank" rel="'.$courseID.'">'.$courseName.'</a> <a href="https://usu.instructure.com/courses/'.$courseID.'" class="canvasLink" target="_blank" title="Go To Course"><i class="icon-share-alt"></i></a></li>';
									}
								}
								// This is the second part of page control. It will exit the loop when all courses have been returned 
								if ($courseCount < $perPage){
									break;
								}
								// If the loop is to continue, this will set up for the next page of results
								$pageNum++;
							}
							// Retrieve the total for all published or unpublished courses
							$pageNum = 1; // We will use this to bypass paginated results
							$perPage = 50; // This needs to match the ?per_page in the API url call (default is 10)
							$grandTotal = 0;

							// To handle paginated results we will loop through these commands a number of times
								// 5x50per page will cover <= 250 results
							for ($k=0; $k<50; $k++){
								// get all courses published and unpublished 
								$allCourses = listAllCoursesByTerm($accountID, $termID, $pageNum, $tokenHeader);
								$tempList = json_decode($allCourses);
								$tempListCount = count($tempList);
								$grandTotal = $grandTotal+$tempListCount;

								// This is the second part of page control. It will exit the loop when all courses have been returned 
								if ($tempListCount < $perPage){
									break;
								}
								// If the loop is to continue, this will set up for the next page of results
								$pageNum++;
							}
							echo '<li class="accountTotal" style="display:none;">'.$grandTotal.'</li>';
					?>
			</ol>
		</div>
	</div>
</body>
</html>