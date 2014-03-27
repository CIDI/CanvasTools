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

///////////////////////////////////////
//    VARIABLES                      //
///////////////////////////////////////

	// Themes without a description div
		var themeArray = [
			"generic", 
			"bookmark", 
			"apple", 
			"box-left-aggie-blue", "box-left-copper", "box-left-silver", 
			"square-right-aggie-blue", "square-right-copper", "square-right-silver", 
			"rounded-inset-aggie-blue", "rounded-inset-copper", "rounded-inset-silver",
			"circle-left-aggie-blue", "circle-left-copper", "circle-left-silver" 
		];
	// Themes with a bottomBanner div (includes subtitle and description)
		var bottomBannerThemeArray = ["emta"];

	////// Base html variables for sections  //////
		var introductionSection = '<div class="introduction" rel="introduction">\
			<p>Add some introductory text to discuss this module</p>\
			</div>';
		var objectiveSection = '<div class="objectives" rel="objectives">\
			<h3 class="icon-rubric-dark">Objectives</h3>\
			<ol id="objectiveList">\
				<li>Describe this</li>\
				<li>Define that</li>\
				<li>Identify this</li>\
			</ol>\
			</div>';
		var readingsSection = '<div class="readings" rel="readings">\
			<h3 class="icon-document">Module Readings</h3>\
			<ol>\
				<li>Reading 1</li>\
				<li>Reading 2</li>\
			</ol>\
			</div>';
		var lectureSection = '<div class="lectures" rel="lectures">\
			<h3 class="icon-video">Lecture(s)</h3>\
			<p>[Insert video(s) here]</p>\
			</div>';
		var activitySection = '<div class="activities" rel="activities">\
			<h3 class="icon-standards">Activities</h3>\
			<ul>\
				<li>Discuss the following</li>\
				<li>Submit the following</li>\
				<li>Quiz</li>\
			</ul>\
			</div>';
		var assignmentSection = '<div class="assignments" rel="assignments">\
			<h3 class="icon-assignment">Assignment Title</h3>\
			<p>Assignment Description</p>\
			</div>';

	// Array of section names and their corresponding html
		var wikiSections = {
			'introduction':introductionSection,
			'objectives':objectiveSection,
			'readings':readingsSection,
			'lectures':lectureSection,
			'activities':activitySection,
			'assignments':assignmentSection
		}

	// Bloom's Taxonomy for Objectives
		// Outcomes Section
		var bloomsRevisedRemember =  [
		    "Choose", "Define", "Describe", "Identify", "Label", "List", "Locate", "Match",
		    "Memorize", "Name", "Omit", "Recite", "Recognize", "Select", "State"
		];
		var bloomsRevisedUnderstand =  [
		    "Classify", "Defend", "Demonstrate", "Distinguish", "Explain", "Express", "Extend",
		    "Give example", "Illustrate", "Indicate", "Infer", "Interpret", "Judge", "Paraphrase",
		    "Represent", "Restate", "Rewrite"
		];
		var bloomsRevisedApply =  [
		    "Act", "Articulate", "Assess", "Change", "Chart", "Compute", "Construct",
		    "Contribute", "Control", "Determine", "Develop", "Discover", "Draw", "Establish",
		    "Extend", "Imitate", "Implement", "Include", "Participate", "Predict", "Prepare",
		    "Produce", "Provide", "Show"
		];
		var bloomsRevisedAnalyze =  [
		    "Break down", "Characterize", "Classify", "Compare", "Contrast", "Correlate",
		    "Deduce", "Diagram", "Differentiate", "Discriminate", "Distinguish", "Examine",
		    "Limit", "Outline", "Prioritize", "Research", "Relate", "Subdivide"
		];
		var bloomsRevisedEvaluate =  [
		    "Appraise", "Argue", "Criticize", "Critique", "Debate", "Estimate", "Evaluate",
		    "Justify", "Prioritize", "Rate", "Value", "Weigh"
		];
		var bloomsRevisedCreate =  [
		    "Combine", "Compose", "Construct", "Create", "Design", "Devise", "Forecast",
		    "Formulate", "Hypothesize", "Invent", "Make", "Originate", "Plan", "Produce",
		    "Propose", "Role play"
		];

		var bloomsRevisedSections = {
		    'remember':bloomsRevisedRemember,
		    'understand':bloomsRevisedUnderstand,
		    'apply':bloomsRevisedApply,
		    'anaylze':bloomsRevisedAnalyze,
		    'evaluate':bloomsRevisedEvaluate,
		    'create':bloomsRevisedCreate
		}

	// Canvas ID for the wiki page iframe
	if ($("#wiki_edit_view_main").length>0){
		iframeID = "#wiki_page_body_ifr";
		submitButton = "#wiki_page_submit";
		mceInstance = "wiki_page_body";
	} else {
		iframeID = "#assignment_description_ifr";
		submitButton = "#form-actions .btn-primary";
		mceInstance = "assignment_description";
	}



///////////////////////////////////////
//    SETUP CUSTOM TOOLS FOR PAGES   //
///////////////////////////////////////
// include is found in canvasGlobal.js
	
	(function() {
        function editorExistenceCheck(page) {
            var editorExists = false;
            if ($(iframeID).contents().find("#tinymce").length > 0) {
                editorExists = true;
            }
            if (editorExists === true) {
                setTimeout(function () {
                	if(page === 'wiki'){
                    	setupWikiPage();
                	} else if(page === 'assignment'){
                		setupAssignmentPage();
                	}
                }, 300);
                return;
            }
            setTimeout(function () {
                editorExistenceCheck(page);
            }, 300);
        }
        // Add tools when edit link is clicked
	    $(".edit_link").click(function () {
	    // Add button to trigger USU tools
		   if(!$("#custom-tools-accordion").length>0){
				$("#wiki_edit_view_secondary").before('<a href="#" class="btn btn-primary addUSUTools"><i class="fa fa-rocket" style="font-size: 18px;"></i> Launch USU Tools</a>');
				$(".addUSUTools").click(function (e){
					e.preventDefault();
					editorExistenceCheck('wiki');
				});
		    }
	    });
	    // Newly created page
	    if($("#page_doesnt_exist_so_start_editing_it_now").length>0){
	    	$("#wiki_edit_view_secondary").before('<a href="#" class="btn btn-primary addUSUTools"><i class="fa fa-rocket" style="font-size: 18px;"></i> Launch USU Tools</a>');
			$(".addUSUTools").click(function (e){
				e.preventDefault();
				editorExistenceCheck('wiki');
			});
		}
		// Assignments Page
		if($("#edit_assignment_wrapper").length>0){
			$("#editor_tabs").before('<a href="#" class="btn btn-primary addUSUTools"><i class="fa fa-rocket" style="font-size: 18px;"></i> Launch USU Tools</a>');
			$(".addUSUTools").click(function (e){
				e.preventDefault();
				editorExistenceCheck('assignment');
			});
		}
		// Make some changes before page is saved
		$(submitButton).click(function (e){
			// e.preventDefault();
			// Handle when a box was unchecked but the remove button wasn't clicked
			$(iframeID).contents().find(".toRemove").removeClass("toRemove");
			// If the current theme doesn't support bottom-banner, remove it
			var templateClass = $(iframeID).contents().find("#template-wrapper").attr("class");
			if($.inArray(templateClass, bottomBannerThemeArray) == -1){
				$(iframeID).contents().find('#banner-bottom').attr("data-mce-style", "").remove();
			}
		});

		////// WIKI-PAGE //////
			function setupWikiPage(){

				// Add the tools section in the right panel if it doesn't exist
					if(!$("#custom-tools-accordion").length>0){
						createToolsWrapper();

						// Add tools for custom-tools-accordion
							// alert("why aren't you cooperating?");
							toolsOverview();
							themeTool();
							sectionsTool(wikiSections, mceInstance);
							accordionTabsTool(mceInstance);
							advancedListsTool(mceInstance);
							bordersAndSpacingTool(mceInstance);
							customButtons(mceInstance);
							contentIcons(mceInstance);
							customHighlights(mceInstance);
							popupContent(mceInstance);
							progressBar();
							quickCheck(mceInstance);
							customTables(mceInstance);

						// activate the accordion
						initializeToolsAccordion();

						// Some aspects need to make sure the mceEditor has time to load
						setTimeout(function(){
							if($(iframeID).length>0){
								addStyletoIframe();
								$("a:contains('HTML Editor')").get(0).scrollIntoView();
								customCSSCheck();
								displayTypes();
								setDisplay();
							}
						}, 300);
					}
					$(".addUSUTools").remove();
					$("#usu_tools").append('<a href="#" class="btn btn-mini addStyletoIframe" style="margin:5px 0 0 5px;" data-tooltip="bottom" title="Click this if the css styles are not showing up in the editor"><i class="fa fa-magic"></i> Add Style to Editor</a>');
					// Button to strip out empty elements
					$("#usu_tools").append(' <a class="btn btn-mini remove-empty" href="#" data-tooltip="left"\
						title="This button will clean up the page contents by removing any empty elements.<p>This is especially useful when using the <i class=\'icon-collection-save\'></i> feature.</p>">\
						<i class="icon-trash"></i> Clear Empty Elements</a>');
						removeEmpty();
					$(".addStyletoIframe").click(function (e){
						e.preventDefault();
						addStyletoIframe();
						$("a:contains('HTML Editor')").get(0).scrollIntoView();
					});
			}
			// Remove tools button if they click cancel.
		    $("#cancel_editing").click(function (e){
		    	e.preventDefault();
		    	$(".addUSUTools").remove();
		    });
		////// ASSIGNMENTS //////
			function setupAssignmentPage(){
				
				
				createToolsWrapper();
				// Add tools for custom-tools-accordion
					toolsOverview();
					themeTool();
					sectionsTool(wikiSections, mceInstance);
					accordionTabsTool(mceInstance);
					advancedListsTool(mceInstance);
					bordersAndSpacingTool(mceInstance);
					customButtons(mceInstance);
					contentIcons(mceInstance);
					customHighlights(mceInstance);
					popupContent(mceInstance);
					progressBar();
					quickCheck(mceInstance);
					studentVerification();
					customTables(mceInstance);
				// activate the accordion
				initializeToolsAccordion();

				setTimeout(function(){
					addStyletoIframe();
					displayTypes();
					setDisplay();
				}, 600);
				$(".addUSUTools").remove();
				$("#usu_tools").append('<a href="#" class="btn btn-mini addStyletoIframe" style="margin:5px 0 0 5px;" data-tooltip="bottom" title="Click this if the css styles are not showing up in the editor"><i class="fa fa-magic"></i> Add Style to Editor</a>');
				// Button to strip out empty elements
				$("#usu_tools").append(' <a class="btn btn-mini remove-empty" href="#" data-tooltip="left"\
					title="This button will clean up the page contents by removing any empty elements.<p>This is especially useful when using the <i class=\'icon-collection-save\'></i> feature.</p>">\
					<i class="icon-trash"></i> Clear Empty Elements</a>');
					removeEmpty();
				$(".addStyletoIframe").click(function (e){
					e.preventDefault();
					addStyletoIframe();
					$("a:contains('HTML Editor')").get(0).scrollIntoView();
				});
			}
	}());

///////////////////////////////
//    INTERFACE SETUP        //
///////////////////////////////

	// Styles and code to be applied to TinyMCE editor
		function addStyletoIframe(){
			// console.log("add style ran");
			if(!$(iframeID).contents().find("body").hasClass('hasStyle')){
				var $head = $(iframeID).contents().find("head");
				var timestamp =  +(new Date());                
				$head.append($("<link/>", { rel: "stylesheet", href: "/assets/vendor.css?1380315297", type: "text/css" }));
				$head.append($("<link/>", { rel: "stylesheet", href: "https://elearn.usu.edu/canvasCustomTools/css/canvasMCEEditor.css?"+timestamp, type: "text/css" }));
				$head.append($("<link/>", { rel: "stylesheet", href: "https://elearn.usu.edu/canvastest_branding/css/canvasGlobal.css?"+timestamp, type: "text/css" }));
				$head.append($("<link/>", { rel: "stylesheet", href: "https://elearn.usu.edu/canvasCustomTools/css/canvasTemplates.css?"+timestamp, type: "text/css" }));
				$head.append($("<link/>", { rel: "stylesheet", href: "/assets/common.css?1376338847", type: "text/css" }));
				$head.append($("<link/>", { rel: "stylesheet", href: "https://elearn.usu.edu/canvasCustomTools/font-awesome-4.0.3/css/font-awesome.min.css?"+timestamp, type: "application/font-woff" }));
				if($(iframeID).contents().find("#custom-css").length>0){
					$head.append($("<link/>", { rel: "stylesheet", href: "/courses/" + coursenum + "/file_contents/course%20files/global/css/style.css?"+timestamp, type: "text/css" }));
				}
				$(iframeID).contents().find("body").css('background-image', 'none').addClass('hasStyle');;
			}
		}
		function displayTypes(){
			$(".mceSectionView, .mceLabelsView").click(function (e){
				e.preventDefault();
				$(this).toggleClass("active");
				$(".mcePreview").removeClass("active");
				setDisplay();
			});
			$(".mcePreview").click(function (e){
				e.preventDefault();
				$(this).addClass("active");
				$(".mceSectionView, .mceLabelsView").removeClass("active");
				setDisplay();
			});		
		}
		function setDisplay(){
			var bodyClass = "mceContentBody";
			if(!$(".mceEditorView .active").length>0){
				$(".mcePreview").addClass("active");
			}
			$(".mceEditorView .active").each(function (e){
				bodyClass += " "+$(this).attr("rel");
			});
			$(iframeID).contents().find("#tinymce").attr("class", bodyClass);
			$("a:contains('HTML Editor')").get(0).scrollIntoView();
		}

	// Custom Tools side panel setup
		function createToolsWrapper(){
			if(!$("#custom-tools-wrapper").length>0){
				// Wrap existing Canvas Page Tools
				if($("#editor_tabs").length>0){
					$("#editor_tabs").wrap('<div id="custom-tools-wrapper" class="tabs" />').wrap('<div id="canvas_tools" />');
				}

				// Create tabs for Canvas Tools and USU Tools
				var tabNavigation = '<ul>\
						<li><a href="#canvas_tools" class="custom-tool-tab">Canvas Tools</a></li>\
						<li><a href="#usu_tools" id="toolsTrigger" class="custom-tool-tab">USU Tools</a></li>\
					</ul>';
				$("#custom-tools-wrapper").append('<div id="usu_tools" />').prepend(tabNavigation);
				$("#custom-tools-wrapper").tabs({active: 1});
				$("#usu_tools").html('<div class="btn-group-label">\
					<span>Editor View: </span>\
					<div class="btn-group mceEditorView">\
					<a href="#" class="btn btn-mini mceLabelsView" rel="mce-visualblocks">Labels</a>\
					<a href="#" class="btn btn-mini mceSectionView active" rel="mce-visualSections">Sections</a>\
					</div>\
					<a href="#" class="btn btn-mini mcePreview" rel="">Preview</a>\
					</div>\
					<div id="custom-tools-accordion" />');
				$("#toolsTrigger").click(function (e){
					e.preventDefault();
					$("a:contains('HTML Editor')").get(0).scrollIntoView();
				});
				bindHover();
			}
		}

	// Create an accordion in right panel after tools are added
		function initializeToolsAccordion(){
			var icons = {
				header: "ui-icon-triangle-1-e",
				activeHeader: "ui-icon-triangle-1-s"
			};
			$("#custom-tools-accordion").accordion({
				heightStyle: "content",
				icons: icons,
				active: 0 //which panel is open by default
			});
			$(".ui-accordion-header").click(function(){
		    	addStyletoIframe();
		    });
			$( "#toggle" ).button().click(function() {
				if ( $( "#accordion" ).accordion( "option", "icons" ) ) {
					$( "#accordion" ).accordion( "option", "icons", null );
				} else {
					$( "#accordion" ).accordion( "option", "icons", icons );
				}
			});
			$(".activateButtons").click(function (e){
				e.preventDefault();
				$("#custom-tools-accordion").accordion({ active: 6});
			});
			// $(".activateIcons").click(function (e){
			// 	e.preventDefault();
			// 	$("#custom-tools-accordion").accordion({ active: 7});
			// });
			$(".activateSections").click(function(){
				$("#custom-tools-accordion").accordion({ active: 2});
			});
		};

	////// On Ready/Click functions  //////

	////// Supporting functions  //////
		function bindHover(){
			$(".sections-list li").mouseover(function() {
				var el = $(this);
				var connectedSection = $(this).find("input").attr("value");
				var timeoutID = setTimeout(function() {
					$(iframeID).contents().find("."+connectedSection).addClass("sectionHover");
					scrollToElement("."+connectedSection);
				}, 500);
				el.mouseout(function(){
					var connectedSection = $(this).find("input").attr("value");
					$(iframeID).contents().find("."+connectedSection).removeClass("sectionHover");
					clearTimeout(timeoutID);
				});
			});
			$("#accordionPanels li, #tabPanels li, .sections_li li, ").mouseover(function() {
				var el = $(this);
				var connectedSection = $(this).attr("rel");
				var timeoutID = setTimeout(function() {
					$(iframeID).contents().find(connectedSection).addClass("sectionHover");
					scrollToElement(connectedSection);
				}, 500);
				el.mouseout(function(){
					var connectedSection = $(this).attr("rel");
					$(iframeID).contents().find(connectedSection).removeClass("sectionHover");
					clearTimeout(timeoutID);
				});
			});
		}
		 // Show/Hide remove unchecked sections button
        function checkRemove() {
            if ($(iframeID).contents().find(".toRemove").length > 0) {
                $(".removeSectionsWrapper").show();
            } else {
                $(".removeSectionsWrapper").hide();
            }
        }
		function scrollToElement(targetElement){
			$(tinymce.activeEditor.getBody()).find(targetElement).get(0).scrollIntoView();
			$("a:contains('HTML Editor');").get(0).scrollIntoView();
		}
		function highlightNewElement(targetElement){
			$(iframeID).contents().find(targetElement).addClass("sectionHover");
			setTimeout(function(){
				$(iframeID).contents().find(targetElement).removeClass("sectionHover");
			}, 1000);
		}
		// When an element is unchecked, it will highlight it and jump to it in content area
        function markToRemove(targetSection) {
            $(iframeID).contents().find(targetSection).addClass("toRemove");
            scrollToElement(targetSection);
            checkRemove();
        }

///////////////////////////////
//    INTRODUCTION PORTION   //
///////////////////////////////

		function toolsOverview(){
			var addAccordionSection = '<h3>\
					USU Tools Overview\
				</h3>\
				<div>\
					<p><small>Below you will find a collection of tools designed to assist course creation at USU.</small></p>\
					<p><small>These tools may be added to or changed as new needs arise.</small></p>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
		}

