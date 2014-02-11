// This code is was created by the Center of Innovative Design and Instruction at Utah State University. 
// It is released under the AGPLv3 license. For more information about this license, go to http://www.gnu.org/licenses/agpl.html

////////////////////////////////////////////
//    SETUP CUSTOM TOOLS FOR FRONT PAGE   //
////////////////////////////////////////////

// include is found in canvasGlobal.js

	//////////// THEMES LIST ///////////////////////
	
	// Themes that include the module grid
		var gridThemeArray = ["horiz-nav-template"];

	// Themes that do not include module grid
		var nogridThemeArray = ["panel-nav-template"];

	// Canvas ID for the wiki page iframe
		var iframeID = "#wiki_page_body_ifr";

	(function() {
		$(".edit_link").click(function () {
	    // Add button to trigger USU tools
		   if(!$("#custom-tools-accordion").length>0){
				$("#wiki_edit_view_secondary").before('<a href="#" class="btn btn-primary addUSUTools"><i class="fa fa-rocket" style="font-size: 18px;"></i> Launch USU Tools</a>');
				$(".addUSUTools").click(function (e){
					e.preventDefault();
					editorExistenceCheck();
				});
		    }
		    setTimeout(function () {
				$(".addUSUTools").get(0).scrollIntoView();
            }, 300);
	    });
		// When the edit link button is pressed, set up the tools
	        function editorExistenceCheck() {
	            var editorExists = false;
	            if ($(iframeID).contents().find("#tinymce").length > 0) {
	                editorExists = true;
	            }
	            if (editorExists === true) {
	                setTimeout(function () {
	                    setupFrontPageTools();
						$("#usu_tools").get(0).scrollIntoView();
						$(".addUSUTools").remove();
	                }, 300);
	                return;
	            }
	            setTimeout(function () {
	                editorExistenceCheck();
	            }, 300);
	        }
	    // When the "Save Changes" button is pressed, remove the module grid if the them doesn't support it
	    $("#wiki_page_submit").click(function (){
	    	var templateClass = $(iframeID).contents().find("#usu-template-front").attr("class");
			if($.inArray(templateClass, nogridThemeArray) > -1){
				$(iframeID).contents().find("#usu-modules-grid").remove();
			}
	    });

	    $("#cancel_editing").click(function (e){
	    	e.preventDefault();
	    	$(".addUSUTools").remove();
	    });

		////// FRONT-PAGE //////
			function setupFrontPageTools(){

				// Add the tools section in the right panel if it doesn't exist
				if(!$("#custom-tools-accordion").length>0){
					createToolsWrapper();

					// Add tools for custom-tools-accordion
						toolsOverview();
						themeTool();
						sectionsTool(frontPageSections);
						navItems();
						moduleListTool();
						socialMediaTool();
						contentIcons();

					// activate the accordion
					initializeToolsAccordion();

					// Some aspects need to make sure the mceEditor has time to load
					setTimeout(function(){
						if($(iframeID).length>0){
							addStyletoFrontIframe();
							customCSSCheck();
							displayTypes();
							setDisplay();
							navItemCheck();
							modListCheck();
							socialMediaCheck();
						}
						$("#usu_tools").append('<a href="#" class="btn btn-mini addStyletoIframe" style="margin:5px 0 0 5px;"><i class="fa fa-magic"></i> Add Style to Editor</a>');
						$(".addStyletoIframe").click(function (e){
							e.preventDefault();
							if(!$("#wiki_page_body_ifr").contents().find("body").hasClass('hasStyle')){
								var $head = $("#wiki_page_body_ifr").contents().find("head");
								var timestamp =  +(new Date());                
								$head.append($("<link/>", { rel: "stylesheet", href: "/assets/vendor.css?1380315297", type: "text/css" }));
								$head.append($("<link/>", { rel: "stylesheet", href: toolsPath+"/css/canvasMCEEditor.css?"+timestamp, type: "text/css" }));
								$head.append($("<link/>", { rel: "stylesheet", href: globalCSSPath+"?"+timestamp, type: "text/css" }));
								$head.append($("<link/>", { rel: "stylesheet", href: toolsPath+"/css/canvasTemplates.css?"+timestamp, type: "text/css" }));
								$head.append($("<link/>", { rel: "stylesheet", href: "/assets/common.css?1376338847", type: "text/css" }));
								$head.append($("<link/>", { rel: "stylesheet", href: toolsPath+"/font-awesome-4.0.3/css/font-awesome.min.css?"+timestamp, type: "application/font-woff" }));
								if($("#wiki_page_body_ifr").contents().find("#custom-css").length>0){
									$head.append($("<link/>", { rel: "stylesheet", href: "/courses/" + coursenum + "/file_contents/course%20files/global/css/style.css?"+timestamp, type: "text/css" }));
								}
								$("#wiki_page_body_ifr").contents().find("body").css('background-image', 'none').addClass('hasStyle');;
								$(".wiki_switch_views_link").get(0).scrollIntoView();
							}
						});
					}, 300);
				}
			}

	}());

