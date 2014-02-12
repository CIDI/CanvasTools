<?php
	// This page contains a variety of functions that can be used to access the Canvas API
	// // Get the POST information and turn it into variables for future use
	// 	if ($_POST["lis_person_name_full"] != ""){
	// 		$_SESSION['lis_person_name_full'] = $_POST["lis_person_name_full"];
	// 		$_SESSION['custom_canvas_user_id'] = $_POST["custom_canvas_user_id"];
	// 		$_SESSION['lis_outcome_service_url'] = $_POST["lis_outcome_service_url"];
	// 		$_SESSION['lis_result_sourcedid'] = $_POST["lis_result_sourcedid"];
	// 		$_SESSION['oauth_consumer_key'] = $_POST["oauth_consumer_key"];
	// 		$_SESSION['custom_canvas_course_id'] = $_POST["custom_canvas_course_id"];
	// 	}

	// 	$userFullName = $_SESSION["lis_person_name_full"];
	// 	$userID = $_SESSION["custom_canvas_user_id"];
	// 	$currentCourseID = $_SESSION['custom_canvas_course_id'];
	// 	$lis_outcome_service_url = $_SESSION["lis_outcome_service_url"];
	// 	$lis_result_sourcedid = $_SESSION['lis_result_sourcedid'];
	// 	$oauth_consumer_key = $_SESSION["oauth_consumer_key"];
	// 	$oauth_consumer_secret = "";

	// 	var_dump($_POST);

	// This is the header containing the authorization token from Canvas
		// this will probably need to become a variable on individual pages when more programs are developed
		include __DIR__.'/../variableSetup.php';
		$tokenHeader = array("Authorization: Bearer ".$token);

	// Display any php errors (for development purposes)
		error_reporting(E_ALL);
		ini_set('display_errors', '1');


	// the following functions run the GET and POST calls

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
		function curlPost($url, $data, $header) {
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $GLOBALS['canvasURL'].'/api/v1/'.$url);
			curl_setopt ($ch, CURLOPT_HTTPHEADER, $header);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // ask for results to be returned

			// Send to remote and return data to caller.
			$response = curl_exec($ch);
			curl_close($ch);
			return $response;
		}

	// Canvas API Calls
		function createGenericAssignment($courseID, $assignmentParams, $header){
			$createAssignmentURL = "courses/".$courseID."/assignments";
			$response = curlPost($createAssignmentURL, $assignmentParams, $header);
			$responseData = json_decode($response, true);
			$assignmentID = $responseData['id'];
			// Returns new assignment ID
			return $assignmentID;

		}
		function createGenericDiscussion($courseID, $discussionParams, $header){
			$createDiscussionURL = "courses/".$courseID."/discussion_topics";
			$response = curlPost($createDiscussionURL, $discussionParams, $header);
			$responseData = json_decode($response, true);
			$discussionID = $responseData['id'];
			// Returns new discussion ID
			return $discussionID;
		}
		function createGenericQuiz($courseID, $quizParams, $header){
			$createQuizURL = "courses/".$courseID."/quizzes";
			$response = curlPost($createQuizURL, $quizParams, $header);
			$responseData = json_decode($response, true);
			$quizID = $responseData['id'];
			// Returns new quiz ID
			return $quizID;
		}
		function createModule($courseID, $moduleParams, $header){
			$createModuleUrl = "courses/".$courseID."/modules";
			$response = curlPost($createModuleUrl, $moduleParams, $header);
			$responseData = json_decode($response, true);
			$moduleID = $responseData['id'];
			// Returns new module ID
			return $moduleID;
		}
		function createModuleItem($courseID, $moduleID, $itemParams, $header){
			$createModuleUrl = "courses/".$courseID."/modules/".$moduleID."/items";
			$response = curlPost($createModuleUrl, $itemParams, $header);
			return $response;
		}
		function createPage($courseID, $pageParams, $header){
			$apiUrl = "courses/".$courseID."/pages";
			$response = curlPost($apiUrl, $pageParams, $header);
			return $response;
		}
		function getPageBody($courseID, $page_url, $header){
			// Get the response
			$page = getPageFromCourse($courseID, $page_url, $header);
			// Decode the JSON so we can do something with it
			$pageDetails = json_decode($page,true);
			// Get just the body contents and return it to the calling function
			$body = $pageDetails['body'];
			$bodyContent = urlencode($body);
			// Returns body string
			return $body;
		}
		function getPageFromCourse($courseID, $page_url, $header){
			$apiUrl = "courses/".$courseID."/pages/".$page_url;
			$response = curlGet($apiUrl, $header);
			return $response;
		}
		function uploadFrontPageBanner($courseID, $header){
			$apiUrl = "courses/".$courseID."/files";
			$apiParams = "name=homePageBanner.jpg&content_type=image/jpeg&parent_folder_path=/global/css/images&url=".$GLOBALS['templateWizardURL']."/resources/images/".$courseID."_cropped.jpg&on_duplicate=overwrite";
			$response = curlPost($apiUrl, $apiParams, $header);
			return $response;
		}
?>