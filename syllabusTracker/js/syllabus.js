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

var grandTotal = 0;
var notUsingCanvasTotal = 0;
var notUsingCanvasPer = 0;
var usingCanvasTotal = 0;
var usingCanvasPer = 0;
var noSyllabusTotal = 0;
var noSyllabusPer = 0;
var hasSyllabusTotal = 0;
var hasSyllabusPer = 0;
var usedWizardTotal = 0;
var usedWizardPer = 0;
$(function() {
	$("#college").change(function (){
		// Determine if it is a single college or all university
		if($("#college").attr("value") == ""){
			$(".retrieveAllCourses").hide();
			$(".retrieveCourses").hide();
		} else if ($("#college").attr("value") == "all"){
			$(".retrieveAllCourses").show();
			$(".retrieveCourses").hide();
		} else {
			$(".retrieveAllCourses").hide();
			$(".retrieveCourses").show();
		}
	}).trigger("change");
	// Retrieve data for a single college
	$(".retrieveCourses").click(function (e){
		e.preventDefault();
		// Remove bar graph for entire university
		$("#collegeCount").remove();
		// Provide visual feedback that something is happening
		$(this).html('<i class="icon-spinner icon-spin icon-large"></i> Gathering Data').addClass("disabled");
		// Retrieve college data based on which college is selected and which term
		var indexNum = $("#college").attr("value");
		var term = $("#term").attr("value");
		$('#departmentCourses').load('collegeDetails.php?term='+term+'&indexNum='+indexNum+' .collegeList', function(){
			// Gather department data and populate dropdown once data is returned
			$(".departmentList").html("");
			$('#departmentCourses h3').each(function(){
				var deptTitle = $(this).text();
				var deptIndexNum = $(this).attr("rel");
				$(".departmentList").append('<li><a href="#" class="deptSelect" rel="'+deptIndexNum+'">'+deptTitle+'</li>');
			});
			$(".deptSelect").click(function (e){
				e.preventDefault();
				$(".showAll").addClass("btn-warning").removeClass("disabled");
				$('#departmentCourses h3').hide();
				$('#departmentCourses ol').hide();
				var deptIndexNum = $(this).attr("rel");
				$('#deptHeading-'+deptIndexNum).show();
				$('#deptCourseList-'+deptIndexNum).show();
				checkTotals();
				checkVisible();
			});
			$(".departmentDropdown").show();
		});
		$(".filters").hide();
		$(".showAll").removeClass("btn-warning").addClass("disabled");
		$(".deliveryDropdown, .campusDropdown").removeClass("disabled");
		resetFilters();
		
	});
	// Retrieve data for entire university
	$(".retrieveAllCourses").click(function (e){
		e.preventDefault();
		// Remove bar graphs to prevent duplication
		$("#collegeCount").remove();
		// Hide department dropdown
		$("#departmentCourses").html("");
		$(".departmentDropdown").hide();
		// Provide visual feedback that something is happening
		$(this).html('<i class="icon-spinner icon-spin icon-large"></i> Gathering Data').addClass("disabled");
		// Identify selected term
		var term = $("#term").attr("value");
		// Count how many colleges there are in the dropdown
		var optionCount = $("#college option").length;
		// account for "Choose a College" and "All USU Courses" options
		var collegeCount = optionCount-2;
		// Retrieve data for each college and append it to container
		for(var i=0; i<collegeCount; i++){
			$.get('collegeDetails.php?term='+term+'&indexNum='+i+'', function(data) {
			    $(data).appendTo("#departmentCourses").fadeIn("slow");
			});
		}
	});
	// Control filtering by campus
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
	// Control filtering by delivery method
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
	// Button to reset filters
	$(".showAll").click(function(e){
		e.preventDefault();
		resetFilters();
		$(this).removeClass("btn-warning");
		$("#departmentCourses li").show();
		$(".showAll").addClass("disabled");
		$('#departmentCourses h3').show();
		$('#departmentCourses ol').show();
	});
	// Button Hovers
	$(".usingCanvasBtn").mouseover(function() {
		var el = $(this);
		var timeoutID = setTimeout(function() {
			$(".usingCanvas").addClass("hover");
		}, 500);
		el.mouseout(function(){
			$(".usingCanvas").removeClass("hover");
			clearTimeout(timeoutID);
		});
	});
	$(".notUsingCanvasBtn").mouseover(function() {
		var el = $(this);
		var timeoutID = setTimeout(function() {
			$(".notUsingCanvas").addClass("hover");
		}, 500);
		el.mouseout(function(){
			$(".notUsingCanvas").removeClass("hover");
			clearTimeout(timeoutID);
		});
	});
	$(".hasSyllabusBtn").mouseover(function() {
		var el = $(this);
		var timeoutID = setTimeout(function() {
			$(".hasSyllabus").addClass("hover");
		}, 500);
		el.mouseout(function(){
			$(".hasSyllabus").removeClass("hover");
			clearTimeout(timeoutID);
		});
	});
	$(".noSyllabusBtn").mouseover(function() {
		var el = $(this);
		var timeoutID = setTimeout(function() {
			$(".noSyllabus").addClass("hover");
		}, 500);
		el.mouseout(function(){
			$(".noSyllabus").removeClass("hover");
			clearTimeout(timeoutID);
		});
	});
	// Button Clicks
	$(".usingCanvasBtn").click(function (e) {
		e.preventDefault();
		$("#departmentCourses li").hide();
		$(".usingCanvas").show();
		$(".showAll").removeClass("disabled").addClass("btn-warning");
	});
	$(".notUsingCanvasBtn").click(function (e) {
		e.preventDefault();
		$("#departmentCourses li").hide();
		$(".notUsingCanvas").show();
		$(".showAll").removeClass("disabled").addClass("btn-warning");
	});
	$(".hasSyllabusBtn").click(function (e) {
		e.preventDefault();
		$("#departmentCourses li").hide();
		$(".hasSyllabus").show();
		$(".showAll").removeClass("disabled").addClass("btn-warning");
	});
	$(".noSyllabusBtn").click(function (e) {
		e.preventDefault();
		$("#departmentCourses li").hide();
		$(".noSyllabus").show();
		$(".showAll").removeClass("disabled").addClass("btn-warning");
	});
	// Data Status
	$("#term").change(function (){
		var selectedTerm = $("#term").attr("value");
		if(selectedTerm !== ""){
			$('#termInfo').load('reportData/fileData.php?term='+selectedTerm, function(){
			});
		}
	});
	var selectedTerm = $("#term").attr("value");
	if(selectedTerm !== ""){
		$('#termInfo').load('reportData/fileData.php?term='+selectedTerm, function(){
			if($("#termInfo:contains('not yet generated')").length>0){

				$('.updateData').attr("title", "Data not available for<br><strong>"+$("#term option:selected").text()+"</strong").tooltip({html:true}).trigger("mouseover").focus();
			}
		});
	}
	// Data Gathering modal options
	$("#generateTerm").change(function (){
		$("#processComplete").hide();
		$("#step1").attr("class", "pending").html('<i class="icon-circle-blank"></i> Create Course List');
		$("#step2").attr("class", "pending").html('<i class="icon-circle-blank"></i> Check Student Enrollments');
		$("#step3").attr("class", "pending").html('<i class="icon-circle-blank"></i> Gather Course Details');
		var selectedTerm = $("#generateTerm").attr("value");
		if(selectedTerm !== ""){
			$('#fileDetails').load('reportData/fileData.php?term='+selectedTerm, function(){
			});
		}
		$(".generateData").show();
	});
	$(".generateData").click(function (e){
		e.preventDefault();
		$(".generateProgress .bar").css('width', "0%");
		var generateTermID = $("#generateTerm").attr("value");
		var optionCount = $("#college option").length;
		// account for "Choose a College" and "All USU Courses" options
		var collegeCount = optionCount-2;
		var numToComplete = collegeCount*2;
		// Retrieve data for each college and append it to container
		if(generateTermID !== ""){
			$("#step1").attr("class", "active").html('<i class="icon-cog icon-spin"></i> Creating Course List');
			// Step 1 create course list
			$.get( "reportData/list1-initialCourses.php?term="+generateTermID, function( data ) {
				$(".generateProgress").slideDown();
				$("#step1").attr("class", "completed").html('<i class="icon-ok-sign"></i> Course List Created');
				$("#step2").attr("class", "active").html('<i class="icon-cog icon-spin"></i> Gathering Course Details (Part <span id="detailsStepCount">0</span>/'+numToComplete+' Complete)');
				// Step 2 check courses for student enrollments
				for(var i=0; i<collegeCount; i++){
					checkEnrollments(i, generateTermID, numToComplete);					
				}
			});
		}
	});
	function checkEnrollments(indexNum, generateTermID, numToComplete){
		$.get('reportData/list2-checkEnrollments.php?term='+generateTermID+'&indexNum='+indexNum+'', function(data) {
			var numCompleted = parseInt($("#detailsStepCount").text());
			numCompleted++;
			var percentComplete = Math.floor((numCompleted/numToComplete) * 100);
			$(".generateProgress .bar").css('width', percentComplete+"%");
			$("#detailsStepCount").text(numCompleted);
			// Trigger next request to gather details about courses
			gatherDetails(indexNum, generateTermID, numToComplete);	
		});
	}
	function gatherDetails(indexNum, generateTermID, numToComplete){
		$.get('reportData/list3-gatherDetails.php?term='+generateTermID+'&indexNum='+indexNum+'', function(data) {
			var numCompleted = parseInt($("#detailsStepCount").text());
			numCompleted++;
			var percentComplete = Math.floor((numCompleted/numToComplete) * 100);
			$(".generateProgress .bar").css('width', percentComplete+"%");
			$("#detailsStepCount").text(numCompleted);

			if(numCompleted == numToComplete){
				$("#step2").attr("class", "completed").html('<i class="icon-ok-sign"></i> Course Details Gathered');
				$("#processComplete").slideDown();
				$(".generateProgress").slideUp();
				$(".generateData").hide();
			}
		});
	}

  	// code below will be executed on completion of last outstanding ajax call
	$(document).ajaxStop(function() {
		if($("#myModal").is(":visible") || $("#college").attr("value")==""){

		} else {
			// Reset Retrieve buttons
			$(".retrieveCourses").html('Retrieve Courses').removeClass("disabled");
			$(".retrieveAllCourses").html('Retrieve All Courses').removeClass("disabled");
			$('.syllabus').remove();
			// Add Counts for all USU courses
			if($(".retrieveAllCourses:visible").length>0){
				// Put results back in original order (rather than first to return ajax response)
				var optionCount = $("#college option").length;
				var collegeCount = optionCount-2;
				for(var i=0; i<collegeCount; i++){
					$('.college-'+i).appendTo("#departmentCourses");
				}

				// Add in div for bar graph
				var chartHeight = collegeCount*75+100;
				$('#departmentCourses').before('<div id="collegeCount" style="min-width: 310px; height: '+chartHeight+'px; margin: 0 auto" class="well"></div>');
			}
			// Check results and update totals and dropdown options
			checkTotals();
			checkVisible();
			// Show filter options
			$(".filters").slideDown();
			// Change link title attributes to tooltips
			$("#departmentCourses a").tooltip({html:true});
			// Alphabetically sort department courses
			$.fn.sortList = function() {
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
			$("#departmentCourses ol").each(function(){
				$(this).sortList();
			});
		}
	});
	$.ajaxSetup ({
	    // Disable caching of AJAX responses
	    cache: false
	});
});

// the following function grays out dropdown choices that are not in the returned courses
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
// Hide all courses then show those that fit filter criteria
function filterResults(){
	var showItems = "";
	$("#departmentCourses li").hide();
	$('.filters .active').each(function (){
		showItems += $(this).attr("rel");
	});
	$(showItems).show();
	checkTotals();
}
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
	$(".selectInstructorDropdown").removeClass("activeToggle").html('Instructor <span class="caret"></span>');
	$(".selectedInstructor").each(function(){
		$(this).parent().removeClass("active");
	});
	checkTotals();
}
// Gather totals of displayed courses and update graphs
function checkTotals(){
	grandTotal = $("#departmentCourses li:visible").length;
	notUsingCanvasTotal = $("#departmentCourses .icon-remove-sign:visible").length;
	notUsingCanvasPer = Math.floor((notUsingCanvasTotal/grandTotal) * 100);
	usingCanvasTotal = grandTotal-notUsingCanvasTotal;
	usingCanvasPer = Math.floor((usingCanvasTotal/grandTotal) * 100);
	noSyllabusTotal = $("#departmentCourses .icon-question-sign:visible").length;
	noSyllabusPer = Math.floor((noSyllabusTotal/usingCanvasTotal) * 100);
	hasSyllabusTotal = $("#departmentCourses .icon-ok-sign:visible").length;
	hasSyllabusPer = Math.floor((hasSyllabusTotal/usingCanvasTotal) * 100);
	usedWizardTotal = $("#departmentCourses .icon-magic:visible").length;
	usedWizardPer = Math.floor((usedWizardTotal/grandTotal) * 100);

	$('.grandTotal').html(grandTotal);
	$('.notUsingCanvasTotal').html(notUsingCanvasTotal);
	$('.notUsingCanvasPer').html(notUsingCanvasPer+'%');
	$('.usingCanvasTotal').html(usingCanvasTotal);
	$('.usingCanvasPer').html(usingCanvasPer+'%');
	$('.noSyllabusTotal').html(noSyllabusTotal);
	$('.noSyllabusPer').html(noSyllabusPer+'%');
	$('.hasSyllabusTotal').html(hasSyllabusTotal);
	$('.hasSyllabusPer').html(hasSyllabusPer+'%');
	$('.usedWizardTotal').html(usedWizardTotal);
	$('.usedWizardPer').html(usedWizardPer+'%');

	$('#canvasUse').highcharts({
		chart: {type: 'column'},
		colors: [
		   '#999999', 
		   '#3a87ad'
		],
		title: {text: null },
		xAxis: {categories: ['Canvas Usage'] },
		yAxis: {
		    min: 0,
		    title: {text: 'Course Percentage'}
		},
		tooltip: {
		    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
		    shared: true
		},
		plotOptions: {
		    column: {stacking: 'percent'}
		},
	    series: [{
		    name: 'Not In Canvas',
		    data: [notUsingCanvasTotal]
		}, {
		    name: 'In Canvas',
		    data: [usingCanvasTotal]
		}]
	});
	$('#syllabusState').highcharts({
		chart: {type: 'column'},
		colors: [
		   '#B94A48', 
		   '#468847'
		],
		title: {text: null },
		xAxis: {categories: ['Syllabus Usage'] },
		yAxis: {
		    min: 0,
		    title: {text: '% Courses Using Canvas'}
		},
		tooltip: {
		    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
		    shared: true
		},
		plotOptions: {
		    column: {stacking: 'percent'}
		},
	    series: [{
		    name: 'No Content in Syllabus Page',
		    data: [noSyllabusTotal]
		}, {
		    name: 'Content in Syllabus Page',
		    data: [hasSyllabusTotal]
		}]
	});
	// Data specific to "All USU Courses"
	if($(".retrieveAllCourses:visible").length>0){
		var collegeList = [];
		var collegeTotalCourses = [];
		var collegePublished = [];
		var collegeUnpublished = [];
		var collegeUsingSyllabus = [];
		var collegeNotUsingSyllabus = [];
		$('h2').each(function(){
			collegeList.push($(this).text());
			collegeTotalCourses.push($(this).parents(".collegeList").find('li:visible').length);
			collegePublished.push($(this).parents(".collegeList").find('.usingCanvas:visible').length);
			collegeUnpublished.push($(this).parents(".collegeList").find('.notUsingCanvas:visible').length);
			collegeUsingSyllabus.push($(this).parents(".collegeList").find('.icon-ok-sign:visible').length);
			collegeNotUsingSyllabus.push($(this).parents(".collegeList").find('.icon-question-sign:visible').length);
			var myClass = $(this).index();
			$(this).before('<a name="'+myClass+'"></a>');
			var noSyllabus = $(this).next('.collegeGroup').find('.icon-question-sign').length;
			var hasSyllabus = $(this).next('.collegeGroup').find('.icon-ok-sign').length;
			var totalCourses = noSyllabus+hasSyllabus;
			var name = $(this).html();
			$(this).find("a").remove();
			$(this).append('<a class="topLink" href="#top"><i class="icon-circle-arrow-up"></i> Top</a>');
		});
		$('#collegeCount').highcharts({
	            chart: {type: 'bar'},
	            colors: [
				   	'#B94A48', 
				   	'#468847',
	            	'#3a87ad',
				   	'#999999', 
	            	'#000000'
				],
	            title: {
	                text: 'USU Canvas Usage'
	            },
	            subtitle: {
	                text: 'By College (Based on courses with student enrollments)'
	            },
	            xAxis: {
	                categories: collegeList,
	                title: {text: null }
	            },
	            yAxis: {
	                min: 0,
	                title: {
	                    text: 'Number of Courses',
	                    align: 'high'
	                },
	                labels: {overflow: 'justify'}
	            },
	            tooltip: {valueSuffix: ' Courses'},
	            plotOptions: {
	                bar: {
	                    dataLabels: {
	                        enabled: true
	                    }
	                }
	            },
	            legend: {
	                layout: 'vertical',
	                align: 'right',
	                verticalAlign: 'top',
	                x: -40,
	                y: 100,
	                floating: true,
	                borderWidth: 1,
	                backgroundColor: '#FFFFFF',
	                shadow: true
	            },
	            credits: {
	                enabled: false
	            },
	            series: [{
	            	name: 'No Content in Syllabus Page',
	            	data: collegeNotUsingSyllabus
	            }, {
	            	name: 'Content in Syllabus Page',
	            	data: collegeUsingSyllabus
	            }, {
	                name: 'Courses Published',
	                data: collegePublished
	            }, {
	                name: 'Courses UnPublished',
	                data: collegeUnpublished
	            }, {
	                name: 'Total Courses',
	                data: collegeTotalCourses
	            }]
	        });
	}
	getInstructors();
}
function getInstructors(){
	var instructorArray = [];
	// Gather instructor names and create a dropdown list
	$(".instructorName").each(function (){
		if($(this).parents("li:visible").length>0){
			instructorArray.push($(this).text());
		}
	});
	instructorArray.sort();
	$(".chooseInstructor").html("");
	var newArray = GetUnique(instructorArray);
	$.each(newArray, function( index, value ) {
		$(".chooseInstructor").append('<li><a href="#" class="selectedInstructor" rel="'+ value + '">'+ value + '</a></li>' );
	});
	$(".selectedInstructor").each(function(){
		var selectedInstructor = $(this).attr("rel");
		var numCourses = $('.instructorName:contains('+selectedInstructor+')').length;
		// var numCourses = $('.instructorName:contains("Norman Jones")').length;
		$(this).append(" ("+numCourses+")");
	});
	$('.dropdown-toggle').dropdown();
	// Filter results when an instructor is selected
	$(".selectedInstructor").click(function(){
		$(".selectedInstructor").each(function(){
			$(this).parent().removeClass("active");
		});
		resetFilters();
		$(this).parent().addClass("active");
		filterResults();
		$(".showAll").addClass("btn-warning").removeClass("disabled");
		var selectedInstructor = $(this).attr("rel");
		$('.instructorName:contains('+selectedInstructor+')').each(function(){
			$(this).parents("li").show();
		});
		$(".selectInstructorDropdown").addClass("activeToggle").html(selectedInstructor+' <span class="caret"></span>');
	});
}
// The following function will remove duplicate entries from an array
function GetUnique(inputArray)
{
    var outputArray = [];
    for (var i = 0; i < inputArray.length; i++) {
        if ((jQuery.inArray(inputArray[i], outputArray)) == -1) {
            outputArray.push(inputArray[i]);
        }
    }
    return outputArray;
}