///////////////////////////////
//    INTERFACE SETUP        //
///////////////////////////////

	// Styles and code to be applied to TinyMCE editor
		function addStyletoFrontIframe(){
			if(!$(iframeID).contents().find("body").hasClass('hasStyle')){
				// var iframeID = "#wiki_page_body_ifr";
				var $head = $(iframeID).contents().find("head");
				var timestamp =  +(new Date());                
				$head.append($("<link/>", { rel: "stylesheet", href: "/assets/vendor.css?1380315297", type: "text/css" }));
				$head.append($("<link/>", { rel: "stylesheet", href: toolsPath+"/css/canvasMCEEditor.css?"+timestamp, type: "text/css" }));
				$head.append($("<link/>", { rel: "stylesheet", href: globalCSSPath+"?"+timestamp, type: "text/css" }));
				$head.append($("<link/>", { rel: "stylesheet", href: toolsPath+"/css/canvasTemplates.css?"+timestamp, type: "text/css" }));
				$head.append($("<link/>", { rel: "stylesheet", href: "/assets/common.css?1376338847", type: "text/css" }));
				$head.append($("<link/>", { rel: "stylesheet", href: "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css?"+timestamp }));
				if($(iframeID).contents().find("#custom-css").length>0){
					$head.append($("<link/>", { rel: "stylesheet", href: "/courses/" + coursenum + "/file_contents/course%20files/global/css/style.css?"+timestamp, type: "text/css" }));
				}
				$(iframeID).contents().find("body").css('background-image', 'none').addClass('hasStyle');
				// $("#usu_tools").get(0).scrollIntoView();
				$(iframeID).contents().find('head').append('<style>#usu-home-img {background: url(/courses/' + coursenum + '/file_contents/course%20files/global/css/images/homePageBanner.jpg) no-repeat center center; }</style>')
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
			// $("#usu_tools").get(0).scrollIntoView();
		}
		// Show/Hide remove unchecked sections button
        function checkRemove() {
            if ($(iframeID).contents().find(".toRemove").length > 0) {
                $(".removeSectionsWrapper").show();
            } else {
                $(".removeSectionsWrapper").hide();
            }
        }
        // When an element is unchecked, it will highlight it and jump to it in content area
        function markToRemove(targetSection) {
            $(iframeID).contents().find(targetSection).addClass("toRemove");
            // scrollToElement(targetSection);
            checkRemove();
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
					$("#usu_tools").html('<div class="btn-group-label">\
						<span>Editor View: </span>\
						<div class="btn-group mceEditorView">\
						<a href="#" class="btn btn-mini mceLabelsView" rel="mce-visualblocks">Labels</a>\
						<a href="#" class="btn btn-mini mceSectionView" rel="mce-visualSections">Sections</a>\
						</div>\
						<a href="#" class="btn btn-mini mcePreview active" rel="">Preview</a>\
						</div>\
						<div id="custom-tools-accordion" />');
					$("#toolsTrigger").click(function (e){
						e.preventDefault();
						// $("#usu_tools").get(0).scrollIntoView();
						// bindHover();
					});
					$("#custom-tools-wrapper").tabs({active: 1}); 
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
			$( "#toggle" ).button().click(function() {
				if ( $( "#accordion" ).accordion( "option", "icons" ) ) {
					$( "#accordion" ).accordion( "option", "icons", null );
				} else {
					$( "#accordion" ).accordion( "option", "icons", icons );
				}
			});
			$(".activateSections").click(function (e){
				e.preventDefault();
				$("#custom-tools-accordion").accordion({ active: 2});
			});
			
			if($(iframeID).contents().find("#usu-modules-grid").length>0){
				$("#custom-tools-accordion").accordion({ active: 4});
			}
			bindHover();
		};

	////// On Ready/Click functions  //////

	////// Supporting functions  //////
		function bindHover(){
			$(".sections-list li").mouseover(function() {
				var el = $(this);
				var connectedSection = $(this).find("input").attr("value");
				var timeoutID = setTimeout(function() {
					$(iframeID).contents().find("."+connectedSection).addClass("sectionHover");
				}, 500);
				el.mouseout(function(){
					var connectedSection = $(this).find("input").attr("value");
					$(iframeID).contents().find("."+connectedSection).removeClass("sectionHover");
					clearTimeout(timeoutID);
				});
			});
			$("#moduleList li").mouseover(function() {
				var el = $(this);
				var connectedSection = $(this).attr("rel");
				var timeoutID = setTimeout(function() {
					$(iframeID).contents().find(connectedSection).addClass("sectionHover");
				}, 500);
				el.mouseout(function(){
					var connectedSection = $(this).attr("rel");
					$(iframeID).contents().find(connectedSection).removeClass("sectionHover");
					clearTimeout(timeoutID);
				});
			});
		
		}
		function scrollToElement(targetElement){
			// $(tinymce.activeEditor.getBody()).find(targetElement).get(0).scrollIntoView();
			// $("#usu_tools").get(0).scrollIntoView();
		}
		function highlightNewElement(targetElement){
			$(iframeID).contents().find(targetElement).addClass("sectionHover");
			setTimeout(function(){
				$(iframeID).contents().find(targetElement).removeClass("sectionHover");
			}, 1000);
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
//    THEMES                 //
///////////////////////////////

	////////// Custom Tools Accordion tab setup  //////  //////
		function themeTool(){
			var addAccordionSection = '<h3>\
					Themes\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Front Page Themes</div>\
					  <div class=\'popover-content\'><p>Select from predifined front page themes</p><p>You can also specify whether or not Canvas should look for a course level css file.</div>">\
					  &nbsp;<span class="screenreader-only">information about front page themes.</span>\
					</a>\
				</h3>\
				<div class="themesContent">\
					<label>\
						<input type="checkbox" class="onlyShowGrid"> Module grid support only\
					</label>\
					<ul class="unstyled fp-themes">\
					</ul>\
					<label><input type="checkbox" id="customCSS"> Course Level CSS</label> &nbsp;\
					<a class="help" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Course Level CSS</div>\
					  <div class=\'popover-content\'><p>Use this if you will be creating a custom stylesheet to override the default style.</p><p>This will look for a <em>styles.css</em> file in a folder titled <em>global</em> in the course root folder.</p></div>">\
					  &nbsp;<span class="screenreader-only">About Course Level CSS</span>\
					</a>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			$(".onlyShowGrid").change(function (e){
				$(".fp-themes").html("");
				if(!$(this).is(":checked")){
					outputThemes(nogridThemeArray);
				} 
				outputThemes(gridThemeArray);
				currentThemeCheck();
				templateChange();
			});
			if($("a[title='USU Template Wizard']").length>0){
				$(".themesContent").append('<a href="#" class="externalToolTrigger btn btn-mini btn-primary">Add Custom Banner</a>');
				$(".externalToolTrigger").click(function (e){
					e.preventDefault();
					var externalToolId = $("a[title='USU Template Wizard']").attr("id");
					tinyMCE.get("wiki_page_body").controlManager.get(externalToolId).settings.onclick();
				});
			} else {
				$(".themesContent").append('<div class="alert alert-info" style="margin-bottom: 5px;">Click the <img src="/images/downtick.png"> icon on the editor toolbar and choose "USU Template Wizard" to change the banner image.</div>');
			}
			outputThemes(nogridThemeArray);
			outputThemes(gridThemeArray);
			themesReady();
		}


	////// On Ready/Click functions  //////
		function themesReady(){
			var $contents = $(iframeID).contents();
			customCSSCheck();
			currentThemeCheck();
			templateChange();
		}


	////// Base html variables for custom templates  //////
		var templateShell = '<div id="usu-template-front" class="horiz-nav-template"></div>';

	////// Supporting functions  //////

		// The purpose of this check is to make sure that the custom-css tag doesn't have any content
		// and is the first item on the page. Also replaces old css code
			function customCSSCheck(){
				var $contents = $(iframeID).contents();
				if($contents.find("#custom-css").length>0){
					// if it has contents unwrap them
					if($contents.find("#custom-css").text().length>1){
						$contents.find("#custom-css").contents().unwrap();
						$contents.find("body").prepend('<div id="custom-css">&nbsp;</div>');
					}
					$("#customCSS").prop('checked', true);
				}
				// change over old method
					if($contents.find('#usu-custom-css').length>0){
						// if it has contents unwrap them
						if($contents.find("#usu-custom-css").text().length>1){
							$contents.find("#usu-custom-css").contents().unwrap();
							$contents.find("body").prepend('<div id="custom-css">&nbsp;</div>');
						}
						$("#customCSS").prop('checked', true);
					}
				// Control
				$('#customCSS').change(function(){
					if($(this).is(":checked")) {
						if($contents.find('#custom-css').length>0){
						} else {
							$contents.find('body').prepend('<div id="custom-css">&nbsp;</div>');
						}
					} else {
						if($contents.find('#custom-css').length>0){
							$contents.find('#custom-css').remove();
						}
					}
				});
			}

			function templateChange(){
				$(".template-theme").click(function (e){
					e.preventDefault();
					templateCheck();
					// scrollToElement("#usu-template-front");
					// add the class for the selected template to the usu-template-front
						var templateClass = $(this).attr("rel");
						// console.log("I got here "+ templateClass);
						$(iframeID).contents().find("#usu-template-front").removeClass().addClass(templateClass);
							// themeElements(templateClass);
						if($(iframeID).contents().find("#usu-template-front").hasClass(templateClass)){
							$(".template-theme").each(function(){
								$(this).removeClass("active-fp-theme");
							})
							$(this).addClass("active-fp-theme");
						}
					themeSupportCheck(templateClass);
				});
				// console.log("templateChange ran");
			}
		// If template is not there add it, will also remove and change old template
			function templateCheck(){
				addStyletoFrontIframe();
				var $contents = $(iframeID).contents();
				if($contents.find("#usu-template-front").length>0){
					var currentTheme = $contents.find("#usu-template-front").attr("class");
					$("#"+currentTheme).addClass("active-fp-theme");
				} else {
					// Add base html if template doesn't exist
					$contents.find("#tinymce").prepend(templateShell);
					$(".title_bannerSection").prop("checked", true).trigger("change");
					$(".banner_imageSection").prop("checked", true).trigger("change");
					$(".navigationSection").prop("checked", true).trigger("change");
				}
			}

		// Check and mark current theme in toolbar when the page loads
			function currentThemeCheck(){
				if($(iframeID).contents().find("#usu-template-front").length>0){
					var currentTheme = $(iframeID).contents().find("#usu-template-front").attr("class");
					$("#"+currentTheme).addClass("active-fp-theme");
					setTimeout(function(){
						themeSupportCheck(currentTheme);
					}, 1000);
				}
			};
		// Show or hide accordion sections based on whether or not the theme supports a grid
			function themeSupportCheck(templateClass){
				if($.inArray(templateClass, nogridThemeArray) == -1){
					$(".modules_gridSection").parent("label").parent("li").show();
				} else {
					$(".modules_gridSection").parent("label").parent("li").hide();
				}
				// Check to see if a banner image exists it will throw an error either way.
				$.ajax({
				    url:'/courses/'+coursenum+'/file_contents/course%20files/global/css/images/homePageBanner.jpg',
				    type:'HEAD',
				    error:function (xhr, ajaxOptions, thrownError){
					    if(xhr.status==404) {
					        $(iframeID).contents().find('#usu-home-img').addClass('placeholder');
					        $(".externalToolTrigger").html('<i class="fa fa-picture-o"></i> Add Custom Banner');
					    } else {
					    	$(iframeID).contents().find('#usu-home-img').removeClass('placeholder');
					        $(".externalToolTrigger").html('<i class="fa fa-picture-o"></i> Change Custom Banner');
					    }
					}
				});
			}
		// Output themes
			function outputThemes(themeArray){
				$.each(themeArray, function (i) {
					$(".fp-themes").append('<li><a href="#" id="'+this+'" class="template-theme" rel="'+this+'" title="'+this+' theme"><img src="'+toolsPath+'/images/template_thumbs/'+this+'.png" width="200"></a></li>');
	            });
			}