///////////////////////////////
//    ACCORDION | TABS       //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function accordionTabsTool(mceInstance){
			var addAccordionSection = '<h3>\
					Accordion | Tabs\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Accordion/Tabs Tool</div>\
					  	<div class=\'popover-content\'>\
						  	<p>This section includes controls for adding in a custom accordion group or tab group.</p>\
						  	<p>Once added, the accordion sections position in the page can be moved using the &ldquo;Sections&rdquo; tool.</p>\
			  			</div>">\
					  &nbsp;<span class="screenreader-only">About Accordion/Tabs tool.</span>\
					</a>\
				</h3>\
				<div>\
					<p style="margin-bottom: 10px;"><small><em>Insert an accordion or tab widget at current <strong>cursor position</strong></em></small></p>\
					<div class="btn-group accordionOrTabs" style="margin-bottom:10px;">\
						<a href="#" class="btn btn-small active" rel="accordion">Accordion</a>\
						<a href="#" class="btn btn-small" rel="tabs">Tabs</a>\
					</div>\
					<div class="accordionOptions bordered-section">\
						<h4>Accordion Widget<a class="deleteAccTool remove icon-end pull-right" href="#" data-tooltip="left" title="Delete Accordion Widget.">\
								<span class="screenreader-only">Delete Accordion Widget</span>\
							</a></h4>\
						<form class="form-inline" style="text-align: center;"><input id="newAccPanel" type="text" placeholder="New Panel Title"><a href="#" id="addAccPanel" class="btn" data-tooltip="left" title="<p>If no accordion exits, this will create one.</p><p>If an accordion exists, this will add a new section.</p>"><i class="icon-add"></i><span class="screenreader-only">Add Accordion Section</span></a></form>\
						<ul id="accordionPanels" class="unstyled"></ul>\
					</div>\
					<div class="tabsOptions bordered-section" style="display:none;">\
						<h4>Tabs Widget<a class="deleteTabTool remove icon-end pull-right" href="#" data-tooltip="left" title="Delete Tabs Widget.">\
								<span class="screenreader-only">Delete Tabs Widget</span>\
							</a></h4>\
						<form class="form-inline" style="text-align: center;"><input id="newTabPanel" type="text" placeholder="New Tab Title"><a href="#" id="addTabPanel" class="btn" data-tooltip="left" title="<p>If no tab section exits, this will create one.</p><p>If an tabs exists, this will add a new section.</p>"><i class="icon-add"></i><span class="screenreader-only">Add Tab Section</span></a></form>\
						<ul id="tabPanels" class="unstyled"></ul>\
						<div class="btn-group-label">\
							<span>Style:</span>\
							<div class="btn-group">\
								<a href="#" class="btn btn-mini tabRegular active" data-tooltip="top" title="Tab content area is bordered on all sides.">Regular Tabs</a> \
								<a href="#" class="btn btn-mini tabMinimal" data-tooltip="top" title="Tab content area only has a top border.">Minimal Tabs</a> \
							</div>\
						</div>\
					</div>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			accordionTabsToolReady(mceInstance);
			// $(iframeID).contents().find(".custom-accordion h3").each(function(){
			// 	$(this).find("a").contents().unwrap();
			// });
			// $(iframeID).contents().find(".tabbed-section h4").each(function(){
			// 	$(this).find("a").contents().unwrap();
			// });
			getAccPanels();
			getTabPanels();
			if($("#breadcrumbs .ellipsible:last").text() == "Start Here"){
				$("#usu_tools").prepend('<a href="#" class="btn btn-mini btn-primary importStartHere"><i class="fa fa-cloud-download"></i> Import &ldquo;Start Here&rdquo; Boilerplate</a>');
				$(".importStartHere").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find("body").html(startHereContent);
					identifySections(wikiSections);
				});
			}
		}

	//// On Ready/Click functions  //////
		function accordionTabsToolReady(mceInstance){
			//// TYPE SELECTOR ////
				$(".accordionOrTabs a").click(function (e){
					e.preventDefault();
					$(".accordionOrTabs a").each(function (e){
						$(this).removeClass("active");
					});
					$(this).addClass("active");
					var activeSection = $(this).attr("rel");
					$(".accordionOptions").hide();
					$(".tabsOptions").hide();
					$("."+activeSection+"Options").show();
					if($(".custom-"+activeSection).length>0){
						scrollToElement(".custom-"+activeSection);
					}
				});
			//// ACCORDION ////
				// Add a new panel to bottom of list
					$('#addAccPanel').click(function (e){
						e.preventDefault();
						addAccPanel();

					});
				// Remove accordion section
					$(".deleteAccPanel").click(function(){
						var panelToRemove = $(this).attr('rel');
						// console.log(panelToRemove);
						$(this).parent('li').remove();
						$(iframeID).contents().find(panelToRemove).remove();
					});
					
				// create a new section if return/enter is pressed in the new section field
					$("#newAccPanel").keydown(function(event){
						if(event.keyCode == 13) {
							event.preventDefault();
							addAccPanel();
							return false;
						}
					});

			//// TABS ////
				// Add a new panel to bottom of list
					$('#addTabPanel').click(function (e){
						e.preventDefault();
						addTabPanel();

					});
				// Remove tab section
					$(".deleteTabPanel").click(function(){
						var panelToRemove = $(this).attr('rel');
						$(this).parent('li').remove();
						$(iframeID).contents().find(panelToRemove).remove();
					});
				// create a new section if return/enter is pressed in the new section field
					$("#newTabPanel").keydown(function(event){
						if(event.keyCode == 13) {
							event.preventDefault();
							addTabPanel();
							return false;
						}
					});
				// Tab style
					$(".tabMinimal").click(function (e){
						e.preventDefault();
						$(iframeID).contents().find(".tabbed-section").addClass("ui-tabs-minimal");
						$(this).addClass("active");
						$(".tabRegular").removeClass("active");
					});
					$(".tabRegular").click(function (e){
						e.preventDefault();
						$(iframeID).contents().find(".tabbed-section").removeClass("ui-tabs-minimal");
						$(this).addClass("active");
						$(".tabMinimal").removeClass("active");
					});
		}

	////// Supporting functions  //////
		// Accordion //
			function accordionCheck(){
				if(!$(iframeID).contents().find('.custom-accordion').length>0){
					templateCheck();
					$(".deleteAccTool").show();
					deleteAccordion();
					// Grab name from text field
						var newPanelName = "Accordion Widget";
					// Create a new class using the section name
						var newPanelClass = "custom-accordion";
					// Insert the new section into the TinyMCE editor at cursor
						tinyMCE.execCommand('mceInsertContent', false, '<div class="custom-accordion"></div><p>&nbsp;</p>');
					// Bind a change function to bring up the remove button when unchecked
						$('.customSection').change(function (){
							if($(this).is(":checked")) {
								templateCheck();
								checkSection(this.value);
							} else {
								var targetSection = "."+this.value;
                            	markToRemove(targetSection);
							}
						});
						$('#newAccPanel').focus();
				}
			}
			function addAccPanel(){
				accordionCheck();
				// Grab name from text field
					var newAccPanelName = $("#newAccPanel").val();
					if(newAccPanelName !== ""){
					// Create a new class using the section name
						if($(iframeID).contents().find(".custom-accordion h4").length>0){
							var panelCount = $(iframeID).contents().find(".custom-accordion h4").length;
							var panelNum = panelCount;
						} else {
							var panelNum = 0;
						}

						var newPanelClass = "panel"+panelNum;
					// Insert the new section into the TinyMCE editor
						var newPanel = '<h4 class="'+newPanelClass+'">'+newAccPanelName+'</h4>\
							<div class="'+newPanelClass+'">\
								<p>'+newAccPanelName+' panel contents.</p>\
							</div>';
						// If there is already an accordion, append the new one, otherwise overwrite the empty div
						if($(iframeID).contents().find(".custom-accordion h4").length>0){
							$(iframeID).contents().find(".custom-accordion").append(newPanel);
						} else {
							$(iframeID).contents().find(".custom-accordion").html(newPanel);
						}
					// Clear the section name field
						$("#newAccPanel").val("");
					// Put focus on new section
						scrollToElement('.'+newPanelClass);
						highlightNewElement('.'+newPanelClass);
						bindHover();
					// Bind a change function to bring up the remove button when unchecked
						$('.customSection').change(function (){
							if($(this).is(":checked")) {
								templateCheck();
								checkSection(this.value);
							} else {
								var targetSection = "."+this.value;
                            markToRemove(targetSection);
							}
						});
						deleteAccPanel();
					}
			}
			function deleteAccordion(){
				$(".deleteAccTool").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find(".custom-accordion-wrapper").remove();
					$(iframeID).contents().find(".custom-accordion").remove();
					$("#accordionPanels").empty();
					$(".deleteAccTool").hide();
				});
			}
			function deleteAccPanel(){
				// Bind Delete
				$(".deleteAccPanel").click(function(){
					var panelToRemove = $(this).attr('rel');
					$(this).parent('li').remove();
					$(iframeID).contents().find(panelToRemove).remove();
				});
			}
			function getAccPanels(){
				if($(iframeID).contents().find(".custom-accordion").length>0){
					// Original accordions used h3 update to h4 on edit
					if($(iframeID).contents().find(".custom-accordion h3").length>0){
						console.log("change h3 to h4");
						$(iframeID).contents().find(".custom-accordion h3").each(function (){
							var accordionTitle = $(this).html();
							$(this).replaceWith('<h4>'+accordionTitle+'</h4>');
						});
					}
					if($(iframeID).contents().find(".custom-accordion").length>0 && !$(iframeID).contents().find(".custom-accordion-wrapper").length>0){
						$(iframeID).contents().find(".custom-accordion").wrap('<div class="custom-accordion-wrapper" />');
					}
					// update the classes to increment panels
					$(iframeID).contents().find(".custom-accordion h4").each(function(i){
						$(this).attr('class', 'panel'+i);
						var panelTitle = $(this).text();
						$("#accordionPanels").append('<li rel=".panel'+i+'">\
							<span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
							'+panelTitle+'\
							<a class="deleteAccPanel remove icon-end pull-right" rel=".panel'+i+'" href="#" data-tooltip="left" title="Delete this panel.">\
								<span class="screenreader-only">Delete Accordion Panel</span>\
							</a></li>');
					});
					$(iframeID).contents().find(".custom-accordion div").each(function(i){
						$(this).attr('class', 'panel'+i);
					});
					$(".deleteAccTool").show();
				} else {
					$(".deleteAccTool").hide();
				}
				$( "#accordionPanels" ).sortable({
					update: function( event, ui ) {
						// loop through the checked panels and move or add them
						$('#accordionPanels li').each(function (i) {
							var panelClass = $(this).attr('rel');
							$(iframeID).contents().find(".custom-accordion").append($(iframeID).contents().find('h4'+panelClass));
							$(iframeID).contents().find(".custom-accordion").append($(iframeID).contents().find('div'+panelClass));
						});
					}
				});
				$( "#accordionPanels" ).disableSelection();
				deleteAccPanel();
				deleteAccordion();
			}

		// Tabs //
			function tabsCheck(){
				if(!$(iframeID).contents().find('.tabbed-section').length>0){
					templateCheck();
					$(".deleteTabTool").show();
					deleteTabPanel();
					deleteTabSection();
					// Insert the new section into the TinyMCE editor
					if($(".tabMinimal").hasClass("active")){
						tinyMCE.execCommand('mceInsertContent', false, '<div class="tabbed-section ui-tabs-minimal" /><p>&nbsp;</p>');
					} else {
						tinyMCE.execCommand('mceInsertContent', false, '<div class="tabbed-section" /><p>&nbsp;</p>');
					}
					$('#newTabPanel').focus();
				}
			}
			function addTabPanel(){
				tabsCheck();
				// Grab name from text field
					var newTabPanelName = $("#newTabPanel").val();
					if(newTabPanelName !== ""){
					// Create a new class using the tab li
						if($(iframeID).contents().find(".tabbed-section h4").length>0){
							var panelCount = $(iframeID).contents().find(".tabbed-section h4").length;
							var panelNum = panelCount;
						} else {
							var panelNum = 0;
						}

						var newPanelClass = "tab-"+panelNum;
					// Insert the new section into the TinyMCE editor

						var newPanel = '<h4 class="'+newPanelClass+'">'+newTabPanelName+'</h4>\
							<div id="tab-'+panelNum+'" class="tab-content '+newPanelClass+'">\
								<p>'+newTabPanelName+' panel contents.</p>\
							</div>';
							// If there is already an accordion, append the new one, otherwise overwrite the empty div
						if($(iframeID).contents().find(".tabbed-section h4").length>0){
							$(iframeID).contents().find(".tabbed-section").append(newPanel);
						} else {
							$(iframeID).contents().find(".tabbed-section").html(newPanel);
						}
					// Create an <li> for this section in the Sections List
						$("#tabPanels").append('<li rel=".'+newPanelClass+'"><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
							<a href="#" class="mt-markCurrent" rel="'+newPanelClass+'" title="Mark as default open tab"><i class="icon-check"></i><span class="screenreader-only">Mark as default open</span></a>\
							'+newTabPanelName+'\
							<a class="deleteTabPanel remove icon-end pull-right" rel=".'+newPanelClass+'" href="#" data-tooltip="left" title="Delete this panel.">\
								<span class="screenreader-only">Delete Tab Panel</span>\
							</a></li>');
					// Put focus on new section
						scrollToElement('.'+newPanelClass);
						highlightNewElement('.'+newPanelClass);
						bindHover();
					// Clear the section name field
						$("#newTabPanel").val("");

						deleteTabPanel();
					}
					$("#tabPanels").sortable({
						update: function( event, ui ) {
							// loop through the checked panels and move or add them
							$('#tabPanels li').each(function (i) {
								var panelClass = $(this).attr('rel');
								$(iframeID).contents().find(".tabbed-section").append($(iframeID).contents().find('h4'+panelClass));
								$(iframeID).contents().find(".tabbed-section").append($(iframeID).contents().find('div'+panelClass));
							});
						}
					});
					$("#tabPanels").disableSelection();
					markCurrent();
			}
			function deleteTabSection(){
				$(".deleteTabTool").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find(".tabbed-section").remove();
					$("#tabPanels").empty();
					$(".deleteTabTool").hide();
					$(".tabsOptions form").show();
				});
			}
			function deleteTabPanel(){
				// Bind Delete
					$(".deleteTabPanel").click(function(){
						var panelToRemove = $(this).attr('rel');
						$(this).parent('li').remove();
						$(iframeID).contents().find(panelToRemove).remove();
					});
			}
			function getTabPanels(){
				$("#tabPanels").html("");
				if($(iframeID).contents().find(".tabbed-section").length>0){
					$(iframeID).contents().find(".tabbed-section h4").each(function(i){
						if($(this).hasClass("current")){
							$(this).attr('class', 'tab-'+i+' current');
							var identifyCurrent = " current";
						} else {
							$(this).attr('class', 'tab-'+i);
							var identifyCurrent = "";
						}
						var panelTitle = $(this).text();
						var sortableImage = '<span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>';
						$("#tabPanels").append('<li rel=".tab-'+i+'">\
							'+sortableImage+'\
							<a href="#" class="mt-markCurrent'+identifyCurrent+'" rel="tab-'+i+'" title="Mark as default open tab"><i class="icon-check"></i><span class="screenreader-only">Mark as default open</span></a>\
							'+panelTitle+'\
							<a class="deleteTabPanel remove icon-end pull-right" rel=".tab-'+i+'" href="#" data-tooltip="left" title="Delete this panel.">\
								<span class="screenreader-only">Delete Tab Panel</span>\
							</a></li>');
					});
					$(iframeID).contents().find(".tabbed-section div").each(function(i){
						if($(this).hasClass("current")){
							$(this).attr('class', 'tab-content tab-'+i+' current');
						} else {
							$(this).attr('class', 'tab-content tab-'+i);
						}
						$(this).attr('id', 'tab-'+i);
					});
					$(".deleteTabTool").show();
					if($(iframeID).contents().find(".tabbed-section").hasClass("ui-tabs-minimal")){
						$(".tabMinimal").addClass("active");
					} else {
						$(".tabRegular").addClass("active");
					}
				} else {
					$(".deleteTabTool").hide();
				}
				$("#tabPanels").sortable({
					update: function( event, ui ) {
						// loop through the checked panels and move or add them
						$('#tabPanels li').each(function (i) {
							var panelClass = $(this).attr('rel');
							$(iframeID).contents().find(".tabbed-section").append($(iframeID).contents().find('h4'+panelClass));
							$(iframeID).contents().find(".tabbed-section").append($(iframeID).contents().find('div'+panelClass));
						});
					}
				});
				$("#tabPanels").disableSelection();
				deleteTabPanel();
				deleteTabSection();
				markCurrent();
				// Check for old tabs layout and alert about update
				if($(iframeID).contents().find(".custom-tabs").length>0){
					$('.tabsOptions').append('<div class="alert alert-error">Tabs have been updated to be more versital, these controls will not work with your current tabs</div>');
				}
			}
			function markCurrent(){
				$(".mt-markCurrent").click(function (e){
					e.preventDefault();
					var tabNum = $(this).attr("rel");
					$(iframeID).contents().find(".current").removeClass("current");
					$(iframeID).contents().find("."+tabNum).addClass("current");
					$(iframeID).contents().find("#"+tabNum).addClass("current");
					$("#tabPanels .current").removeClass("current");
					$(this).addClass("current");
					scrollToElement(".tabbed-section");
				});
			}

///////////////////////////////
//    ADVANCED LISTS         //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function advancedListsTool(mceInstance){
			var addAccordionSection = '<h3>\
					Advanced Lists\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Advanced Lists Tool</div>\
					  	<div class=\'popover-content\'>\
						  	<p><strong>Definiton Lists</strong></p>\
						  	<p>This tool allows you to add Definition lists (horizontal or vertical).<br>\
						  	<em>Example:</em></p>\
						  	<dl style=\'margin:5px 0;border:solid 1px #cccccc;padding: 3px;\'><dt>Term</dt><dd>Definition</dd></dl>\
						  	<p><strong>Unstyle Lists</strong></p>\
			  				<p>This tool will also allow you to remove bullets or numbers from existing lists in your content.</p>\
			  			</div>">\
					  &nbsp;<span class="screenreader-only">About advanced lists.</span>\
					</a>\
				</h3>\
				<div>\
					<div class="btn-group listType">\
						<a href="#" class="btn btn-small active" rel=".olulSection">Ordered/Unordered</a>\
						<a href="#" class="btn btn-small" rel=".defListSection">Definition</a>\
					</div>\
					<div class="olulSection bordered-section" style="margin-top:10px;">\
						<h4>Ordered/Unordered List</h4>\
						<p style="margin: 5px 0;"><small>Select an <span class="text-warning"><strong>existing list</strong></span> in your content.</small></p>\
						<div class="btn-group-label bordered-section">\
							<span>List Style:</span><br>\
							<div class="btn-group">\
								<a class="btn btn-mini listStyleType" href="#" rel="list-style-type: decimal" data-tooltip="top" title="Decimal">1</a>\
								<a class="btn btn-mini listStyleType" href="#" rel="list-style-type: decimal-leading-zero" data-tooltip="top" title="Decimal with leading zero">01</a>\
								<a class="btn btn-mini listStyleType" href="#" rel="list-style-type: lower-alpha;" data-tooltip="top" title="Lower Alpha">a</a>\
								<a class="btn btn-mini listStyleType" href="#" rel="list-style-type: upper-alpha;" data-tooltip="top" title="Upper Alpha">A</a>\
								<a class="btn btn-mini listStyleType" href="#" rel="list-style-type: lower-roman;" data-tooltip="top" title="Lower Roman">i</a>\
								<a class="btn btn-mini listStyleType" href="#" rel="list-style-type: upper-roman;" data-tooltip="top" title="Upper Roman">I</a>\
							</div><br>\
							<div class="btn-group" style="margin-top:5px;">\
								<a class="btn btn-mini listStyleType" href="#" rel="list-style-type: circle;">Circle</a>\
								<a class="btn btn-mini listStyleType" href="#" rel="list-style-type: disc;">Disc</a>\
								<a class="btn btn-mini listStyleType" href="#" rel="list-style-type: square;">Square</a>\
								<a class="btn btn-mini listStyleType" href="#" rel="list-style-type: none;" data-tooltip="top" title="No Numbering or bullets">None</a>\
							</div>\
						</div>\
						<div class="btn-group-label">\
							<div class="btn-group">\
								<a class="btn btn-mini outdentList" data-tooltip="top" title="Outdent list one level"><i class="icon-outdent2"></i> Outdent</a>\
								<a class="btn btn-mini indentList" data-tooltip="top" title="Indent list one level"><i class="icon-indent2"></i> Indent</a>\
							</div>\
							<span>Nested List</span>\
						</div>\
						<div class="btn-group-label">\
							<div class="btn-group">\
								<a class="btn btn-mini pillList" href="#" data-tooltip="top" title="Example: <ul class=\'pill\'><li>item 1</li><li>item 2</li><li>item 3</li></ul>">Pill List on/off</a>\
							</div>\
							<span>Pill List</span>\
						</div>\
						<p style="margin: 5px 0;"><small>Add <a href="#" class="activateIcons">Icons</a> for additional customization</small></p>\
					</div>\
					<div class="defListSection bordered-section" style="display:none; margin-top:10px;">\
						<h4>Definition List</h4>\
						<p><small>List will be added at <span class="text-warning"><strong>cursor position</strong></span></small></p>\
						<a class="addDefinitionList icon-add btn btn-mini" href="#" data-tooltip="left" title="Insert a definition list at cursor position."> New Definition List</a>\
						<a class="addDlItem icon-add btn btn-mini" href="#" data-tooltip="left" title="Add an item to definition list(s) in content area."> Add Item</a><br>\
						<div class="btn-group-label">\
							<span>Layout</span>:\
							<div class="btn-group">\
								<a class="dlHorizontal btn btn-mini" href="#" data-tooltip="left" title="Change definition list(s) to horizontal layout."> Horizontal</a>\
								<a class="dlVertical btn btn-mini" href="#" data-tooltip="left" title="Change definition list(s) to vertical layout."> Vertical</a>\
							</div>\
						</div>\
					</div>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			// accordionOptions();
			advancedListsReady(mceInstance);
		}	

	////// On Ready/Click functions  //////
		function advancedListsReady(mceInstance){
			//// TYPE SELECTOR ////
				$(".listType a").click(function (e){
					e.preventDefault();
					$(".listType a").each(function (e){
						$(this).removeClass("active");
					});
					$(this).addClass("active");
					var activeSection = $(this).attr("rel");
					// scrollToElement(".custom-"+activeSection);
					$(".olulSection").hide();
					$(".defListSection").hide();
					$(activeSection).show();
				});
			// Definition Lists
				$(".addDefinitionList").click(function (e){
					e.preventDefault();
					var insertDefList = '<dl><dt>Term</dt><dd>Definition</dd></dl><p>&nbsp;</p>';
					tinyMCE.execCommand('mceInsertContent', false, insertDefList);
				});
				$(".addDlItem").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find("dl").append('<dt>Term</dt><dd>Definition</dd>');
				});
				$(".dlHorizontal").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find("dl").addClass("dl-horizontal");
					$(this).addClass("active");
					$(".dlVertical").removeClass("active");
				});
				$(".dlVertical").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find("dl").removeClass("dl-horizontal");
					$(this).addClass("active");
					$(".dlHorizontal").removeClass("active");
				});
				$(".pillList").click(function (e){
					var ed = tinyMCE.get(mceInstance);
					var parentList = ed.dom.getParent(ed.selection.getNode(), 'ul, ol');
					// Get the styles from the parent element
						var currentClass = tinyMCE.DOM.getAttrib(parentList, 'class');
					// If the parent already has the class, remove it otherwise add it
						var regExpMatch = /\bpill\b/g;
						if (currentClass.match(regExpMatch)){
							tinyMCE.DOM.removeClass(parentList, 'pill');
							$(this).removeClass("active");
						} else {
							tinyMCE.DOM.addClass(parentList, 'pill');
							$(this).addClass("active");
						}
				});
				// $(".deleteDlItem").click(function (e){
				// 	e.preventDefault();
				// 	tinyMCE.activeEditor.dom.remove(ed.dom.getParent(ed.selection.getNode(), 'div.answerWrapper'));
				// });

			// Ordered/Unordered Lists
				$(".listStyleType").click(function (e){
					e.preventDefault();
					var selectedStyle = $(this).attr("rel");
					changeListStyle(mceInstance, selectedStyle);
				});
				$(".indentList").click(function (e){
					e.preventDefault();
					tinyMCE.execCommand('Indent');
				});
				$(".outdentList").click(function (e){
					e.preventDefault();
					tinyMCE.execCommand('Outdent');
				});
		}

	////// Supporting functions  //////
		function changeListStyle(mceInstance, selectedStyle){
			var ed = tinyMCE.get(mceInstance);
			// Get parent element
				var parentList = tinyMCE.DOM.getParent(ed.selection.getNode(), "ol, ul");
			// If it's unstyled, remove that class
				tinyMCE.DOM.removeClass(parentList, 'unstyled');
			// Get the styles from the parent element
				var currentStyle = tinyMCE.DOM.getAttrib(parentList, 'style');
			// Look through the classes for any class beginning with "icon-" and remove it
				var regExpMatch = /\b\list-style-type: \w+\-?\w+\-?\w+;\s?/g;
				var cleanedStyle = currentStyle.replace(regExpMatch, "");
			// Clean up an extra spaces
				var cleanedStyle = cleanedStyle.replace("  ", " ");
			// Grab the new class based on which icon link they clicked and combine with existing classes
				var newStyle = selectedStyle+" "+cleanedStyle;
			// Clean up extra spaces and add to parent
				var newStyle = newStyle.trim();
				tinyMCE.DOM.setAttrib(parentList, 'style', newStyle);
		}

