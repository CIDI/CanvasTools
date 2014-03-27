// This code is was created by the Center of Innovative Design and Instruction at Utah State University. 
// It is released under the AGPLv3 license. For more information about this license, go to http://www.gnu.org/licenses/agpl.html


///////////////////////////////////
// USU's Custom Canvas Tools //
///////////////////////////////////

(function() {
	console.log("Global.js loaded");

	// Path to where the canvasCustomTools folder is located
	toolsPath = "https://elearn.usu.edu/canvasCustomTools/gitToolsTest/1.5/";
	// Path to your canvasGlobal css file
	globalCSSPath = "https://elearn.usu.edu/canvasCustomTools/gitToolsTest/1.5/canvasGlobal.css";
	// Comma seperated list of courses to allow custom tools access
	var courseArray = [
		"123456", // Example Course 1
		"258347"  // Example Course 2
		];
	// Comma seperated list of users to allow custom tools access
	var userArray = [
		"963", // John Doe
		"852" // Jane Doe
		];

	//Parse Course Number - It is stored in the variable "coursenum"//
	coursenum = null;
	var matches = location.pathname.match(/\/courses\/(.*)/);
	if (!matches) return;
	coursenum = matches[1];
	var killspot = coursenum.indexOf("/",0); 
	if (killspot >= 0) {
		coursenum = coursenum.slice(0, killspot);
	}
	// Front Page Custom banner image
	if($("#usu-home-img").length>0){
		$('head').prepend('<style>#usu-home-img {background: url(/courses/' + coursenum + '/file_contents/course%20files/global/css/images/homePageBanner.jpg) no-repeat center center; }</style>')
	}
	var userID = $(".user_id").text();

	// If the course or user are in the arrays above, load the tools
	if($.inArray(coursenum, courseArray) != -1 || $.inArray(userID, userArray) != -1){
		
		// Identify if it is a wiki-page or an assignment page
		if ($("#wiki_edit_view_main").length>0 || $("#edit_assignment_wrapper").length>0){
			var timestamp =  +(new Date()); 
			// Check to see if it is the front-page, otherwise load wiki-page tools
			if($(".wizard_popup_link").length>0 || $("#breadcrumbs .ellipsible:last").text() == "Front Page"){
				$.getScript(toolsPath+"/js/tools_front.js", function(){
					console.log("tools_front loaded");
				});
				// add jQuery ui for the module list calendar picker
				$.getScript("//code.jquery.com/ui/1.10.4/jquery-ui.js", function(){
					console.log("jquery ui loaded");
				});
			} else {
				$.getScript(toolsPath+"/js/tools_wiki.js?"+timestamp, function(){
					console.log("tools_wiki loaded");
				});
			}
		}
		// Include Font-Awesome icons
		$("head").append($("<link/>", { rel: "stylesheet", href: "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css?"+timestamp }));

		// Syllabus Tools
		if ($("#course_syllabus").length>0){
			$.getScript(toolsPath+"/js/tools_syllabus.js", function(){
				console.log("tools_syllabus loaded");
			});
		}
	} else {
		// Add styling to tinyMCE editors
		// wiki-page
		$(".edit_link").click(function(){
			setTimeout(function(){
				if($("#wiki_page_body_ifr").length>0){
					addStyletoIframe("#wiki_page_body_ifr");
				}
				if($("a[title='USU Template Wizard'").length>0){
					$("a[title='USU Template Wizard'").hide();
				}
			}, 300);
		});
		// syllabus page
		$(".edit_syllabus_link").click(function(){
			setTimeout(function(){
				if($("#course_syllabus_body_ifr").length>0){
					addStyletoIframe("#wiki_page_body_ifr");
				}
				if($("a[title='USU Template Wizard'").length>0){
					$("a[title='USU Template Wizard'").hide();
				}
			}, 400);
		});
		function addStyletoIframe(mceInstance){
			var $head = $(mceInstance).contents().find("head");
			var timestamp =  +(new Date());                
			$head.append($("<link/>", { rel: "stylesheet", href: toolsPath+"/css/canvasMCEEditor.css?"+timestamp, type: "text/css" }));
			$head.append($("<link/>", { rel: "stylesheet", href: globalCSSPath+"?"+timestamp, type: "text/css" }));
			$head.append($("<link/>", { rel: "stylesheet", href: toolsPath+"/css/canvasTemplates.css?"+timestamp, type: "text/css" }));
			$head.append($("<link/>", { rel: "stylesheet", href: "/assets/common.css?1376338847", type: "text/css" }));
			$(mceInstance).contents().find("body").css('background-image', 'none').addClass("mce-visualSections");
			if($(mceInstance).contents().find("#usu-custom-css").length>0 || $(mceInstance).contents().find("#custom-css").length>0){
				$head.append($("<link/>", { rel: "stylesheet", href: "/courses/" + coursenum + "/file_contents/course%20files/global/css/style.css", type: "text/css" }));
			}
		}
	}

	// Make styling and tools available for all courses created with custom tools
	if($('#template-wrapper').length>0 || $("#studentVerification").length>0 || $("#course_syllabus").length>0 || $("#usu-template-front").length>0){
		// Live view for tools
		$.getScript(toolsPath+"/js/tools_liveView.js", function(){
			// console.log("Script Loaded.");
		});
	}
	
	// add css for font-awesome if a course is using any of their icons
	if ($(".fa").length>0){
		var timestamp =  +(new Date()); 
		$("head").append($("<link/>", { rel: "stylesheet", href: "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css?"+timestamp }));
		// console.log('Font Awesome added');
	}

	// The following provides the tooltip instructions for updating grade scheme
	function getURLParameter(name) {
		return decodeURI(
			(RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
		);
	}
	var task = getURLParameter("task");
	if(task == "setGradeScheme"){
		setTimeout(function(){
			$(".edit_course_link").get(0).scrollIntoView();
			$("#course_details_tabs").tabs("option", "active", 0);
			$(".edit_course_link").attr({"data-tooltip":"top","title":"Click Here"}).trigger('mouseenter').click(function (){
				setTimeout(function(){
					$(".grading_standard_checkbox").get(0).scrollIntoView();
					$(".grading_standard_checkbox").attr({"data-tooltip":"top","title":"Check this box"}).trigger('mouseenter').change(function(){
						setTimeout(function(){
							$(".edit_letter_grades_link").attr({"data-tooltip":"top","title":"Click this link"}).trigger('mouseenter').click(function(){
								setTimeout(function(){
									$(".edit_grading_standard_link").attr({"data-tooltip":"top","title":"Click this link if you want to make changes."}).trigger('mouseenter');
									$(".display_grading_standard .done_button").attr({"data-tooltip":"top","title":"When you are finished, click here."}).trigger('mouseenter').click(function(){
										$(".edit_letter_grades_link").trigger("mouseout");
										$(".edit_grading_standard_link").trigger("mouseout");
										setTimeout(function(){
											$(".coursesettings .form-actions .btn-primary").get(0).scrollIntoView();
											$(".coursesettings .form-actions .btn-primary").attr({"data-tooltip":"top","title":"Next Steps:<ol><li>Click this button to save changes.</li><li>Wait for the page to save.</li><li>Close this tab.</li></ol>"}).trigger('mouseenter');
										}, 600);
									});
								}, 600);
							});
						}, 600);
					});
				}, 600);
			});
		}, 1000);
	}
	
}());

