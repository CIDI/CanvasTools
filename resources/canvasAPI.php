<?php
	// This page contains a variety of Canvas API calls, it is not exhaustive as calls have been added by need
	// Caution: Not all calls have been tested, some were setup but the approach changed before they were fully tested


/********************************************/
/*********  REQUIRED INFORMATION ************/
/********************************************/

	// Root url for all api calls
	$canvasURL = 'https://<your Institution>.instructure.com/api/v1/';
	// This is the header containing the authorization token from Canvas, depending on the features you use, 
		// this will probably need to be an admin token
		// this will probably need to become a variable on individual pages when more programs are developed
		// Ideally this would also be tweaked to act as the user instead of using an admin's token
	$token = "";
	
/********************************************/
/********************************************/


	$tokenHeader = array("Authorization: Bearer ".$token);

	// Display any php errors (for development purposes)
		error_reporting(E_ALL);
		ini_set('display_errors', '1');

	// the following functions run the GET, POST, PUT and DELETE calls
		function curlPost($url, $data, $header) {
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $GLOBALS['canvasURL'].$url);
			curl_setopt ($ch, CURLOPT_HTTPHEADER, $header);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // ask for results to be returned

			// Send to remote and return data to caller.
			$response = curl_exec($ch);
			curl_close($ch);
			return $response;
		}

		function curlGet($url, $header) {
			$ch = curl_init($url);
			curl_setopt ($ch, CURLOPT_URL, $GLOBALS['canvasURL'].$url);
			curl_setopt ($ch, CURLOPT_HTTPHEADER, $header);
			curl_setopt ($ch, CURLOPT_HEADER, false);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // ask for results to be returned

			// Send to remote and return data to caller.
			$response = curl_exec($ch);
			curl_close($ch);
			return $response;
		}

		function curlPut($url, $data, $header){
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $GLOBALS['canvasURL'].$url);
			curl_setopt ($ch, CURLOPT_HTTPHEADER, $header);
			curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // ask for results to be returned

			// Send to remote and return data to caller.
			$response = curl_exec($ch);
		    curl_close($ch);
			return $response;
		}
		
		function curlDelete($url, $header)
		{
		    $ch = curl_init();
		    curl_setopt($ch, CURLOPT_URL, $GLOBALS['canvasURL'].$url);
		    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
			curl_setopt ($ch, CURLOPT_HTTPHEADER, $header);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			
			// Send to remote and return data to caller.
		    $result = curl_exec($ch);
		    curl_close($ch);
		    return $result;
		}