///////////////////////////////
//    BORDERS AND SPACING    //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function bordersAndSpacingTool(mceInstance){
			var toolsAccordionSection = '<h3>\
				Borders and Spacing\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Borders and Spacing</div>\
					  	<div class=\'popover-content\'>\
						  	<p>This section contains tools for adding borders and spacing to paragraph tags, headings and divs<p>\
						  	<p>To use:</p>\
							<ol>\
								<li>Position the cursor anywhere in the paragraph, heading or div you want to style.</li>\
								<li>Click the button for the style you wish to add.</li>\
							</ol>\
							<p>To remove styling:</p>\
							<ol>\
								<li>Position the cursor anywhere in paragraph, heading or div containing the border or spacing.</li>\
								<li>Click the &ldquo;<i class=\'remove icon-end\'></i>&rdquo; button.</li>\
							</ol>\
			  			</div>">\
					  &nbsp;<span class="screenreader-only">About Borders and Spacing.</span>\
					</a>\
				</h3>\
				<div class="borders-spacing">\
				<div class="btn-group-label">\
					<span>Apply to:</span>\
					<div class="btn-group borderApply">\
						<a href="#" class="btn btn-mini active" rel="p, h2, h3, h4, h5">Paragraph/Heading</a>\
						<a href="#" class="btn btn-mini" rel="div">DIV</a>\
					</div>\
				</div>\
				<p><small>Place your <span class="text-warning"><strong>cursor</strong></span> within the element you want to edit.</small></p>\
				<div class="bordered-section">\
					<div class="btn-group-label"><span>Border:</span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini customBorders" rel="border border-trbl" data-tooltip="top" title="Full Borders"><span class="border border-trbl">&nbsp; &nbsp; &nbsp; </span></a>\
							<a href="#" class="btn btn-mini customBorders" rel="border border-rbl" data-tooltip="top" title="Right, Bottom and Left Borders"><span class="border border-rbl">&nbsp; &nbsp; &nbsp; </span></a>\
							<a href="#" class="btn btn-mini customBorders" rel="border border-tbl" data-tooltip="top" title="Top, Bottom, and Left Borders"><span class="border border-tbl">&nbsp; &nbsp; &nbsp; </span></a>\
							<a href="#" class="btn btn-mini customBorders" rel="border border-tl" data-tooltip="top" title="Top and Left Borders"><span class="border border-tl">&nbsp; &nbsp; &nbsp; </span></a>\
							<a href="#" class="btn btn-mini customBorders" rel="border border-b" data-tooltip="top" title="Bottom Border"><span class="border border-b">&nbsp; &nbsp; &nbsp; </span></a>\
							<a href="#" class="btn btn-mini customBorders" rel="border border-t" data-tooltip="top" title="Top Border"><span class="border border-t">&nbsp; &nbsp; &nbsp; </span></a>\
							<a href="#" class="btn btn-mini remove icon-end customBorders" rel="" data-tooltip="top" title="Remove borders from selected paragraph or heading.">&nbsp;</a>\
						</div>\
					</div>\
					<div class="btn-group-label"><span>Border Radius:</span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini customBorderRadius" rel="border-round" data-tooltip="top" title="All corners rounded"><span class="border border-trbl border-round">&nbsp; &nbsp; &nbsp; &nbsp; </span></a>\
							<a href="#" class="btn btn-mini customBorderRadius" rel="border-round-b" data-tooltip="top" title="Bottom corners rounded"><span class="border border-trbl border-round-b">&nbsp; &nbsp; &nbsp; &nbsp; </span></a>\
							<a href="#" class="btn btn-mini customBorderRadius" rel="border-round-t" data-tooltip="top" title="Top corners rounded"><span class="border border-trbl border-round-t">&nbsp; &nbsp; &nbsp; &nbsp; </span></a>\
							<a href="#" class="btn btn-mini customBorderRadius" rel="border-round-tl" data-tooltip="top" title="Top Left corner rounded"><span class="border border-trbl border-round-tl">&nbsp; &nbsp; &nbsp; &nbsp; </span></a>\
							<a href="#" class="btn btn-mini remove icon-end customBorderRadius" rel="" data-tooltip="top" title="Remove border radius from selected paragraph or heading.">&nbsp;</a>\
						</div>\
					</div>\
					<div class="btn-group-label"><span>Padding:</span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini customPadding" rel="pad-box-mega">Mega</a>\
							<a href="#" class="btn btn-mini customPadding" rel="pad-box">Normal</a>\
							<a href="#" class="btn btn-mini customPadding" rel="pad-box-mini">Mini</a>\
							<a href="#" class="btn btn-mini customPadding" rel="pad-box-micro">Micro</a>\
							<a href="#" class="btn btn-mini remove icon-end customPadding" rel="" data-tooltip="top" title="Remove padding from selected paragraph or heading.">&nbsp;</a>\
						</div>\
					</div>\
					<div class="btn-group-label"><span>Margin:</span><br>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini contentBox" rel="content-box" data-tooltip="top" title="Content boxes automatically clear their floated children and have default margins.">Regular</a>\
							<a href="#" class="btn btn-mini contentBox" rel="content-box-mini" data-tooltip="top" title="A mini content box has half the margin of the regular content box.">Mini</a>\
							<a href="#" class="btn btn-mini remove icon-end contentBox" rel="" data-tooltip="top" title="Remove content box from selected paragraph or heading.">&nbsp;</a>\
						</div>\
					</div>\
				</div>\
				</div>';
			$("#custom-tools-accordion").append(toolsAccordionSection);
			bordersAndSpacingReady(mceInstance);
		}
	////// On Ready/Click functions  //////
		function bordersAndSpacingReady(mceInstance){
			$(".borderApply a").click(function (e){
				e.preventDefault();
				$(".borderApply a").each(function(){
					$(this).removeClass("active");
				});
				$(this).addClass("active");
			});
			$(".customBorders").click(function (e){
				e.preventDefault();
				var ed = tinyMCE.get(mceInstance);
				var myClass = $(this).attr('rel');
				var elementType = $(".borderApply a.active").attr('rel');
				// console.log(elementType);
				var parentElement = ed.dom.getParent(ed.selection.getNode(), elementType);
				removeBorders(parentElement);
				tinyMCE.DOM.addClass(parentElement, myClass);
			});
			$(".customBorderRadius").click(function (e){
				e.preventDefault();
				var ed = tinyMCE.get(mceInstance);
				var myClass = $(this).attr('rel');
				var elementType = $(".borderApply a.active").attr('rel');
				// console.log(elementType);
				var parentElement = ed.dom.getParent(ed.selection.getNode(), elementType);
				removeBorderRadius(parentElement);
				tinyMCE.DOM.addClass(parentElement, myClass);
			});
			$(".customPadding").click(function (e){
				e.preventDefault();
				var ed = tinyMCE.get(mceInstance);
				var myClass = $(this).attr('rel');
				var elementType = $(".borderApply a.active").attr('rel');
				// console.log(elementType);
				var parentElement = ed.dom.getParent(ed.selection.getNode(), elementType);
				removePadding(parentElement);
				tinyMCE.DOM.addClass(parentElement, myClass);
			});
			$(".contentBox").click(function (e){
				e.preventDefault();
				var ed = tinyMCE.get(mceInstance);
				var myClass = $(this).attr('rel');
				var elementType = $(".borderApply a.active").attr('rel');
				// console.log(elementType);
				var parentElement = ed.dom.getParent(ed.selection.getNode(), elementType);
				removeContentBox(parentElement);
				tinyMCE.DOM.addClass(parentElement, myClass);
			});
			// $(".contentBoxDiv").click(function (e){
			// 	e.preventDefault();
			// 	var ed = tinyMCE.get(mceInstance);
			// 	var myClass = $(this).attr('rel');
			// 	var parentElement = ed.dom.getParent(ed.selection.getNode(), 'div');
			// 	removeContentBox(parentElement);
			// 	tinyMCE.DOM.addClass(parentElement, myClass);
			// });
		}

	////// Supporting functions  //////
		function removeBorders(parentElement){
			tinyMCE.DOM.removeClass(parentElement, 'border');
			tinyMCE.DOM.removeClass(parentElement, 'border-trbl');
			tinyMCE.DOM.removeClass(parentElement, 'border-rbl');
			tinyMCE.DOM.removeClass(parentElement, 'border-tbl');
			tinyMCE.DOM.removeClass(parentElement, 'border-tl');
			tinyMCE.DOM.removeClass(parentElement, 'border-b');
			tinyMCE.DOM.removeClass(parentElement, 'border-t');
		}
		function removeBorderRadius(parentElement){
			tinyMCE.DOM.removeClass(parentElement, 'border-round');
			tinyMCE.DOM.removeClass(parentElement, 'border-round-b');
			tinyMCE.DOM.removeClass(parentElement, 'border-round-t');
			tinyMCE.DOM.removeClass(parentElement, 'border-round-tl');
		}
		function removePadding(parentElement){
			tinyMCE.DOM.removeClass(parentElement, 'pad-box-mega');
			tinyMCE.DOM.removeClass(parentElement, 'pad-box');
			tinyMCE.DOM.removeClass(parentElement, 'pad-box-mini');
			tinyMCE.DOM.removeClass(parentElement, 'pad-box-micro');
		}
		function removeContentBox(parentElement){
			tinyMCE.DOM.removeClass(parentElement, 'content-box');
			tinyMCE.DOM.removeClass(parentElement, 'content-box-mini');
		}

///////////////////////////////
//    BUTTONS                //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function customButtons(mceInstance){
			var addAccordionSection = '<h3>\
				Buttons\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Buttons</div>\
					  	<div class=\'popover-content\'>\
						  	<p>A variety of predefined buttons that can be created as links in your content.</p>\
							<p>To add a button:<p>\
							<ol>\
								<li>Select an existing link that you would like turned into a button.</li>\
								<li>Click on the button style of your choice.</li>\
							</ol>\
			  			</div>">\
					  &nbsp;<span class="screenreader-only">About Buttons.</span>\
					</a>\
				</h3><div id="customButtons"></div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			customButtonList();
			customButtonSizes();
			customButtonsReady(mceInstance);
		}

	////// On Ready/Click functions  //////
		function customButtonsReady(mceInstance){
			$(".customButtonStyle").click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var myClass = $(this).attr('rel');
					var parentElement = ed.dom.getParent(ed.selection.getNode(), 'a');
					removeButtonStyle(parentElement);
					tinyMCE.DOM.addClass(parentElement, myClass);
			});
			$(".customButtonSize").click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var myClass = $(this).attr('rel');
					var parentElement = ed.dom.getParent(ed.selection.getNode(), 'a');
					removeButtonSize(parentElement);
					tinyMCE.DOM.addClass(parentElement, myClass);
			});
		}

	////// Supporting functions  //////
		function customButtonList(){
			var btnList = '<p><small>Buttons can be applied to <span class="text-warning"><strong>any existing link</strong></span>.</small></p>\
				<div class="btn-group-label bordered-section btn-examples">\
					<span>Style:</span><br>\
					<a href="#" class="customButtonStyle btn-mini btn" rel="btn">Default Button</a>\
					<a href="#" class="customButtonStyle btn-mini btn btn-primary" rel="btn btn-primary">Primary button</a>\
					<a href="#" class="customButtonStyle btn-mini btn btn-info" rel="btn btn-info">Info button</a>\
					<a href="#" class="customButtonStyle btn-mini btn btn-success" rel="btn btn-success">Success button</a>\
					<a href="#" class="customButtonStyle btn-mini btn btn-warning" rel="btn btn-warning">Warning button</a>\
					<a href="#" class="customButtonStyle btn-mini btn btn-danger" rel="btn btn-danger">Danger button</a>\
					<a href="#" class="customButtonStyle btn-mini btn btn-inverse" rel="btn btn-inverse">Inverse button</a>\
					<a href="#" class="customButtonStyle btn-mini btn btn-link" rel="btn btn-link">Link button</a>\
				</div>';
			$('#customButtons').append(btnList);
		}
		function customButtonSizes(){
			var btnSizeList = '<div class="btn-group-label bordered-section">\
				<span>Sizes:</span><br>\
					<div class="btn-group">\
						<a href="#" class="customButtonSize btn btn-mini" rel="btn btn-large">Large</a>\
						<a href="#" class="customButtonSize btn btn-mini" rel="btn">Default</a>\
						<a href="#" class="customButtonSize btn btn-mini" rel="btn btn-small">Small</a>\
						<a href="#" class="customButtonSize btn btn-mini" rel="btn btn-mini">Mini</a>\
					</div>\
				</div>\
				<a href="#" class="btn btn-mini customButtonStyle customButtonSize remove" rel="" data-tooltip="top" title="Place your <span class=\'text-warning\'><strong>cursor</strong></span> in the button and click here to remove styling."><i class="icon-end"></i> Remove Button Style</a>\
				<p style="margin: 5px 0;"><small>Add <a href="#" class="activateIcons">Icons</a> for additional customization</small></p>';
			$('#customButtons').append(btnSizeList);
		}

		function removeButtonStyle(parentElement){
			tinyMCE.DOM.removeClass(parentElement, 'btn');
			tinyMCE.DOM.removeClass(parentElement, 'btn-primary');
			tinyMCE.DOM.removeClass(parentElement, 'btn-info');
			tinyMCE.DOM.removeClass(parentElement, 'btn-success');
			tinyMCE.DOM.removeClass(parentElement, 'btn-warning');
			tinyMCE.DOM.removeClass(parentElement, 'btn-danger');
			tinyMCE.DOM.removeClass(parentElement, 'btn-inverse');
			tinyMCE.DOM.removeClass(parentElement, 'btn-link');
		}
		function removeButtonSize(parentElement){
			tinyMCE.DOM.removeClass(parentElement, 'btn');
			tinyMCE.DOM.removeClass(parentElement, 'btn-large');
			tinyMCE.DOM.removeClass(parentElement, 'btn-small');
			tinyMCE.DOM.removeClass(parentElement, 'btn-mini');
		}

