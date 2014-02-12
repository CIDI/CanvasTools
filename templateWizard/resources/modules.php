<?php
	session_start();
	if ($_SESSION['allowed']){
		$courseID = $_SESSION['courseID'];
	} else {
		echo "Sorry, you are not authorized to view this content or your session has expired. Please relaunch this tool from Canvas.";
		return false;
	}
	include 'wizardAPI.php';


?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>USU Template Wizard - Front Page</title>
	<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" charset="utf-8">
		$(function() {
			<?php
				// Query to see if Primary/Secondary templates exist otherwise option to create
				$primaryTemplateExists = getPageFromCourse($courseID, "primary-template", $tokenHeader);
				// echo $primaryTemplateExists;
				$workingList = json_decode($primaryTemplateExists,true);
				if(isset($workingList['created_at'])){
					if($workingList['created_at'] !== ''){
						echo 'var primaryTemplate = true;';
					}
				} else {
						echo 'var primaryTemplate = false;';
				}
				$secondaryTemplateExists = getPageFromCourse($courseID, "secondary-template", $tokenHeader);
				// echo $secondaryTemplateExists;
				$workingList2 = json_decode($secondaryTemplateExists,true);
				if(isset($workingList2['created_at'])){
					if($workingList2['created_at'] !== ''){
						echo 'var secondaryTemplate = true;';
					}
				} else {
						echo 'var secondaryTemplate = false;';
				}
			?>
			if(primaryTemplate === false){
				$("#primaryPage").prop("checked", false).prop("disabled", true)
				$(".primaryPage").append(' (<a href="wikiPages.php">Add</a>)');
			}
			if(secondaryTemplate === false){
				$(".secondaryPageSection").html('No Secondary Template Page (<a href="wikiPages.php">Add</a>)'); 
			} else {
				var secondaryPageControls = '<div class="btn-group">'
								+'<a href="#" class="btn btn-mini countDecrease" rel="#secondaryPageCount"><i class="icon-minus"></i></a>'
								+'<a href="#" class="btn btn-mini countIncrease" rel="#secondaryPageCount"><i class="icon-plus"></i></a>'
							+'</div>'
								+'<span id="secondaryPageCount" class="countInput input-mini">0</span> Secondary Template Page';
				$(".secondaryPageSection").html(secondaryPageControls);
			}
			// console.log("Primary: "+primaryTemplate);
			// console.log("Secondary: "+secondaryTemplate);
			$("#moduleCount").focus();
			function countControls(){
				$(".countIncrease").click(function (e){
					e.preventDefault();
					var connectedInput = $(this).attr("rel");
					// var connectedInput = "#assignmentCount";
					var currentNum = parseInt($(connectedInput).text());
					var newNum = currentNum+1;
					if(currentNum < 5){
						$(connectedInput).text(newNum);
					}
				});
				$(".countDecrease").click(function (e){
					e.preventDefault();
					var connectedInput = $(this).attr("rel");
					// var connectedInput = "#assignmentCount";
					var currentNum = parseInt($(connectedInput).text());
					var newNum = currentNum-1;
					if(currentNum > 0){
						$(connectedInput).text(newNum);
					}
				});
			}
			countControls();
			$("#moduleCount").keydown(function(event) {
		        // Allow: backspace, delete, tab, escape, enter and .
		        if ( $.inArray(event.keyCode,[46,8,9,27,13,190]) !== -1 ||
		             // Allow: Ctrl+A
		            (event.keyCode == 65 && event.ctrlKey === true) || 
		             // Allow: home, end, left, right
		            (event.keyCode >= 35 && event.keyCode <= 39)) {
		                 // let it happen, don't do anything
		                 return;
		        }
		        else {
		            // Ensure that it is a number and stop the keypress
		            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
		                event.preventDefault(); 
		            }   
		        }
		    });
			$("#moduleCount").keyup(function (){
				var moduleCount = parseInt($(this).val());
				if (moduleCount > 20 ){
					$(".moduleCountMessage").html('<span class="alert">That is too many modules!</span>');
					$(this).val('20');
				} else {
					$(".moduleCountMessage").html("");
				}
			});
			$(".createModules").click(function (e){
				e.preventDefault();
				$(".contentModule").each(function(){
					var modNum = $(this).find(".modNum").text();
					var moduleTitlePrefix = $(this).find(".moduleTitlePrefix").text();
					var moduleTitle = $(this).find(".moduleTitleInput").val();
					var primaryPage = false;
					if($("#primaryPage").is(":checked")){
						primaryPage = true;
					}
					var secondaryPageCount = $(this).find(".secondaryPageCount").text();
					var assignmentCount = $(this).find(".assignmentCount").text();
					var discussionCount = $(this).find(".discussionCount").text();
					var quizCount = $(this).find(".quizCount").text();

					$(this).find(".moduleDetails").val(modNum+ " || "+moduleTitlePrefix+" || "+ moduleTitle+ " || "+primaryPage+ " || "+secondaryPageCount+ " || "+assignmentCount+ " || "+discussionCount+ " || "+quizCount) 
					// Provide visual feedback that something is happening

				});
				$(this).html('<i class="icon-spinner icon-spin icon-large"></i> Adding Modules').addClass("disabled");
				// in order for the icon above to display, there needs to be a slight delay
				setTimeout(function(){
					$("#moduleForm").submit();
				}, 5);
			});
			$(".generateModuleList").click(function (e){
				e.preventDefault();
				$("#moduleList").html("");
				var moduleCount = $("#moduleCount").val();
				if(moduleCount == ""){
					alert("Please input the number of modules you wish to create.");
					$("#moduleCount").focus();
				} else {
					$(".createModules").show();
					$(this).removeClass("btn-primary").text("Re-Generate Module List");
					$(".customizeHeader").show();
					var moduleNum = 1;
					if ($("#startHereModule").is(":checked")){
						$(".startHereModNum").text(moduleNum);
						moduleNum++;
						$("#startHere").show();
					} else {
						$("#startHere").hide();
					}
					if ($("#academicIntegrityModule").is(":checked")){
						$(".academicIntegrityModNum").text(moduleNum);
						moduleNum++;
						$("#academicIntegrity").show();
					} else {
						$("#academicIntegrity").hide();
					}
					var modulePrefix = $("#modulePrefix").find(":selected").val();
					var primaryPage = "";
					if ($("#primaryPage").is(":checked")){
						primaryPage = '<label class="primaryPage">'
								+ '<input type="checkbox" name="primaryPage" class="primaryPage" checked>'
								+ ' Primary Template Page'
							+ '</label>';
					}
					var assignmentCount = $("#assignmentCount").text();
					var discussionCount = $("#discussionCount").text();
					var quizCount = $("#quizCount").text();
					for(var i = 1; i<= moduleCount; i++){
						var secondaryPageSection = "";
						if(secondaryTemplate == true){
							var secondaryPageCount = $("#secondaryPageCount").text();
							secondaryPageSection = '<li class="wide">'
										+ '<div class="btn-group">'
											+ '<a href="#" class="btn btn-mini countDecrease" rel="#mod'+i+' .secondaryPageCount"><i class="icon-minus"></i></a>'
											+ '<a href="#" class="btn btn-mini countIncrease" rel="#mod'+i+' .secondaryPageCount"><i class="icon-plus"></i></a>'
										+ '</div>'
											+ '<span class="countInput input-mini secondaryPageCount">'+ secondaryPageCount +'</span> Secondary Template Page'
									+ '</li>';
						}
						$('#moduleList').append('<div id="mod'+i+'" class="well module contentModule">'
							+ '<div class="input-prepend">'
								+ '<span class="add-on modTitlePref"><strong>Module <span class="modNum">'+ moduleNum +'</span> Title:</strong></span>'
								+ '<input class="moduleTitleInput" type="text" value="'+modulePrefix+' '+i+': ">'
								+ '<span class="moduleTitlePrefix hide">'+modulePrefix+' '+i+':</span>'
							+ '</div>'
							+ primaryPage
							+ '<ul class="unstyled indModuleOptions">'
								+ secondaryPageSection
								+ '<li>'
									+ '<div class="btn-group">'
										+ '<a href="#" class="btn btn-mini countDecrease" rel="#mod'+i+' .assignmentCount"><i class="icon-minus"></i></a>'
										+ '<a href="#" class="btn btn-mini countIncrease" rel="#mod'+i+' .assignmentCount"><i class="icon-plus"></i></a>'
									+ '</div>'
										+ '<span class="countInput input-mini assignmentCount">'+ assignmentCount +'</span> Assignments'
								+ '</li>'
								+ '<li class="wide">'
									+ '<div class="btn-group">'
										+ '<a href="#" class="btn btn-mini countDecrease" rel="#mod'+i+' .discussionCount"><i class="icon-minus"></i></a>'
										+ '<a href="#" class="btn btn-mini countIncrease" rel="#mod'+i+' .discussionCount"><i class="icon-plus"></i></a>'
									+ '</div>'
										+ '<span class="countInput input-mini discussionCount">'+ discussionCount +'</span> Discussions'
								+ '</li>'
								+ '<li>'
									+ '<div class="btn-group">'
										+ '<a href="#" class="btn btn-mini countDecrease" rel="#mod'+i+' .quizCount"><i class="icon-minus"></i></a>'
										+ '<a href="#" class="btn btn-mini countIncrease" rel="#mod'+i+' .quizCount"><i class="icon-plus"></i></a>'
									+ '</div>'
										+ '<span class="countInput input-mini quizCount">'+ quizCount +'</span> Quizzes'
								+ '</li>'
							+ '</ul>'
							+ '<input type="hidden" name="moduleDetails[]" class="moduleDetails">'
						+ '</div>');
						moduleNum++;
					}
					countControls();
				}
			});
		});
	</script>
	<style>
		body { 
			width: 900px;
		}
		h2 {
			font-size: 18px;
			margin: 0 0 5px;
		}
		input[type="checkbox"] { margin-top: -3px;}
		.countInput {
			padding: 1px 8px;
			font-weight: bold;
		}
		.mr5 {
			margin-right: 5px;
		}
		.moduleDetails {
			margin-left: 20px;
			font-size: 12px;
			font-style: italic;
		}
		.moduleOptions li {
			float: left;
		}
		.indModuleOptions li {
			float: left;
			margin-right: 20px;
		}
		.moduleOptions li.wide {
			width: 295px;
		}
		.moduleTitle {
			border-bottom: 1px dotted #aaaaaa;
			font-size: 16px;
			line-height: 16px;
			margin: 0 0 10px;
			padding: 6px;
		}
		.moduleTitleInput {
			width: 700px;
		}
		.pattern {
			width: 500px;
			float: left;
		}
		.predefined {
			width: 250px;
			float: right;
			padding-left: 20px;
			border-left: 2px solid #E3E3E3;
		}
		.well {
			overflow: hidden;
		}
		.well.module {
			padding: 10px;
			margin: 10px 0;
		}
	</style>