// Canvas API Functions (Please add new functions under the section that best matches)
// Unless otherwise noted, the responses are in JSON format

	// ACCOUNT REPORTS
		function listAvailableReports($accountID, $header){
			$response = curlGet("accounts/".$accountID."/reports?per_page=50", $header);
			return $response;
		}

	// ACCOUNTS
		function getAccountInfo($accountID, $header, $canvasURL){
			$response = curlGet("accounts/".$accountID, $header);
			return $response;
		}
		function listAccountCourses($accountID, $pageNum, $header){
			$response = curlGet("accounts/".$accountID."/courses?per_page=50&page=".$pageNum, $header);
			return $response;
		}
		function listAccountCoursesByTerm($accountID, $termID, $pageNum, $header){
			$response = curlGet("accounts/".$accountID."/courses?per_page=50&include[]=term&enrollment_term_id=".$termID."&page=".$pageNum, $header);
			return $response;
		}
		function listActiveCourses($accountID, $pageNum, $header){
			$response = curlGet("accounts/".$accountID."/courses?published=true&per_page=50&page=".$pageNum, $header);
			return $response;
		}
		function listActiveCoursesByTerm($accountID, $termID, $pageNum, $publishedState, $header){
			$response = curlGet("accounts/".$accountID."/courses?published=".$publishedState."&with_enrollments=true&per_page=50&include[]=term&enrollment_term_id=".$termID."&page=".$pageNum, $header);
			return $response;
		}
		function listAllCoursesByTerm($accountID, $termID, $pageNum, $header){
			$response = curlGet("accounts/".$accountID."/courses?&with_enrollments=true&per_page=50&include[]=term&enrollment_term_id=".$termID."&page=".$pageNum, $header);
			return $response;
		}

	// ADMINS

	// ANALYTICS
		function  userInCourseAssignmentData($courseID, $studentID, $header){
			$response = curlGet("courses/".$courseID."/analytics/users/".$studentID."/assignments", $header);
			return $response;
		}

	// ANNOUNCMENT EXTERNAL FEEDS

	// APPOINTMENT GROUPS

	// ASSIGNMENT GROUPS

	// ASSIGNMENTS
		function listAssignments($courseID, $header){
			$response = curlGet("courses/".$courseID."/assignments?per_page=50", $header);
			return $response;
		}
		function getAssignment($courseID, $assignmentID, $header){
			$response = curlGet("courses/".$courseID."/assignments/".$assignmentID."?per_page=50", $header);
			return $response;
		}
		function copyCourseAssignments($courseCopyFromID, $courseCopyToID, $header){
			$copyCourseURL = "courses/".$courseCopyToID."/course_copy";
			$copyCourseParam = "source_course=".$courseCopyFromID."&only[]=assignments";
			curlPost($copyCourseURL, $copyCourseParam, $header);
		}
		function listAssignmentOverrides($courseID, $assignmentID, $header){
			$response = curlGet("courses/".$courseID."/assignments/".$assignmentID."/overrides", $header);
			return $response;
		}

	// CALENDAR EVENTS

	// COLLABORATIONS

	// COLLECTIONS

	// COMMMESSAGES

	// COMMUNICATION CHANNELS

	// CONTENT MIGRATIONS

	// CONVERSATIONS

	// COURSES
		function getCourse($courseID, $header){
			$apiUrl = "courses/".$courseID."?include[]=term";
			$response = curlGet($apiUrl, $header);
			return $response;
		}
		function getCourseSyllabus($courseID, $header){
			$apiUrl = "courses/".$courseID."?include[]=syllabus_body";
			$response = curlGet($apiUrl, $header);
			return $response;
		}

		function copyCourseContent($courseCopyFromID, $courseCopyToID, $header){
			$copyCourseURL = "courses/".$courseCopyToID."/course_copy";
			$copyCourseParam = "source_course=".$courseCopyFromID;
			curlPost($copyCourseURL, $copyCourseParam, $header);
		}
		function copySelectCourseContent($courseCopyFromID, $courseCopyToID, $additionalParam, $header){
			$copyCourseURL = "courses/".$courseCopyToID."/course_copy";
			$copyCourseParam = "source_course=".$courseCopyFromID.$additionalParam;
			curlPost($copyCourseURL, $copyCourseParam, $header);
		}

		function createNewCourse($accountID, $addCourseParam, $header){
			$addCourseUrl = "accounts/".$accountID."/courses";
			$response = curlPost($addCourseUrl, $addCourseParam, $header);
			$responseData = json_decode($response, true);
			$courseID = $responseData['id'];
			return $courseID;
		}

		function duplicateCourse($courseID, $accountID, $newCourseName, $header){
			// Create a new course
			$addCourseParam = "account_id=".$accountID."&course[name]=".$newCourseName;
			$newCourseID = createNewCourse($accountID, $addCourseParam, $header);

			// Copy the content from the original course
			copyCourseContent($courseID, $newCourseID, $header);
			return $newCourseID;
		}

		function updateCourse($courseID, $courseParams, $header){
			$apiURL = "courses/".$courseID;
			curlPut($apiURL, $courseParams, $header);
		}

		function updateCourses($accountID, $courseParams, $header){
			$apiURL = "accounts/".$accountID."/courses";
			curlPut($apiURL, $courseParams, $header);
			// course_ids[]
				// List of ids of courses to update. At most 500 courses may be updated in one call.
			// event
				// The action to take on each course. Must be one of 'offer', 'conclude', 'delete', or 'undelete'.
				// 'offer' makes a course visible to students. This action is also called "publish" on the web site.
				// 'conclude' prevents future enrollments and makes a course read-only for all participants. The course still appears in prior-enrollment lists.
				// 'delete' completely removes the course from the web site (including course menus and prior-enrollment lists). All enrollments are deleted. Course content may be physically deleted at a future date.
				// 'undelete' attempts to recover a course that has been deleted. (Recovery is not guaranteed; please conclude rather than delete a course if there is any possibility the course will be used again.) The recovered course will be unpublished. Deleted enrollments will not be recovered.
		}

		function getTeacher($courseID, $header){
			$getTeacherUrl = "courses/".$courseID."/users/?enrollment_type=teacher";
			$response = curlGet($getTeacherUrl, $header);
			$responseData = json_decode($response, true);
			return $responseData;
		}

		function getStudents($courseID, $header){
			$getStudentUrl = "courses/".$courseID."/users/?enrollment_type=student";
			$response = curlGet($getStudentUrl, $header);
			return $response;
		}
		function getStudentsPaged($courseID, $header, $pageNum){
			$getStudentUrl = "courses/".$courseID."/users/?enrollment_type=student&per_page=50&page=".$pageNum;
			$response = curlGet($getStudentUrl, $header);
			return $response;
		}

	// DISCUSSION TOPICS
		function getDiscussionTopics($courseID, $header, $pageNum){
			$apiUrl = "courses/".$courseID."/discussion_topics?per_page=5&page=".$pageNum;
			$response = curlGet($apiUrl, $header);
			return $response;
		}

	// ENROLLMENTS
		function enrollUser($userID, $courseID, $enrollmentType, $header){
			$enrollUserUrl = "courses/".$courseID."/enrollments";
			$enrollUserParam = "enrollment[user_id]=".$userID."&enrollment[type]=".$enrollmentType."&enrollment[enrollment_state]=active";
			curlPost($enrollUserUrl, $enrollUserParam, $header);
		}

		function listUserEnrollments($userID, $header, $pageNum){
			$response = curlGet("users/".$userID."/enrollments?per_page=50&page=".$pageNum, $header);
			return $response;
		}

		function listCourseEnrollments($courseID, $header){
			$response = curlGet("courses/".$courseID."/enrollments", $header);
			return $response;
		}

		function listSectionStudentEnrollments($sectionID, $header, $pageNum){
			$response = curlGet("sections/".$sectionID."/enrollments/?type=StudentEnrollment&per_page=50&page=".$pageNum, $header);
			return $response;
		}

		function listStudentEnrollments($courseID, $header){
			$response = curlGet("courses/".$courseID."/enrollments/?type=StudentEnrollment&include[]=email", $header);
			return $response;
		}

		function listCourseStudentEnrollmentsPaged($courseID, $header, $pageNum){
			$response = curlGet("courses/".$courseID."/enrollments?per_page=15&type=StudentEnrollment&page=".$pageNum, $header);
			return $response;
		}

		function concludeEnrollment($courseID, $enrollmentID, $header){
			$response = curlDelete("courses/".$courseID."/enrollments/".$enrollmentID, $header);
			return $response;
		}

		function deleteEnrollment($courseID, $enrollmentID, $header){
			$response = curlDelete("courses/".$courseID."/enrollments/".$enrollmentID."/?task=delete", $header);
			return $response;
		}

	// EXTERNAL TOOLS 
		function addToolFromXML($courseID, $toolParams, $header){
			$apiURL = "courses/".$courseID."/external_tools";
			$response = curlPost($apiURL, $toolParams, $header);
			return $response;
			// name=&consumer_key=&shared_secret=&config_type=by_url&config_url=
		}
	// FAVORITES 

	// FILES 
		function listFiles($folderID, $header){
			$response = curlGet("folders/".$folderID."/files?per_page=50", $header);
			return $response;
		}

		function listFolders($folderID, $header){
			$response = curlGet("folders/".$folderID."/folders?per_page=50", $header);
			return $response;
		}

		// Get the id for the root folder in a course
		function getRootFolderID($courseID, $header){
			$response = curlGet("courses/".$courseID."/folders/root", $header);
			$responseData = json_decode($response, true);
			$rootID = $responseData['id'];
			return $rootID;
		}

		function deleteFolder($folderID, $header, $force){
			if($force == true){
				$response = curlDelete("folders/".$folderID."?force=true", $header);
			} else {
				$response = curlDelete("folders/".$folderID, $header);
			}
			return $response;
		}

		function deleteFile($fileID, $header){
			$response = curlDelete("files/".$fileID, $header);
			return $response;
		}

	// GRADEBOOK HISTORY 

	// GROUP CATEGORIES 

	// GROUPS 

	// LOGINS 

	// MODULES 
		function listModules($courseID, $header){
			$response = curlGet("courses/".$courseID."/modules?per_page=15", $header);
			return $response;
		}

		// This function is for more than 50 modules
		function listMoreModules($courseID, $pageNum, $header){
			$response = curlGet("courses/".$courseID."/modules?per_page=50&page=".$pageNum, $header);
			return $response;
		}

		function listModuleItems($courseID, $moduleID, $header){
		  	$response = curlGet("https://usu.instructure.com//api/v1/courses/".$courseID."/modules/".$moduleID."/items", $header);
			return $response;
		}

		function createModule($courseID, $moduleParams, $header){
			$createModuleUrl = "courses/".$courseID."/modules";
			$response = curlPost($createModuleUrl, $moduleParams, $header);
			$responseData = json_decode($response, true);
			$moduleID = $responseData['id'];
			return $moduleID;
		}

		function deleteModule($courseID, $moduleID, $header){
			$response = curlDelete("courses/".$courseID."/modules/".$moduleID, $header);
			return $response;
		}

		function showModule($courseID, $moduleID, $header){
		  	$response = curlGet("courses/".$courseID."/modules/".$moduleID, $header);
			return $response;
		}

		function createModuleItem($courseID, $moduleID, $itemParams, $header){
			$createModuleUrl = "courses/".$courseID."/modules/".$moduleID."/items";
			$response = curlPost($createModuleUrl, $itemParams, $header);
			return $response;
		}

		function deleteModuleItem($courseID, $moduleID, $itemID, $header){
			$response = curlDelete("courses/".$courseID."/modules/".$moduleID."/items/".$itemID, $header);
			return $response;
		}

		function updateModule($courseID, $moduleID, $moduleParams, $header){
			$apiUrl = "courses/".$courseID."/modules/".$moduleID;
			$response = curlPost($apiUrl, $moduleParams, $header);
			return $response;
		}

		function renameModule($courseID, $moduleID, $newName, $header){
			$apiUrl = "courses/".$courseID."/modules/".$moduleID;
			$moduleParams = "module[name]=".urlencode($newName);
			$response = curlPut($apiUrl, $moduleParams, $header);
			return $response;
		}

	// OUTCOME GROUPS

	// OUTCOMES 

	// PAGES 
		function getPageFromCourse($courseID, $page_url, $header){
			$apiUrl = "courses/".$courseID."/pages/".$page_url;
			$response = curlGet($apiUrl, $header);
			return $response;
		}

		function getCoursePages($courseID, $header){
			$apiUrl = "courses/".$courseID."/pages?per_page=50";
			$response = curlGet($apiUrl, $header);
			return $response;
		}

		function copyPageFromCourse($fromCourseID, $toCourseID, $page_url, $header){
			// Get the original page information
			$originalPage = getPageFromCourse($fromCourseID, $page_url, $header);

			// Output that information into the parameters for a new page
			$pageParams = "";
			$originalPageDetails = json_decode($originalPage,true);

				// Although these are not all of the parameters returned, these are all that are used to create a page

				// the title of the page
				// title: "My Page Title",
				$title = $originalPageDetails['title'];
				$pageParams .= "wiki_page[title]=".urlencode($title);
				
				// whether this page is hidden from students
				// (note: students will never see this true; pages hidden from them will be omitted from results)
				// hide_from_students: false,
				$hide_from_students = $originalPageDetails['hide_from_students'];
				$pageParams .= "&wiki_page[hide_from_students]=".urlencode($hide_from_students);

				// the page content, in HTML
				// (present when requesting a single page; omitted when listing pages)
				// body: "<p>Page Content</p>",
				$body = $originalPageDetails['body'];
				$pageParams .= "&wiki_page[body]=".urlencode($body);

				// whether the page is published
				// published: true,
				$published = $originalPageDetails['published'];
				$pageParams .= "&wiki_page[published]=".urlencode($published);

				// whether this page is the front page for the wiki
				// front_page: false,
				$front_page = $originalPageDetails['front_page'];
				// $front_pageParam = "&wiki_page[front_page]=".urlencode($front_page);
				$pageParams .= "&wiki_page[front_page]=false";

			echo "<div class='well'><h4>pageParams</h4>".$pageParams."</div>";

			// Create the page
			$apiUrl = "courses/".$toCourseID."/pages";
			$response = curlPost($apiUrl, $pageParams, $header);
		}

		function createPage($courseID, $pageParams, $header){
			$apiUrl = "courses/".$courseID."/pages";
			$response = curlPost($apiUrl, $pageParams, $header);
			return $response;
		}

		function getPageBody($courseID, $page_url, $header){
			$page = getPageFromCourse($courseID, $page_url, $header);

			// Decode the JSON so we can do something with it
			$pageDetails = json_decode($page,true);

			// Get just the body contents and return it to the calling function
			$body = $pageDetails['body'];
			$bodyContent = urlencode($body);
			return $body;
		}

		function deleteFrontPage($courseID, $header){
			$response = curlDelete("courses/".$courseID."/front_page", $header);
			return $response;
		}

		function deletePage($courseID, $page_url, $header){
			$response = curlDelete("courses/".$courseID."/pages/".$page_url, $header);
			return $response;
		}

	// PROGRESS 

	// QUIZ
		function getQuiz($courseID, $quizID, $header){
		  	$response = curlGet("courses/".$courseID."/quizzes/".$quizID, $header);
			return $response;
		} 

		function createQuiz($courseID, $quizParams, $header){
			$apiUrl = "courses/".$courseID."/quizzes";
			$response = curlPost($apiUrl, $quizParams, $header);
			return $response;
		}

		function deleteQuiz($courseID, $quizID, $header){
			$response = curlDelete("courses/".$courseID."/quizzes/".$quizID, $header);
			return $response;
		}

	// ROLES 

	// SIS IMPORTS 

	// SECTIONS 
		function listCourseSections($courseID, $header){
			$response = curlGet("courses/".$courseID."/sections?per_page=50", $header);
			return $response;
		}

	// SERVICES 

	// SUBMISSIONS 

	// TERM
		// These may need fine tuning for a range of days in the months
		function currentTermID(){
			$year = date("Y");
			$term = "";
			$month = date("m");
			// Spring Semester
			$springArray = array("01", "02", "03", "04");
			$summerArray = array("05", "06", "07");
			$fallArray = array("08","09","10","11","12");
			if (in_array($month, $springArray)){
				$term = "20";
			} else if (in_array($month, $summerArray)){
				$term = "30";
			} else if (in_array($month, $fallArray)){
				$term = "40";
			}
			$termID = "sis_term_id:".$year.$term;
			return $termID;
		}

		function nextTermID(){
			$year = date("Y");
			$term = "";
			$month = date("m");
			$springArray = array("01", "02", "03", "04");
			$summerArray = array("05", "06", "07");
			$fallArray = array("08","09","10","11","12");
			if (in_array($month, $springArray)){
				$term = "30";
			} else if (in_array($month, $summerArray)){
				$term = "40";
			} else if (in_array($month, $fallArray)){
				$term = "20";
				$addYear = mktime(0,0,0,date("m"),date("d"),date("Y")+1);
				$year = date("Y", $addYear);
			}
			$termID = "sis_term_id:".$year.$term;
			return $termID;
		}

	// TABS 

	// USERS 
		function listUsers($courseID, $params, $header){
			$response = curlGet("courses/".$courseID."/users/".$params, $header);
			return $response;
		}
		function getUserProfile($userID, $header){
			$response = curlGet("users/".$userID."/profile", $header);
			return $response;
		}
?>