///////////////////////////////
//    CONTENT ICONS          //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function contentIcons(mceInstance){
			var contentIconBox = '<div id="contentIconBox" style="display:none;" title="Custom Icons">\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Content Icons</div>\
					  	<div class=\'popover-content\'>\
						  	<p>Icons in this section can be applied to any heading, link, or list item element.</p>\
							<p>To add an icon to a heading:<p>\
							<ol>\
								<li>Position the cursor anywhere in the element you want to have an icon.</li>\
								<li>Click on the icon you wish to add (clicking another icon will overwrite the current icon).</li>\
							</ol>\
							<p>To remove an icon from an element:</p>\
							<ol>\
								<li>Position the cursor anywhere in the element from which you want to remove an icon.</li>\
								<li>Click the &ldquo;Remove&rdquo; link.</li>\
							</ol>\
			  			</div>">\
					  &nbsp;<span class="screenreader-only">About Content Icons.</span>\
					</a>\
					<p style="clear:both;"><small>Place your <span class="text-warning"><strong>cursor</strong></span> within a heading, link, or list item within the content area and then choose an icon</small>\
                    <div id="iconLists"></div>\
                    <div id="contentIcons" class="bordered-section" style="display:none;"></div>\
                    <a class="btn btn-mini changeIcon remove icon-end" rel="" data-tooltip="top" title="Place your cursor in an element with an icon and click here to remove it."> Remove Icon</a></p>\
                    <p><small>Additional icons are from <a href="http://fortawesome.github.io/Font-Awesome/" target="_blank">Font Awesome</a></small></p>\
                    </div>';
			$("#usu_tools").append(contentIconBox);

			var faBrandsIconArray = [
				"fa fa-adn", "fa fa-android", "fa fa-apple", "fa fa-bitbucket", "fa fa-bitbucket-square", "fa fa-btc", "fa fa-css3", 
				"fa fa-dribbble", "fa fa-dropbox", "fa fa-facebook", "fa fa-facebook-square", "fa fa-flickr", "fa fa-foursquare", 
				"fa fa-github", "fa fa-github-alt", "fa fa-github-square", "fa fa-gittip", "fa fa-google-plus", 
				"fa fa-google-plus-square", "fa fa-html5", "fa fa-instagram", "fa fa-linkedin", "fa fa-linkedin-square", 
				"fa fa-linux", "fa fa-maxcdn", "fa fa-pagelines", "fa fa-pinterest", "fa fa-pinterest-square", "fa fa-renren", 
				"fa fa-skype", "fa fa-stack-exchange", "fa fa-stack-overflow", "fa fa-trello", "fa fa-tumblr", "fa fa-tumblr-square", 
				"fa fa-twitter", "fa fa-twitter-square", "fa fa-vimeo-square", "fa fa-vk", "fa fa-weibo", "fa fa-windows", "fa fa-xing", 
				"fa fa-xing-square", "fa fa-youtube", "fa fa-youtube-play", "fa fa-youtube-square"
			];
			var canvasIconArray1 =  [
				"icon-stats", "icon-paperclip", "icon-media", "icon-address-book", "icon-reset", "icon-announcement", 
				"icon-analytics", "icon-student-view", "icon-calendar-day", "icon-trash", "icon-speed-grader", 
				"icon-copy-course", "icon-export-content", "icon-import-content", "icon-discussion", 
				"icon-discussion-reply", "icon-peer-review", "icon-discussion-new", "icon-edit", "icon-home", 
				"icon-settings", "icon-compose", "icon-flag", "icon-video", "icon-audio", "icon-outdent", "icon-indent", 
				"icon-outdent2", "icon-indent2", "icon-forward", "icon-warning", "icon-filmstrip", "icon-rubric", 
				"icon-rubric-dark", "icon-check-plus", "icon-rss", "icon-rss-add", "icon-quiz", "icon-question", 
				"icon-drop-down", "icon-minimize", "icon-end", "icon-add", "icon-info", "icon-check", "icon-clock", 
				"icon-calendar-month", "icon-x", "icon-refresh", "icon-off", "icon-updown", "icon-user-add", 
				"icon-group", "icon-star", "icon-replied", "icon-hour-glass", "icon-assignment", "icon-message", 
				"icon-note-dark", "icon-note-light", "icon-tag", "icon-next-unread", "icon-search", "icon-lock", 
				"icon-unlock", "icon-folder", "icon-toggle-right", "icon-toggle-left", "icon-link", "icon-lti", 
			]
			var canvasIconArray2 = [
				"icon-text", "icon-timer", "icon-pin", "icon-like", "icon-collection-save", "icon-remove-from-collection", "icon-collection", 
				"icon-group-new", "icon-group-new-dark", "icon-user", "icon-standards", "icon-search-address-book", 
				"icon-facebook", "icon-facebook-boxed", "icon-linkedin", "icon-twitter", "icon-twitter-boxed", 
				"icon-github", "icon-skype", "icon-wordpress", "icon-pinterest", "icon-gradebook", "icon-document", 
				"icon-module", "icon-mini-arrow-up", "icon-mini-arrow-down", "icon-mini-arrow-left", 
				"icon-mini-arrow-right", "icon-arrow-up", "icon-arrow-down", "icon-arrow-left", "icon-arrow-right", 
				"icon-email", "icon-instructure", "icon-ms-word", "icon-ms-excel", "icon-ms-ppt", "icon-pdf", 
				"icon-apple", "icon-windows", "icon-android", "icon-heart", "icon-upload", "icon-download", 
				"icon-text-left", "icon-text-center", "icon-text-right", "icon-mature", "icon-prerequisite", 
				"icon-educators", "icon-calendar-days", "icon-materials-required", "icon-not-graded", "icon-peer-graded", 
				"icon-bookmark", "icon-printer", "icon-image", "icon-expand", "icon-collapse", "icon-invitation", 
				"icon-muted", "icon-unmuted", "icon-plus", "icon-zipped", "icon-publish", "icon-unpublish", 
				"icon-unpublished", "icon-discussion-check", "icon-discussion-reply-2", "icon-discussion-search", 
				"icon-discussion-x", "icon-mark-as-read", "icon-more", "icon-syllabus", "icon-settings-2", "icon-reply-2", 
				"icon-reply-all-2", "icon-drag-handle"
			];
			var faDirectionIconArray = [
				"fa fa-angle-double-down", "fa fa-angle-double-left", "fa fa-angle-double-right", "fa fa-angle-double-up",
				"fa fa-angle-down", "fa fa-angle-left", "fa fa-angle-right", "fa fa-angle-up", "fa fa-arrow-circle-down",
				"fa fa-arrow-circle-left", "fa fa-arrow-circle-right", "fa fa-arrow-circle-up", "fa fa-arrow-circle-o-down",
				"fa fa-arrow-circle-o-left", "fa fa-arrow-circle-o-right", "fa fa-arrow-circle-o-up", "fa fa-chevron-circle-down",
				"fa fa-chevron-circle-left", "fa fa-chevron-circle-right", "fa fa-chevron-circle-up", "fa fa-chevron-down",
				"fa fa-chevron-left", "fa fa-chevron-right", "fa fa-chevron-up", "fa fa-arrow-down", "fa fa-arrow-left",
				"fa fa-arrow-right", "fa fa-arrow-up", "fa fa-long-arrow-down", "fa fa-long-arrow-left", "fa fa-long-arrow-right",
				"fa fa-long-arrow-up", "fa fa-caret-down", "fa fa-caret-left", "fa fa-caret-right", "fa fa-caret-up",
				"fa fa-caret-square-o-down", "fa fa-caret-square-o-left", "fa fa-caret-square-o-right", "fa fa-caret-square-o-up",
				"fa fa-hand-o-down", "fa fa-hand-o-left", "fa fa-hand-o-right", "fa fa-hand-o-up", "fa fa-thumbs-down",
				"fa fa-thumbs-o-down", "fa fa-thumbs-o-up", "fa fa-thumbs-up", "fa fa-sign-in", "fa fa-sign-out", 
				"fa fa-external-link", "fa fa-external-link-square", "fa fa-share-square", "fa fa-share-square-o", "fa fa-share",
				"fa fa-reply", "fa fa-reply-all", "fa fa-mail-reply-all", "fa fa-repeat", "fa fa-undo", "fa fa-refresh", 
				"fa fa-retweet", "fa fa-exchange", "fa fa-random", "fa fa-arrows", "fa fa-arrows-alt", "fa fa-arrows-h", 
				"fa fa-arrows-v", "fa fa-level-down", "fa fa-level-up"
			];
			var faEditorIconArray = [
				"fa fa-link", "fa fa-chain-broken", "fa fa-align-center", "fa fa-align-justify", "fa fa-align-left", 
				"fa fa-align-right", "fa fa-outdent", "fa fa-indent", "fa fa-font", "fa fa-bold", "fa fa-italic", "fa fa-underline", 
				"fa fa-text-height", "fa fa-text-width", "fa fa-strikethrough", "fa fa-superscript", "fa fa-subscript", 
				"fa fa-columns", "fa fa-bar-chart-o", "fa fa-list-alt", "fa fa-list", "fa fa-list-ol", "fa fa-list-ul", 
				"fa fa-table", "fa fa-th", "fa fa-th-large", "fa fa-th-list", "fa fa-tasks", "fa fa-filter", "fa fa-sort-alpha-asc", 
				"fa fa-sort-alpha-desc", "fa fa-sort-amount-asc", "fa fa-sort-amount-desc", "fa fa-sort-numeric-asc", 
				"fa fa-sort-numeric-desc", "fa fa-sort", "fa fa-sort-asc", "fa fa-sort-desc"
			];
			var faFilesIconArray = [
				"fa fa-download", "fa fa-upload", "fa fa-cloud-upload", "fa fa-cloud-download", "fa fa-folder", "fa fa-folder-o", 
				"fa fa-folder-open", "fa fa-folder-open-o", "fa fa-hdd-o", "fa fa-file", "fa fa-clipboard", "fa fa-files-o", 
				"fa fa-file-o", "fa fa-file-text", "fa fa-file-text-o", "fa fa-floppy-o", "fa fa-code-fork", "fa fa-sitemap", 
				"fa fa-code", "fa fa-terminal", "fa fa-rss", "fa fa-rss-square"
			];
			var faMediaIconArray = [
				"fa fa-arrows-alt", "fa fa-backward", "fa fa-compress", "fa fa-eject", "fa fa-expand", "fa fa-fast-backward", 
				"fa fa-fast-forward", "fa fa-forward", "fa fa-pause", "fa fa-play", "fa fa-play-circle", "fa fa-play-circle-o", 
				"fa fa-step-backward", "fa fa-step-forward", "fa fa-stop", "fa fa-youtube-play", "fa fa-video-camera", 
				"fa fa-volume-down", "fa fa-volume-off", "fa fa-volume-up", "fa fa-film", "fa fa-microphone", 
				"fa fa-microphone-slash", "fa fa-headphones", "fa fa-picture-o", "fa fa-camera", "fa fa-camera-retro", 
				"fa fa-crop"
			];
			var faObjectsIconArray = [
				"fa fa-clock-o", "fa fa-calendar", "fa fa-calendar-o", "fa fa-search", "fa fa-search-minus", "fa fa-search-plus", 
				"fa fa-anchor", "fa fa-building-o", "fa fa-home", "fa fa-archive", "fa fa-briefcase", "fa fa-suitcase", "fa fa-tag", 
				"fa fa-tags", "fa fa-leaf", "fa fa-inbox", "fa fa-ticket", "fa fa-trophy", "fa fa-beer", "fa fa-road", "fa fa-truck", 
				"fa fa-fighter-jet", "fa fa-plane", "fa fa-rocket", "fa fa-wrench", "fa fa-tachometer", "fa fa-trash-o", 
				"fa fa-umbrella", "fa fa-glass", "fa fa-coffee", "fa fa-eraser", "fa fa-magnet", "fa fa-bell", "fa fa-bell-o", 
				"fa fa-book", "fa fa-bug", "fa fa-bullhorn", "fa fa-cutlery", "fa fa-fire-extinguisher", "fa fa-flag", 
				"fa fa-flag-checkered", "fa fa-flag-o", "fa fa-flask", "fa fa-gamepad", "fa fa-gavel", "fa fa-magic", "fa fa-gift", 
				"fa fa-key", "fa fa-lock", "fa fa-unlock", "fa fa-unlock-alt", "fa fa-thumb-tack", "fa fa-lightbulb-o", 
				"fa fa-paperclip", "fa fa-scissors", "fa fa-pencil", "fa fa-pencil-square", "fa fa-pencil-square-o", 
				"fa fa-envelope", "fa fa-envelope-o", "fa fa-desktop", "fa fa-laptop", "fa fa-tablet", "fa fa-mobile", 
				"fa fa-keyboard-o", "fa fa-phone", "fa fa-phone-square", "fa fa-print", "fa fa-shopping-cart", "fa fa-money", 
				"fa fa-credit-card", "fa fa-ambulance", "fa fa-h-square", "fa fa-hospital-o", "fa fa-medkit", "fa fa-plus-square", 
				"fa fa-stethoscope", "fa fa-user-md", "fa fa-wheelchair"
			];
			var faShapesIconArray = [
				"fa fa-cloud", "fa fa-asterisk", "fa fa-tint", "fa fa-fire", "fa fa-location-arrow", "fa fa-map-marker", 
				"fa fa-globe", "fa fa-sun-o", "fa fa-moon-o", "fa fa-star", "fa fa-star-o", "fa fa-star-half-o", "fa fa-star-half", 
				"fa fa-bolt", "fa fa-music", "fa fa-certificate", "fa fa-eye", "fa fa-eye-slash", "fa fa-heart", "fa fa-heart-o", 
				"fa fa-square", "fa fa-square-o", "fa fa-bookmark", "fa fa-bookmark-o", "fa fa-spinner", "fa fa-power-off", 
				"fa fa-compass", "fa fa-circle", "fa fa-adjust", "fa fa-circle-o", "fa fa-ban", "fa fa-dot-circle-o", 
				"fa fa-bullseye", "fa fa-smile-o", "fa fa-meh-o", "fa fa-frown-o", "fa fa-users", 
				"fa fa-user", "fa fa-male", "fa fa-female", "fa fa-lemon-o", "fa fa-shield", "fa fa-ellipsis-h", "fa fa-ellipsis-v", "fa fa-cog", "fa fa-cogs", 
				"fa fa-puzzle-piece", "fa fa-signal", "fa fa-bars", "fa fa-barcode", "fa fa-qrcode", "fa fa-crosshairs", 
				"fa fa-comments", "fa fa-comments-o", "fa fa-comment"
			];
			var faSymbolsIconArray = [
				"fa fa-minus", "fa fa-minus-circle", "fa fa-minus-square", "fa fa-minus-square-o", "fa fa-plus", "fa fa-plus-circle",
				"fa fa-plus-square", "fa fa-plus-square-o", "fa fa-times", "fa fa-times-circle", "fa fa-times-circle-o", 
				"fa fa-exclamation", "fa fa-exclamation-circle", "fa fa-exclamation-triangle", "fa fa-question", 
				"fa fa-question-circle", "fa fa-info", "fa fa-info-circle", "fa fa-quote-left", "fa fa-quote-right", 
				"fa fa-check-square-o", "fa fa-check-square", "fa fa-check-circle-o", "fa fa-check-circle", "fa fa-check", 
				"fa fa-btc", "fa fa-usd", "fa fa-eur", "fa fa-gbp", "fa fa-inr", "fa fa-jpy", "fa fa-krw", "fa fa-rub", "fa fa-try"
			];

			var contentIconSections = {
                'Brands':faBrandsIconArray,
                'Direction':faDirectionIconArray,
                'Editor':faEditorIconArray,
                'Files':faFilesIconArray,
                'Media':faMediaIconArray,
                'Objects':faObjectsIconArray,
                'Shapes':faShapesIconArray,
                'Symbols':faSymbolsIconArray,
                'Canvas_1':canvasIconArray1,
                'Canvas_2':canvasIconArray2
            }
			changeIcon();

			/// ICONS ////
            $.each(contentIconSections, function (key, value) {
                var displayTitle = key.replace("_", " ");
                $("#iconLists").append('<a class="btn btn-mini '+key+' iconCat">'+displayTitle+'</a>');
                $("."+key).click(function (e) {
                    e.preventDefault();
                    $("#contentIcons").show();
                    if ($(this).hasClass("active")) {
                        $(this).removeClass("active");
                        $("#contentIcons").html("");
                    } else {
                        contentIconList(value);
                        $(".iconCat").each(function () {
                            $(this).removeClass("active");
                        });
                        $(this).addClass("active");
                    }
                })
            });
            // Put category buttons into two btn-groups 
                var step = 4;
                var buttons= $("#iconLists > a");
                buttons.each(function(i) {
                    if ( i % step == 0 ) buttons.slice(i,i+step).wrapAll('<div class="btn-group">');
                });
            // Output category words based on which category is picked
                function contentIconList(arrayName) {
                    $("#contentIcons").html("");
                    $.each(arrayName, function (i) {
                        $("#contentIcons").append('<a class="changeIcon" rel="'+this+'" title="'+this+'"><i class="'+this+'"></i></a> ');
                    });
                   changeIcon();
                }
                $("#usu_tools").append('<a href="#" class="btn btn-mini activateIcons" style="margin-top:5px;"><i class="fa fa-tags"></i> Content Icons</a>');
            // Trigger for Icon dialog
                $(".activateIcons").click(function (e) {
                    e.preventDefault();
                    $("#contentIconBox").dialog({ position: { my: "right top", at: "left top", of: "#ui-accordion-custom-tools-accordion-header-0" }, modal: false, width: 265 });
                });
		}

	////// On Ready/Click functions  //////
		function changeIcon(){
			$(".changeIcon").click(function(){
				console.log(mceInstance);
				var ed = tinyMCE.get(mceInstance);
				// Get parent element
					var parentElement = tinyMCE.DOM.getParent(ed.selection.getNode(), "span#banner-right, h3, h4, h5, h6, a, li");
				// Get the class(es) from the parent element
					tinyMCE.DOM.removeClass(parentElement, 'fa');
					var currentClass = tinyMCE.DOM.getAttrib(parentElement, 'class');
					// console.log(currentClass);
				// Look through the classes for any class beginning with "icon-" and remove it
					var regExpMatch = /\bfa-\S+\s?/g;
					var step1Class = currentClass.replace(regExpMatch, "");
					// console.log(step1Class);
					var newregExpMatch = /\bicon-\S+\s?/g;
					step2Class = step1Class.replace(newregExpMatch, "");
					// console.log(step2Class);
				// Clean up an extra spaces
					cleanedClass = step2Class.replace("  ", " ");
				// Grab the new class based on which icon link they clicked and combine with existing classes
					var iconClass = $(this).attr("rel");
					var newClass = cleanedClass+" "+iconClass;
				// Clean up extra spaces and add to parent
					var newClass = newClass.trim();
					tinyMCE.DOM.setAttrib(parentElement, 'class', newClass);
			});
		}

	////// Supporting functions  //////

///////////////////////////////
//    HIGHLIGHTS             //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function customHighlights(mceInstance){
			var addAccordionSection = '<h3>\
				Highlights | Alerts | Emphasis\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Highlights | Alerts | Emphasis</div>\
					  	<div class=\'popover-content\'>\
						  	<p>Draw attention to content using some predefined styles.</p>\
			  			</div>">\
					  &nbsp;<span class="screenreader-only">About Highlights.</span>\
					</a>\
				</h3>\
				<div id="customHighlights">\
					<div class="btn-group highlightSections" style="margin-bottom:10px;">\
						<a href="#" class="btn btn-mini active" rel=".alertSection">Block Alerts</a>\
						<a href="#" class="btn btn-mini" rel=".emphasisSection">Inline Emphasis</a>\
					</div>\
					<div class="alertSection btn-group-label bordered-section">\
						<h4>Block Alerts</h4>\
						<span>Apply to:</span>\
						<div class="btn-group blockAlertElement">\
							<a href="#" class="btn btn-mini active" rel="p">Paragraph</a>\
							<a href="#" class="btn btn-mini" rel="div">DIV</a>\
						</div>\
						<a href="#" class="customHighlightStyle" rel="well"><p class="well"><strong>Well:</strong> Sample of Well</p></a>\
						<a href="#" class="customHighlightStyle" rel="alert"><p class="alert"><strong>Alert:</strong> Sample alert</p></a>\
						<a href="#" class="customHighlightStyle" rel="alert alert-error"><p class="alert alert-error"><strong>Error:</strong> Sample error alert</p></a>\
						<a href="#" class="customHighlightStyle" rel="alert alert-success"><p class="alert alert-success"><strong>Success:</strong> Sample success alert</p></a>\
						<a href="#" class="customHighlightStyle" rel="alert alert-info"><p class="alert alert-info"><strong>Information:</strong> Sample information alert</p></a>\
						<a href="#" class="customHighlightStyle icon-end btn btn-mini remove" rel="" data-tooltip="left" title="Place cursor in an alert and click here to remove it."> Remove Alert</a>\
						<a href="#" class="btn btn-mini wrapHighlight icon-collection-save" style="display:none;" data-tooltip="left" title="Select content and click here to wrap it in an alert."> Wrap Selection</a>\
						<p class="paragraphHighlightHelp" style="margin: 10px 0;"><small>Place <span class="text-warning"><strong>cursor</strong></span> within any <span class="text-warning"><strong>existing paragraph</strong></span> then choose the alert type.</small></p>\
						<p class="divHighlightHelp" style="margin: 10px 0; display:none;"><small>Place <span class="text-warning"><strong>cursor</strong></span> within any <span class="text-warning"><strong>existing div</strong></span> then choose the alert type.</small></p>\
					</div>\
					<div class="emphasisSection bordered-section" style="display:none;">\
						<h4>Inline Emphasis</h4>\
						<div class="bordered-section">\
							<a href="#" class="customSpanHighlight muted" rel="muted">Style as MUTED text</a><br>\
							<a href="#" class="customSpanHighlight text-warning" rel="text-warning">Style as WARNING text</a><br>\
							<a href="#" class="customSpanHighlight text-error" rel="text-error">Style as ERROR text</a><br>\
							<a href="#" class="customSpanHighlight text-info" rel="text-info">Style as INFO text</a><br>\
							<a href="#" class="customSpanHighlight text-success" rel="text-success">Style as SUCCESS text</a><br>\
						</div>\
						<a href="#" class="customSpanHighlight btn btn-mini remove icon-end" rel="removeSpan" style="margin-top:5px;" data-tooltip="left" title="Place cursor in an emphasis and click here to remove it."> Remove Emphasis</a>\
						<dl class="dl-horizontal"><dt>New</dt><dd>Select the text you want to emphasize then click the appropriate link.</dd>\
						<dt>Change</dt><dd>Place your cursor anywhere in the emphasized text and choose a new style.</dd></dl>\
					</div>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			customHighlightsReady(mceInstance);
		}
	////// On Ready/Click functions  //////
		function customHighlightsReady(mceInstance){
			//// TYPE SELECTOR ////
				$(".highlightSections a").click(function (e){
					e.preventDefault();
					$(".highlightSections a").each(function (e){
						$(this).removeClass("active");
					});
					$(this).addClass("active");
					var activeSection = $(this).attr("rel");
					// scrollToElement(".custom-"+activeSection);
					$(".alertSection").hide();
					$(".emphasisSection").hide();
					$(activeSection).show();
				});
			// Block toggle between paragraph and div
				$(".blockAlertElement a").click(function (e){
					e.preventDefault();
					$(".blockAlertElement a").each(function(){
						$(this).removeClass("active");
					});
					$(this).addClass("active");
					var applyTo = $(this).attr("rel");
					if(applyTo == "p"){
						$(".paragraphHighlightHelp").show();
						$(".divHighlightHelp").hide();
						$(".wrapHighlight").hide();
					} else {
						$(".paragraphHighlightHelp").hide();
						$(".divHighlightHelp").show();
						$(".wrapHighlight").show();
					}
				});
				$(".customHighlightStyle").click(function (e){
					e.preventDefault();
					var elementType = $(".blockAlertElement .active").attr("rel");
					var ed = tinyMCE.get(mceInstance);
					var myClass = $(this).attr('rel');
					if(elementType == "p"){
						var parentElement = ed.dom.getParent(ed.selection.getNode(), 'p');
						changeAlerts(parentElement);
						tinyMCE.DOM.addClass(parentElement, myClass);
					} else if(elementType == "div"){
						var parentElement = ed.dom.getParent(ed.selection.getNode(), 'div');
						changeAlerts(parentElement);
						tinyMCE.DOM.addClass(parentElement, myClass);
					}
				});
				$(".wrapHighlight").click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					ed.focus(); 
					ed.selection.setContent('<div class="alert">' + ed.selection.getContent() + '</div>');
				});
			$(".customSpanHighlight").click(function (e){
				e.preventDefault();
				var ed = tinyMCE.get(mceInstance);
				var myClass = $(this).attr('rel');
				var parentElement = ed.dom.getParent(ed.selection.getNode(), 'span.muted, span.text-warning, span.text-error, span.text-info, span.text-success, span');
				// console.log(parentElement);
				if(parentElement == null){
					ed.focus(); 
					ed.selection.setContent('<span class="'+myClass+'">' + ed.selection.getContent() + '</span>');
				} else {
					changeEmphasis(parentElement);
					tinyMCE.DOM.addClass(parentElement, myClass);
					if(tinyMCE.DOM.getAttrib(parentElement, 'class')=="removeSpan"){
						$(iframeID).contents().find(".removeSpan").contents().unwrap();
					}
				}
			});
		}

	////// Supporting functions  //////
		function changeAlerts(parentElement){
			tinyMCE.DOM.removeClass(parentElement, 'alert');
			tinyMCE.DOM.removeClass(parentElement, 'alert-error');
			tinyMCE.DOM.removeClass(parentElement, 'alert-success');
			tinyMCE.DOM.removeClass(parentElement, 'alert-info');
			tinyMCE.DOM.removeClass(parentElement, 'well');
		}
		function changeEmphasis(parentElement){
			tinyMCE.DOM.removeClass(parentElement, 'muted');
			tinyMCE.DOM.removeClass(parentElement, 'text-warning');
			tinyMCE.DOM.removeClass(parentElement, 'text-error');
			tinyMCE.DOM.removeClass(parentElement, 'text-info');
			tinyMCE.DOM.removeClass(parentElement, 'text-success');
		}

