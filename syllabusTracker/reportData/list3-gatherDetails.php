<?php
	// This page will loop through the courses and check their enrollments


	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	include 'syllabusAPI.php';
	?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Language" content="en">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>Details List</title>
	<link rel="stylesheet" href="../resources/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="../resources/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="../resources/font-awesome/css/font-awesome.min.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" src="../resources/bootstrap/js/bootstrap.js"></script>
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
						$indexNum = $_GET['indexNum'];
						$jsonData = "[";
						echo '<ol>';

						$currentList = file_get_contents('json/'.$_GET['term'].'_enrollments_'.$_GET['indexNum'].'.json');
						$data = json_decode($currentList, true);
						$courseCount = count($data);
						$college = $data[0]['collegeName'];
						$jsonData .= "{";
						$jsonData .= '"collegeName": "'.$college.'",';
						$jsonData .= '"departments": [';
						$departmentCount = count($data[0]['departments']);
						for ($j=0; $j<$departmentCount; $j++){
							$jsonData .= '{"deptName": "'.$data[0]['departments'][$j]['deptName'].'",';
							$courseCount = count($data[0]['departments'][$j]['courses']);
							$jsonData .= '"courses": [';
							for ($k=0; $k<$courseCount; $k++){
								$courseID = $data[0]['departments'][$j]['courses'][$k]['courseID'];
								$jsonData .= "{";
								$jsonData .= '"courseID": "'.$courseID.'",'; 
								$jsonData .= '"courseName": "'.$data[0]['departments'][$j]['courses'][$k]['courseName'].'",'; 
								$jsonData .= '"usingCanvas": "'.$data[0]['departments'][$j]['courses'][$k]['usingCanvas'].'",';
							  		

							  		// Check Syllabus
							  		$syllabusDetails = getCourseSyllabus($courseID, $tokenHeader);
									$syllabusDecoded = json_decode($syllabusDetails, true);
									$syllabusBody = $syllabusDecoded['syllabus_body'];
									if(strlen($syllabusBody) > 0) {
										$jsonData .= '"hasSyllabus": "true",';
										if (strpos($syllabusBody,'template-wrapper') !== false) {
										    $jsonData .= '"syllabusTool": "true",';
										} else {
										    $jsonData .= '"syllabusTool": "false",';
										}	
									} else {
										$jsonData .= '"hasSyllabus": "false", "syllabusTool": "false",';	
									}
							  		

							  		// Get Teacher(s)
								  	$courseInstructor = getTeacher($courseID, $tokenHeader);
								  	// var_dump($courseInstructor);
								  	$instructorCount = count($courseInstructor);
							  		$jsonData .= '"instructors": [';
									  	if($instructorCount>1){
											echo '<li>'.$courseID.' - >1 ('.strlen($syllabusBody).')</li>';
									  		
										  	for($instructor=0; $instructor<$instructorCount; $instructor++){
										  		$instructorName = str_replace('"', '&quot;', $courseInstructor[$instructor]['name']);
										  		$jsonData .= '{"instructorName": "'.$instructorName.'"},';
										  	}
										} else if($instructorCount == 0){
											echo '<li>'.$courseID.' - No Instructors ('.strlen($syllabusBody).')</li>';
									  	} else {
									  		if(isset($courseInstructor[0]['name'])){
									  			$instructorIcon = "icon-user";
									  			$instructorName = str_replace('"', '&quot;', $courseInstructor[0]['name']);
										  		$jsonData .= '{"instructorName": "'.$instructorName.'"},';
									  		}
											echo '<li>'.$courseID.' - 1 ('.$instructorName.') ('.strlen($syllabusBody).')</li>';
									  	}
										$jsonData = rtrim($jsonData, ",");
									$jsonData .= "]";



									$jsonData .= "},";
								// } else {
								// 	echo '<li>'.$courseID.' - No Student Enrollments</li>';
								// }

							}
							$jsonData = rtrim($jsonData, ",");
							$jsonData .= "]},";
						}
						$jsonData = rtrim($jsonData, ",");
						$jsonData .= "]},";
						
						echo '</ol>';
						$jsonData = rtrim($jsonData, ",").']';
						// echo $jsonData;
						// var_dump($data);

						// create json file pointer 
						$fp = @fopen('json/'.$_GET['term'].'_details_'.$indexNum.'.json', 'w') or die('Could not open file, or file does not exist and failed to create.'); 
					
						// write text to file 
						@fwrite($fp, $jsonData) or die('Could not write to file.'); 

						// close file 
						@fclose($fp);
						unlink('json/'.$_GET['term'].'_enrollments_'.$indexNum.'.json');
					?>
			</div>
		</div>
	</div>
	<div id="syllabusTest">Done</div>
</body>
</html>