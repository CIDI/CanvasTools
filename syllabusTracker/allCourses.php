<?php
	/*****************************************/
	// This page will loop through colleges and departments to generate a list of syllabi

	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	include '/resources/canvasAPI.php';
	// College/Department Array
		// this was hard coded because USU has a lot of sub-accounts we didn't want included

		$collegesArray = array (
		"< College Name >"  => array(
			"< Department Name >" => "< Department sub-AccountID >",
			"< Department Name >" => "< Department sub-AccountID >"
		),
		"< College Name >"  => array(
			"< Department Name >" => "< Department sub-AccountID >",
			"< Department Name >" => "< Department sub-AccountID >"
		)
		);
	?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Language" content="en">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>USU Courses Syllabus List</title>
	<link rel="stylesheet" href="/resources/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="/resources/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="/resources/font-awesome/css/font-awesome.min.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" src="/resources/bootstrap/js/bootstrap.js"></script>
	<style>
		.department { background: #fff; }
		h2 { background: #003366; border-radius: 5px; box-shadow: 0px 2px 2px #9C9C9C; color: #fff; padding: 10px; }
		.dataTables_filter label {float:right;}
		.noContent i{ color: red; }
		ol { list-style-type: none; column-count: 4; -moz-column-count: 4; -webkit-column-count: 4; }
		@media screen and (max-width: 1000px) {
			ol { column-count: 3; -moz-column-count: 3; -webkit-column-count: 3; }
		}
		@media screen and (max-width: 800px) {
			ol { column-count: 2; -moz-column-count: 2; -webkit-column-count: 2; }
		}
		@media screen and (max-width: 500px) {
			ol {column-count: 1; -moz-column-count: 1; -webkit-column-count: 1; }
		}
	</style>
</head>
<body>
	<div class="container-fluid">
		<div class="row-fluid">
			<div id="collegeList">
			<?php 
				foreach ($collegesArray as $row => $deptArray) {
				    echo '<h2><i class="icon-compass"></i>  '.$row.'
				    	<a href="#top" class="topLink"><i class="icon-circle-arrow-up"></i> Top</a>
				    	</h2>';
				    echo '<div class="collegeGroup well">';

				    foreach ($deptArray as $dept => $accountID) {
				    	echo '<div class="department well">';
				    	echo "<h3>$dept</h3>";
				    	getCourses($accountID, $tokenHeader);
				    	echo '</div>';
				    }
				    echo '</div>';
				}

				function getCourses($accountID, $tokenHeader){
					echo '<ol class="courseList">';
					$pageNum = 1; // We will use this to bypass paginated results
					$perPage = 50; // This needs to match the ?per_page in the API url call (default is 10)

					$term = $_GET['term']; // for USU we use a term code of YYYY followed by a 2 digit number for the term
					$termID = "sis_term_id:".$term;
					$publishedState = $_GET['publishedState'];

					// To handle paginated results we will loop through these commands a number of times
						// 5 x 50 per page will cover <= 250 results
						// Set this for higher than you will need, it will exit the loop when it has found everything
					for ($k=0; $k<50; $k++){
						// Canvas API Call
						$accountCourses = listActiveCoursesByTerm($accountID, $termID, $pageNum, $publishedState, $tokenHeader);	
						// Decode JSON response
						$workingList = json_decode($accountCourses,true);
						// Get a count of how many courses were returned
						$courseCount = count($workingList);
						if($courseCount > 0){
							// Loop through each course
							for ($i=0; $i<$courseCount; $i++){
							  	// set up necessary variables
							  	$courseID = $workingList[$i]['id'];
							  	$courseName = $workingList[$i]['name'];
							  	// The following breaks up the course name to return the campus and section codes for filtering
							  	$courseNameParts = explode("-", $courseName);
							  	$sectionCode = $courseNameParts[2];
							  	$campusCode = substr($sectionCode, 0, 1);
							  	$deliveryMethod = substr($sectionCode, 1, 1);
							  	$workflowState = $workingList[$i]['workflow_state'];
								echo '<li class="'.$courseID.' CC-'.$campusCode.' DM-'.$deliveryMethod.'"><a class="course" href="syllabusDetails.php?courseID='.$courseID.'" target="_blank" rel="'.$courseID.'">'.$courseName.'</a> <a href="https://usu.instructure.com/courses/'.$courseID.'" class="canvasLink" target="_blank" title="Go To Course"><i class="icon-share-alt"></i></a></li>';
							}
						} else {
								echo 'No courses this term.';
						}
						// This is the second part of page control. It will exit the loop when all courses have been returned 
						if ($courseCount < $perPage){
							echo '</ol>';
							break;
						}
						// If the loop is to continue, this will set up for the next page of results
						$pageNum++;
					}
				}
			?>
			</div>
		</div>
	</div>
</body>
</html>