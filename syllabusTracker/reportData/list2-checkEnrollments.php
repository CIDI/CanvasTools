<?php
	// This page will loop through the courses and check their enrollments


	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	include '../../resources/canvasAPI_test.php';
	?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Language" content="en">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>Enrollment JSON</title>
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
				<!-- <ol id="courseList"> -->
					<?php 
						$indexNum = $_GET['indexNum'];
						$jsonData = "[";
						echo '<ol>';

						$currentList = file_get_contents('json/'.$_GET['term'].'.json');
						$data = json_decode($currentList, true);
						$courseCount = count($data);
						// for ($i=0; $i<count($data); $i++){
							$college = $data[$indexNum]['collegeName'];
							// var_dump($data[$indexNum]);
							$jsonData .= "{";
							$jsonData .= '"collegeName": "'.$college.'",';
							$jsonData .= '"departments": [';
							$departmentCount = count($data[$indexNum]['departments']);
							for ($j=0; $j<$departmentCount; $j++){
								$jsonData .= '{"deptName": "'.$data[$indexNum]['departments'][$j]['deptName'].'",';
								$courseCount = count($data[$indexNum]['departments'][$j]['courses']);
								$jsonData .= '"courses": [';
								for ($k=0; $k<$courseCount; $k++){
									$courseID = $data[$indexNum]['departments'][$j]['courses'][$k]['courseID'];
									$studentEnrollments = hasStudents($courseID, $tokenHeader);
								  	if($studentEnrollments == true){
										$jsonData .= "{";
										$jsonData .= '"courseID": "'.$courseID.'",'; 
										$jsonData .= '"courseName": "'.$data[$indexNum]['departments'][$j]['courses'][$k]['courseName'].'",'; 
										$jsonData .= '"campusCode": "'.$data[$indexNum]['departments'][$j]['courses'][$k]['campusCode'].'",'; 
										$jsonData .= '"deliveryMethod": "'.$data[$indexNum]['departments'][$j]['courses'][$k]['deliveryMethod'].'",'; 
										$jsonData .= '"usingCanvas": "'.$data[$indexNum]['departments'][$j]['courses'][$k]['usingCanvas'].'"';
										$jsonData .= "},";
									} else {
										echo '<li>'.$courseID.' - No Student Enrollments</li>';
									}

								}
								$jsonData = rtrim($jsonData, ",");
								$jsonData .= "]},";
							}
							$jsonData = rtrim($jsonData, ",");
							$jsonData .= "]},";
							// $studentEnrollments = hasStudents($courseID, $tokenHeader);
						 //  	if($studentEnrollments == true){
							// 	// $GLOBALS['jsonData'] .=' {"courseID": "'.$courseID.'", "courseName": "'.$courseName.'", "campusCode": "CC-'.$campusCode.'", "deliveryMethod": "DM-'.$deliveryMethod.'",  "usingCanvas": "'.$usingCanvas.'"},';
							// }
						// }
						echo '</ol>';
						$jsonData = rtrim($jsonData, ",").']';
						// echo $jsonData;
						// var_dump($data);

						// create json file pointer 
						$fp = @fopen('json/'.$_GET['term'].'_enrollments_'.$indexNum.'.json', 'w') or die('Could not open file, or file does not exist and failed to create.'); 
					
						// write text to file 
						@fwrite($fp, $jsonData) or die('Could not write to file.'); 

						// close file 
						@fclose($fp);
					?>
			</div>
		</div>
	</div>
	<div id="syllabusTest">Done</div>
</body>
</html>