///////////////////////////////
//    POPUP CONTENT          //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function popupContent(mceInstance){
			var addAccordionSection = '<h3>\
				Popup Content | Read More\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Popup Content | Read More</div>\
					  	<div class=\'popover-content\'>\
						  	<p><strong>Modal Windows:</strong> A modal window appears in the center of the screen and greys out the background</p>\
						  	<p><strong>Popovers:</strong> The dialog you are currently reading is a popover.</p>\
						  	<p><strong>Tooltips:</strong> Tooltips are a smaller version of popovers. They have white text and a dark grey, semi-transparent background and appear when the target is hovered over.</p>\
						  	<p><strong>Read More:</strong> Read more dialogs allow you to display part of the content of a container but additional content is accessed by clicking a &ldquo;Read More&rdquo; link.</p>\
			  			</div>">\
					  &nbsp;<span class="screenreader-only">About popup content</span>\
					</a>\
				</h3><div>\
				<div class="btn-group popupSections" style="margin-bottom:10px;">\
					<a href="#" class="btn btn-mini active" rel=".modalSection">Modal</a>\
					<a href="#" class="btn btn-mini" rel=".tooltipSection">Tooltip/Popover</a>\
					<a href="#" class="btn btn-mini" rel=".readMoreSection">Read More</a>\
				</div>\
				<div class="modalSection">\
					<div class="btn-group-label bordered-section">\
						<span>Modal Dialog:</span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini addModalTrigger" data-tooltip="top" title="Select text and click this button to make a modal trigger. The modal section will be added to bottom of the page."><i class="icon-add"></i> Add Modal</a>\
							<a href="#" class="btn btn-mini removeModal remove" data-tooltip="top" title="This button will remove modal dialog and all triggers"><i class="icon-end"></i> Remove Modal</a>\
						</div>\
						<p style="margin: 5px 0 0;"><small>Select the text you would like users to click to trigger the modal then click &ldquo;Add Modal&rdquo;</small></p>\
					</div>\
					<div class="btn-group-label bordered-section">\
						<span>Additional Triggers:</span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini addModalTrigger" data-tooltip="top" title="Select text and click this button to make an additional modal trigger"><i class="icon-add"></i> Add Trigger</a>\
							<a href="#" class="btn btn-mini removeModalTrigger remove" data-tooltip="top" title="Select a trigger you wish to remove then click this button."><i class="icon-end"></i> Remove Trigger</span></a>\
						</div>\
						<p style="margin: 5px 0 0;"><small>Additional links can be created for students to click to trigger the modal.</small></p>\
					</div>\
					<p style="margin-top: 10px;"><small>Trigger text is a link by default. You can use the <a href="#" class="activateButtons">Buttons</a> or <a href="#" class="activateIcons">Icons</a> sections to customize the triggers.</small></p>\
					<p style="margin-top: 10px;"><small>Modal position can be changed in <a href="#" class="activateSections">Sections</a>.</small></p>\
				</div>\
				<div class="tooltipSection" style="display:none;">\
					<div class="btn-group-label bordered-section">\
						<span>Tooltip:</span><br>\
						<div class="btn-group" style="margin-bottom:10px;">\
							<a href="#" class="btn btn-mini addTooltip" data-tooltip="top" title="Select the text you would like to have a tooltip, then click this button."><i class="icon-add"></i> Add Tooltip</a>\
							<a href="#" class="btn btn-mini remove removeTooltip" data-tooltip="top" title="Place your cursor in the trigger text and then click this button to remove a tooltip."><i class="icon-end"></i> Remove Tooltip</a>\
						</div>\
						<div class="tooltipDisplay" style="display:none;">\
							<span>Tooltips in editor:</span><br>\
							<div class="btn-group">\
								<a href="#" class="btn btn-mini showTooltips active">Show Tooltips</a>\
								<a href="#" class="btn btn-mini hideTooltips">Hide Tooltips</a>\
							</div>\
						</div>\
					</div>\
					<div class="btn-group-label bordered-section">\
						<span>Popover:</span>\
						<div class="btn-group" style="margin-bottom:10px;">\
							<a href="#" class="btn btn-mini addPopover" data-tooltip="top" title="Select the text you would like to have a popover, then click this button."><i class="icon-add"></i> Add Popover</a>\
							<a href="#" class="btn btn-mini remove removePopover" data-tooltip="top" title="Place your cursor in the trigger text and then click this button to remove a popover."><i class="icon-end"></i> Remove Popover</a>\
						</div>\
						<div class="popoverDisplay" style="display:none;">\
							<span>Popovers in editor:</span><br>\
							<div class="btn-group">\
								<a href="#" class="btn btn-mini showPopovers active">Show Popovers</a>\
								<a href="#" class="btn btn-mini hidePopovers">Hide Popovers</a>\
							</div>\
						</div>\
					</div>\
					<p style="margin-top: 10px;"><small>Trigger text is a link by default. You can use the <a href="#" class="activateButtons">Buttons</a> or <a href="#" class="activateIcons">Icons</a> sections to customize the triggers.</small></p>\
				</div>\
				<div class="readMoreSection" style="display:none;">\
					<div class="btn-group-label bordered-section">\
						<span>Read More:</span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini addReadMore" data-tooltip="top" title="Highlight the block of text you would like collapsible then click this button"><i class="icon-add"></i> Wrap Selection</a>\
							<a href="#" class="btn btn-mini remove removeReadMore" data-tooltip="top" title="Place your cursor anywhere in the expandable block of text then click this button."><i class="icon-end"></i> Remove Section</a>\
						</div>\
						<p style="margin-top: 10px;"><small>Read More sections will hide everything after 200 characters with a &ldquo;...&rdquo; and provide a link to expand or collapse the hidden content.</small></p>\
					</div>\
					<a class="btn btn-mini remove-empty" href="#" data-tooltip="left"\
						title="This button will clean up the page contents by removing any empty elements. Including empty tags that result from marking a block of text for read more functionality.">\
						<i class="icon-trash"></i> Clear Empty</a>\
				</div></div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			popupReady(mceInstance);
			popupDemos();
			checkTooltips();
			checkPopovers();
		}
	////// On Ready/Click functions  //////
		function popupReady(mceInstance){
			//// TYPE SELECTOR ////
				$(".popupSections a").click(function (e){
					e.preventDefault();
					$(".popupSections a").each(function (e){
						$(this).removeClass("active");
					});
					$(this).addClass("active");
					var activeSection = $(this).attr("rel");
					// scrollToElement(".custom-"+activeSection);
					$(".modalSection").hide();
					$(".tooltipSection").hide();
					$(".readMoreSection").hide();
					$(activeSection).show();
				});
			// Modals
				$(".addModal").click(function (e){
					e.preventDefault();
					addModal();
				});
				$(".addModalTrigger").click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					ed.focus(); 
					ed.selection.setContent('<a href="#" class="customModalToggler">' + ed.selection.getContent() + '</a>');
					// Check to see if modal contents already exist and add section
					addModal();
				});
				$('.removeModal').click(function (e){
					e.preventDefault();
					$(iframeID).contents().find("#customModal").remove();
					$(iframeID).contents().find('.customModalToggler').contents().unwrap();
					$("input[value=custom-modal]").parents("li").remove();
				});
				$('.removeModalTrigger').click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var parentElement = ed.dom.getParent(ed.selection.getNode(), 'a.customModalToggler');
					tinyMCE.DOM.addClass(parentElement, 'removeTrigger');
					$(iframeID).contents().find('.removeTrigger').contents().unwrap();
				});
			// Tooltips
				$(".addTooltip").click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var numToolTips = $(iframeID).contents().find(".tooltipTrigger").length;
					// console.log(numToolTips);
					var newToolTipNum = numToolTips+1;
					ed.focus(); 
					ed.selection.setContent('<a href="#" id="tooltip'+newToolTipNum+'" class="tooltipTrigger">' + ed.selection.getContent() + '</a>');
					var toolTipElement = '<div class="tooltipText tooltip'+newToolTipNum+'">Tooltip Text</div>';
					var parentElement = ed.dom.getParent(ed.selection.getNode());
						tinyMCE.DOM.addClass(parentElement, 'createTooltip');
					$(iframeID).contents().find(".createTooltip").prepend(toolTipElement).removeClass("createTooltip");
					checkTooltips();
				});
				$('.removeTooltip').click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var parentElement = ed.dom.getParent(ed.selection.getNode(), 'a.tooltipTrigger');
					tinyMCE.DOM.addClass(parentElement, 'removeTip');
					var tipContainer = $(iframeID).contents().find('.removeTip').attr("id");
					$(iframeID).contents().find("."+tipContainer).remove();
					$(iframeID).contents().find('.removeTip').contents().unwrap();
					checkTooltips();
				});
				$(".showTooltips").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find(".tooltipText").show();
					checkTooltips();
				});
				$(".hideTooltips").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find(".tooltipText").hide();
					checkTooltips();
				});

			// Popovers
				$(".addPopover").click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var numPopovers = $(iframeID).contents().find(".popoverTrigger").length;
					// console.log(numPopovers);
					var newPopoverNum = numPopovers+1;
					ed.focus(); 
					ed.selection.setContent('<a href="#" id="Popover'+newPopoverNum+'" class="popoverTrigger">' + ed.selection.getContent() + '</a>');
					var PopoverElement = '<div class="popoverContent Popover'+newPopoverNum+'"><h4>Popover Title</h4><p>Popover Text</p></div>';
					var parentElement = ed.dom.getParent(ed.selection.getNode());
						tinyMCE.DOM.addClass(parentElement, 'createPopover');
					$(iframeID).contents().find(".createPopover").prepend(PopoverElement).removeClass("createPopover");
					checkPopovers();
				});
				$('.removePopover').click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var parentElement = ed.dom.getParent(ed.selection.getNode(), 'a.popoverTrigger');
					tinyMCE.DOM.addClass(parentElement, 'removeTip');
					var popoverContainer = $(iframeID).contents().find('.removeTip').attr("id");
					$(iframeID).contents().find("."+popoverContainer).remove();
					$(iframeID).contents().find('.removeTip').contents().unwrap();
					checkPopovers();
				});
				$(".showPopovers").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find(".popoverContent").show();
					checkPopovers();
				});
				$(".hidePopovers").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find(".popoverContent").hide();
					checkPopovers();
				});
			// Read More
				$(".addReadMore").click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					ed.focus(); 
					ed.selection.setContent('<div class="expander">' + ed.selection.getContent() + '</div>');
				});
				$(".removeReadMore").click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var parentElement = ed.dom.getParent(ed.selection.getNode(), 'div.expander');
					tinyMCE.DOM.addClass(parentElement, 'removeExpander');
					$(iframeID).contents().find('.removeExpander').contents().unwrap();
				});
				removeEmpty();
		}
	////// Supporting functions  //////
		function addModal(){
			if(!$(iframeID).contents().find('#customModal').length>0){
				var newSectionName = "Modal Dialog";
				var newSectionClass = "custom-modal";
				var modalHtml = '<div id="customModal" class="'+newSectionClass+'" title="Title Goes Here">\
						<div class="modalTitle">Modal Title</div>\
						<p>Modal Contents.</p>\
					</div>'
				// Insert the new section into the TinyMCE editor
					var ed = tinyMCE.get(mceInstance);
					var parentElement = ed.dom.getParent(ed.selection.getNode(), 'div');
					tinyMCE.DOM.addClass(parentElement, 'addModalAfter');
					$(iframeID).contents().find(".addModalAfter").after(modalHtml);
					scrollToElement(".addModalAfter");
					$(iframeID).contents().find(".addModalAfter").removeClass("addModalAfter");
					highlightNewElement('#customModal');
				// Create an <li> for this section in the Sections List
					var newSectionControls = '<li>\
						<span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
						<label><input type="checkbox" class="customSection" checked value="'+newSectionClass+'">\
							<span class="sectionTitle">'+newSectionName+'</span>\
						</label>\
						</li>';
					$(newSectionControls).appendTo(".sections-list");
				// Bind a change function to bring up the remove button when unchecked
					$('.customSection').change(function (){
						if($(this).is(":checked")) {
							templateCheck();
							checkSection(this.value);
						} else {
							var targetSection = "."+this.value;
                            markToRemove(targetSection);
							bindHover();
						}
					});
					// $("#addProgressBar i").removeClass("icon-add").addClass("icon-reply-2");
			}				
		}
		function checkTooltips(){
			if($(iframeID).contents().find(".tooltipText").length>0){
				$(".tooltipDisplay").show();
				if($(iframeID).contents().find(".tooltipText").is(":visible")){
					$(".showTooltips").addClass("active");
					$(".hideTooltips").removeClass("active");
				} else {
					$(".showTooltips").removeClass("active");
					$(".hideTooltips").addClass("active");
				}
			} else {
				$(".tooltipDisplay").hide();
			}
		}
		function checkPopovers(){
			if($(iframeID).contents().find(".popoverContent").length>0){
				$(".popoverDisplay").show();
				if($(iframeID).contents().find(".popoverContent").is(":visible")){
					$(".showPopovers").addClass("active");
					$(".hidePopovers").removeClass("active");
				} else {
					$(".showPopovers").removeClass("active");
					$(".hidePopovers").addClass("active");
				}
			} else {
					$(".popoverDisplay").hide();
			}
		}
		function popupDemos(){
			var demos = '<a href="#" class="btn btn-mini demoModal">Demo Modal</a>\
				<div id="exampleModal" title="Modal Title" style="display:none;">\
					<p>This is an example of a modal dialog.</p>\
					<p>It can contain most html elements.</p>\
				</div>';
			$(demos).prependTo(".modalSection");
			$(".demoModal").click(function (e){
				e.preventDefault();
				$('#exampleModal').dialog({
					modal: true,
					width: 600,
					buttons: {
						Close: function() {
							$( this ).dialog( "close" );
						}
					}
				});
			});
			var tooltipDemo = '<div class="btn-group">\
				<a href="#" class="btn btn-mini" data-tooltip="top" title="This is an example of a tooltip.">Demo Tooltip</a>\
				<a class="btn btn-mini" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
				  title="<div class=\'popover-title\'>Popover Title</div>\
				  	<div class=\'popover-content\'>\
					  	<p>This is an example of a popover.</p>\
		  			</div>">\
				  Demo Popover\
				</a>\
				</div>';
			$(tooltipDemo).prependTo(".tooltipSection")
		}