///////////////////////////////
//    SECTIONS               //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////

		// create sections custom tool
		// Rework to use an array so that it can be customized for different pages
			function sectionsTool(frontPageSections){
				var addAccordionSection = '<h3>\
					Sections\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
						title="<div class=\'popover-title\'>Content Sections</div>\
					  	<div class=\'popover-content\'>\
					  		<p>text</p>\
				  		</div>">\
					  &nbsp;<span class="screenreader-only">About front page sections.</span>\
					</a>\
					</h3>\
					<div>\
					<ol id="frontPageSections" class="unstyled sections-list">\
					</ol>\
					<div id="sectionsButtons"></div>\
					<div class="removeSectionsWrapper hide">\
						<a href="#" class="btn btn-danger removeSections"><i class="icon-trash"></i> Remove Section(s)</a>\
						<p><strong>Warning:</strong> This will also delete any content within the section.</p>\
					</div>\
					</div>';
				$("#custom-tools-accordion").append(addAccordionSection);
				// Loop through base sections array to populate the sections-list
				$.each(frontPageSections, function (key, value){
					var title = key.replace("_", " ");
					$(".sections-list").append('<li>\
					  	<label>&nbsp;<input type="checkbox" class="'+key+'Section" value="'+key+'"> <span class="section-title">'+title+'</span></label>\
						</li>');
				});
				sectionsReady(frontPageSections);
			}

	////// On Ready/Click functions  //////
		function sectionsReady(frontPageSections){
			identifySections(frontPageSections);
			$("#sectionsButtons").append(' <a class="btn btn-mini addAllSections" href="#">\
				<i class="icon-check"></i> Add All Sections</a>');

			// Functions to run when a section checkbox is changed
				$('.sections-list input:checkbox').change(function (){
					if($(this).is(":checked")) {
						templateCheck();
						$('.sections-list input:checkbox:checked').each(function (i) {
							checkSection(this.value, frontPageSections);
						});
					} else {
						var targetSection = "."+this.value;
                        markToRemove(targetSection);
					}
					checkRemove();
				});
			// When they click "Remove Unckecked Section(s)" make the necessary changes
				$(".removeSections").click(function(){
					// remove any sections that were unchecked
					$('.sections-list input:checkbox').not(":checked").each(function (i){
						$(iframeID).contents().find('.'+this.value).remove();
					});
					$(".removeSectionsWrapper").hide();
					updateNavItems();
				});
			// Check all sections
				$('.addAllSections').click(function (e){
					e.preventDefault();
					$('.sections-list input').each(function(){
						$(this).prop("checked", true);
						$(this).trigger("change");
					});
				});
				bindHover();
		}

	////// Base html variables for sections  //////
		var bannerSection = '<div id="usu-template-banner" class="title_banner">' +
			'<h2><span id="banner-left"><span class="subj-text">SUBJ</span> <span class="subj-num">0000</span></span> <span id="banner-right">Course Title</span></h2>' +
			'</div>';
		var imageSection = '<div id="usu-home-img" class="banner_image">&nbsp;</div>';
		var navSection = '<div id="usu-home-nav" class="navigation">' +
			'<ul>' +
				'<li><a class="icon-forward" title="start here" href="/courses/' + coursenum + '/wiki/start-here">Start Here</a></li>' +
				'<li><a class="icon-syllabus" title="syllabus" href="/courses/' + coursenum + '/assignments/syllabus">Syllabus</a></li>' +
				'<li><a class="icon-module" title="modules" href="/courses/' + coursenum + '/modules">Modules</a></li>' +
				'<li><a class="icon-add" title="more resources" href="/courses/' + coursenum + '/wiki/more-resources">More Resources</a></li>' +
			'</ul>' +
			'</div>';
		var modulesSection = '<div id="usu-modules-grid" class="modules_grid">&nbsp;</div>';
		var footerSection = '<div class="contact_footer usu-home-footer">First Last, Ph.D. &nbsp;| &nbsp;first.last@usu.edu&nbsp; | &nbsp;Department<br /><span class="usu-copyright">Materials in this course may be copyright protected. Please do not distribute them without permission of the copyright holder.</span></div>';
		var attributionSection = '<div class="image_attribution usu-home-attrib">Image attribution here.</div>';
		var socialMediaSection = '<div class="social_media usu-social">&nbsp;</div>';

	// Array of section names and their corresponding html
		var frontPageSections = {
			'title_banner':bannerSection,
			'banner_image':imageSection,
			'navigation':navSection,
			'modules_grid':modulesSection,
			'contact_footer':footerSection,
			'image_attribution':attributionSection,
			'social_media':socialMediaSection
		}

	////// Supporting functions  //////
		// If the checked section exists, move it, if not add it
			function checkSection(sectionName, frontPageSections){
				var $contents = $(iframeID).contents();
				var container = $contents.find("#usu-template-front");
				if($contents.find("."+sectionName).length>0){
                    $contents.find("."+sectionName).appendTo(container).removeClass("toRemove");
                    checkRemove();
				} else {
					$contents.find("#usu-template-front").append(frontPageSections[sectionName]);
				}
			}
		// This function loops through existing content and then updates section controls
			function identifySections(frontPageSections){
				var $contents = $(iframeID).contents();
				// take every div with a class
				$contents.find("#usu-template-front").children("div").each(function(){
					if($(this+'[class]')){
						var myValue = $(this).attr('class').split(' ')[0];
						// Check sections against default array
						if($.inArray(myValue, frontPageSections) == -1){
							$('.'+myValue+'Section').prop('checked', true);
						} 
					}
				});
			}

