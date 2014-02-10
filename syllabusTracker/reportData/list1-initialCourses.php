<?php
	// This file will gather the courses with enrollments for the selected term

	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	include 'syllabusAPI.php';

	?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Language" content="en">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>Courses JSON</title>
	<link rel="stylesheet" href="/canvasCustomTools/resources/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="/canvasCustomTools/resources/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="/canvasCustomTools/resources/font-awesome/css/font-awesome.min.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" src="/canvasCustomTools/resources/bootstrap/js/bootstrap.js"></script>
	<style>
		.dataTables_filter label {float:right;}
		.noContent i{
			color: red;
		}
		.not_available {
			color: #9E9E9E;
		}
	</style>
</head>
<body>
	<div class="container-fluid">
		<div class="row-fluid">
			<div id="collegeList">
					<?php 
						$jsonData = "";
						// Grab the list of Colleges and Departments we will be checking
						$currentList = file_get_contents('json/collegeList.json');
						$data = json_decode($currentList, true);
						$courseCount = count($data);
						// Loop through each account and grab the accounts with enrollments
						foreach($data as $collegeData)
					    {
							echo '<h2><i class="icon-compass"></i>  '.$collegeData['collegeName'].'
								<a href="#top" class="topLink"><i class="icon-circle-arrow-up"></i> Top</a>
								</h2>';
							echo '<div class="collegeGroup well">';
							$jsonData .= '{ "collegeName": "'.$collegeData['collegeName'].'", "departments": [';
							foreach($collegeData['departments'] as $department)
							{
								echo '<div class="department well">';
						    	$jsonData .= '{ "deptName": "'.$department['deptName'].'", "courses" : [';
						    	echo '<h3>'.$department["deptName"].' ('.$department["deptID"].')</h3>';
						    	getCourses($department['deptID'], $tokenHeader);
						    	echo '</div>';
						    	$jsonData = rtrim($jsonData, ",");
						    	$jsonData .= ']},';
							}
							$jsonData = rtrim($jsonData, ",");
							$jsonData .= ']},';
							echo '</div>';
					    }        

						function getCourses($accountID, $tokenHeader){
							echo '<ol class="courseList">';
							$pageNum = 1; // We will use this to bypass paginated results
							$perPage = 50; // This needs to match the ?per_page in the API url call (default is 10)

							$term = $_GET['term'];
							$termID = "sis_term_id:".$term;


							// To handle paginated results we will loop through these commands a number of times
								// 5x50per page will cover <= 250 results

								for ($k=0; $k<50; $k++){
									$additionalParams = "&include[]=term&enrollment_term_id=".$termID."&with_enrollments=true";
									$accountCourses = listAccountCourses($accountID, $additionalParams, $pageNum, $tokenHeader);
									$workingList = json_decode($accountCourses,true);

									// Get a count of how many courses were returned
									$courseCount = count($workingList);
									if($courseCount == 0 && $pageNum == 1){
									// echo 'No courses this term.';
								} else {
									// Loop through each course
									for ($i=0; $i<$courseCount; $i++){
									  	// set up necessary variables
									  	$courseID = $workingList[$i]['id'];
									  	$courseName = $workingList[$i]['name'];
									  	$status = $workingList[$i]['workflow_state'];
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
										if($status == "available"){
											$usingCanvas = "true";
										} else {
											$usingCanvas = "false";
										}
										// $GLOBALS['jsonData'] .=' {"courseID": "'.$courseID.'", "courseName": "'.$courseName.'", "campusCode": "CC-'.$campusCode.'", "deliveryMethod": "DM-'.$deliveryMethod.'",  "usingCanvas": "'.$usingCanvas.'", "instructors": ['.$instructorNames.']},';
										$GLOBALS['jsonData'] .=' {"courseID": "'.$courseID.'", "courseName": "'.$courseName.'", "campusCode": "CC-'.$campusCode.'", "deliveryMethod": "DM-'.$deliveryMethod.'",  "usingCanvas": "'.$usingCanvas.'"},';
									}
								}
									// This is the second part of page control. It will exit the loop when all courses have been returned 
									if ($courseCount < $perPage){
										// echo '</ol>';
										break;
									}
									// If the loop is to continue, this will set up for the next page of results
									$pageNum++;
								}
						}

						// Write the results to a JSON file for later retrieval

						// create json file pointer 
						$fp = @fopen('json/'.$_GET['term'].'.json', 'w') or die('Could not open file, or file does not exist and failed to create.'); 
					
						$cleanedText = str_replace("\t", "", $jsonData);
						$mytext = '['.rtrim($cleanedText, ", \n").']'; 

						// write text to file 
						@fwrite($fp, $mytext) or die('Could not write to file.'); 

						// close file 
						@fclose($fp);
					?>
			</div>
		</div>
	</div>
	<div id="syllabusTest">Done!</div>
</body>
</html>