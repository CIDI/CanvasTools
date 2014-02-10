
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

	// include '../resources/canvasAPI.php';
	// $accountID = $_GET['accountID']; // COMD SubAccount 440

	// Get Account Info
	// $accountInfo = getAccountInfo($accountID, $tokenHeader, $canvasURL);
	// // var_dump($accountInfo);
	// $accountInfoDetails = json_decode($accountInfo, true);
	// $accountName = $accountInfoDetails['name'];

	?>
<!DOCTYPE html>
<head>
	<meta charset="UTF-8" />
	<meta name="google" content="notranslate">
	<meta http-equiv="Content-Language" content="en" />
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>USU Syllabus Tracker</title>
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="resources/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="css/syllabus.css">
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script type="text/javascript" src="resources/bootstrap/js/bootstrap.js"></script>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="js/syllabus.js"></script>
</head>
<body>
	<div class="heading">
		<div class="container-fluid">
			<div class="key pull-right">
				<i class="icon-remove-sign"></i> Not Using Canvas<br>
				<i class="icon-ok-sign"></i> Syllabus in Canvas<br>
				<i class="icon-question-sign"></i> No Syllabus in Canvas<br>
				<i class="icon-share-alt"></i> Link to Canvas Course<br>
				<i class="icon-user"></i> Course Instructor or <i class="icon-group" style="margin-left:10px;"></i> Instructors<br> 
				<i class="icon-magic"></i> Used USU Custom Syllabus Tool
			</div>
			<h1><i class="icon-compass"></i> USU Canvas Course Syllabus Tracker</h1>
		</div>
	</div>
	<div class="container-fluid">
		<div class="row-fluid">
			<p class="lead">This tool will display all courses within Canvas that have student enrollments.</p>
			<div class="well">
				<select name="college" id="college">
					<option value="">Choose a College</option>
					<?php
						$currentList = file_get_contents('reportData/json/collegeList.json');
						$data = json_decode($currentList, true);
						$courseCount = count($data);

						foreach($data as $key=>$collegeData){
							echo '<option value="'.$key.'">'.$collegeData['collegeName'].'</option>';
						}
					?>
					<option value="all">All Colleges</option>
				</select>

				<select name="term" id="term">
					<?php
						// Determine current term
							$currYear = date("Y");
							$subtractYear = mktime(0,0,0,date("m"),date("d"),date("Y")-1);
							$prevYear = date("Y", $subtractYear);
							$term = "";
							$month = date("m");
							$semester = "";
							// Spring Semester
							if (($month >= "01" && $month <= "03") || $month == "12"){
								echo '<option value="'.$currYear.'20">Spring '.$currYear.'</option>';
								echo '<option value="'.$prevYear.'40">Fall '.$prevYear.'</option>';
								echo '<option value="'.$prevYear.'30">Summer '.$prevYear.'</option>';
								echo '<option value="'.$prevYear.'20">Spring '.$prevYear.'</option>';
							// Summer Semester
							} else if ($month >= "04" && $month <= "06"){
								echo '<option value="'.$currYear.'30">Summer '.$currYear.'</option>';
								echo '<option value="'.$currYear.'20">Spring '.$currYear.'</option>';
								echo '<option value="'.$prevYear.'40">Fall '.$prevYear.'</option>';
								echo '<option value="'.$prevYear.'30">Summer '.$prevYear.'</option>';
							// Fall Semester
							} else if ($month >= "07" && $month <= "11"){
								echo '<option value="'.$currYear.'40">Fall '.$currYear.'</option>';
								echo '<option value="'.$currYear.'30">Summer '.$currYear.'</option>';
								echo '<option value="'.$currYear.'20">Spring '.$currYear.'</option>';
								echo '<option value="'.$prevYear.'40">Fall '.$prevYear.'</option>';
							}
					?>
				</select>
				<a href="#myModal" role="button" class="btn btn-mini pull-right updateData" data-toggle="modal"><i class="icon-refresh"></i> Update Data</a>
				<a href="#" class="retrieveCourses btn btn-inverse" style="display:none;">Retrieve Courses</a>
				<a href="#" class="retrieveAllCourses btn btn-inverse" style="display:none;">Retrieve All Courses</a>
				<span id="termInfo"></span>
				<div class="filters" style="display:none;">
					<div class="btn-group">
						<button type="button" class="btn btn-default btn-small dropdown-toggle departmentDropdown" data-toggle="dropdown">
							Department <span class="caret"></span>
						</button>
						<ul class="dropdown-menu departmentList">
						</ul>
					</div>
					<div class="btn-group">
						<button type="button" class="btn btn-default btn-small dropdown-toggle campusDropdown" data-toggle="dropdown">
							Campus Code <span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
							<li class="campusSelect" id="CC-0" rel=".CC-0"><a href="#">0 - Logan Campus</a></li>
							<li class="campusSelect" id="CC-A" rel=".CC-A"><a href="#">A - San Juan / Blanding</a></li>
							<li class="campusSelect" id="CC-B" rel=".CC-B"><a href="#">B - Brigham City</a></li>
							<li class="campusSelect" id="CC-C" rel=".CC-C"><a href="#">C - South West (Ephraim)</a></li>
							<li class="campusSelect" id="CC-E" rel=".CC-E"><a href="#">E - Moab</a></li>
							<li class="campusSelect" id="CC-F" rel=".CC-F"><a href="#">F - Monticello Prison</a></li>
							<li class="campusSelect" id="CC-I" rel=".CC-I"><a href="#">I - Independent Study</a></li>
							<li class="campusSelect" id="CC-K" rel=".CC-K"><a href="#">K - Kaysville</a></li>
							<li class="campusSelect" id="CC-L" rel=".CC-L"><a href="#">L - Logan</a></li>
							<li class="campusSelect" id="CC-N" rel=".CC-N"><a href="#">N - North Central (Orem)</a></li>
							<li class="campusSelect" id="CC-P" rel=".CC-P"><a href="#">P - Price</a></li>
							<li class="campusSelect" id="CC-S" rel=".CC-S"><a href="#">S - Salt Lake City</a></li>
							<li class="campusSelect" id="CC-T" rel=".CC-T"><a href="#">T - Toole</a></li>
							<li class="campusSelect" id="CC-U" rel=".CC-U"><a href="#">U - Uintah Basin (Vernal / Roosevelt)</a></li>
							<li class="campusSelect" id="CC-X" rel=".CC-X"><a href="#">X - Special Programs</a></li>
							<li class="campusSelect" id="CC-Y" rel=".CC-Y"><a href="#">Y - China Program</a></li>
							<li class="campusSelect" id="CC-Z" rel=".CC-Z"><a href="#">Z - Out-of-State</a></li>
						</ul>
					</div>
					<div class="btn-group">
						<button type="button" class="btn btn-default btn-small dropdown-toggle deliveryDropdown" data-toggle="dropdown">
							Delivery Method <span class="caret"></span>
						</button>
						<ul class="dropdown-menu">
							<li class="deliverySelect" id="DM-B" rel=".DM-B"><a href="#">B - Broadcast</a></li>
							<li class="deliverySelect" id="DM-O" rel=".DM-O"><a href="#">O - Online</a></li>
							<li class="deliverySelect" id="DM-S" rel=".DM-S"><a href="#">S - Supervised Study</a></li>
							<li class="deliverySelect" id="DM-T" rel=".DM-T"><a href="#">T - Traditional</a></li>
						</ul>
					</div>
					<div class="btn-group">
						<button type="button" class="btn btn-default btn-small dropdown-toggle selectInstructorDropdown" data-toggle="dropdown">
							Instructor <span class="caret"></span>
						</button>
						<ul class="dropdown-menu chooseInstructor">
						</ul>
					</div>
					<div class="btn-group">
						<a class="btn btn-small showAll disabled">Show All</a>
					</div>
				</div>
			</div>
			<div id="count">
				<div class="well" style="float:left;">
					<div id="canvasUse" style="width: 200px; height: 250px; float:left;"></div>
					<div style="width:200px; float:left; margin: 0 20px;">
						<a href="#" class="btn usingCanvasBtn">
							Students Can Access Course<br>
							<span class="badge badge-info"><span class="usingCanvasTotal">0</span> / <span class="grandTotal">0</span></span> 
							<span class="badge badge-info usingCanvasPer">0%</span> 
						</a>
						<a href="#" class="btn notUsingCanvasBtn">
							Not Using Canvas<br>
							<span class="badge"><span class="notUsingCanvasTotal">0</span> / <span class="grandTotal">0</span></span> 
							<span class="badge notUsingCanvasPer">0%</span>
						</a>
					</div>
				</div>
				<div class="well" style="float:right;">
					<div class="wrap" style="width:200px; float:left; margin-right:20px;">
						<a href="#" class="btn hasSyllabusBtn">
							Content in Syllabus Page<br>
							<span class="badge badge-success"><span class="hasSyllabusTotal">0</span> / <span class="usingCanvasTotal">0</span></span> 
							<span class="badge badge-success hasSyllabusPer">0%</span> 
						</a>
						<a href="#" class="btn noSyllabusBtn">
							No Content in Syllabus Page<br>
							<span class="badge badge-important"><span class="noSyllabusTotal">0</span> / <span class="usingCanvasTotal">0</span></span> 
							<span class="badge badge-important noSyllabusPer">0%</span> 
						</a>
					</div>
					<div id="syllabusState" style="width: 200px; height: 250px; float:left; margin-left:20px;"></div>
				</div>
				<div style="clear:both;"></div>
			</div>
			<div id="departmentCourses" class="well"></div>
			<a href="#" class="pull-right">
				<span class="badge badge-inverse"><i class="icon-magic"></i> <span class="usedWizardTotal">0</span> / <span class="grandTotal">0</span></span>
			</a>
			<a href="http://cidi.usu.edu/" target="_blank" title="CIDI Website">
				<img src="/canvas_branding/cidi/images/cidi-logo-small-silver.png" width="250">
			</a>
		</div>
	</div>
	<!-- Modal -->
	<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="myModalLabel">Generate/Update Report Data</h3>
		</div>
		<div class="modal-body">
			<p class="alert">The data gathering process can take up to an hour.</p>
			<p>Choose a term from the dropdown list then click "Begin Process".</p>
			<select name="generateTerm" id="generateTerm">
				<option>Select a Term</option>
				<?php
					// Determine current term
						$currYear = date("Y");
						$subtractYear = mktime(0,0,0,date("m"),date("d"),date("Y")-1);
						$prevYear = date("Y", $subtractYear);
						$term = "";
						$month = date("m");
						$semester = "";
						// Spring Semester
						if (($month >= "01" && $month <= "03") || $month == "12"){
							echo '<option value="'.$currYear.'20">Spring '.$currYear.'</option>';
							echo '<option value="'.$prevYear.'40">Fall '.$prevYear.'</option>';
							echo '<option value="'.$prevYear.'30">Summer '.$prevYear.'</option>';
							echo '<option value="'.$prevYear.'20">Spring '.$prevYear.'</option>';
						// Summer Semester
						} else if ($month >= "04" && $month <= "06"){
							echo '<option value="'.$currYear.'30">Summer '.$currYear.'</option>';
							echo '<option value="'.$currYear.'20">Spring '.$currYear.'</option>';
							echo '<option value="'.$prevYear.'40">Fall '.$prevYear.'</option>';
							echo '<option value="'.$prevYear.'30">Summer '.$prevYear.'</option>';
						// Fall Semester
						} else if ($month >= "07" && $month <= "11"){
							echo '<option value="'.$currYear.'40">Fall '.$currYear.'</option>';
							echo '<option value="'.$currYear.'30">Summer '.$currYear.'</option>';
							echo '<option value="'.$currYear.'20">Spring '.$currYear.'</option>';
							echo '<option value="'.$prevYear.'40">Fall '.$prevYear.'</option>';
						}
				?>
			</select>
			<span id="fileDetails"></span>
			<div id="generateProcess" class="well">
				<p id="step1" class="pending"><i class="icon-circle-blank"></i> Create Course List</p>
				<p id="step2" class="pending"><i class="icon-circle-blank"></i> Gather Course Details</p>
				<div class="progress progress-striped active generateProgress hide">
					<div class="bar" style="width: 0;"></div>
				</div>
			</div>
			<div id="processComplete" class="hide alert alert-success">Process Complete!</div>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
			<button class="btn btn-primary generateData">Begin Process</button>
		</div>
	</div>
</body>
</html>