///////////////////////////////
//    NAV ITEMS              //
///////////////////////////////

	////////// Custom Tools Accordion tab setup  //////  //////
		function navItems(){
			var addAccordionSection = '<h3>\
					Nav Items\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Navigation Items</div>\
					  <div class=\'popover-content\'><p>Select from predifined navigation links</p></div>">\
					  &nbsp;<span class="screenreader-only">information navigation items.</span>\
					</a>\
				</h3>\
				<div>\
					<ul id="navListItems" class="unstyled sections_li">\
					</ul>\
					<a href="#" class="btn btn-mini addNavItem"><i class="icon-add"></i> Add Item</a>\
					<a href="#" class="btn btn-mini updateNavItems"><i class="icon-refresh"></i> Update Items</a>\
					<div class="navHelp alert alert-info" style="margin-top:20px;">\
						<p>To complete <i class="fa fa-chain-broken"></i> item(s):</p>\
						<ol>\
							<li>Update item text</li>\
							<li>Use Canvas Tools to add a link</li>\
							<li>Add a Content Icon</li>\
							<li>Click &ldquo;Update Items&rdquo;</li>\
						</ol>\
					</div>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			updateNavItems();
			navItemReady();
			$(".navigationSection").change(function(){
				updateNavItems();
				navItemCheck();
			});
		}


	////// On Ready/Click functions  //////
		function updateNavItems(){
			$("#navListItems").html("");
			showHelp = false;
			$(iframeID).contents().find("#usu-home-nav li").each(function (i){
				var linkText = $(this).find("a").text();
				var linkID = "";
				if(linkText == ""){
					liText = $(this).text();
					linkID = liText.replace(" ", "_");
					$("#navListItems").append('<li rel="#nav_'+linkID+'"><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>&nbsp;'+liText+' <i class="fa fa-chain-broken"></i><a href="#" class="removeNavListItem pull-right remove" rel="#nav_'+linkID+'"><i class="icon-end"></i></li>');
					showHelp = true;
				} else {
					linkID = linkText.replace(" ", "_");
					$("#navListItems").append('<li rel="#nav_'+linkID+'"><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>&nbsp;' + linkText + ' <i class="fa fa-link"></i><a href="#" class="removeNavListItem pull-right remove" rel="#nav_'+linkID+'"><i class="icon-end"></i></li>');
				}
				$(this).attr("id", 'nav_'+linkID);
			});
			if(showHelp == true){
				$(".navHelp").show();
			} else {
				$(".navHelp").hide();
			}
			checkNavCount();
			$(".removeNavListItem").click(function (e){
				e.preventDefault();
				var connectedItem = $(this).attr("rel");
				$(iframeID).contents().find(connectedItem).remove();
				$(this).parent("li").remove();
				checkNavCount();
			});
			$("#navListItems").sortable({
				update: function( event, ui ) {
					// loop through the checked panels and move or add them
					$('#navListItems li').each(function (i) {
						var connectedItem = $(this).attr('rel');
						$(iframeID).contents().find("#usu-home-nav ul").append($(iframeID).contents().find('li'+connectedItem));
					});
					updateNavItems();
				}
			});
			$("#navListItems").disableSelection();
		}
		function navItemReady(){
			$(".addNavItem").click(function (e){
				e.preventDefault();
				$(iframeID).contents().find("#usu-home-nav ul").append("<li>New Item</li>");
				checkNavCount();
				updateNavItems();
			});
			$(".updateNavItems").click(function (e){
				e.preventDefault();
				updateNavItems();
				checkNavCount();
			});
		}
		function checkNavCount(){
			navItemCount = $(iframeID).contents().find("#usu-home-nav li").length;
			if(navItemCount < 4){
				$(".addNavItem").show();
			} else {
				$(".addNavItem").hide();
			}
		}
		function navItemCheck(){
			if($(".navigationSection").is(":checked")){
				$("#ui-accordion-custom-tools-accordion-header-3").show();
				$(".activateNavItems").remove();
				$(".navigationSection").parents("li").append('<a href="#" class="activateNavItems pull-right" data-tooltip="left" title="additional options"><i class="fa fa-cog"></i>&nbsp;</a>');
				activateNavItemsLink();
			} else {
				$("#ui-accordion-custom-tools-accordion-header-3").hide();
				$(".activateNavItems").remove();
			}
		}
		function activateNavItemsLink(){
			$(".activateNavItems").click(function (e){
				e.preventDefault();
				$("#custom-tools-accordion").accordion({ active: 3});
			});
		}