</head>
<body>
	<div class="navbar navbar-inverse">
		<div class="navbar-inner">
			<ul class="nav">
				<li><a href="wikiPages.php">Wiki Page Templates</a></li>
				<li class="active"><a href="modules.php">Modules</a></li>
				<li><a href="imageCrop.php?task=selectImage">Front Page Banner Image</a></li>
			</ul>
			<a href="#" class="btn btn-mini fillOut pull-right hide">Fill Out Test</a>
		</div>
	</div>
	<div class="container-fluid">
		<form action="createModules.php" id="moduleForm" method="post">
			<div class="row-fluid">
				<div class="well">
					<div class="pattern">
						<h2>Module Pattern</h2>
						<label style="float:left;margin-right:30px;"><strong>Number of Modules</strong><br>
							<input type="text" name="moduleCount" id="moduleCount" class="input-mini" maxlength="2">
							<span class="moduleCountMessage"></span>
						</label>
						<label><strong>Module Prefix</strong><br>
							<select id="modulePrefix">
								<option value="Module">Module #:</option>
								<option value="Unit">Unit #:</option>
								<option value="Week">Week #:</option>
								<option value="Section">Section #:</option>
								<option value="Chapter">Chapter #:</option>
								<option value="Part">Part #:</option>
								<option value="Day">Day #:</option>
								<option value="Topic">Topic #:</option>
								<option value="Objective">Objective #:</option>
								<option value="Outcome">Outcome #:</option>
							</select>
						</label>
						<label class="primaryPage">
							<input type="checkbox" name="primaryPage" id="primaryPage" checked>
							Primary Template Page
						</label>
						<ul class="unstyled moduleOptions">
							<li class="wide secondaryPageSection">
								
							</li>
							<li>
								<div class="btn-group">
									<a href="#" class="btn btn-mini countDecrease" rel="#assignmentCount"><i class="icon-minus"></i></a>
									<a href="#" class="btn btn-mini countIncrease" rel="#assignmentCount"><i class="icon-plus"></i></a>
								</div>
									<span id="assignmentCount" class="countInput input-mini">0</span> Assignments
							</li>
							<li class="wide">
								<div class="btn-group">
									<a href="#" class="btn btn-mini countDecrease" rel="#discussionCount"><i class="icon-minus"></i></a>
									<a href="#" class="btn btn-mini countIncrease" rel="#discussionCount"><i class="icon-plus"></i></a>
								</div>
									<span id="discussionCount" class="countInput input-mini">0</span> Discussions
							</li>
							<li>
								<div class="btn-group">
									<a href="#" class="btn btn-mini countDecrease" rel="#quizCount"><i class="icon-minus"></i></a>
									<a href="#" class="btn btn-mini countIncrease" rel="#quizCount"><i class="icon-plus"></i></a>
								</div>
									<span id="quizCount" class="countInput input-mini">0</span> Quizzes
							</li>
						</ul>
					</div>
					<div class="predefined">
						<h2>Predefined Modules</h2>
						<p><em>Coming Soon!</em></p>
						<label>
							<input type="checkbox" disabled name="startHere" id="startHereModule" rel="#startHere">
							<strong>Start Here Module</strong>
						</label>
						<p class="moduleDetails">Includes: &ldquo;Start Here&rdquo; &amp; &ldquo;Additional Resources&rdquo; pages</p>
						<label>
							<input type="checkbox" disabled name="academicIntegrity" id="academicIntegrityModule" rel="#academicIntegrity">
							<strong>Academic Integrity Module</strong>
						</label>
						<p class="moduleDetails">Includes: 4 pages &amp; 2 quizzes</p>
					</div>
				</div>
				<a href="#" class="btn btn-primary generateModuleList">Generate Module List</a>
				<a href="#" class="btn btn-primary createModules" style="display:none;">Add Modules to Course</a>
				<h2 class="customizeHeader" style="display:none;">Customize Modules</h2>
				<div id="startHere" class="well module" style="display:none;">
					<div class="input-prepend">
						<span class="add-on"><strong>Module <span class="startHereModNum">1</span> Title:</strong></span>
						<input class="moduleTitleInput uneditable-input" disabled id="prependedInput" type="text" value="Start Here">
					</div>
					<p class="moduleDetails"><strong>Pages:</strong> &ldquo;Start Here&rdquo; &amp; &ldquo;Additional Resources&rdquo;</p>
				</div>
				<div id="academicIntegrity" class="well module" style="display:none;">
					<div class="input-prepend">
						<span class="add-on"><strong>Module <span class="academicIntegrityModNum">1</span> Title:</strong></span>
						<input class="moduleTitleInput uneditable-input" disabled id="prependedInput" type="text" value="Academic Integrity">
					</div>
					<p class="moduleDetails"><strong>Pages:</strong>
						&ldquo;Honor Pledge&rdquo;,
						&ldquo;Academic Dishonesty Defined&rdquo;,
						&ldquo;Tracking and Reporting Tools&rdquo; &amp;
						&ldquo;Repercussions of Violations&rdquo;
					</p>
					<p class="moduleDetails"><strong>Quizzes:</strong>
						&ldquo;Check Your Understanding&rdquo; &amp;
					  	&ldquo;Acknowledgement&rdquo;
				</div>
				<div id="moduleList"></div>
				<a href="#" class="btn btn-primary createModules" style="display:none;">Add Modules to Course</a>
			</div>
		</form>
	</div>
</body>
</html>