///////////////////////////////
//    PROGRESS BAR           //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function progressBar(mceInstance){
			var addAccordionSection = '<h3>\
				Progress Bar\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Progress Bar</div>\
					  	<div class=\'popover-content\'>\
						  	<p>Add a progress bar to show the percentage of completion.</p>\
			  			</div>">\
					  &nbsp;<span class="screenreader-only">About progress bars</span>\
					</a>\
				</h3><div id="progressControls"></div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			progressBarControls();
			progressBarReady();
		}
	////// On Ready/Click functions  //////
		function progressBarReady(){
			$('#addProgressBar').click(function (e){
				e.preventDefault();
				addProgressBar();
			});
			$('.pbLabelToggle a').click(function (e){
				e.preventDefault();
				addProgressBar();
				$('.pbLabelToggle a').each(function(){
					$(this).removeClass("active");
				});
				$(this).addClass("active");
				var labelState = $(this).attr("rel");
				if(labelState == "off"){
					$(iframeID).contents().find('.pblabel').hide();
				} else {
					$(iframeID).contents().find('.pblabel').show();
				}
				$(iframeID).contents().find('#progressbar').removeClass("btmMargin");
				if($(iframeID).contents().find('.pbHeightSmall').length>0 || $(iframeID).contents().find('.pbHeightMicro').length>0){
					$(iframeID).contents().find('#progressbar').addClass("btmMargin");
				}
			});
			$(".pbheight").click(function (e){
				e.preventDefault();
				addProgressBar();
				var pbHeight = $(this).attr("rel");
				changePbHeight(pbHeight);
			});
			// create a new section if return/enter is pressed in the new section field
				$("#progressBarWidth").keydown(function(event){
					if(event.keyCode == 13) {
						event.preventDefault();
						addProgressBar();
						return false;
					}
				});
			// Toggle progress bar colors
				$(".pbcolor").click(function(){
					addProgressBar();
					var colorClass = $(this).attr("rel");
					$(iframeID).contents().find('.ui-progressbar-value').removeClass("red grey aggie").addClass(colorClass);
				});
			if($(iframeID).contents().find('.custom-progressbar').length>0){
				$(".deletePBTool").show();
				$("#addProgressBar").html('<i class="icon-reset"></i> Update');
				var barWidth = Math.round( 100 * parseFloat($('.ui-progressbar-value').css('width')) / parseFloat($('.ui-progressbar-value').parent().css('width')) );
				$("#progressBarWidth").val("").attr("placeholder", barWidth);
				if(!$(iframeID).contents().find(".pblabel").is(":visible")){
					$(".pblabelOn").removeClass("active");
					$(".pblabelOff").addClass("active");
				}
			}
			deleteProgressBar();
		}
	////// Supporting functions  //////
		function progressBarControls(){
			var controls = '<form class="form-inline">\
				<div class="input-append" style="margin-bottom:10px;">\
					<input id="progressBarWidth" type="text" placeholder="Percentage">\
					<span class="add-on">%</span>\
					<a href="#" id="addProgressBar" class="btn"><i class="icon-add"></i> Add Bar</a>\
				</div>\
				<a href="#" class="btn btn-mini deletePBTool remove" style="display:none;"><i class="icon-end"></i> Remove Bar</a>\
				<div class="bordered-section" style="margin-top:10px;">\
					<div class="btn-group-label">\
						<span>Color:</span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini pbcolor default" rel="">Default</a>\
							<a href="#" class="btn btn-mini pbcolor aggie" rel="aggie">Aggie</a>\
							<a href="#" class="btn btn-mini pbcolor red" rel="red">Red</a>\
							<a href="#" class="btn btn-mini pbcolor grey" rel="grey">Grey</a>\
						</div>\
					</div>\
					<div class="btn-group-label">\
						<span>Height:</span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini pbheight" rel="">Lg</a>\
							<a href="#" class="btn btn-mini pbheight" rel="pbHeightMed">Med</a>\
							<a href="#" class="btn btn-mini pbheight" rel="pbHeightSmall">Sm</a>\
							<a href="#" class="btn btn-mini pbheight" rel="pbHeightMicro">Micro</a>\
						</div>\
					</div>\
					<div class="btn-group-label">\
						<span>Label:</span>\
						<div class="btn-group pbLabelToggle">\
							<a href="#" class="btn btn-mini pblabelOn active" rel="on">On</a>\
							<a href="#" class="btn btn-mini pblabelOff" rel="off">Off</a>\
						</div>\
					</div>\
				</div>\
				<p style="margin-top: 10px;"><small>Location can be adjusted in the <a href="#" class="activateSections">Sections</a> panel</small></p>';
			$(controls).appendTo("#progressControls");
		}
		function addProgressBar(){
			templateCheck();
			if(!$(iframeID).contents().find('.custom-progressbar').length>0){
				var newSectionName = "Progress Bar";
				var newSectionClass = "custom-progressbar";
				var labelState = $(".pbLabelToggle .active").attr("rel");
				if(labelState == "on"){
					var labelActive = 'style="display:inline;"';
				} else {
					var labelActive = 'style="display:none;"';
				}
				var progressBarHtml = '<div id="progressbar" class="ui-progressbar ui-widget ui-widget-content ui-corner-all" role="progressbar" aria-valuemin="0" aria-valuemax="99" aria-valuenow="37" style="width: 99%;">\
				    <div class="ui-progressbar-value ui-widget-header ui-corner-left" style="width: 50%; text-align:right;"><span class="pblabel" '+labelActive+'>% Complete&nbsp;</span></div>\
				</div>'
				// Insert the new section into the TinyMCE editor
					var newSection = '<div class="'+newSectionClass+'">'+progressBarHtml+'</div>';
					$(iframeID).contents().find("#template-content").prepend(newSection);
				// Create an <li> for this section in the Sections List
					var newSectionControls = '<li>\
						<span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
						<label><input type="checkbox" class="customSection" checked value="'+newSectionClass+'">\
							<span class="sectionTitle">'+newSectionName+'</span>\
						</label>\
						</li>';
					$(newSectionControls).prependTo(".sections-list");
				// Clear the section name field
					// $("#newSectionName").val("");
				// Bind a change function to bring up the remove button when unchecked
					$('.customSection').change(function (){
						if($(this).is(":checked")) {
							templateCheck();
							checkSection(this.value);
						} else {
							var targetSection = "."+this.value;
                            markToRemove(targetSection);
						}
					});
					$("#addProgressBar").html('<i class="icon-reset"></i> Update');
					$("#progressBarWidth").val("").attr("placeholder", "50");
					$(".deletePBTool").show();
			} else {
				var barWidth = $("#progressBarWidth").val();
				$(iframeID).contents().find('.ui-progressbar-value').css('width', barWidth+"%");
				$("#progressBarWidth").val("").attr("placeholder", barWidth);
			}
			deleteProgressBar();
		}
		function changePbHeight(heightClass){
			$(iframeID).contents().find('#progressbar').removeClass("pbHeightMed pbHeightSmall pbHeightMicro").addClass(heightClass);
		}
		function deleteProgressBar(){
			$(".deletePBTool").click(function (e){
				e.preventDefault();
				$(iframeID).contents().find(".custom-progressbar").remove();
				$(".deletePBTool").hide();
				$("#addProgressBar").html('<i class="icon-add"></i> Add Bar');
				$("#progressBarWidth").val("").attr("placeholder", "Percent");
				$("input[value=custom-progressbar]").parents("li").remove();
			});
		}

