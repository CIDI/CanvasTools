<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);
?>
<!DOCTYPE html>
<head>
	<meta charset="UTF-8" />
	<meta name="google" content="notranslate">
	<meta http-equiv="Content-Language" content="en" />
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>USU Syllabus Tracker</title>
	<link rel="stylesheet" href="/canvasCustomTools/resources/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="/canvasCustomTools/resources/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="/canvasCustomTools/resources/font-awesome/css/font-awesome.min.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" src="/canvasCustomTools/resources/bootstrap/js/bootstrap.js"></script>
	<style>
	.btn.active { background: #0081c2; color: #fff; text-shadow: none; }
	.btn.activeToggle { background: #0081c2; color: #fff; text-shadow: none; }
		.badge { margin: 0 2px 0 40px; }
		#count { list-style-type: none;}
		#count li { float: right; min-height: 25px;}
		.department { background: #fff; }
		#departmentCourses { min-height: 100px; margin-top: 5px; clear: both; }
		h1 { margin: 40px 0 30px 10px; text-shadow: 0px 2px 2px #000; }
		h2 { background: #003366; color: #fff; box-shadow: 0px 2px 2px #9C9C9C; border-radius: 5px; padding: 10px; }
		.hasContent .icon-ok-sign{ color: #468847; margin-right: 5px; }
		.heading { background: #003366; color: #fff; margin-bottom: 20px; box-shadow: 0px 2px 2px #9C9C9C; }
		.key { margin-top: 14px; font-size: 12px; }
		.key i { font-size: 14px; margin-right: 5px; }
		.noContent .icon-question-sign{ color: #b94a48; margin-right: 5px; }
		ol { list-style-type: none; column-count: 4; -moz-column-count: 4; -webkit-column-count: 4; }
		select, .btn { margin-bottom: 5px; }
		select {width:auto;}
		.topLink { float: right; font-size: 16px; color: #fff; margin-right: 10px; }
		@media screen and (max-width: 1000px) { 
			ol { column-count: 3; -moz-column-count: 3; -webkit-column-count: 3; }
		}
		@media screen and (max-width: 800px) { 
			ol { column-count: 2; -moz-column-count: 2; -webkit-column-count: 2; }
		}
		@media (max-width: 767px){
			body { padding-right: 0; padding-left: 0; }
			.container-fluid { padding-left: 20px; padding-right: 20px; }
		}
		@media screen and (max-width: 500px) { 
			ol { column-count: 1; -moz-column-count: 1; -webkit-column-count: 1; }
		}
	</style>
		<script>
		$(function() {

			// Create an array for each college, containing the departments and department sub-account id's
			// The arrays were created due to sub-accounts that we didn't want included
			// example (repeat for each college)
			var College1 = [
			      "Department1 | 123",
			      "Department2 | 456",
			      "Department3 | 789"
			];

			// The following will use ajax to retrieve the course list from "departmentCourses.php"
			$(".retrieveCourses").click(function (e){
				e.preventDefault();
				// Provide visual feedback that something is happening
				$(this).html('<i class="icon-spinner icon-spin icon-large"></i> Gathering Data').addClass("disabled");
				var accountID = "";
				// If they have selected a department, use that accountID, if not use the college accountID
				if($("#department").attr("value") == ""){
					accountID = $("#college").attr("value");
				} else {
					accountID = $("#department").attr("value");
				}
				// Grab the published state and the selected term
				var publishedState = $("#publishedState").attr("value");
				var term = $("#term").attr("value");
				// Grab the course list from "departmentCourses.php"
				$('#departmentCourses').load('departmentCourses.php?term='+term+'&accountID='+accountID+'&publishedState='+publishedState+' #courseList', function(){
					// If the courses are published, check for a syllabus
					if($("#publishedState").attr("value") == "true"){
						$("#courseTotalText").text("Published Courses");
						$(".forPublished").show();
						// Loop through each course and add a hidden container to hold the syllabus body (strange I know but it works)
						$(".course").each(function(){
							myUrl = $(this).attr("href");
							myCourseID = $(this).attr("rel");
							$("body").append('<div id="'+myCourseID+'Contents" class="hide syllabus"></div>');
							// Run the function that will grab the syllabus body, check it's contents, and add the icon
							checkSyllabus(myUrl, myCourseID);
						});
					// If we are looking at unpublished courses, change the count display and remove the syllabus link
					} else {
						$("#courseTotalText").text("Courses with enrollments not using Canvas");
						$(".forPublished").hide();
						$('.totalCourses').html($("#departmentCourses li").length);
						$('.course').contents().unwrap();
					}
					// Grab total of courses in account/sub-account from last li
					$('.grandTotal').text($('.accountTotal').text());
					$('.accountTotal').remove();
				});
				// Change the filters section while results are being retrieved
				$(".filters").hide();
				$(".showAll").removeClass("btn-warning").addClass("disabled");
				$(".deliveryDropdown, .campusDropdown").removeClass("disabled");
				resetFilters();
			});

			// this will grab the information from allCourses.php
			$(".retrieveAllCourses").click(function (e){
				e.preventDefault();
				// Give visual feedback that something is happening
				$(this).html('<i class="icon-spinner icon-spin icon-large"></i> This will take awhile').addClass("disabled");
				// Grab published state and term
				var publishedState = $("#publishedState").attr("value");
				var term = $("#term").attr("value");
				// Run ajax call to "allCourses.php"
				$('#departmentCourses').load('allCourses.php?term='+term+'&publishedState='+publishedState+' #collegeList', function(){
					// If the courses are published, check for a syllabus
					if($("#publishedState").attr("value") == "true"){
						$("#courseTotalText").text("Published Courses");
						$(".forPublished").show();
						// Loop through each course and add a hidden container to hold the syllabus body (strange I know but it works)
						$(".course").each(function(){
							myUrl = $(this).attr("href");
							myCourseID = $(this).attr("rel");
							$("body").append('<div id="'+myCourseID+'Contents" class="hide syllabus"></div>');
							// Run the function that will grab the syllabus body, check it's contents, and add the icon
							checkSyllabus(myUrl, myCourseID);
						});
					// If we are looking at unpublished courses, change the count display and remove the syllabus link
					} else {
						$("#courseTotalText").text("Courses with enrollments not using Canvas");
						$(".forPublished").hide();
						$('.totalCourses').html($("#departmentCourses li").length);
						$('.course').contents().unwrap();
					}
					// Grab total of courses in account from last li
					$('.grandTotal').text($('.accountTotal').text());
					$('.accountTotal').remove();
				});
				// Change the filters section while results are being retrieved
				$(".filters").hide();
				$(".showAll").removeClass("btn-warning").addClass("disabled");
				$(".deliveryDropdown, .campusDropdown").removeClass("disabled");
				resetFilters();
			});

			// This function controls what happens when a college is selected
			$("#college").change(function (){
				// If it is changed back to the "Choose a College", reset everything
				if($("#college").attr("value") == ""){
					$("#department").html("");
		            $("#department").append('<option value="">&nbsp;</option>').attr("disabled", true);
					$(".retrieveAllCourses").hide();
					$(".message").hide();
					$(".retrieveCourses").hide();
				// Look at selected college
				} else if ($("#college").attr("value") == "380"){
					 // run the departmentList function with the appropriate array
					departmentList(College1);
				} else if ($("#college").attr("value") == "389"){
					departmentList(College2);
				// ... Repeat as needed

				// If they want everything
				} else if ($("#college").attr("value") == "all"){
					$(".retrieveAllCourses").show();
					$(".message").show();
					$(".retrieveCourses").hide();
				// else default
				} else {
					$(".retrieveAllCourses").hide();
					$(".message").hide();
					$(".retrieveCourses").show();
				}
			}).trigger("change");
			
			// The following control the filters section
			$(".campusSelect").click(function(e){
				e.preventDefault();
				$(".campusSelect").each(function(){
					$(this).removeClass("active");
				});
				var filter = $(this).attr("rel"); 
				$(this).addClass("active");
				filterResults();
				$(".showAll").addClass("btn-warning").removeClass("disabled");
				$(".campusDropdown").addClass("activeToggle");
			});
			$(".deliverySelect").click(function(e){
				e.preventDefault();
				$(".deliverySelect").each(function(){
					$(this).removeClass("active");
				});
				var filter = $(this).attr("rel"); 
				$(this).addClass("active");
				filterResults();
				$(".showAll").addClass("btn-warning").removeClass("disabled");
				$(".deliveryDropdown").addClass("activeToggle");
			});
			$(".showAll").click(function(e){
					e.preventDefault();
					resetFilters();
					$(this).removeClass("btn-warning");
					$("#departmentCourses li").show();
					$(".showAll").addClass("disabled");
			});

			$(document).ajaxStop(function() {
			  // place code to be executed on completion of last outstanding ajax call here
			  	$("li").each(function(){
			  		var okSigns = $(this).find('.icon-ok-sign').length;
			  		if(okSigns > 1){
			  			for(var i=1; i<okSigns; i++){
			  				$(this).find('.icon-ok-sign')[1].remove();
			  			}
			  		}
			  		var questionSign = $(this).find('.icon-question-sign').length;
			  		if(questionSign > 1){
			  			for(var i=1; i<questionSign; i++){
			  				$(this).find('.icon-question-sign')[1].remove();
			  			}
			  		}
			  	});
				// Add Course Counts
				$('.inCanvas').html($("#departmentCourses .icon-ok-sign").length);
				$('.notInCanvas').html($("#departmentCourses .icon-question-sign").length);
				$(".retrieveCourses").html('Retrieve Courses').removeClass("disabled");
				$(".retrieveAllCourses").html('Retrieve All Courses').removeClass("disabled");
				$('.usedWizard').html($("#departmentCourses .icon-magic").length);
				$('.totalCourses').html($("#departmentCourses li").length);
				$('.syllabus').remove();
				// Add Counts for all USU courses
				if($(".retrieveAllCourses:visible").length>0){
					$('#departmentCourses').before('<div id="collegeCount" class="well"></div>');
					$('#departmentCourses').before($('#count'));
					$("#collegeCount").append('<table class="table"><thead><tr><th>College</th><th colspan="3" style="text-align:center;">Counts</th></tr></thead><tbody></tbody></table>');
					$('h2').each(function(){
						var myClass = $(this).index();
						console.log(myClass);
						$(this).before('<a name="'+myClass+'"></a>');
						var noSyllabus = $(this).next('.collegeGroup').find('.icon-question-sign').length;
						var hasSyllabus = $(this).next('.collegeGroup').find('.icon-ok-sign').length;
						var totalCourses = noSyllabus+hasSyllabus;
						var name = $(this).html();
						var countContents = '<td style="text-align:right;"><span class="badge badge-info">'+totalCourses+'</span> Published Courses</td> \
											<td style="text-align:right;"><span class="badge badge-success">'+hasSyllabus+'</span> Syllabus in Canvas</td> \
											<td style="text-align:right;"><span class="badge badge-important">'+noSyllabus+'</span> No Syllabus in Canvas</td>';
						$('.table tbody').append('<tr><td><a href="#'+myClass+'">'+name+'</a></td>'+countContents+'</tr>');
						$('.table .topLink').remove();
					});
				}
				checkVisible();
				$(".filters").slideDown();
			});
			$.ajaxSetup ({
			    // Disable caching of AJAX responses
			    cache: false
			});
		});

		function checkSyllabus(myUrl, myCourseID){
			// Use ajax to load the syllabus body into it's container (see .retrieveCourses or .retrieveAllCourses click functions)
			$('#'+myCourseID+'Contents').load(myUrl+' .syllabus', function(){
				// if there is any content in the syllabus container, mark the course with a green check
				if($('#'+myCourseID+'Contents .syllabus').contents().length > 1){
					if($('#'+myCourseID+'Contents #template-wrapper').length>0){
						$('.'+myCourseID).append(' <i class="icon-magic"></i> ');
						$('.usedWizard').html($("#departmentCourses .icon-magic").length);
						$('.totalCourses').html($("#departmentCourses li").length);
					}
					$('.'+myCourseID).addClass("hasContent");
					$('.'+myCourseID).prepend('<i class="icon-ok-sign"></i> ');
					$('.inCanvas').html($("#departmentCourses .icon-ok-sign").length);
				// Otherwise give it a question mark and remove the link
				} else {
					$('.'+myCourseID).addClass("noContent");
					$('.'+myCourseID+' .course').contents().unwrap();
					$('.'+myCourseID).prepend('<i class="icon-question-sign"></i> ');
					$('.notInCanvas').html($("#departmentCourses .icon-question-sign").length);
					$('.totalCourses').html($("#departmentCourses li").length);
				}
			});
		}
		// This will populate the department dropdown based on the college selected (see also the "#college" change function above)
		function departmentList(arrayName){
			$("#department").html("");
            $("#department").append('<option value="">Choose a Department</option>').attr("disabled", false);
            $.each(arrayName, function (i) {
            	var itemParts = this.split(" | ");
                $("#department").append('<option value="'+itemParts[1]+'">'+itemParts[0]+'</option>');
            });
            $(".retrieveAllCourses").hide();
            $(".message").hide();
			$(".retrieveCourses").show();
		}

		// disable filters if there is no matching content
		function checkVisible(){
			var campusCode = new Array("CC-0", "CC-A", "CC-B", "CC-C", "CC-E", "CC-F", "CC-I", "CC-K", "CC-L", "CC-N", "CC-P", "CC-S", "CC-T", "CC-U", "CC-X", "CC-Y", "CC-Z", 
				"DM-B", "DM-O", "DM-S", "DM-T");
			for (var i=0; i<campusCode.length; i++){
				if($("."+campusCode[i]+":visible").length>0){
					$("#"+campusCode[i]).removeClass("disabled");
				} else {
					$("#"+campusCode[i]).addClass("disabled");
				}
			}
			if($(".deliverySelect:not('.disabled')").length>0){
				$(".deliveryDropdown").removeClass("disabled");
			} else {
				$(".deliveryDropdown").addClass("disabled");
			}
		}

		// hide everything but those matching the filters
		function filterResults(){
			var showItems = "";
			$("#departmentCourses li").hide();
			$('.filters .active').each(function (){
				showItems += $(this).attr("rel");
			});
			$(showItems).show();
			checkVisible();
		}

		// Reset the filters to show everything
		function resetFilters(){
			$(".deliverySelect").each(function(){
				$(this).removeClass("active");
			});
			$(".deliveryDropdown").removeClass("activeToggle");
			$(".campusSelect").each(function(){
				$(this).removeClass("active");
			});
			$(".campusDropdown").removeClass("activeToggle");
			$("#departmentCourses li").show();
			checkVisible();
		}
	</script>
</head>
<body>
	<div class="heading">
		<div class="container-fluid">
			<div class="key pull-right">
				<i class="icon-ok-sign"></i> Syllabus in Canvas<br>
				<i class="icon-question-sign"></i> No Syllabus in Canvas<br>
				<i class="icon-share-alt"></i> Link to Canvas Course<br>
				<i class="icon-magic"></i> Used USU Custom Syllabus Tool
			</div>
			<h1><i class="icon-compass"></i> USU Syllabus Tracker</h1>
		</div>
	</div>
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="well">
				<select name="college" id="college">
					<option value="">Choose a College</option>
					<option value="380">Agriculture &amp; Applied Sciences</option>
					<option value="389">Caine College of the Arts</option>
					<option value="382">EEJ Education &amp; Human Services</option>
					<option value="383">Engineering</option>
					<option value="390">Humanities and Social Sciences</option>
					<option value="381">Huntsman School of Business</option>
					<option value="385">Quinney Natural Resources</option>
					<option value="386">Science</option>
					<option value="387">University</option>
					<option value="all">All USU Courses</option>
				</select>

				<select name="department" id="department" disabled>
					<option>&nbsp;</option>
				</select>
				<select name="term" id="term">
					<?php
						// The following uses the current month and year to decide which for terms to display
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
				<select name="publishedState" id="publishedState">
					<option value="true">Using Canvas</option>
					<option value="false">Not Using Canvas</option>
				</select>
				<a href="#" class="retrieveCourses btn btn-inverse" style="display:none;">Retrieve Courses</a>
				<a href="#" class="retrieveAllCourses btn btn-inverse" style="display:none;">Retrieve All Courses</a>
				<p class="alert alert-warning message" style="display:none;">This can take up to 10 minutes or more.</p>
				<div class="filters" style="display:none;">
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
						<a class="btn btn-small showAll disabled">Show All</a>
					</div>
				</div>
			</div>
			<ul id="count">
				<li class="forPublished"><span class="badge badge-inverse usedWizard">0</span> Used Custom Syllabus Tool </span></li>
				<li><span class="badge badge-info"><span class="totalCourses">0</span> / <span class="grandTotal">0</span></span> <span id="courseTotalText">Published Courses</span></li>
				<li class="forPublished"><span class="badge badge-important notInCanvas">0</span> No Syllabus in Canvas </span></li>
				<li class="forPublished"><span class="badge badge-success inCanvas">0</span> Syllabus in Canvas</span></li>
			</ul>
			<div id="departmentCourses" class="well"></div>
			<a href="http://cidi.usu.edu/" target="_blank" title="CIDI Website">
				<img src="/canvas_branding/cidi/images/cidi-logo-small-silver.png" width="250">
			</a>
		</div>
	</div>
</body>
</html>