///////////////////////////////
//    MODULE DETAILS       //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function moduleListTool(){
			var addAccordionSection = '<h3>\
					Module List\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Accordion/Tabs Tool</div>\
					  	<div class=\'popover-content\'>\
						  	<p>Explanation text.</p>\
			  			</div>">\
					  &nbsp;<span class="screenreader-only">About module list tool.</span>\
					</a>\
				</h3>\
				<div>\
					<p><small>Click on a module below to mark it as the current module.</small></p>\
					<div class="moduleListOptions">\
						<ul id="moduleList" class="unstyled sections_li"></ul>\
					</div>\
					<a href="#" class="btn btn-mini insertModuleList" data-tooltip="left" title="Pulls new module list from Canvas"><i class="icon-add"></i> Insert Module Details</a>\
					<div class="btn-group-label">\
						<span>Link To: </span>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini linkToModule" data-tooltip="top" title="Links open to the module on the modules page"><i class="icon-module"></i> Modules Page</a>\
							<a href="#" class="btn btn-mini linkToFirst" data-tooltip="top" title="Links point to the first item within a module"><i class="icon-document"></i> First Module Item</a>\
						</div>\
					</div>\
					<a href="#" class="btn btn-mini removeCurrentHighlight" style="margin-top: 5px;"><i class="icon-end remove"></i> Remove &ldquo;Current Module&rdquo; highlight</a>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			moduleListToolReady();
			$(iframeID).contents().find(".custom-accordion h3").each(function(){
				$(this).find("a").contents().unwrap();
			});
			$(iframeID).contents().find(".custom-tabs li").each(function(){
				$(this).find("a").contents().unwrap();
			});
			// getmoduleList();
		}

	//// On Ready/Click functions  //////
		function moduleListToolReady(){
			// Module List
			$(".insertModuleList").click(function (e){
				e.preventDefault();
				$(".modules_gridSection").prop("checked", true).trigger("change");
			});
			$(".modules_gridSection").change(function(){
				if($(this).is(":checked")){
					insertModuleList();
					modListCheck();
					activateModuleListLink();
				} else {
					$(".activateModuleList").remove();
				}
				modListCheck();
			});
			identifyModuleList();
			$(".removeCurrentHighlight").click(function (e){
				e.preventDefault();
				$(iframeID).contents().find("#usu-modules-grid .current").removeClass("current");
				$("#moduleList .current").removeClass("current");
			});
		}

	////// Supporting functions  //////
			function activateModuleListLink(){
				$(".activateModuleList").click(function (e){
					e.preventDefault();
					$("#custom-tools-accordion").accordion({ active: 4});
				});
			}
			function modListCheck(){
				if($(".modules_gridSection").is(":checked")){
					$("#ui-accordion-custom-tools-accordion-header-4").show();
					$(".activateModuleList").remove();
					$(".modules_gridSection").parents("li").append('<a href="#" class="activateModuleList pull-right" data-tooltip="left" title="additional options"><i class="fa fa-cog"></i>&nbsp;</a>');
					activateModuleListLink();
				} else {
					$("#ui-accordion-custom-tools-accordion-header-4").hide();
					$(".activateModuleList").remove();
				}
			}
			function insertModuleList(){
				$contents = $(iframeID).contents();
				$contents.find("#usu-modules-grid").html('<div id="#usu-modules-grid" />');
				$contents.find("#usu-modules-grid").load('/courses/'+coursenum+'/modules #context_modules', function() {
					// $contents.find(".custom-tabs").prepend('<ul class="tab-list"></ul>');
					
					// var numOfModules = $contents.find(".context_module").length;
					// for(var i=0; i<numOfModules; i++){
					// 	var j=i+1;
					// 	$contents.find(".tab-list").append('<li class="tab-'+i+'">Wk '+j+'</li>');
					// }
					$("#moduleList").html("");
					$contents.find(".context_module").each(function (i){
						var moduleID = $(this).attr("data-module-id");
						var moduleTitle = $(this).attr("aria-label");
						if (moduleTitle.length > 15){
							var moduleTitle = moduleTitle.substring(0,12)+"&hellip;";
						}
						var moduleUrl = $(this).attr("data-module-url");
						$(this).html('<li id="item_'+moduleID+'"><a href="'+moduleUrl+'" id="'+moduleID+'" class="connectedModule icon-standards">'+moduleTitle+'</a></li>');
						$("#moduleList").append('<li rel="#item_'+moduleID+'">\
							<a href="#" class="mt-markCurrent" rel="#item_'+moduleID+'" title="Mark as current week"><i class="icon-check"></i><span class="screenreader-only">Mark as Current Week: </span>\
							'+moduleTitle+'</a>\
							<a href="#" class="remove pull-right removeModuleListItem" rel="#item_'+moduleID+'" title="Remove '+moduleTitle+'"><i class="icon-end"></i><span class="screenreader-only">Remove item</a></li>');
					});
					// $contents.find(".custom-tabs").attr("id", "moduleTabs");
					$contents.find("#context_modules").wrap("<ul>");
					$contents.find("#context_modules").contents().unwrap();
					$contents.find(".context_module").contents().unwrap();
					$(".insertModuleList").html('<i class="icon-refresh"></i> Update Modules')
					markCurrent();
					bindRemove();
					linkToFirstItemCheck();
				});
				bindHover();
			}
			function markCurrent(){
				$(".mt-markCurrent").click(function (e){
					e.preventDefault();
					var listItem = $(this).attr("rel");
					$(iframeID).contents().find("#usu-modules-grid .current").removeClass("current");
					// $(iframeID).contents().find("#usu-modules-grid .icon-check").addClass("icon-standards").removeClass("icon-check");
					$(iframeID).contents().find(listItem).addClass("current");
					$("#moduleList .current").removeClass("current");
					$(this).addClass("current");
					// changeIconClass(currentClass, iconClass);
					// scrollToElement(".custom-tabs");
				});
			}
			function identifyModuleList(){
				if($(iframeID).contents().find("#usu-modules-grid").length>0){
					$(iframeID).contents().find("#usu-modules-grid li").each(function (){
						var isCurrent = "";
						if($(this).hasClass("current")){
							isCurrent = " current";
						}
						var connectedItem = $(this).attr("id");
						var moduleTitle = $(this).find("a").text();
						$("#moduleList").append('<li rel="#'+connectedItem+'">\
							<a href="#" class="mt-markCurrent' + isCurrent +'" rel="#'+connectedItem+'" title="Mark as current week"><i class="icon-check"></i><span class="screenreader-only">Mark as Current Week: </span>\
							'+moduleTitle+'</a>\
							<a href="#" class="remove pull-right removeModuleListItem" rel="#'+connectedItem+'" title="Remove '+moduleTitle+'"><i class="icon-end"></i><span class="screenreader-only">Remove item</a></li>');
					});
					$(".insertModuleList").html('<i class="icon-refresh"></i> Update Modules');
					markCurrent();
					bindHover();
					bindRemove();
					linkToFirstItemCheck();
				}
			}
			function bindRemove(){
				$(".removeModuleListItem").click(function (e){
					var connectedItem = $(this).attr("rel");
					$(iframeID).contents().find(connectedItem).remove();
					$(this).parent("li").remove();
				});
			}
			function linkToFirstItemCheck(){
				// if($(".linkToFirst").length === 0){
				// 	$(".insertModuleList").after('<a href="#" class="btn btn-mini linkToFirst" style="margin-top:5px;display:none;"><i class="icon-link"></i><i class="icon-link"></i> Link to First Item in Modules</a>');
				// 	$(".insertModuleList").after('<a href="#" class="btn btn-mini linkToModule" style="margin-top:5px;display:none;"><i class="icon-link"></i><i class="icon-link"></i> Link to Module on Modules Page</a>');
				// }
				var firstConnectedModuleUrl = $("#wiki_page_body_ifr").contents().find(".connectedModule:first").attr("href");
				var checkFirst = firstConnectedModuleUrl.match(/first/g);
				if(checkFirst !== null){
					$(".linkToFirst").addClass("active");
					$(".linkToModule").removeClass("active");
				} else {
					$(".linkToFirst").removeClass("active");
					$(".linkToModule").addClass("active");
				}
				$(".linkToFirst").click(function (e){
					e.preventDefault();
					$("#wiki_page_body_ifr").contents().find(".connectedModule").each(function(){
						var myhref = $(this).attr("href");
						var cleanedhref = myhref.replace('/items/first', '');
						$(this).attr("href", cleanedhref+'/items/first');
						$(this).attr("data-mce-href", cleanedhref+'/items/first');
					});
					linkToFirstItemCheck();
				});
				$(".linkToModule").click(function (e){
					e.preventDefault();
					$("#wiki_page_body_ifr").contents().find(".connectedModule").each(function(){
						var myhref = $(this).attr("href");
						var cleanedhref = myhref.replace('/items/first', '');
						$(this).attr("href", cleanedhref);
						$(this).attr("data-mce-href", cleanedhref);
					});
					linkToFirstItemCheck();
				});
			}