///////////////////////////////
//    QUICK CHECK            //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////

		function quickCheck(mceInstance){
			var quickCheckControls = '<h3>\
				Quick Check\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Quick Check Tool</div>\
					  <div class=\'popover-content\'>\
					  <ul><li>A Quick Check is a section added to the end of the page to test comprehension.</li>\
					  <li>Quick Checks are not graded but provide instant feedback of why an answer is correct or incorrect.</li>\
					  <li>Quick Checks will hide the next button until the correct answer has been provided.</li>\
					  <li>Only two Quick Check question can be added per page.</li></ul></div>">\
					  &nbsp;<span class="screenreader-only">About Quick Check.</span>\
					</a>\
				</h3><div>\
				<div class="btn-group quickCheckSections">\
					<a href="#" class="btn btn-mini active" rel=".quickCheckOneSection">Quick Check 1</a>\
					<a href="#" class="btn btn-mini" rel=".quickCheckTwoSection">Quick Check 2</a>\
				</div>\
				<div class="btn-group-label bordered-section quickCheckOneSection" style="margin-top:10px;">\
					<a href="#" id="addquickCheckOne" class="btn btn-mini addQuickCheck" rel="quickCheckOne" data-tooltip="top" title="Clicking this button will add a Quick Check section to the bottom of the content area."><i class="icon-add"></i> Add QuickCheck 1</a>\
					<div class="quickCheckOneControls" style="display:none;">\
						<a href="#" class="btn btn-mini addAnswer" rel="quickCheckOne" data-tooltip="top" title="Add an answer to the bottom of the Quick Check"><i class="icon-add"></i>Add Answer</a>\
						<a href="#" class="btn btn-mini updateAnswers"><i class="icon-refresh"></i> Update Answers</a>\
					</div>\
					<ol id="quickCheckOneSort" class="sections_li unstyled" rel="#quickCheckOne" style="margin:10px 0;"></ol>\
					<a href="#" id="removeQuickCheckOne" class="btn btn-mini remove removeQuickCheck" rel="quickCheckOne" style="display:none;" data-tooltip="top" title="Click this button to remove the Quick Check section."><i class="icon-end"></i> Remove QuickCheck 1</a>\
				</div>\
				<div class="btn-group-label bordered-section quickCheckTwoSection" style="margin-top:10px;display:none;">\
					<a href="#" id="addquickCheckTwo" class="btn btn-mini addQuickCheck" rel="quickCheckTwo" data-tooltip="top" title="Clicking this button will add a Quick Check section to the bottom of the content area."><i class="icon-add"></i> Add QuickCheck 2</a>\
					<div class="quickCheckTwoControls" style="display:none;">\
						<a href="#" class="btn btn-mini addAnswer" rel="quickCheckTwo" data-tooltip="top" title="Add an answer to the bottom of the Quick Check"><i class="icon-add"></i>Add Answer</a>\
						<a href="#" class="btn btn-mini updateAnswers"><i class="icon-refresh"></i> Update Answers</a>\
					</div>\
					<ol id="quickCheckTwoSort" class="sections_li unstyled" rel="#quickCheckTwo" style="margin:10px 0;"></ol>\
					<a href="#" id="removeQuickCheckTwo" class="btn btn-mini remove removeQuickCheck" rel="quickCheckTwo" style="display:none;" data-tooltip="top" title="Click this button to remove the Quick Check section."><i class="icon-end"></i> Remove QuickCheck 2</a>\
				</div>\
				</div>';
			$("#custom-tools-accordion").append(quickCheckControls);
			quickCheckReady(mceInstance);
		}

	////// On Ready/Click functions  //////
		function quickCheckReady(mceInstance){
			var ed = tinyMCE.get(mceInstance);
			$(".addQuickCheck").click(function (e) {
				e.preventDefault();
				var quickCheckNum = $(this).attr("rel");
				var quickCheckNumber = "1";
				if(quickCheckNum == "quickCheckTwo"){
					quickCheckNumber = "2";
				}
				var quickCheckTemplate = '<div id="'+quickCheckNum+'" class="quickCheck '+quickCheckNum+'Content"><h4>Quick Check '+quickCheckNumber+': Title</h4><p>Put question text here</p><div class="answers"><div class="answerWrapper"><div class="answer"><p>Answer A</p></div><div class="response"><p>Response text to display when this answer is selected.</p></div></div><div class="answerWrapper"><div class="answer"><p>Answer B</p></div><div class="response"><p>Answer B reply text</p></div></div></ul></div>';
				$(iframeID).contents().find('#template-content').append(quickCheckTemplate);
				scrollToElement('#'+quickCheckNum);
				highlightNewElement('#'+quickCheckNum);
				identifyQuickChecks();
				// identifyQuestions();
				var tabsSection = '<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span> <label><input type="checkbox" class="customSection" checked value="'+quickCheckNum+'Content"> <span class="sectionTitle">Quick Check '+quickCheckNumber+'</span></label></li>';
				$(tabsSection).appendTo(".sections-list");
				$('.customSection').change(function (){
					if($(this).is(":checked")) {
						templateCheck();
						checkSection(this.value);
					} else {
						var targetSection = "."+this.value;
                        markToRemove(targetSection);
					}
				});
				bindHover();
			});
			$(".addAnswer").click(function (e){
				e.preventDefault();
				var quickCheckNum = $(this).attr("rel");
				$(iframeID).contents().find('#'+quickCheckNum+' .answers').append('<div class="answerWrapper"><div class="answer"><p>New Answer</p></div><div class="response"><p>New answer response text</p></div></div>');
				$("#"+quickCheckNum+"Sort").html("");
				scrollToElement('#'+quickCheckNum+' .answer:last');
				highlightNewElement('#'+quickCheckNum+' .answer:last');
				identifyQuickChecks();
			});
			$(".updateAnswers").click(function (e){
				e.preventDefault();
				identifyQuickChecks();
			});
			$(".quickCheckSections a").click(function (e){
				e.preventDefault();
				$(".quickCheckSections a").each(function (){
					$(this).removeClass("active");
					$($(this).attr("rel")).hide();
				});
				$($(this).attr("rel")).show();
				$(this).addClass("active");
			});
			identifyQuickChecks();
		}

	////// Supporting functions  //////
		// future improvement: extend functionality to list answers in a sortable list
			function identifyQuestions(quickCheckNum){
				$("#"+quickCheckNum+"Sort").html("");
				$(iframeID).contents().find("#"+quickCheckNum+" .answerWrapper").each(function (i) {
					var answerText = $(this).find(".answer").text();
					if (answerText.length > 25){
						var answerText = answerText.substring(0,20)+"...";
					}
					var newClass = "answerWrapper answer-"+i
					var thisIsCorrect = "";

					if($(this).hasClass("correctAnswer")){
						thisIsCorrect = " correct";
						newClass += " correctAnswer";
					}
					$(this).attr("class", newClass);
					$("#"+quickCheckNum+"Sort").append('<li id="'+quickCheckNum+'Answer'+i+'" rel="#'+quickCheckNum+' .answer-'+i+'">\
						<span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
						<a href="#" class="qc-markCorrect'+thisIsCorrect+'" rel="#'+quickCheckNum+' .answer-'+i+'" title="Mark as correct answer"><i class="icon-check"></i><span class="screenreader-only">Mark as Correct Answer</span>\
						'+answerText+'</a>\
						<a href="#" class="pull-right qc-removeAnswer remove" rel="#'+quickCheckNum+' .answer-'+i+'" title="Delete answer"><i class="icon-end"></i><span class="screenreader-only">Delete Answer</span></a>\
						</li>');
				});
				$( "#"+quickCheckNum+"Sort" ).sortable({
					update: function( event, ui ) {
						// loop through the answers and move them
						$('#'+quickCheckNum+'Sort li').each(function (i) {
							var connectedAnswer = $(this).attr("rel");
							// console.log(connectedAnswer);
							var connectedSection = $(iframeID).contents().find(connectedAnswer);
							connectedSection.appendTo($(iframeID).contents().find("#"+quickCheckNum+" .answers"));
						});
						$("#"+quickCheckNum+"Sort").html("");
						identifyQuickChecks();
					}
				});
				$( "#"+quickCheckNum+"Sort" ).disableSelection();
				if($(iframeID).contents().find("#quickCheckOne").length>0){
					$("#addquickCheckOne").hide();
					$("#removeQuickCheckOne").show();
					$(".quickCheckOneControls").show();
				}
				if($(iframeID).contents().find("#quickCheckTwo").length>0){
					$("#addquickCheckTwo").hide();
					$("#removeQuickCheckTwo").show();
					$(".quickCheckTwoControls").show();
				}
				bindHover();
			}
		// Identify any quickchecks
			function identifyQuickChecks(){
				if($(iframeID).contents().find(".quickCheck").length>0){
					$(iframeID).contents().find(".quickCheck").each(function (){
						// Get the quickcheck number
							var quickCheckNum = $(this).attr("id");
							identifyQuestions(quickCheckNum);
					});
				}
				$(".qc-markCorrect").click(function (e) {
					e.preventDefault();
					var connectedAnswer = $(this).attr("rel");
					var connectedSection = $(this).parents("ol").attr("rel");
					// console.log(connectedSection);
					$(iframeID).contents().find(connectedSection).find('.correctAnswer').removeClass('correctAnswer');
					$(iframeID).contents().find(connectedAnswer).addClass('correctAnswer');
					$(this).parents(".sections_li").find(".correct").removeClass("correct");
					$(this).addClass("correct");
				});
				$(".qc-removeAnswer").click(function (e) {
					e.preventDefault();
					var connectedAnswer = $(this).attr("rel");
					$(iframeID).contents().find(connectedAnswer).remove();
					$(this).parents("li").remove();
				});
				$(".removeQuickCheck").click(function (e){
					e.preventDefault();
					var quickCheckNum = $(this).attr("rel");
					$(iframeID).contents().find('#'+quickCheckNum).remove();
					$("#"+quickCheckNum+"Sort").html("");
					$("."+quickCheckNum+"Controls").hide();
					$("#add"+quickCheckNum).show();
					$(this).hide();
					$('input[value='+quickCheckNum+'Content]').parents('li').remove();
				});
			}

///////////////////////////////
//    SECTIONS               //
///////////////////////////////


	////// Custom Tools Accordion tab setup  //////

		// create sections custom tool
		// Rework to use an array so that it can be customized for different pages
			function sectionsTool(sectionArray, mceInstance){
				var addAccordionSection = '<h3>\
						Sections\
						<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
							title="<div class=\'popover-title\'>Content Sections</div>\
						  	<div class=\'popover-content\'>\
						  		<p>Sections provide a way to structure the content of your page.</p>\
						  		<p>This tool allows you to add several predefined sections as well as add new sections.</p>\
						  		<p>Once added, this tool will also allow you to rearrange your sections.</p>\
					  		</div>">\
						  &nbsp;<span class="screenreader-only">About content sections.</span>\
						</a>\
						</h3>\
					<div>\
					<form class="form-inline"><input id="newSectionName" type="text" placeholder="New Section Title"><a href="#" id="addSection" class="btn"><i class="icon-add"></i><span class="screenreader-only">Add New Section</span></a></form>\
					<ol class="unstyled sections-list">\
					</ol>\
					<div id="sectionsButtons"></div>\
					<div class="removeSectionsWrapper hide">\
						<a href="#" class="btn btn-danger removeSections"><i class="icon-trash"></i> Remove Section(s)</a>\
						<p style="margin-top:10px;"><strong>Warning:</strong> This will also delete any content within the section(s).</p>\
					</div>\
					</div>';
				$("#custom-tools-accordion").append(addAccordionSection);
				// Loop through base sections array to populate the sections-list
					$.each(sectionArray, function (key, value){
						$(".sections-list").append('<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>&nbsp;\
						  	<label><input type="checkbox" class="'+key+'Section" value="'+key+'"> <span class="section-title">'+key+' Section</span></label>\
							<a html="#" class="identify-section identify-section-'+key+' icon-collection-save" rel="'+key+'" data-tooltip="left" title="Turn selected content into <br>'+key+' section"> Identify '+key+' section</a>\
							</li>');
					});
				sectionsReady(sectionArray, mceInstance);
			}

	////// On Ready/Click functions  //////
		function sectionsReady(sectionArray, mceInstance){
			identifySections(sectionArray);
			sortableSections(sectionArray);
			selectionToSection(mceInstance);
			markTitle(mceInstance);
			var bloomsBox = '<a class="btn btn-mini bloomsBtn" href="#" data-tooltip="top" title="Select action verbs from<br> Bloom\'s &rdquo;Revised&ldquo; Taxonomy">Bloom&rsquo;s Revised</a>\
				<div id="bloomsBox" style="display:none" title="Bloom\'s Revised">\
                <div class="btn-group-label">Insert At:\
                    <div class="btn-group">\
                        <a class="btn btn-mini bloomsNewItem active" href="#" data-tooltip="top" tile="Will add a new list item to the &ldquo;Outcomes&rdquo; list.">New List Item</a>\
                        <a class="btn btn-mini bloomsAtCursor" href="#">At Cursor</a>\
                    </div>\
                </div>\
                <div id="bloomsControls"></div>\
                <div id="blooms"></div>\
                </div>';
            $("#sectionsButtons").append(bloomsBox);
            loadBlooms();



			// Functions to run when a section checkbox is changed
				$('.sections-list input:checkbox').change(function (){
					if($(this).is(":checked")) {
						templateCheck();
						$('.sections-list input:checkbox:checked').each(function (i) {
							checkSection(this.value, sectionArray);
						});
					} else {
						var targetSection = "."+this.value;
                        markToRemove(targetSection);
					}
				});
			// When they click "Remove Unckecked Section(s)" make the necessary changes
				$(".removeSections").click(function(){
					// remove any sections that were unchecked
					$('.sections-list input:checkbox').not(":checked").each(function (i){
						$(iframeID).contents().find('.'+this.value).remove();
						if($(this).hasClass("customSection")){
							$(this).parents("li").remove();
						}
					});
					$(".removeSectionsWrapper").hide();
				});
			// "+" button next to new section field
				$("#addSection").click(function (e){
					e.preventDefault();
					createSection(sectionArray);
				});
			// Button that turns selected text into a predefined section
				$(".identify-section").click(function (e){
					e.preventDefault();
					var sectionName = $(this).attr("rel");
					wrapNamedSection(sectionName, mceInstance);
				});
			// create a new section if return/enter is pressed in the new section field
				$("#newSectionName").keydown(function(event){
					if(event.keyCode == 13) {
						event.preventDefault();
						createSection(sectionArray);
						return false;
					}
				});

		}

        function loadBlooms(){
			//// BLOOMS ////
			$.each(bloomsRevisedSections, function (key, value) {
			    
			    $("#bloomsControls").append('<a class="btn btn-mini '+key+' bloomsCat">'+key+'</a>');
			    $("."+key).click(function (e) {
			        e.preventDefault();
			        if ($(this).hasClass("active")) {
			            $(this).removeClass("active");
			            $("#blooms").html("");
			        } else {
			            bloomsList(value);
			            $(".bloomsCat").each(function () {
			                $(this).removeClass("active");
			            });
			            $(this).addClass("active");
			        }
			    })
			});
			// Put category buttons into two btn-groups 
			    var step = 3;
			    var buttons= $("#bloomsControls > a");
			    buttons.each(function(i) {
			        if ( i % step == 0 ) buttons.slice(i,i+step).wrapAll('<div class="btn-group">');
			    });
			// Output category words based on which category is picked
			    function bloomsList(arrayName) {
			        $("#blooms").html("");
			        $.each(arrayName, function (i) {
			            $("#blooms").append('<a class="label label-info blooms" rel="'+this+'" title="'+this+'">'+this+'</a> ');
			        });
			        $(".blooms").click(function (e) {
			            e.preventDefault();
			            var selectedWord = $(this).attr("rel");
			            if ($(".bloomsNewItem").hasClass("active")) {
			                $(iframeID).contents().find(".objectives ol").append('<li>'+selectedWord+' </li>');
			            } else {
			                tinyMCE.execCommand('mceInsertContent', false, selectedWord+' ');
			            }
			        });
			    }
			// Trigger for Bloom's dialog
			    $(".bloomsBtn").click(function (e) {
			        e.preventDefault();
			        scrollToElement(".objectives");
			        $("#bloomsBox").dialog({ position: { my: "right bottom", at: "left top", of: ".bloomsBtn" }, modal: false, width: 255 });
			        $(".bloomsHelp").slideDown();
			        $("#ideaBox").parent("div").find(".ui-dialog-titlebar-close").click(function () {
			            $(".bloomsHelp").slideUp();
			        });
			    });
			// Determine whether word is inserted as a new item or at the cursor position
			    $(".bloomsNewItem").click(function (e) {
			        e.preventDefault();
			        $(this).addClass("active");
			        $(".bloomsAtCursor").removeClass("active");
			    });
			    $(".bloomsAtCursor").click(function (e) {
			        e.preventDefault();
			        $(this).addClass("active");
			        $(".bloomsNewItem").removeClass("active");
			    });
		    // Hide Bloom's button if objective's isn't checked
		    	function objectiveCheck(){
		    		if($(".objectivesSection").is(":checked")){
		    			$(".bloomsBtn").show();
		    		} else {
		    			$(".bloomsBtn").hide();
		    		}
		    	}
		    	objectiveCheck();
		    	$(".objectivesSection").change(function (){
	    			objectiveCheck();
		    	});
        }
                    
		// If the checked section exists, move it, if not add it
			function checkSection(sectionName, sectionArray){
				var container = $(iframeID).contents().find("#template-content");
				if($(iframeID).contents().find("."+sectionName).length>0){
                    $(iframeID).contents().find("."+sectionName).appendTo(container).removeClass("toRemove");
                    checkRemove();
				} else {
					$(iframeID).contents().find("#template-content").append(sectionArray[sectionName]);
				}
			}
		// Create a new section using the input in the template dialog
			function createSection(sectionArray){
				templateCheck();
				// Grab name from text field
					var newSectionName = $("#newSectionName").val();
				// Create a new class using the section name
					var newSectionClass = newSectionName.replace(/\W/g, '');
				// Insert the new section into the TinyMCE editor
					var newSection = '<div class="'+newSectionClass+'">\
							<h3>'+newSectionName+'</h3>\
							<p>Insert content here.</p>\
						</div>';
					$(iframeID).contents().find("#template-content").append(newSection);
				// Create an <li> for this section in the Sections List
					var newSectionControls = '<li>\
						<span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
						<label><input type="checkbox" class="customSection" checked value="'+newSectionClass+'">\
							<span class="sectionTitle">'+newSectionName+'</span>\
						</label>\
						</li>';
					$(newSectionControls).appendTo(".sections-list");
				// Clear the section name field
					$("#newSectionName").val("");
				// Bind a change function to bring up the remove button when unchecked
					$('.customSection').change(function (){
						if($(this).is(":checked")) {
							templateCheck();
							checkSection(this.value);
						} else {
							var targetSection = "."+this.value;
                            markToRemove(targetSection);
						}
					});
				// Put focus on new section
					scrollToElement('.'+newSectionClass);
					highlightNewElement('.'+newSectionClass);
					bindHover();
			}
		// This function loops through existing content and then updates section controls
			function identifySections(sectionArray){
				// for any div that does not have a class, add the text from the heading as the class
					$(iframeID).contents().find("#template-content div:not([class])").each(function(){
						if($(this).parents('.custom-accordion').length>0){

						} else {
							var sectionTitle = $(this).find("h3, h4").text();
							var newClass = sectionTitle.replace(/\W/g, '');
							$(this).addClass(newClass);
						}
					});
				// take every div with a class
					$(iframeID).contents().find("#template-content").children("div").each(function(){
						if($(this+'[class]')){
							var myValue = $(this).attr('class').split(' ')[0];
							// Check sections against default array
								if($.inArray(myValue, sectionArray) !== -1){
									// Not sure what is matching here at the moment, it should have been what wasn't in the default list
									alert(myValue+" is in the if portion");
									$('.sections-list input[value='+myValue+']').parents('li').appendTo(".sections-list");
								} else if(myValue == "custom-accordion") {
									var accordionSection = '<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span> <label><input type="checkbox" class="customSection" checked value="'+myValue+'"> <span class="sectionTitle">Custom Accordion</span></label></li>';
									$(accordionSection).appendTo(".sections-list");
								} else if(myValue == "tabbed-section") {
									var tabsSection = '<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span> <label><input type="checkbox" class="customSection" checked value="'+myValue+'"> <span class="sectionTitle">Custom Tabs Section</span></label></li>';
									$(tabsSection).appendTo(".sections-list");
								} else if(myValue == "custom-progressbar") {
									var tabsSection = '<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span> <label><input type="checkbox" class="customSection" checked value="'+myValue+'"> <span class="sectionTitle">Progress Bar</span></label></li>';
									$(tabsSection).appendTo(".sections-list");
								} else if(myValue == "student-verification") {
									var tabsSection = '<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span> <label><input type="checkbox" class="customSection" checked value="'+myValue+'"> <span class="sectionTitle">Student Verification</span></label></li>';
									$(tabsSection).appendTo(".sections-list");
								} else if(myValue == "custom-modal") {
									var tabsSection = '<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span> <label><input type="checkbox" class="customSection" checked value="'+myValue+'"> <span class="sectionTitle">Modal Dialog Contents</span></label></li>';
									$(tabsSection).appendTo(".sections-list");
								} else if(myValue == "quickCheck") {
									// console.log($(this).attr("id"));
									if($(this).find("h4:first").length>0){
										qcTitle = $(this).find("h4:first").text();
									} else {
										qcTitle = $(this).text();
									}
									if (qcTitle.length > 25){
										var qcTitle = qcTitle.substring(0,23)+"...";
									}
									var qcClass = $(this).attr("id")+"Content";
									var tabsSection = '<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span> <label><input type="checkbox" class="customSection" checked value="'+qcClass+'"> <span class="sectionTitle">'+qcTitle+'</span></label></li>';
									$(tabsSection).appendTo(".sections-list");
								} else if($('.sections-list input[value='+myValue+']').length>0){
									// If it is already in the list, move it to the bottom
									$('.sections-list input[value='+myValue+']').parents('li').appendTo(".sections-list");
									$('.identify-section-'+myValue).hide();
									$('.'+myValue+'Section').prop('checked', true);
								} else {
									// If it is a default section, move it to the bottom and remove the selection to section link
									// alert(myValue+" is in the else portion");
										var myTitle = "";
									if($(this).find("h3:first").length>0){
										myTitle = $(this).find("h3:first").text();
									} else {
										myTitle = $(this).text();
									}
									if (myTitle.length > 25){
										var myTitle = myTitle.substring(0,23)+"...";
									}
									var newSection = '<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span> <label><input type="checkbox" class="customSection" checked value="'+myValue+'"> <span class="sectionTitle">'+myTitle+'</span></label></li>';
									$(newSection).appendTo(".sections-list");
								}
						}
					});
				// Move uncheck default items to bottom of sections-list
				$('.sections-list input:checkbox').not(":checked").each(function (i){
					$(this).parents('li').appendTo(".sections-list");
				});
				bindHover();
			}
		// Parent element of cursor position will become the title of the theme
			function markTitle(mceInstance){
				$("#sectionsButtons").prepend(' <a class="btn btn-mini markTitle" href="#" data-tooltip="top"\
						title="Place the cursor on the element you want to become the module title and click this button.">\
						<i class="icon-text"></i> Make Title\
					</a>');
				$(".markTitle").click(function (e){
					e.preventDefault();
					templateCheck();
					var ed = tinyMCE.get(mceInstance);
					var existingTitle = tinyMCE.DOM.getParent(tinyMCE.get(mceInstance).selection.getNode()).innerHTML;
					$(iframeID).contents().find("#banner-right").html(existingTitle);
					// if it is an <h2> it will remove original
						tinyMCE.activeEditor.dom.remove(ed.dom.getParent(ed.selection.getNode(), 'h2'));
				});
			}
		// Cleans out all empty elements and elements containing only &nbsp;
			function removeEmpty(){
				$(".remove-empty").click(function (e){
					e.preventDefault();
					// Run twice just to make sure everything is cleaned
					for(var i=0; i<2; i++){
						$(iframeID).contents().find("h4, p, h3, li").filter( function() {
						    return $.trim($(this).html()) == '&nbsp;';
						}).remove();
						$(iframeID).contents().find("body").find(":empty").each(function(){
							if(/^(?:area|br|col|embed|hr|img|input|link|meta|param|source)$/i.test($(this)[0].tagName)) {
								//do nothing
							} else {
								$(this).remove();
							}
						})
					}
				});
			}
		// Selection to section button
			function selectionToSection(mceInstance){
				$("#sectionsButtons").prepend(' <a class="selectionToSection btn btn-mini" data-tooltip="left" title="Turn selected content into a new section.<br><span class=\'text-warning\'><strong>Content must contain a heading element!</strong></span>">\
						<i class="icon-collection-save"></i> Selection to Section</a>');
				$(".selectionToSection").click(function (e){
					templateCheck();
					wrapSection(mceInstance);
				});
			}
		// Make sections-list sortable so sections can be reordered
			function sortableSections(sectionArray){
				$( ".sections-list" ).sortable({
					update: function( event, ui ) {
						// Add the basic template style if one is not already set
						templateCheck();
						// loop through the checked sections and move or add them
						$('.sections-list input:checkbox:checked').each(function (i) {
							checkSection(this.value, sectionArray);
						});
					}
				});
				$( ".sections-list" ).disableSelection();
			}
		// Wrap existing section as one of the default sections (i.e. Objectives, Readings, Lectures, etc)
			function wrapNamedSection(sectionName, mceInstance){
				templateCheck();
				var ed = tinyMCE.get(mceInstance);
				ed.focus(); 
				ed.selection.setContent('<div class="'+sectionName+'">' + ed.selection.getContent() + '</div>');
				var tempSection = $(iframeID).contents().find('.'+sectionName);
				var container = $(iframeID).contents().find("#template-content");
				$(container).append(tempSection);
				$('.sections-list input[value='+sectionName+']').prop('checked',true);
				$('.identify-section-'+sectionName).hide();
			}
		// Wrap existing code into a new section and add to content portion "Selection to Section" button
			function wrapSection(mceInstance){
				var ed = tinyMCE.get(mceInstance);
				ed.focus(); 
				ed.selection.setContent('<div class="temp">' + ed.selection.getContent() + '</div>');
				var tempSection = $(iframeID).contents().find(".temp");
				var sectionTitle = $(tempSection).find("h3:first").text();
				var newClass = sectionTitle.replace(/\W/g, '');
				var container = $(iframeID).contents().find("#template-content");
				$(container).append(tempSection);
				$(tempSection).removeClass("temp").addClass(newClass);
				// Create an <li> for this section in the Sections List
					var newSectionControls = '<li>\
						<span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
						<label><input type="checkbox" class="customSection" checked value="'+newClass+'">\
							<span class="sectionTitle">'+sectionTitle+'</span>\
						</label>\
						</li>';
					$(newSectionControls).appendTo(".sections-list");
			}

///////////////////////////////
//    STUDENT VERIFICATION   //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function studentVerification(){
			var addAccordionSection = '<h3>\
				Student Verification\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Student Verfification</div>\
					  <div class=\'popover-content\'><p>Student Verfification help text.</p></div>">\
					  &nbsp;<span class="screenreader-only">About Student Verfification.</span>\
					</a>\
				</h3><div>\
				<p>Creates a student agreement that is signed and submitted with the click of a button.</p>\
				<div class="btn-group" style="margin: 5px 0;">\
					<a href="#" class="btn btn-mini addVerification"><i class="icon-add"></i> Add</a>\
					<a href="#" class="btn btn-mini removeVerification"><i class="icon-end"></i> Remove</a>\
				</div>\
				<p>The button below will place code at the cursor position that will be replaced by the students name.</p>\
				<a href="#" class="btn btn-mini icon-user insertStudentName" style="margin: 5px 0;">Insert Student Name</a>\
				<p>Work with Success message:</p>\
				<a href="#" class="btn btn-mini toggleVerificationSuccess" style="margin: 5px 0; display:none;">Toggle Success Visibility</a>\
				<div class="alert alert-error verificationHint" style="display:none;">Click "Done Editing" before saving changes</div>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			studentVerificationReady();
			insertStudentName();
		};

	////// On Ready/Click functions  //////
		function studentVerificationReady(){
			$(".addVerification").click( function (e){
				e.preventDefault();
				// set assignment Submission type and check "Allow Text Entry"
				$("#assignment_submission_type").val("online");
				$("#assignment_text_entry").prop('checked', true);
				addStudentVerification();
			});
			$(".removeVerification").click( function (e){
				e.preventDefault();
				$(iframeID).contents().find('.student-verification').remove();
			});
			$('.toggleVerificationSuccess').click(function (e){
				e.preventDefault();
				checkSuccessVisibility();
			});
			checkSuccessVisibility();
		}

	////// Supporting functions  //////

		// puts a section in at the cursor that will be replaced by the student name.
		function insertStudentName(){
			$(".insertStudentName").click(function (e){
				e.preventDefault();
				var insertStudentName = ' <span class="studentName">Student Name Inserted Here</span>&nbsp; ';
				tinyMCE.execCommand('mceInsertContent', false, insertStudentName);
			});
		}
		function addStudentVerification(){
			templateCheck();
			if(!$(iframeID).contents().find('.student-verification').length>0){
				// Agreement section - will include button
				var studentVerification = '<div id="studentVerification"><p>I, <span class="studentName">Student Name Inserted Here</span>, acknowledge that I have read and understand ...</p></div>';
				// Section for instructions presented on mobile app
				var appInstructions = '<div id="verificationInstructions"><p>As your submission for this assignment, submit the words "I have read and understand the notice". (<em>This text appears on mobile app or if the script fails</em>)</p></div>';
				// Success message, displayed after assignment is submitted
				var verificationSuccess = '<div id="verificationSuccess"><p>Enter text to be displayed to the student when submitted successfully. This text will also be visible on the mobile app.</p></div>';

				// New section information
				var newSectionName = "Student Verification";
				var newSectionClass = "student-verification";

				// Insert the new section into the TinyMCE editor
					var newSection = '<div class="'+newSectionClass+'">'+studentVerification+appInstructions+verificationSuccess+'</div>';
					$(iframeID).contents().find("#template-content").append(newSection);
				// Create an <li> for this section in the Sections List
					var newSectionControls = '<li>\
						<span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
						<label><input type="checkbox" class="customSection" checked value="'+newSectionClass+'">\
							<span class="sectionTitle">'+newSectionName+'</span>\
						</label>\
						</li>';
					$(newSectionControls).appendTo(".sections-list");
				// Bind a change function to bring up the remove button when unchecked
					$('.customSection').change(function (){
						if($(this).is(":checked")) {
							templateCheck();
							checkSection(this.value);
						} else {
							var targetSection = "."+this.value;
                            markToRemove(targetSection);
						}
					});
			} else {
				// Verify all the necessary parts are there
				// Look for Verification section
				if($(iframeID).contents().find('#studentVerification').length>0){
					$(iframeID).contents().find('.student-verification').append($('#studentVerification'));
				} else {
					$(iframeID).contents().find('.student-verification').append(studentVerification);
				}
				// Look for Mobile App Instructions section
				if($(iframeID).contents().find('#verificationInstructions').length>0){
					$(iframeID).contents().find('.student-verification').append($('#verificationInstructions'));
				} else {
					$(iframeID).contents().find('.student-verification').append(appInstructions);
				}
				// Look for Verification success section
				if($(iframeID).contents().find('#verificationSuccess').length>0){
					$(iframeID).contents().find('.student-verification').append($('#verificationSuccess'));
				} else {
					$(iframeID).contents().find('.student-verification').append(verificationSuccess);
				}
			}
			scrollToElement('.student-verification');
		}
		function checkSuccessVisibility(){
			if($(iframeID).contents().find("#verificationSuccess").length>0 && $(iframeID).contents().find("#verificationSuccess").is(':visible')){
				$('.toggleVerificationSuccess').html('<i class="fa fa-pencil"></i> Edit Success Message').show();
				$(iframeID).contents().find("#verificationSuccess").hide();
				$('.verificationHint').hide();
			} else if ($(iframeID).contents().find("#verificationSuccess").length>0 && !$(iframeID).contents().find("#verificationSuccess").is(':visible')){
				$('.toggleVerificationSuccess').html('<i class="fa fa-save"></i> Done Editing Success Message').show();
				$(iframeID).contents().find("#verificationSuccess").show();
				$('.verificationHint').show();
			} else {
				$('.toggleVerificationSuccess').hide();
				$('.verificationHint').hide();
			}
		}

