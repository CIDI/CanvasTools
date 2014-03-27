// Copyright © 2014, Utah State University’s Center for Innovative Design & Instruction (CIDI) http://cidi.usu.edu
// All rights reserved.
 
// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the 
// following conditions are met:
 
// 1.   Redistributions of source code must retain the above copyright notice, this list of conditions and the 
// 		following disclaimer.
// 2.   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the 
//		following disclaimer in the documentation and/or other materials provided with the distribution.
// 3.   Neither the name of the owner nor the names of its contributors may be used to endorse or promote products 
//		derived from this software without specific prior written permission.
 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF 
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// This page contains code for the live view of custom tools
$(function(){
	console.log('tools_liveView.js loaded');
	// STUDENT VERIFICATION FORM //
		if($(".student-verification").length>0 && $(".student-version").length>0){
			$("#studentVerification").after('<p align="center" style="margin-top:20px;"><a href="#" class="icon-edit btn btn-success submitVerify">Click Here to Sign</a></p>');
			$(".student-assignment-overview").hide();
			$(".submit_assignment_link").hide();

			$("#verificationSuccess").hide();
			$("#verificationInstructions").hide();
			$(".submitVerify").click(function (e){
				e.preventDefault();
				console.log("Clicked");
				if($("#submission_body").length>0){
					$("#submission_body").text($("#studentVerification").text());
				} else {
					console.log("No Submission Field");
				}
				$("#submit_assignment").show();
				setTimeout(function () {
					// $(".submit_assignment_form .btn-primary").trigger("click");
                }, 1000);
			});
			if($(".details:contains('Turned In!')").length>0){
				$("#studentVerification").hide();
				$(".submitVerify").hide();
				$("#verificationSuccess").show();
			}
		}
		if($(".studentName").length>0){
			var studentName = $(".emphasize-name").text();
			$(".studentName").html(studentName);
		}
	// CUSTOM ACCORDION //
		if($('.custom-accordion').length>0){
				if($(".custom-accordion h3")>1){
					$(".custom-accordion h3").each(function(){
						$(this).contents().wrap('<a href="#" />');
					});
				}
				var icons = {
					header: "ui-icon-triangle-1-e",
					activeHeader: "ui-icon-triangle-1-s"
				};
				$(".custom-accordion").accordion({
					heightStyle: "content",
					icons: icons,
					active: 0 //which panel is open by default
				});
				$( "#toggle" ).button().click(function() {
					if ( $( "#accordion" ).accordion( "option", "icons" ) ) {
						$( "#accordion" ).accordion( "option", "icons", null );
					} else {
						$( "#accordion" ).accordion( "option", "icons", icons );
					}
				});
		}
	// CUSTOM TABS //
		// Original Tabs
		if($('.custom-tabs').length>0){
			if($('.custom-tabs .current').length>0){
				var activeTab = $(".tab-list li.current").index();
				$('.custom-tabs').tabs({active: activeTab});
			} else {
				$('.custom-tabs').tabs();
			}
		}
		// Mobile Friendly Tabs
		if($('.tabbed-section').length>0){
			console.log('Tabbed Section found');
			// turn h4s into li's to create navigation section
			// Make sure the accordion h3 titles are wrapped in <a href="#">
			
			if($(".tabbed-section h4").length>0){
				$(".tabbed-section").prepend('<ul class="temp-tab-list" />');
				$(".tabbed-section h4").each(function(){
					var myTitle = $(this).html();
					var myClass = $(this).attr('class');
					var myTarget = myClass.replace(" current", "");
					$('.temp-tab-list').append('<li class="'+myClass+'"><a href="#'+myTarget+'">'+myTitle+'</a>');
					$(this).remove();
				});
			}

			// initialize tabs
			if($('.tabbed-section .current').length>0){
				var activeTab = $(".temp-tab-list h4.current").index();
				$('.tabbed-section').tabs({active: activeTab});
			} else {
				$('.tabbed-section').tabs();
			}
		}

	// POPUP CONTENT //
		if($('.custom-modal').length>0){
			$("#customModal").css("display", "none");
			var modalTitle = $(".modalTitle").text();
			$("#customModal").attr("title", modalTitle);
			$(".modalTitle").remove();
			setTimeout(function(){
				$('.customModalToggler').click(function (e){
					e.preventDefault();
					$('#customModal').dialog({
						modal: true,
						width: 600,
						buttons: {
							Close: function() {
								$( this ).dialog( "close" );
							}
						}
					});
				});
			}, 300);
		}
	// TOOLTIPS //
		if($('.tooltipTrigger').length>0){
			$(".tooltipTrigger").each(function (){
				var tipTextContainer = $(this).attr("id");
				var tipText = $("."+tipTextContainer).html();
				$(this).attr({"data-tooltip":"top", "title": tipText});
				$("."+tipTextContainer).remove();
			});
		}
	// POPOVER //
		if($('.popoverTrigger').length>0){
			$(".popoverTrigger").each(function (){
				var popoverContainer = $(this).attr("id");
				console.log(popoverContainer);
				var popoverTitle = $("."+popoverContainer+" h4").text();
				console.log("title: "+popoverTitle)
				 $("."+popoverContainer+" h4").remove();
				var popoverContents = $("."+popoverContainer).html();
				var popoverBody = '<div class=\'popover-title\'>'+popoverTitle+'</div>\
					  	<div class=\'popover-content\'>'+popoverContents+'</div>'
				$(this).attr("title", popoverBody);
				$("."+popoverContainer).remove();
				$(".popoverTrigger").attr("data-tooltip", '{"tooltipClass":"popover right", "position":"right"}');
			});
		}
	// READ MORE/LESS //
		if($('.expander').length>0){
			$.getScript("https://elearn.usu.edu/canvasCustomTools/js/jquery.expander.min.js", function(){
				// alert("Script Loaded.");
			});
		}
	// MAKE TABLES SORTABLE //
		if($('.tablesorter').length>0){
			$.getScript("https://elearn.usu.edu/canvasCustomTools/js/jquery.tablesorter.min.js", function(){
				// alert("Script Loaded.");
			});
			setTimeout(function(){
				$('.tablesorter').tablesorter();
			}, 300);
		}
		// var timestamp =  +(new Date());
		// $("head").append($("<link/>", { rel: "stylesheet", href: "https://elearn.usu.edu/courses/rfast/styles.css?"+timestamp, type: "text/css" }));


	// QUICK CHECK - NEW //
	if($(".quickCheck").length>0){
		// Hide next button
			$(".next").hide();
		// Run some functions
		$(".quickCheck").each(function (j){
			// $(".quickCheck").append('<button class="btn btn-primary checkAnswer" style="margin-bottom:10px;">Check Answer</button>');
				var quickCheckSection = $(this).attr("id");
				
				$("#"+quickCheckSection+" .answerWrapper").each(function (i){
					$(this).find(".answer").prepend('<input class="quickField" type="radio" name="quickCheck'+j+'" value="false" rel="#'+quickCheckSection+' #response'+i+'"> ').wrap("<label />");
					$(this).find(".response").attr("id", "response"+i);
				});
			$("#"+quickCheckSection+" .response").each(function (i){
				$(this).hide().addClass("incorrect");
			});
			$("#"+quickCheckSection+" .correctAnswer .response").removeClass("incorrect").addClass("correct");
			$("#"+quickCheckSection+" .correctAnswer .quickField").attr("value", "true");
			$("#"+quickCheckSection+" .quickField").click(function (e){
				var selected = $("input[type='radio'][name='quickCheck"+j+"']:checked");
				if (selected.length > 0){
				    selectedValue = selected.val();
				    // console.log(selectedValue);
				}
				$("#"+quickCheckSection+" .response").hide().appendTo("#"+quickCheckSection+" .quickCheck");
				var showResponse = $("#"+quickCheckSection+" input[type='radio'][name='quickCheck"+j+"']:checked").attr("rel");
				$(showResponse).slideDown();
			});
		});
		$(".quickField").change(function() {
			var numberNeeded = $(".quickField[value='true']").length;
			var numberAnswered = $(".quickField[value='true']:checked").length;
			if(numberNeeded == numberAnswered){
				$(".next").show();
			} else {
				$(".next").hide();
			}
		});
	}


	// SYLLABUS NAVIGATION //
	var userArray = ["1248890", "799637", "9", "103461", "5", "55110", "834467", "53751"];
	var userID = $(".user_id").text();
	if($.inArray(userID, userArray) != -1 || ($("#section-tabs .syllabus").hasClass("active") && $(".template-content").length>0) || $("#course_syllabus #template-wrapper").length>0 || $(".universityPolicies").length>0){
		if($("#course_syllabus").length>0){
			$("#sidebar_content").append('<div id="syllabus_nav"><h2>Syllabus Navigation</h2><ul id="syllabus_nav_list" style="list-style-type:none;" /></div>');
			$("#syllabus_nav_list").html('');
			$("#course_syllabus h3").each(function(index, value){
				var title = $(value).text();
				var anchorName = title.replace("&", "")
				var anchorName = anchorName.replace(/ /g, "");
				$(value).prepend('<a name="'+anchorName+'"></a>');
				$("#syllabus_nav_list").append('<li class="'+anchorName+'Link"><a href="#'+anchorName+'" class="syllabus_nav_link" rel="#'+anchorName+'Sub">'+title+'</a></li><ul style="display:none;" id="'+anchorName+'Sub" class="subNavList"></ul>');
				$(value).parent('div').contents().find("h4").each(function(index, secondValue){
					var subtitle = $(secondValue).text();
					var subAnchorName = subtitle.replace("&", "")
					var subAnchorName = subAnchorName.replace(/ /g, "");
					$(secondValue).prepend('<a name="'+subAnchorName+'"></a>');
					$('#'+anchorName+'Sub').append('<li class="'+subAnchorName+'Link"><a href="#'+subAnchorName+'">'+subtitle+'</a></li>');
				});
			});
			$(".universityPolicies h4").each(function(){
				var subtitle = $(this).text();
				var subAnchorName = subtitle.replace("&", "")
				var subAnchorName = subAnchorName.replace(/ /g, "");
				$(this).prepend('<a name="'+subAnchorName+'"></a>');
				$('#UNIVERSITYPOLICIESPROCEDURESSub').append('<li class="'+subAnchorName+'Link"><a href="#'+subAnchorName+'">'+subtitle+'</a></li>');
			});
			$(".syllabus_nav_link").each(function(){
				var subNav = $(this).attr("rel");
				if($(subNav+" li").length>0){
					$(this).parent('li').addClass('icon-arrow-right');
				} else {
					$(this).parent('li').addClass('no-icon');
				}
			});
			$(".syllabus_nav_link").click(function(){
				$(".subNavList").slideUp();
				$(".icon-arrow-down").addClass('icon-arrow-right').removeClass('icon-arrow-down');
				var subNav = $(this).attr("rel");
				if($(subNav+" li").length>0){
					$(subNav).slideDown();
					$(this).parent('li').removeClass('icon-arrow-right').addClass('icon-arrow-down')
				} 
			});
			$( ".syllabus_nav_link" ).hover(
			  function() {
			  	var anchorName = $(this).attr("href");
			  	var anchor = anchorName.replace("#", "");
			  	$('a[name='+anchor+']').parent('div').css('background', '#D5E2FF');
			  }, function() {
			    ('a[name='+anchor+']').parent('div').css('background', '');
			  }
			);
			$("#syllabus_nav_list a").click(function(){
				$("#syllabus_nav_list .active").removeClass("active");
				$(this).addClass("active");
			});
		}
	}
	// Moving syllabus assignment list up into syllabus
	if($("#canvasAssignmentList").length>0){
		$("#canvasAssignmentList").html("");
		$("#syllabusContainer").appendTo("#canvasAssignmentList");
	}

	// ACTIVE MODULE CHECK //
	if($('#usu-modules-grid').length>0){
		var today = new Date();
		$('.connectedModule').each(function (){
			var startDateString = $(this).parent('li').find('.activeStart').html();
			var startdate = new Date(startDateString);
			var endDateString = $(this).parent('li').find('.activeStop').html();
			var enddate = new Date(endDateString+' 23:59:00');
			if (today >= startdate && today <= enddate){
				$(this).parent('li').addClass('current');
			}
		});
	}
})();