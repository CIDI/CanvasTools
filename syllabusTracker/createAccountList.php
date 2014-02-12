<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	include 'reportData/syllabusAPI.php';

?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Language" content="en">
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>Account List Generator</title>
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" href="resources/bootstrap/css/bootstrap-responsive.min.css">
	<link rel="stylesheet" href="resources/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" href="resources/css/syllabus.css">
	<script type="text/javascript" language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
	<script type="text/javascript" src="resources/bootstrap/js/bootstrap.js"></script>
	<script type="text/javascript">
		$(function() {
			// Sort the list of colleges alphabetically
			$.fn.sortMainList = function() {
				var mylist = $(this);
				var listitems = $('li:not("ol li")', mylist).get();
				listitems.sort(function(a, b) {
				    var compA = $.trim($(a).text()).toUpperCase();
				    var compB = $.trim($(b).text()).toUpperCase();
				    return (compA < compB) ? -1 : 1;
				});
				$.each(listitems, function(i, itm) {
				    mylist.append(itm);
				});
			}
			// Sort department lists alphabetically
			$.fn.sortSubList = function() {
				var mylist = $(this);
				var listitems = $('li', mylist).get();
				listitems.sort(function(a, b) {
				    var compA = $.trim($(a).text()).toUpperCase();
				    var compB = $.trim($(b).text()).toUpperCase();
				    return (compA < compB) ? -1 : 1;
				});
				$.each(listitems, function(i, itm) {
				    mylist.append(itm);
				});
			}
			// For each account (should only be one) get the subaccount data
			$("h2").each(function (e){
				var accountID = $(this).attr("rel");
				$.get('reportData/getSubaccounts.php?accountID='+accountID, function(data) {
				    $('#subaccounts_'+accountID).html(data);
				    $("ul").each(function(){
						$(this).sortMainList();
					});
					$("ol").each(function(){
						$(this).sortSubList();
					})
				    bindButtons();
				});
			});
			// Sends the data to a JSON file when clicked
			$('.generateData').click(function (e){
				e.preventDefault();
				gatherJSONdata();
				formSubmit();
				$("#formData").submit();
			})
		});
		function bindButtons(){
			$(".removeCollege").click(function (e){
				e.preventDefault();
				$(this).parents(".college").addClass("exclude").removeClass("include").find(".subaccounts").hide();
				$(this).parents(".college").find(".department").addClass("exclude").removeClass("include")
			});
			$(".removeDept").click(function (e){
				e.preventDefault();
				$(this).parents(".department").addClass("exclude").removeClass("include");
			});

			$(".addCollege").click(function (e){
				e.preventDefault();
				$(this).parents(".college").addClass("include").removeClass("exclude").find(".subaccounts").show();
				$(this).parents(".college").find(".department").addClass("include").removeClass("exclude");
			});
			$(".addDept").click(function (e){
				e.preventDefault();
				$(this).parents("li").addClass("include").removeClass("exclude");
			});
			$(".well a").tooltip({delay:1000});
		}
		function gatherJSONdata(){
			jsonData = '[';
			$('.college.include').each(function(){
				collegeName = $(this).find('.collegeName').text();
				collegeID = $(this).attr("rel");

				jsonData += '{"collegeName": "'+collegeName+'", "departments":['
				$(this).find('.include').each(function(){
					departmentName = $(this).find('.deptName').text();
					deptID = $(this).attr('rel');
					jsonData += '{"deptName": "'+departmentName+'", "deptID": "'+deptID+'"},';
				});
				// remove last comma
				jsonData = jsonData.replace(/[,;]$/, "");
				jsonData += "]},";
			});
			jsonData = jsonData.replace(/[,;]$/, "");
			jsonData += ']';
			$('#jsonData').text(jsonData);
		}
		function formSubmit(){
			// variable to hold request
			var request;
			// bind to the submit event of our form
			$("#formData").submit(function(event){
			    // abort any pending request
			    if (request) {
			        request.abort();
			    }
			    // setup some local variables
			    var $form = $(this);
			    // let's select and cache all the fields
			    var $inputs = $form.find("input, select, button, textarea");
			    // serialize the data in the form
			    var serializedData = $form.serialize();

			    // let's disable the inputs for the duration of the ajax request
			    $inputs.prop("disabled", true);

			    // fire off the request
			    request = $.ajax({
			        url: "reportData/list0-createCollegeList.php",
			        type: "post",
			        data: serializedData
			    });

			    // callback handler that will be called on success
			    request.done(function (response, textStatus, jqXHR){
			        // log a message to the console
			        $(".message").slideDown().delay(3000).slideUp();
			        $(".trackerLink").show();
			    });

			    // callback handler that will be called on failure
			    request.fail(function (jqXHR, textStatus, errorThrown){
			        // log the error to the console
			        console.error(
			            "The following error occured: "+
			            textStatus, errorThrown
			        );
			    });

			    // callback handler that will be called regardless
			    // if the request failed or succeeded
			    request.always(function () {
			        // reenable the inputs
			        $inputs.prop("disabled", false);
			    });

			    // prevent default posting of form
			    event.preventDefault();
			});
		}
	</script>
	<style>
		.college {border-bottom: 1px solid #c2c2c2; padding-bottom: 4px; padding-top: 4px; }
		ul {list-style-type: none; margin-left: 0; }
		ol {margin-left: 80px; }
		.exclude, .exclude a {color: #C2C2C2; font-weight: normal; }
		.ignore {color: #C2C2C2; font-weight: normal; padding-left: 50px; }
		.message {font-weight: bold; position: fixed; text-align: center; top:0; width: 100%; z-index: 100; }
		.trackerLink {margin-right: 5px;}
	</style>
</head>
<body>
	<div class="alert alert-success hide message">List Generated</div>
	<div class="heading">
		<div class="container-fluid">
			<h1><i class="icon-compass"></i> Account List Generator</h1>
		</div>
	</div>
	<div class="container-fluid">
		<div class="row-fluid">
			<form name="formData" action="reportData/list0-createCollegeList.php" method="POST" id="formData" class="hide">
				<textarea id="jsonData" name="jsonData"></textarea>
				<input type="submit" value="Submit">
			</form>
			<p class="lead">This form will allow you to choose the Colleges and Departments to be displayed in the Syllabus Tracker</p>
			<p>Click the <a class="btn btn-mini"><i class="icon-remove"></i></a> next to a college or department to unselect it. Click "Save List" when you have made your selections.</p>
			<div class="alert">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong>Warning!</strong> After changes are made to this list, you will need to regenerate any semester data.
			</div>
				<?php
					// Gets accounts user has admin rights to
					$userAccountList = listUserAccounts($tokenHeader);
					$workingList = json_decode($userAccountList, true);
					$resultCount = count($workingList);
					for ($i=0; $i<$resultCount; $i++){
						$accountName = $workingList[$i]['name'];
						$accountID = $workingList[$i]['id'];
						echo '<h2 id="account_'.$accountID.'" rel="'.$accountID.'">
							'.$accountName.' <small>(Account ID: '.$accountID.')</small>
							<a href="#" class="generateData btn pull-right">Save List</a>
							<a href="index.php" class="btn btn-primary trackerLink hide pull-right">Go to Syllabus Tracker</a>
						</h2>
							<div class="well" id="subaccounts_'.$accountID.'">
								<strong><i class="icon-spin icon-spinner"></i> Gathering Account Information</strong>
							</div>';
					}				
				?>
			<a href="#" class="generateData btn pull-right">Save List</a>
			<a href="index.php" class="btn btn-primary trackerLink hide pull-right">Go to Syllabus Tracker</a>
			<a href="http://cidi.usu.edu/" target="_blank" title="CIDI Website">
				<img src="https://elearn.usu.edu/canvas_branding/cidi/images/cidi-logo-small-silver.png" width="250">
			</a>
		</div>
	</div>
</body>
</html>