///////////////////////////////
//    TABLES                 //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function customTables(mceInstance){
			var addAccordionSection = '<h3>\
				Tables\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Custom Tables</div>\
					  <div class=\'popover-content\'><p>Add some style to existing tables.</p></div>">\
					  &nbsp;<span class="screenreader-only">About Custom Tables.</span>\
					</a>\
				</h3><div>\
				<div class="btn-group tableOptions" style="margin-bottom:10px;">\
					<a href="#" class="btn btn-mini active" rel=".tableNew">Create Table</a>\
					<a href="#" class="btn btn-mini" rel=".tableLayout">Edit Table</a>\
					<a href="#" class="btn btn-mini" rel=".tableStyles">Style Table</a>\
				</div>\
				<div class="tableNew">\
					<div class="bordered-section">\
						<h4>Create Table</h4>\
						<div class="input-append" style="margin:0 5px 10px 0; float:left;">\
							<input id="tableNumCols" type="text" placeholder="2">\
							<span class="add-on">Columns</span>\
						</div>\
						<div class="input-append" style="margin-bottom:10px;">\
							<input id="tableNumRows" type="text" placeholder="2">\
							<span class="add-on">Rows</span>\
						</div>\
						<label>\
							<input type="checkbox" class="includeHeader" checked>\
							Include Headings\
						</label><br>\
						<a href="#" class="btn btn-mini btn-primary insertTable"><i class="icon-add"></i> Insert at Cursor</a>\
					</div>\
				</div>\
				<div class="tableLayout" style="display:none;">\
					<p><small>Choose an existing table to use the options below.</small></p>\
					<div class="bordered-section btn-group-label">\
						<a href="#" class="btn btn-mini addTableHeading" data-tooltip="left" title="Turns first row into properly formatted heading. Place your cursor anywhere in the table and click the button.">First Row Headings</a><br>\
						<span>Sortable:</span>\
						<div class="btn-group" style="margin:5px 0">\
							<a href="#" class="btn btn-mini makeTableSortable" data-tooltip="top" title="Will allow the table to be sorted by clicking a column name.">On/Off</a>\
						</div><br>\
						<span>Insert Row: </span><br>\
						<div class="btn-group" style="margin-bottom:10px;">\
							<a href="#" class="btn btn-mini mceTableCommand" rel="mceTableInsertRowBefore"><i class="icon-add"></i> Before/Above</a>\
							<a href="#" class="btn btn-mini mceTableCommand" rel="mceTableInsertRowAfter"><i class="icon-add"></i> After/Under</a>\
						</div>\
						<span>Insert Column: </span><br>\
						<div class="btn-group" style="margin-bottom:10px;">\
							<a href="#" class="btn btn-mini mceTableCommand" rel="mceTableInsertColBefore"><i class="icon-add"></i> Before</a>\
							<a href="#" class="btn btn-mini mceTableCommand" rel="mceTableInsertColAfter"><i class="icon-add"></i> After</a>\
						</div><br>\
						<span>Delete Current:</span><br>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini mceTableCommand remove" rel="mceTableDeleteRow"><i class="icon-end"></i> <span class="screenreader-only">Delete Current</span> Row</a>\
							<a href="#" class="btn btn-mini mceTableCommand remove" rel="mceTableDeleteCol"><i class="icon-end"></i> <span class="screenreader-only">Delete Current</span> Column</a>\
							<a href="#" class="btn btn-mini mceTableCommand remove" rel="mceTableDelete"><i class="icon-end"></i> <span class="screenreader-only">Delete Current</span> Table</a>\
						</div>\
					</div>\
				</div>\
				<div class="tableStyles" style="display:none;">\
					<p><small>Choose an existing table to use the options below.</small></p>\
					<div class="bordered-section btn-group-label">\
						<span>Table Style:</span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini tableStyle" rel="table">Basic</a>\
							<a href="#" class="btn btn-mini tableStyle" rel="table table-bordered">Border</a>\
							<a href="#" class="btn btn-mini tableStyle" rel="table table-condensed">Condensed</a>\
							<a href="#" class="btn btn-mini tableStyle" rel="table table-striped">Zebra</a>\
						</div>\
						<a href="#" class="btn btn-mini tableStyle remove icon-end" rel="" style="margin:5px 0 10px;"> Remove Table Style</a><br>\
						<span>Row Background:</span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini rowBackgrounds rowBgSuccess" rel="success">Success</a>\
							<a href="#" class="btn btn-mini rowBackgrounds rowBgError" rel="error">Error</a>\
							<a href="#" class="btn btn-mini rowBackgrounds rowBgWarning" rel="warning">Warning</a>\
							<a href="#" class="btn btn-mini rowBackgrounds rowBgInfo" rel="info">Info</a>\
							<a href="#" class="btn btn-mini rowBackgrounds remove icon-end" rel="" data-tooltip="top" title="Remove row background"><span class="screenreader-only">Remove row background</span></a>\
						</div>\
					</div>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			tablesReady(mceInstance);
		}
	////// On Ready/Click functions  //////
		function tablesReady(mceInstance){
			// Add table column
				$('.addTableColumn').click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var parentTable = ed.dom.getParent(ed.selection.getNode(), 'table');
					// add a temp class so that we can target table with jQuery
						tinyMCE.DOM.addClass(parentTable, 'addColumn');
					var cellCount = $(iframeID).contents().find('.addColumn tbody tr:first td').length;
					$(iframeID).contents().find('.addColumn thead tr').append("<th>Heading</th>");
					$(iframeID).contents().find('.addColumn tbody tr').each(function(){
						$(this).append("<td>Content</td>");
					});
					$(iframeID).contents().find(".addColumn").removeClass("addColumn");
				});
			// Make the first table row headings
				$(".addTableHeading").click(function (e){
					var ed = tinyMCE.get(mceInstance);
					var parentTable = ed.dom.getParent(ed.selection.getNode(), 'table');
					// add a temp class so that we can target table with jQuery
						tinyMCE.DOM.addClass(parentTable, 'markHeading');
					// if the table does not have a thead section, add it and move the first row of table
						if(!$(iframeID).contents().find(".markHeading thead").length>0 ){
							var topRow = $(iframeID).contents().find(".markHeading tr:first-child").html();
							$(iframeID).contents().find(".markHeading tr:first-child").remove();
							$(iframeID).contents().find(".markHeading").prepend("<thead>"+topRow+"</thead>");
							$(iframeID).contents().find(".markHeading thead td").each(function() {
								$(this).replaceWith('<th>' + $(this).text().trim() + '</th>'); 
							});
						}
					// remove temp class and check to see if it has the table class
						$(iframeID).contents().find(".markHeading").removeClass("markHeading");
						checkTable(parentTable);
				});
			// Make table sortable
				$(".makeTableSortable").click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var parentTable = ed.dom.getParent(ed.selection.getNode(), 'table');
					// Get the styles from the parent element
						var currentClass = tinyMCE.DOM.getAttrib(parentTable, 'class');
					// If the parent already has the class, remove it otherwise add it
						var regExpMatch = /\btablesorter\b/g;
						if (currentClass.match(regExpMatch) == null){
							tinyMCE.DOM.addClass(parentTable, 'tablesorter');
						} else {
							tinyMCE.DOM.removeClass(parentTable, 'tablesorter');
						}
				});
			// Buttons for manipulating the mce table
				$('.mceTableCommand').click(function (e){
					e.preventDefault();
					var myCommand = $(this).attr("rel");
					// console.log(myCommand);
					tinymce.activeEditor.execCommand(myCommand);
				});
			// Insert a table using the custom tool
				$('.insertTable').click(function (e){
					e.preventDefault();
					insertTable();
				});
				$("#tableNumCols").keydown(function(event){
					if(event.keyCode == 13) {
						event.preventDefault();
						insertTable();
						return false;
					}
				});
				$("#tableNumRows").keydown(function(event){
					if(event.keyCode == 13) {
						event.preventDefault();
						insertTable();
						return false;
					}
				});
			// applying and removing tr backgrounds
				$(".rowBackgrounds").click(function (e){
					var ed = tinyMCE.get(mceInstance);
					var parentTable = ed.dom.getParent(ed.selection.getNode(), 'table');
					var parentRow = ed.dom.getParent(ed.selection.getNode(), 'tr');
					removeRowStyle(parentRow);
					var rowClass = $(this).attr("rel");
					tinyMCE.DOM.addClass(parentRow, rowClass);
					checkTable(parentTable);
				});
			// Toggle between table sections
				$(".tableOptions a").click(function (e){
					e.preventDefault();
					$(".tableOptions a").each(function(){
						$(this).removeClass("active");
						var connectedSection = $(this).attr("rel");
						$(connectedSection).hide();
					});
					var showSection = $(this).attr("rel");
					$(showSection).show();
					$(this).addClass("active");
				});
			// Controls for Default, Bordered, Condensed, and Striped styles
				$(".tableStyle").click(function (e){
					e.preventDefault();
					var ed = tinyMCE.get(mceInstance);
					var myClass = $(this).attr('rel');
					var parentTable = ed.dom.getParent(ed.selection.getNode(), 'table');
					removeTableStyle(parentTable);
					// console.log(myClass);
					tinyMCE.DOM.addClass(parentTable, myClass);
				});
		}
	////// Supporting functions  //////
		// See if table already has the custom "table" class
			function checkTable(parentTable){
				// Get the styles from the parent element
					var currentClass = tinyMCE.DOM.getAttrib(parentTable, 'class');
				// If the parent already has the class, remove it otherwise add it
					var regExpMatch = /\btable\b/g;
					if (currentClass.match(regExpMatch) == null){
						tinyMCE.DOM.addClass(parentTable, 'table');
					}
			}
		// Insert a table using the custom tool
			function insertTable(){
				var numCols = $("#tableNumCols").val();
					if(numCols == ""){
						numCols = 2;
					}
					var numRows = $("#tableNumRows").val();
					if (numRows == ""){
						numRows = 2;
					}
					var toInsert = '<table>';
					if($(".includeHeader").prop("checked")){
						numRows = numRows-1;
						toInsert += '<thead><tr>';
						for(var i=0; i<numCols; i++){
							toInsert += '<th></th>';
						}
						toInsert += '</tr></thead>';
					}
					toInsert += '<tbody>';
					for(var i=0; i<numRows; i++){
						toInsert += '<tr>';
						for (var j=0; j<numCols; j++){
						toInsert += '<td></td>';
						}
						toInsert += '</tr>';
					}
					toInsert += '</tbody></table>';
					tinyMCE.execCommand('mceInsertContent', false, toInsert);
			}
		// clear out all custom row styles
			function removeRowStyle(parentRow){
				tinyMCE.DOM.removeClass(parentRow, 'success');
				tinyMCE.DOM.removeClass(parentRow, 'error');
				tinyMCE.DOM.removeClass(parentRow, 'warning');
				tinyMCE.DOM.removeClass(parentRow, 'info');
			}
		// clear out all custom table styles
			function removeTableStyle(parentTable){
				tinyMCE.DOM.removeClass(parentTable, 'table');
				tinyMCE.DOM.removeClass(parentTable, 'table-bordered');
				tinyMCE.DOM.removeClass(parentTable, 'table-condensed');
				tinyMCE.DOM.removeClass(parentTable, 'table-striped');
			}

///////////////////////////////
//    THEMES                 //
///////////////////////////////

	////////// Custom Tools Accordion tab setup  //////  //////
		function themeTool(){
			var addAccordionSection = '<h3>\
					Themes\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Content Themes</div>\
					  <div class=\'popover-content\'><p>Content themes allow you to add a consistent style to your content pages.</p><p>You can also specify whether or not Canvas should look for a course level css file.</div>">\
					  &nbsp;<span class="screenreader-only">About Themes.</span>\
					</a>\
				</h3>\
				<div>\
					<ul class="unstyled themes">\
					</ul>\
					<a class="btn btn-mini removeBannerLeft">Remove Module Number</a>\
					<label><input type="checkbox" id="customCSS"> Course Level CSS</label> &nbsp;\
					<a class="help" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Course Level CSS</div>\
					  <div class=\'popover-content\'><p>Use this if you will be creating a custom stylesheet to override the default style.</p><p>This will look for a <em>styles.css</em> file in a folder titled <em>global</em> in the course root folder.</p></div>">\
					  &nbsp;<span class="screenreader-only">About Course Level CSS</span>\
					</a>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			themesReady();
		}


	////// On Ready/Click functions  //////
		function themesReady(){
			(function() {
				// Output theme thumbs
				outputThemes(themeArray);
				outputThemes(bottomBannerThemeArray);
				$(".template-theme").click(function (e){
					e.preventDefault();
					templateCheck();
					scrollToElement("#template-wrapper");
					// add the class for the selected template to the template-wrapper
						var templateClass = $(this).attr("rel");
						$(iframeID).contents().find("#template-wrapper").removeClass().addClass(templateClass);
							themeElements(templateClass);
						if($(iframeID).contents().find("#template-wrapper").hasClass(templateClass)){
							$(".template-theme").each(function(){
								$(this).removeClass("active-theme");
							});
							$(this).addClass("active-theme");
						}
				});
				$(".removeBannerLeft").click(function (e){
					e.preventDefault();
					$(iframeID).contents().find("#banner-left").remove();
					$(iframeID).contents().find("#module-page-banner h2").attr("style", "padding-left: 10px;")
				});
				customCSSCheck();
				currentThemeCheck();
			})();
		}


	////// Base html variables for custom templates  //////
		var templateShell = '<div id="template-wrapper" class="bookmark">\
			<div id="module-page-banner">\
				<h2><span id="banner-left">\
					<span class="mod-text">Module</span><span class="mod-num">1</span>\
				</span>\
				<span id="banner-right">\
					Title\
				</span></h2>\
				</div>\
				<div id="template-content">\
				</div>\
			</div>';
		var bottomBanner = '<div id="banner-bottom">\
			<h3>Subtitle</h3>\
			<div id="description">\
				Description\
			</div>\
			</div>';

	////// Supporting functions  //////

		// The purpose of this check is to make sure that the custom-css tag doesn't have any content
		// and is the first item on the page. Also replaces old css code
			function customCSSCheck(){
				if($(iframeID).contents().find("#custom-css").length>0){
					// if it has contents unwrap them
					if($(iframeID).contents().find("#custom-css").text().length>1){
						$(iframeID).contents().find("#custom-css").contents().unwrap();
						$(iframeID).contents().find("body").prepend('<div id="custom-css">&nbsp;</div>');
					}
					$("#customCSS").prop('checked', true);
				}
				// change over old method
					if($(iframeID).contents().find('#usu-custom-css').length>0){
						// if it has contents unwrap them
						if($(iframeID).contents().find("#usu-custom-css").text().length>1){
							$(iframeID).contents().find("#usu-custom-css").contents().unwrap();
							$(iframeID).contents().find("body").prepend('<div id="custom-css">&nbsp;</div>');
						}
						$("#customCSS").prop('checked', true);
					}
				// Control
				$('#customCSS').change(function(){
					if($(this).is(":checked")) {
						if($(iframeID).contents().find('#custom-css').length>0){
						} else {
							$(iframeID).contents().find('body').prepend('<div id="custom-css">&nbsp;</div>');
						}
					} else {
						if($(iframeID).contents().find('#custom-css').length>0){
							$(iframeID).contents().find('#custom-css').remove();
						}
					}
				});
			}

		// If template is not there add it, will also remove and change old template
			function templateCheck(){
				addStyletoIframe();
				// Remove or change old template elements
					if($(iframeID).contents().find('#usu-template-page').length>0){
						$(iframeID).contents().find('#usu-template-page').attr('id', 'template-wrapper');
					}
					if($(iframeID).contents().find('#usu-template-banner').length>0){
						$(iframeID).contents().find('#usu-template-banner').attr('id', 'module-page-banner');
					}
					if($(iframeID).contents().find('#usu-template-list').length>0){
						$(iframeID).contents().find('#usu-template-list').contents().unwrap();
						$(iframeID).contents().find('#module-page-banner').after('<div id="template-content" />');
					}
				if($(iframeID).contents().find("#template-wrapper").length>0){
					var currentTheme = $(iframeID).contents().find("#template-wrapper").attr("class");
					$("#"+currentTheme).addClass("active-theme");
				} else {
					// Add base html if template doesn't exist
					$(iframeID).contents().find("#tinymce").prepend(templateShell);
				}
			}

		// Check and mark current theme in toolbar
			function currentThemeCheck(){
				if($(iframeID).contents().find("#template-wrapper").length>0){
					var currentTheme = $(iframeID).contents().find("#template-wrapper").attr("class");
					$("#"+currentTheme).addClass("active-theme");
				}
				addStyletoIframe();
			}
			// Loop through theme array and output thumbs
			function outputThemes(themeArray){
				$.each(themeArray, function (i) {
					$(".themes").append('<li id="'+this+'" class="template-theme" rel="'+this+'" title="'+this+' theme"><img src="https://elearn.usu.edu/canvasCustomTools/images/template_thumbs/'+this+'.png" width="45" alt="'+this+'"></a></li>');
	            });
			}

		// Ensure that necessary sections exist for a given style, will also fix broken banner
			function themeElements(templateClass){
				// this first portion is designed to fix anything that might have broken
				// Look to see if mod-num exists and grab value
				if($(iframeID).contents().find('.mod-num').length>0 && $(iframeID).contents().find('.mod-num').text() !== ""){
					var modNum = $(iframeID).contents().find('.mod-num').text();
				} else if ($(iframeID).contents().find('.usu-mod-num').length>0){
					var modNum = $(iframeID).contents().find('.usu-mod-num').text();
					$(iframeID).contents().find('.usu-mod-num').remove();
				} else {
					var modNum = "#";
				}
				// Look to see if mod-text exists and grab value
				if($(iframeID).contents().find('.mod-text').length>0 && $(iframeID).contents().find('.mod-text').text() !== ""){
					var modText = $(iframeID).contents().find('.mod-text').text();
				} else if ($(iframeID).contents().find('#page-left').length>0) {
					// Look for old template layout
					var modText = $(iframeID).contents().find('#page-left').text();
					// console.log(modText);
				} else {
					var modText = "Module";
				}
				// Look to see if title exists and grab value
				if($(iframeID).contents().find('#banner-right').length>0 && $(iframeID).contents().find('#banner-right').text() !== ""){
					var modTitle = $(iframeID).contents().find('#banner-right').text()
				} else if ($(iframeID).contents().find('#page-right').length>0) {
					var modTitle = $(iframeID).contents().find('#page-right').text();
				} else {
					var modTitle = "Title";
				}

				// setup banner text with values
				var templateBanner = '<h2><span id="banner-left">\
						<span class="mod-text">'+modText+'</span><span class="mod-num">'+modNum+'</span>\
					</span>\
					<span id="banner-right">'+modTitle+'</span></h2>\
					</div>';
				// Look to see if module-page-banner is intact
				if($(iframeID).contents().find('#module-page-banner').length>0){
					$(iframeID).contents().find('#module-page-banner').html(templateBanner);
				} else {
					$(iframeID).contents().find('#template-wrapper').prepend('<div id="module-page-banner">'+templateBanner+'</div>');
				}

				// Styles that utilize the bottom banner div
				// if not in the array, hide the banner
				if($.inArray(templateClass, bottomBannerThemeArray) == -1){
					// console.log("In bottom banner array");
					if($(iframeID).contents().find('#banner-bottom').length>0){
						$(iframeID).contents().find('#banner-bottom').hide();
					}
				// in the array, add or show the banner
				} else {
					if($(iframeID).contents().find('#banner-bottom').length>0){
						$(iframeID).contents().find('#banner-bottom').show();
					} else {
						$(iframeID).contents().find('#module-page-banner').after(bottomBanner);
					}
				}
			}

//////////////////////////////
//   START HERE CONTENT     //
//////////////////////////////
	var startHereContent = '<div id="template-wrapper" class="generic">' +
		'<div id="module-page-banner">' +
		'<h2><span id="banner-left"><span class="mod-text">Start Here: </span><span class="mod-num">#</span></span><span id="banner-right">Welcome to the Course</span></h2>' +
		'</div>' +
		'<div id="template-content">' +
		'<div class="WelcomeLetter">' +
		'<div style="width: 150px; height: 186px; float: right; margin: 5px 0 10px 10px; border: 1px solid #000; overflow: hidden;"><span style="display: block; margin: 10px;">Instructor Photo Goes Here</span></div>' +
		'<p>Text of letter. Introduce yourself, describe how you got into this field and why you teach this class. Give a little insight as to why this course is important. Let the student know you are a human being invested in the course and in the student&ldquo;s success and get the student as excited as the student will permit himself or herself to be.</p>' +
		'<p>First Last</p>' +
		'<p>First M. Last, Ph.D.<br />435-797-XXXX | first.last@usu.edu&nbsp;| website<br /><span style="font-size: 13px; line-height: 1.5;">Department<br /></span><span style="font-size: 13px; line-height: 1.5;">UMC Old Main Hill, Logan, UT 84322</span></p>' +
		'<br />' +
		'<p>&nbsp;</p>' +
		'<p><em>Now, please follow the steps below to continue your orientation to this course.</em></p>' +
		'</div>' +
		'<div class="Step1">' +
		'<h3 class="icon-document">Step 1: Read the course syllabus and course schedule</h3>' +
		'<p><span>The&nbsp;</span><a title="course syllabus" href="/courses/'+coursenum+'/assignments/syllabus">course syllabus</a><span>&nbsp;will provide you with the course schedule, course objectives, explanations of assignments and assessments, grading policies, and instructor contact information.&nbsp;Please read it carefully. You should have a deep familiarity with the schedule and process of the course.</span></p>' +
		'</div>' +
		'<div class="Step2">' +
		'<h3 class="icon-materials-required">Step 2: Purchase your textbooks</h3>' +
		'<p>Your textbooks include:</p>' +
		'<ul>' +
		'<li>Author (Year).&nbsp;<em>Title.</em>&nbsp;Location: Publisher [ISBN]</li>' +
		'<li>Author (Year).&nbsp;<em>Title.</em>&nbsp;Location: Publisher [ISBN]</li>' +
		'<li>Author (Year).&nbsp;<em>Title.</em>&nbsp;Location: Publisher [ISBN]</li>' +
		'</ul>' +
		'</div>' +
		'<div class="Step3">' +
		'<h3 class="icon-search-address-book">Step 3: Library information and student support</h3>' +
		'<p><span>Visit the&nbsp;</span><a href="http://library.usu.edu/">library website</a><span>&nbsp;to learn&nbsp;</span><a href="http://distance.usu.edu/orientation/library/">what services are provided for online students</a><span>.</span></p>' +
		'</div>' +
		'<div class="Step4">' +
		'<h3 class="icon-settings">Step 4: Read the technical requirements page</h3>' +
		'<p><span>The&nbsp;</span><a href="http://guides.instructure.com/s/2204/m/4214/l/41056-which-browsers-does-canvas-support" target="_blank">Technical Requirements</a><span>&nbsp;page identifies the browsers, operating systems, and plugins that work best with Canvas. If you are new to Canvas quickly review the&nbsp;</span><a href="https://training.instructure.com/courses/347469/" target="_blank">Canvas Student Orientation</a><span>&nbsp;materials.</span></p>' +
		'</div>' +
		'<div class="Step5">' +
		'<h3 class="icon-info">Step 5: Read about academic integrity and netiquette</h3>' +
		'<p><span>All students at Utah State University agree on admission to abide by the university&nbsp;</span><em>Honor Code</em><span>. Please review this&nbsp;</span><a title="Honor Pledge" href="/courses/'+coursenum+'/wiki/honor-pledge">Academic Integrity</a><span>&nbsp;tutorial to familiarize yourself with USU policies and procedures pertaining to the USU honor code. This tutorial links to an additional, in-depth review on how to&nbsp;</span><a title="Academic Dishonesty Defined" href="/courses/'+coursenum+'/wiki/academic-dishonesty-defined">avoid plagiarism and cite sources</a><span>, which you are strongly encouraged to review. Also, please review the&nbsp;</span><a href="http://www.albion.com/netiquette/corerules.html" target="_blank">core rules of netiquette</a><span>&nbsp;for some guidelines and expectations on how to behave in an online learning environment.</span></p>' +
		'</div>' +
		'<div class="NextSteps">' +
		'<h3 class="icon-module">Next Steps: Begin course content</h3>' +
		'</div>' +
		'</div>' +
		'</div>';