///////////////////////////////
//    SOCIAL MEDIA           //
///////////////////////////////

	////////// Custom Tools Accordion tab setup  //////  //////
		function socialMediaTool(){
			var addAccordionSection = '<h3>\
					Social Media Links\
					<a class="help pull-right toolsHelp" data-tooltip=\'{"tooltipClass":"popover right", "position":"right"}\'\
					  title="<div class=\'popover-title\'>Navigation Items</div>\
					  <div class=\'popover-content\'><p>Select from predifined navigation links</p></div>">\
					  &nbsp;<span class="screenreader-only">information navigation items.</span>\
					</a>\
				</h3>\
				<div id="socialMediaLinks">\
					<div class="input-prepend">\
						<span class="add-on"><i class="icon-facebook"></i></span>\
						<input id="facebookInput" type="text" class="socialMediaInput" placeholder="Course Facebook url">\
					</div>\
					<div class="input-prepend">\
						<span class="add-on"><i class="icon-twitter"></i></span>\
						<input id="twitterInput" type="text" class="socialMediaInput" placeholder="Course Twitter url">\
					</div>\
					<div class="input-prepend">\
						<span class="add-on"><i class="icon-linkedin"></i></span>\
						<input id="linkedinInput" type="text" class="socialMediaInput" placeholder="Course LinkedIn url">\
					</div>\
					<div class="input-prepend">\
						<span class="add-on"><i class="fa fa-youtube" style="font-size: 1.4em;"></i></span>\
						<input id="youtubeInput" type="text" class="socialMediaInput" placeholder="Course YouTube url">\
					</div>\
					<a href="#" class="btn btn-mini updateSocialMediaLinks"><i class="icon-refresh"></i> Update Social Media Links</a>\
				</div>';
			$("#custom-tools-accordion").append(addAccordionSection);
			$(".updateSocialMediaLinks").click(function (e){
				e.preventDefault();
				$(iframeID).contents().find(".usu-social").html("");
				$("#socialMediaLinks div").each(function (){
					var smIcon = $(this).find("i").attr("class");
					var myhref = $(this).find("input").val();
					var cleanedhref = myhref.replace('http://', '').replace('https://', '').replace('/courses/', '');
					var newhref = "https://"+cleanedhref;
					if(cleanedhref !== ""){
						$(this).find("input").attr("value", newhref);
						$(iframeID).contents().find(".usu-social").append('<a href="'+ newhref +'" class="'+ smIcon +'" title="'+newhref+'">&nbsp;</a>');
					}
				});
			});
			$(".socialMediaInput").keydown(function(event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    $(".updateSocialMediaLinks").trigger("click");
                    return false;
                }
            });
			socialMediaReady();
		}

	////// On Ready/Click functions  //////
		function socialMediaReady(){
			$("iframe").contents().find(".usu-social").find("a").each(function(){
				var smIcon = $(this).attr("class");
				var smLink = $(this).attr("href");
				var cleanedhref = smLink.replace('http://', '').replace('https://', '').replace('/courses/', '');
				var newhref = "https://"+cleanedhref;
				$("#socialMediaLinks").find("."+smIcon).parent().next("input").val(newhref);
			});
			$(".social_mediaSection").change(function(){
				socialMediaCheck();
			});
		}
		function activateSocialMediaLink(){
			$(".activateSocialMedia").click(function (e){
				e.preventDefault();
				$("#custom-tools-accordion").accordion({ active: 5});
			});
		}

		function socialMediaCheck(){
			if($(".social_mediaSection").is(":checked")){
				$("#ui-accordion-custom-tools-accordion-header-5").show();
				$(".activateSocialMedia").remove();
				$(".social_mediaSection").parents("li").append('<a href="#" class="activateSocialMedia pull-right" data-tooltip="left" title="additional options"><i class="fa fa-cog"></i>&nbsp;</a>');
				activateSocialMediaLink();
			} else {
				$("#ui-accordion-custom-tools-accordion-header-5").hide();
				$(".activateSocialMedia").remove();
			}
		}


