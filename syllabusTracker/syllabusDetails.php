<?php

// Copyright © 2014, Utah State University’s Center for Innovative Design & Instruction (CIDI) http://cidi.usu.edu
// All rights reserved.
 
// Redistribution and use in source and binary forms, with or without modification, are permitted provided that 
// the following conditions are met:
 
// 1.  Redistributions of source code must retain the above copyright notice, this list of conditions and the 
// 	following disclaimer.
// 2.  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and 
// 	the following disclaimer in the documentation and/or other materials provided with the distribution.
// 3.  Neither the name of the owner nor the names of its contributors may be used to endorse or promote products 
// derived from this software without specific prior written permission.
 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
// IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF 
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	include 'reportData/syllabusAPI.php';
	$courseID = $_GET['courseID']; // COMD SubAccount 440

	// Get Course info
	$syllabusDetails = getCourseSyllabus($courseID, $tokenHeader);
	$workingList = json_decode($syllabusDetails, true);
	$courseName = $workingList['name'];

	?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Language" content="en">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title><? echo $courseName ?> Syllabus</title>
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="resources/font-awesome/css/font-awesome.min.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<style>
		body {
			padding: 0;
			margin: 0;
			background: #E4E4E4;
		}
		.heading { 
			background: #003366; 
			color: #fff; 
			box-shadow: 0px 2px 2px #9C9C9C; 
			position: fixed;
			top: 10px;
			width: 100%;
		}
		.heading a {
			color: #fff;
			text-decoration: underline;
		}
		.heading a:hover {
			text-decoration: none;
		}
		h1 { margin: 0; text-shadow: 0px 2px 2px #000; text-align: center; font-size: 25px;}
		.syllabusWrap {
			max-width: 800px;
			margin: 70px auto 50px;
			padding: 20px;
			box-shadow: 2px 2px 5px #000;
			background: #fff;
		}
		.syllabus {
			padding: 20px;
		}
		@media print{
			.heading {position: relative;}
			h1 {font-size: 20px; margin: 0; padding: 0;}
			.syllabusWrap {
				max-width: 100%;
				margin: 0 auto;
				padding: 0 10px;
				border-left: none;
				border-right: none;
				box-shadow: none;
				background: #fff;
			}
		}
	</style>
</head>
<body>
	<div class="heading">
		<h1><?php echo '<a href="'.$GLOBALS['canvasURL'].'/courses/'.$courseID.'" target="_blank" title="Go To Course">'.$courseName.'</a>' ?> Syllabus</h1>
	</div>
	<div class="syllabusWrap">
		<div class="syllabus">
			<?php
				$syllabusDetails = getCourseSyllabus($courseID, $tokenHeader);
				$workingList = json_decode($syllabusDetails, true);
				$syllabusBody = $workingList['syllabus_body'];
				echo($syllabusBody);
			?>
		</div>
	</div>
</body>
</html>