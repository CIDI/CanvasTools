<?php
	// This page contains the Canvas API calls necessary to run the USU Canvas Course Syllabus Tracker
	// created by Kenneth Larsen for the Center for Innovative Design and Instruction at Utah State University

	include __DIR__.'/../variableSetup.php';
	$tokenHeader = array("Authorization: Bearer ".$token);

	// Display any php errors (for development purposes)
		error_reporting(E_ALL);
		ini_set('display_errors', '1');

		function curlGet($url, $header) {
			$ch = curl_init($url);
			curl_setopt ($ch, CURLOPT_URL, $GLOBALS['canvasURL'].'/api/v1/'.$url);
			curl_setopt ($ch, CURLOPT_HTTPHEADER, $header);
			curl_setopt ($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // ask for results to be returned

			// Send to remote and return data to caller.
			$response = curl_exec($ch);
			curl_close($ch);
			return $response;
		}
		
		function getCourseSyllabus($courseID, $header){
			$apiUrl = "courses/".$courseID."?include[]=syllabus_body";
			$response = curlGet($apiUrl, $header);
			return $response;
		}
		function getTeacher($courseID, $header){
			$getTeacherUrl = "courses/".$courseID."/users/?enrollment_type=teacher";
			$response = curlGet($getTeacherUrl, $header);
			$responseData = json_decode($response, true);
			return $responseData;
		}
		function hasStudents($courseID, $header){
			$response = curlGet("courses/".$courseID."/enrollments/?type=StudentEnrollment&per_page=1", $header);
			$checkEnrollmentList = json_decode($response);
		  	$studentCount = count($checkEnrollmentList);
		  	if($studentCount>0){
		  		$hasStudents = true;
		  	} else {
		  		$hasStudents = false;
		  	}
			return $hasStudents;
		}
		function listSubAccounts($accountID, $pageNum, $header){
			$response = curlGet("accounts/".$accountID."/sub_accounts?per_page=50&page=".$pageNum, $header);
			return $response;
		}
		function listUserAccounts($header){
			// List accounts that the current user can view or manage. 
			// Typically, students and even teachers will get an empty list in response, 
			// only account admins can view the accounts that they are in.
			$response = curlGet("accounts/", $header);
			return $response;
		}
		function listAccountCourses($accountID, $additionalParams, $pageNum, $header){
			$response = curlGet("accounts/".$accountID."/courses?per_page=50&page=".$pageNum."&".$additionalParams, $header);
			return $response;
		}