///////////////////////////////
//    CONTENT ICONS          //
///////////////////////////////

	////// Custom Tools Accordion tab setup  //////
		function contentIcons(){
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
					<div class="well" style="padding:5px;margin-bottom: 5px;">\
						<small>Apply Icon to:</small>\
						<div class="btn-group">\
							<a href="#" class="btn btn-mini applyIconTo iconElement active" rel="">Element</a>\
							<a href="#" class="btn btn-mini applyIconTo iconList" rel="">Module List</a>\
						</div>\
					</div>\
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
                // Toggle active between element and module list selection buttons
                	$(".applyIconTo").click(function (e){
                		e.preventDefault();
	                	$(".applyIconTo").removeClass("active");
	                	$(this).addClass("active");
                	})
		}

	////// On Ready/Click functions  //////
		function changeIcon(){
			$(".changeIcon").click(function(){
				var ed = tinyMCE.get("wiki_page_body");
				var iconClass = $(this).attr("rel");
				if($(".iconElement").hasClass("active")){
					// Get parent element
						var parentElement = tinyMCE.DOM.getParent(ed.selection.getNode(), "span#banner-right, h3, h4, h5, h6, a, li");
					// Get the class(es) from the parent element
						tinyMCE.DOM.removeClass(parentElement, 'fa');
						var currentClass = tinyMCE.DOM.getAttrib(parentElement, 'class');
						var newClass = changeIconClass(currentClass, iconClass);
						tinyMCE.DOM.setAttrib(parentElement, 'class', newClass);
				} else {
					$("iframe").contents().find("#usu-modules-grid a").each(function (){
						var currentClass = $(this).attr("class");
						var newClass = changeIconClass(currentClass, iconClass);
						$(this).attr("class", newClass);
						// console.log(currentClass)
					});
				}
			});
		}
		function changeIconClass(currentClass, iconClass){
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
				var newClass = iconClass+" "+cleanedClass;
			// Clean up extra spaces and add to parent
				var newClass = newClass.trim();
			return newClass;
		}


