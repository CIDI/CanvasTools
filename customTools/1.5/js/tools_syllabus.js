// Copyright © 2014, Utah State University’s Center for Innovative Design & Instruction (CIDI) http://cidi.usu.edu
// All rights reserved.
 
// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the 
// following conditions are met:
 
// 1.   Redistributions of source code must retain the above copyright notice, this list of conditions and the 
//      following disclaimer.
// 2.   Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the 
//      following disclaimer in the documentation and/or other materials provided with the distribution.
// 3.   Neither the name of the owner nor the names of its contributors may be used to endorse or promote products 
//      derived from this software without specific prior written permission.
 
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
// INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN 
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF 
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

///////////////////////////////
//    DEFINE FUNCTIONS       //
///////////////////////////////
// Styles and code to be applied to TinyMCE editor
function addStyletoIframe() {
    // Because TinyMCE editor acts up occasionally, this will add a class to the iframe body to help determine if styles are applied
    if(!$("#course_syllabus_body_ifr").contents().find("body").hasClass('hasStyle')){
        var $head = $("#course_syllabus_body_ifr").contents().find("head");
        var timestamp =  +(new Date());                
        $head.append($("<link/>", { rel: "stylesheet", href: "/assets/vendor.css?1380315297", type: "text/css" }));
        $head.append($("<link/>", { rel: "stylesheet", href: toolsPath+"/css/canvasMCEEditor.css?"+timestamp, type: "text/css" }));
        $head.append($("<link/>", { rel: "stylesheet", href: globalCSSPath+"?"+timestamp, type: "text/css" }));
        $head.append($("<link/>", { rel: "stylesheet", href: "/assets/common.css?1376338847", type: "text/css" }));
        $("#course_syllabus_body_ifr").contents().find("body").css('background-image', 'none');
        if($("#course_syllabus_body_ifr").contents().find("#custom-css").length>0){
                $head.append($("<link/>", { rel: "stylesheet", href: "/courses/" + coursenum + "/file_contents/course%20files/global/css/style.css?"+timestamp, type: "text/css" }));
            }
        $("#course_syllabus_body_ifr").contents().find("body").css('background-image', 'none').addClass('hasStyle');;
    } else {
        $("#usu_tools").append('<a href="#" class="btn btn-mini addStyletoIframe" style="margin:5px 0 0 5px;"><i class="fa fa-magic"></i> Add Style to Editor</a>');
        $(".addStyletoIframe").click(function (e){
           addStyletoIframe();
        });
    }
}
function setEditorDisplay() {
    var bodyClass = "mceContentBody";
    if ($(".mceEditorView .active").length === 0) {
        $(".mcePreview").addClass("active");
    }
    $(".mceEditorView .active").each(function (e) {
        bodyClass += " "+$(this).attr("rel");
    });
    $("#course_syllabus_body_ifr").contents().find("#tinymce").attr("class", bodyClass);
    if ($(".toggle_views_link").length > 0){
        $(".toggle_views_link").get(0).scrollIntoView();
    }
}
function editorDisplayTypes() {
    $(".mceSectionView, .mceLabelsView").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $(".mcePreview").removeClass("active");
        setEditorDisplay();
    });
    $(".mcePreview").click(function (e) {
        e.preventDefault();
        $(this).addClass("active");
        $(".mceSectionView, .mceLabelsView").removeClass("active");
        setEditorDisplay();
    });     
}
// Control whether or not to add policies on save
function insertPolicies() {
    $("#edit_course_syllabus_form .btn-primary").click(function () {
        if ($("#addPolicies").is(":checked")) {
            console.log("Add policies is checked");
            $("#course_syllabus_body_ifr").contents().find('.universityPolicies').remove();
            $("#course_syllabus_body_ifr").contents().find('body').append('<div class="universityPolicies" />');
            $("#course_syllabus_body_ifr").contents().find('.universityPolicies').html(policies);
        }
    });
}
function setEverythingUp() {
    // Script that will add/remove policies from syllabus before and after editing
    $.getScript(toolsPath+"/js/syllabusPolicies.js");

    // Make sure custom-tools-wrapper exists and is visible
    if ($("#custom-tools-accordion").length === 0) {
        createToolsWrapper();
    }
    $("#custom-tools-wrapper").show();

    // Insert notice about policies below the content editor
    if($(".policyNotice").length === 0){
        $(".form-actions").before("<p class='policyNotice' style='font-size:16px;'>\
            <label>\
            <em><input type='checkbox' id='addPolicies' checked>\
            <strong> Automatically include University Policies and Procedures when the syllabus is updated.</strong></em>\
            </label></p>");
        insertPolicies();
    }

    // Remove policies from content area and add styling
    if ($("#course_syllabus_body_ifr").contents().find('.universityPolicies').length > 0) {
        $("#course_syllabus_body_ifr").contents().find('.universityPolicies').remove();
    }

    // Because the syllabus behaves different from other sections, we have to monitor the cancel and update buttons
    $("#edit_course_syllabus_form .btn-primary").click(function () {
        $(".policyNotice").remove();
        $("#custom-tools-wrapper").hide();
        $("#course_syllabus_body_ifr").contents().find(".toRemove").removeClass("toRemove");
    });

    $(".cancel_button").click(function () {
        $(".policyNotice").remove();
        $("#custom-tools-wrapper").hide();
    });
    $("body").scrollTop(0);
    // setTimeout(function () {
        $("#syllabusContainer").insertAfter("#edit_course_syllabus_form");
    // }, 600);

    // $("#usu_tools").html("");
    function customToolsCheck() {
        if ($("#custom-tools-accordion h3").length > 0) {
            var customToolsExist = true;
        } else {
            var customToolsExist = false;
        }
        if (customToolsExist === false) {
            var mceInstance = "course_syllabus_body";
            addSyllabusSubsections(mceInstance);
            // contentIcons(mceInstance);
            // activate the accordion
            initializeToolsAccordion();
            globalButtons();
            customTables(mceInstance);
            syllabusSectionsTool(primarySyllabusSections, mceInstance);
            setTimeout(function () {
                additionalSubSectionSetup();
                bindHover();
                tablesReady(mceInstance);
            }, 300);
            setEditorDisplay();
            editorDisplayTypes();
            addStyletoIframe();
            $(".addUSUTools").remove();
            return;
        } else {
            setTimeout(function () {
                customToolsCheck();
            }, 300);
        }
    }
    customToolsCheck();
}
function editorExistenceCheck() {
    var editorExists = false;
    if ($("#course_syllabus_body_ifr").contents().find("#tinymce").length > 0) {
        editorExists = true;
    }
    if (editorExists === true) {
        setTimeout(function () {
            setEverythingUp();
        }, 300);
        return;
    }
    setTimeout(function () {
        addStyletoIframe();
    }, 300);
}
(function () {
    "use strict";
    console.log('I loaded');
    var timestamp =  +(new Date()); 
    $("head").append($("<link/>", { rel: "stylesheet", href: "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css?"+timestamp }));
    // Setup items based on mceEditor existing
    $(".edit_syllabus_link").click(function () {
        if(!$("#custom-tools-accordion").length>0){
            $("#editor_tabs").before('<a href="#" class="btn btn-primary addUSUTools" style="margin-bottom: 5px;"><i class="fa fa-rocket" style="font-size: 18px;"></i> Launch USU Tools</a>');
            $(".addUSUTools").click(function (e){
                e.preventDefault();
                editorExistenceCheck();
                $(".toggle_views_link").get(0).scrollIntoView();
            });
        }
        if($("#custom-tools-wrapper").not(":visible").length>0){
            $("#custom-tools-wrapper").show();
            $("#custom-tools-wrapper ul:first").remove();
            $("#custom-tools-wrapper").contents().unwrap();
            $("#usu_tools").remove();
            $("#editor_tabs").unwrap();
            setTimeout(function () {
                editorExistenceCheck();
                console.log("I Ran, must be too slow");
            }, 300);
        }
        // editorExistenceCheck();
    });
}());

///////////////////////////////
//    INTITIAL SETUP        //
///////////////////////////////


///////////////////////////////
//    INTERFACE SETUP        //
///////////////////////////////

    // Show/Hide remove unchecked sections button
        function checkRemove() {
            if ($("#course_syllabus_body_ifr").contents().find(".toRemove").length > 0) {
                $(".removeSectionsWrapper").show();
            } else {
                $(".removeSectionsWrapper").hide();
            }
        }

    // Custom Tools side panel setup
        function createToolsWrapper() {
            if ($("#custom-tools-wrapper").length === 0) {
                // Wrap existing Canvas Page Tools
                if ($("#editor_tabs").length > 0) {
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
            }
        }

    // Create an accordion in right panel after tools are added
        function initializeToolsAccordion() {
            var icons = {
                header: "ui-icon-triangle-1-e",
                activeHeader: "ui-icon-triangle-1-s"
            };
            $("#custom-tools-accordion").accordion({
                heightStyle: "content",
                icons: icons,
                active: 0 //which panel is open by default
            });
            $( "#toggle" ).button().click(function () {
                if ( $( "#accordion" ).accordion( "option", "icons" ) ) {
                    $( "#accordion" ).accordion( "option", "icons", null );
                } else {
                    $( "#accordion" ).accordion( "option", "icons", icons );
                }
            });
            // $(".activateSections").click(function () {
            //  $("#custom-tools-accordion").accordion({ active: 2});
            // });
        };

    // Add a section for buttons before section order controls
        function globalButtons() {
            $("#usu_tools").append('<div class="global_buttons" />');
            // Remove Empty Button
                $('.global_buttons').append('<a class="btn btn-mini remove-empty" href="#" data-tooltip="left"\
                    title="This button will clean up the page contents by removing any empty elements.<p>This is especially useful when using the <i class=\'icon-collection-save\'></i> feature.</p>">\
                    <i class="icon-trash"></i> Clear Empty Elements</a></div>');
                removeEmpty();
            // Remove Sections Button
                $('.global_buttons').append('<div class="removeSectionsWrapper hide text-center">\
                    <a href="#" class="btn btn-danger removeSyllabusSections"><i class="icon-trash"></i> Remove Section(s)</a>\
                    <p><strong>Warning:</strong> This will also delete any content within the section.</p>\
                </div>');
            // Function to remove sections from contents and li from list
                $(".removeSyllabusSections").click(function () {
                    // remove any sections that were unchecked
                    $('#custom-tools-accordion input:checkbox, #reorderSections input:checkbox').not(":checked").each(function (i) {
                        $("#course_syllabus_body_ifr").contents().find('.'+this.value).remove();
                        if ($(this).hasClass("customSyllabusSection")) {
                            $(this).parents("li").remove();
                        }
                    });
                    checkRemove();
                });
        }
    // When an element is unchecked, it will highlight it and jump to it in content area
        function markToRemove(targetSection) {
            $("#course_syllabus_body_ifr").contents().find(targetSection).addClass("toRemove");
            scrollToElement(targetSection);
            checkRemove();
        }
    // Cleans out all empty elements and elements containing only &nbsp;
        function removeEmpty() {
            $(".remove-empty").click(function (e) {
                // Run twice just to make sure everything is cleaned
                for(var i=0; i<2; i++) {
                    $("#course_syllabus_body_ifr").contents().find("h4, p, h3, li").filter( function () {
                        return $.trim($(this).html()) == '&nbsp;';
                    }).remove()
                    $("#course_syllabus_body_ifr").contents().find("body").find(":empty").remove();
                }
            });
        }



///////////////////////////////
//    SYLLABUS TOOLS         //
/////////////////////////////// 


    ////// PRIMARY SYLLABUS Sections //////
        // Syllabus Setup //
            // Syllabus Sections HTML //
                // Contact Information
                    var information = '<div class="information">\
                        <p>Course Title | Term Year</p>\
                        <h3>CONTACT INFORMATION</h3>\
                        </div>';
                    // Instructor
                        var instructors = '<div class="instructors" style="margin-left:10px;">\
                            <h4>Instructor</h4>\
                            <ul style="list-style-type: none;">\
                                <li>Teacher Name</li>\
                                <li>797-1000</li>\
                                <li>teacher@usu.edu</li>\
                            </ul>\
                            <h5>Office Hours</h5>\
                            <p>List hours</p></div>';
                    // Teacher Assistant
                        var teachingAssistants = '<div class="teachingAssistants" style="margin-left:10px;"><h4>Teaching Assistant</h4>\
                            <ul style="list-style-type: none;">\
                                <li>TA Name</li>\
                                <li>ta@usu.edu</li>\
                            </ul></div>';
                    // Course Description
                        var course_description = '<div class="course_description" style="margin-left:10px;"><h4>Course Description</h4>\
                            <p>Text</p></div>';

                // Learning Outcomes
                    var outcomes = '<div class="outcomes">\
                        <h3>LEARNING OUTCOMES</h3>\
                        </div>';
                    // Course Outcomes
                        var learning_outcomes = '<div class="learning_outcomes" style="margin-left:10px;"><h4>Outcomes</h4>\
                            <p>Upon completion of this course you will be able to:</p>\
                            <ul id="outcomeList">\
                                <li>Outcome text here.</li>\
                            </ul></div>';

                // Course Resources
                    var resources = '<div class="resources">\
                        <h3>LEARNING RESOURCES</h3>\
                        </div>';

                    // Course Tech Requirements
                        var canvasInfo = '<div class="canvas" style="margin-left:10px;"><h4>Canvas</h4>\
                            <p>Canvas is the where course content, grades, and communication will reside for this course.</p>\
                            <ul>\
                                <li><a class="external" href="http://canvas.usu.edu/" target="_blank">http://canvas.usu.edu</a></li>\
                                <ul>\
                                    <li>Your <strong>username</strong> is your <strong>A#</strong>, and your <strong>password</strong> is your global password (the same one you use for Banner or Aggiemail).</li>\
                                </ul>\
                            <li>For <a class="external" href="http://canvas.usu.edu/" target="_blank">Canvas</a>, <a class="external" href="https://id.usu.edu/Password/Help/#password" target="_blank">Passwords</a>, or any other computer-related technical support contact the <a class="external" href="http://it.usu.edu/" target="_blank">IT Service Desk</a>.</li>\
                                <ul>\
                                    <li>435 797-4357 (797-HELP)</li>\
                                    <li>877 878-8325</li>\
                                    <li><a class="external" href="http://it.usu.edu/" target="_blank">http://it.usu.edu</a></li>\
                                    <li><a href="mailto:servicedesk@usu.edu">servicedesk@usu.edu</a></li>\
                                </ul>\
                            </ul></div>';
                    // Course Software
                        var courseSoftware = '<div class="software" style="margin-left:10px;">\
                            <h4>Software</h4>\
                            <p>Text</p>\
                            </div>';
                    // Textbook
                        var courseText = '<div class="textbook-readings" style="margin-left:10px;"><h4>Textbook & Reading Materials</h4>\
                            <p>The text for this class will be\
                            The Course Syllabus: A Learning-Centered Approach by O&rsquo;brein, Millis &amp; Cohen, second edition, published by Jossey-Bass, ISDN#047019617.&nbsp;<br />\
                            You may purchase this book at the&nbsp;<a class="external" href="http://campusstore.usu.edu/" target="_blank">USU bookstore</a>&nbsp;or online. Make sure you get the second edition!</p>\
                            </div>';
                    // Presentations
                        var courseVideos = '<div class="videos" style="margin-left:10px;"><h4>Videos</h4>\
                            <p>Text</p></div>';

                // Course Activities
                    var activities = '<div class="activities">\
                        <h3>LEARNING ACTIVITIES</h3>\
                        </div>';
                    // Course Readings
                        var courseReadings = '<div class="readings_" style="margin-left:10px;"><h4>Readings</h4>\
                            <p>Text</p></div>';
                    // Presentations
                        var videoActivities = '<div class="videos_" style="margin-left:10px;"><h4>Videos</h4>\
                            <p>Text</p></div>';
                    // Labs
                        var courseLabs = '<div class="labs" style="margin-left:10px;"><h4>Labs</h4>\
                            <p>Register for CRN: #####.\
                             It is a weekly lab that will allow you to apply what you learn in class.</p></div>';
                    // Discussions
                        var courseDiscussions = '<div class="discussions" style="margin-left:10px;"><h4>Discussions</h4>\
                            <p>Text</p></div>';
                    // Assignments
                        var courseAssignments = '<div class="assignments_" style="margin-left:10px;"><h4>Assignments</h4>\
                            <p>Text</p></div>';
                    // Quizzes
                        var courseQuizzes = '<div class="quizzes" style="margin-left:10px;"><h4>Quizzes</h4>\
                            <p>Text</p></div>';
                    // Exams
                        var courseExams = '<div class="exams" style="margin-left:10px;"><h4>Exams</h4>\
                            <p>Text</p></div>';

                // Syllabus Policies 
                    var policies ='<div class="policies">\
                        <h3>COURSE POLICIES</h3>\
                        </div>';
                    // Instructor Feedback/communication
                        var courseInstFeedback = '<div class="instructor_feedback" style="margin-left:10px;"><h4>Instructor Feedback/Communication</h4>\
                            <p>Text</p></div>';
                    // Student Feedback/communication
                        var courseStudFeedback = '<div class="student_feedback" style="margin-left:10px;"><h4>Student Feedback/Communication</h4>\
                            <p>Text</p></div>';
                    // Syllabus Changes
                        var coursesSyllabusChanges = '<div class="syllabus_changes" style="margin-left:10px;"><h4>Syllabus Changes</h4>\
                            <p>This syllabus is subject to change. I will notify the class regarding all changes.\
                            In the event of any discrepancy between this syllabus and content found in Canvas, the information in&nbsp;<strong>CANVAS WILL TAKE PRECENDENCE</strong>.</p></div>';
                    // Submitting Electronic Files
                        var courseSubmitFiles = '<div class="submitting_files" style="margin-left:10px;"><h4>Submitting Electronic Files</h4>\
                            <p>All electronic files must be submitted in word(.doc, .docx) or rich text file (.rtf) format, unless otherwise stated.\
                            Please name your file in the using the following convention:&nbsp;<em>Assignmentname_Yourname.doc</em>.</p></div>';
                    // Course Fees
                        var courseFees = '<div class="course_fees" style="margin-left:10px;"><h4>Course Fees</h4>\
                            <p>There are no course fees associated with this course.</p></div>';
                    // Late Work
                        var courseLateWork = '<div class="late_work" style="margin-left:10px;"><h4>Late Work</h4>\
                            <p>Late work due to procrastination will not be accepted. Late work due to legitimate emergency may be accepted. The due date and time associated with each quiz, discussion, exam and assignment are stated clearly in Canvas.</p>\
                            <p>&nbsp;</p></div>';

                // Course Grading
                    var grades ='<div class="grades_">\
                        <h3>GRADES</h3>\
                        <p>Your grade is based on the following:</p></div>';
                    // Course Assignments
                        var courseComponents = '<div class="course_assignments" style="margin-left:10px;"><h4>Course Assignments</h4>\
                            </div>';
                    // Grade Percentage Scheme Points
                        var courseGradeScheme = '<div class="grade_scheme" style="margin-left:10px;"><h4>Grading Scheme</h4>\
                            <div id="canvas_grade_scheme">&nbsp;</div></div>';

            // Array of section names and their corresponding html
                var primarySyllabusSections = {
                    'information':information,
                    'outcomes':outcomes,
                    'resources':resources,
                    'activities':activities,
                    'policies':policies,
                    'grades_':grades
                }

            // Section order accordion section //
                function syllabusSectionsTool(sectionArray, mceInstance) {
                    var addReorderSection = '<div id="reorderSections" style="display:none" title="Rearrange/Add Main Sections">\
                            <div>\
                                <ol class="unstyled primary-sections-list sections_li"></ol>\
                                <form class="form-inline"><input id="newPrimarySectionName" type="text" placeholder="New Primary Section Title"><a href="#" id="addPrimarySection" class="btn"><i class="icon-add"></i><span class="screenreader-only">Add New Primary Section</span></a></form>\
                                <div id="primarySyllabusSectionsButtons"></div>\
                            </div>';
                    var reorderTrigger = '<a class="btn btn-mini reorderTrigger" style="margin-top:5px;" data-tooltip="left" title="Use this to add, reorder or remove primary sections in the syllabus.">\
                              Work with Primary Sections</span>\
                            </a>';
                    $("#usu_tools").append(reorderTrigger+addReorderSection);
                    $("#usu_tools").append('<p style="font-size:10px;margin: 10px 0 0 0">Developed by the <a href="http://salsa.usu.edu/" target="_blank">SALSA</a> team at CIDI</p>');
                    // Dialog trigger
                        $(".reorderTrigger").click(function (e) {
                            e.preventDefault();
                            $("#reorderSections").dialog({ position: { my: "center bottom", at: "right top", of: ".reorderTrigger" }, modal: false, width: 255 });
                        });
                    // Loop through base sections array to populate the sections-list
                        $.each(sectionArray, function (key, value) {
                            var sectionTitle = key.replace("_", " ");
                            $(".primary-sections-list").append('<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
                                <label><input type="checkbox" class="'+key+'Section" value="'+key+'"> <span class="section-title">'+sectionTitle+'</span></label>\
                                <a html="#" class="identify-section identify-section-'+key+' icon-collection-save" rel="'+key+'" data-tooltip="left" title="Turn selected content into <br>'+sectionTitle+' section"> Identify '+sectionTitle+' section</a>\
                                </li>');
                        });
                    syllabusSectionsReady(sectionArray, mceInstance);
                }

        ////// On Ready/Click functions  //////
            function syllabusSectionsReady(sectionArray, mceInstance) {
                setTimeout(function () {
                    identifySyllabusSections(sectionArray);
                    sortableSyllabusSections(sectionArray);
                    syllabusSelectionToSection(mceInstance);
                }, 300);
                

                // Functions to run when a section checkbox is changed
                    $('.primary-sections-list input:checkbox').change(function () {
                        if ($(this).is(":checked")) {
                            syllabusTemplateCheck();
                            $('.primary-sections-list input:checkbox:checked').each(function (i) {
                                checkSyllabusSection(this.value, sectionArray);
                            });
                        } else {
                            var targetSection = "."+this.value;
                            markToRemove(targetSection);
                        }
                    });
                // "+" button next to new section field
                    $("#addPrimarySection").click(function (e) {
                        e.preventDefault();
                        createPrimarySection(sectionArray);
                    });
                // Button that turns selected text into a predefined section
                    $(".identify-section").click(function (e) {
                        e.preventDefault();
                        var sectionName = $(this).attr("rel");
                        wrapNamedSyllabusSection(sectionName, mceInstance);
                    });
                // create a new section if return/enter is pressed in the new section field
                    $("#newPrimarySectionName").keydown(function(event) {
                        if (event.keyCode == 13) {
                            event.preventDefault();
                            createPrimarySection(sectionArray);
                            return false;
                        }
                    });
            }

        ////// Supporting functions  //////
            // If the checked section exists, move it, if not add it
                function checkSyllabusSection(sectionName, sectionArray) {
                    var $contents = $("#course_syllabus_body_ifr").contents();
                    var container = $contents.find("#template-content");
                    if ($contents.find("."+sectionName).length > 0) {
                        $contents.find("."+sectionName).appendTo(container).removeClass("toRemove");
                        checkRemove();
                    } else {
                        $("#course_syllabus_body_ifr").contents().find("#template-content").append(sectionArray[sectionName]);
                        // console.log(sectionArray);
                    }
                }
            // Create a new section using the input in the template dialog
                function createPrimarySection(sectionArray) {
                    syllabusTemplateCheck();
                    // Grab name from text field
                        var newSectionName = $("#newPrimarySectionName").val();
                    // Create a new class using the section name
                        var newSectionClass = newSectionName.replace(/\W/g, '');
                    // If class name already exists, modify the class name
                        if ($("#course_syllabus_body_ifr").contents().find("."+newSectionClass).length > 0) {
                            newSectionClass = newSectionClass+"2";
                        }
                    // Insert the new section into the TinyMCE editor
                        var newSection = '<div class="'+newSectionClass+'">\
                                <h3>'+newSectionName+'</h3>\
                                <p>Insert content here.</p>\
                            </div>';
                        $("#course_syllabus_body_ifr").contents().find("#template-content").append(newSection);
                    // Create an <li> for this section in the Sections List
                        var newSectionControls = '<li>\
                            <span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
                            <label><input type="checkbox" class="customSyllabusSection" checked value="'+newSectionClass+'">\
                                <span class="sectionTitle">'+newSectionName+'</span>\
                            </label>\
                            </li>';
                        $(newSectionControls).appendTo(".primary-sections-list");
                    // Clear the section name field
                        $("#newSectionName").val("");
                    // Bring the new content into view
                        scrollToElement('.'+newSectionClass);
                        $("#course_syllabus_body_ifr").contents().find('.'+newSectionClass).addClass("sectionHover");
                        setTimeout(function () {
                            $("#course_syllabus_body_ifr").contents().find('.'+newSectionClass).removeClass("sectionHover");
                        }, 2000);
                    // make sure reorder dialogue stays in view
                        $( "#reorderSections" ).dialog( "option", "position", { my: "center bottom", at: "right top", of: '.reorderTrigger' } );
                    // Allow jumping to section on hover
                        bindHover();
                }
            // This function loops through existing content and then updates section controls
                function identifySyllabusSections(sectionArray) {
                    var sectionArray = primarySyllabusSections;

                    var $contents = $("#course_syllabus_body_ifr").contents();
                    // for any div that does not have a class, add the text from the heading as the class
                        $contents.find("#template-content div:not([class])").each(function () {
                                var sectionTitle = $(this).find("h3, h4").text();
                                var newClass = sectionTitle.replace(/\W/g, '');
                                $(this).addClass(newClass);
                        });
                    // take every div with a class
                        $contents.find("#template-content").children("div").each(function () {
                            if ($(this+'[class]')) {
                                var myValue = $(this).attr('class').split(' ')[0];
                                // Check sections against default array
                                    if ($.inArray(myValue, sectionArray) !== -1) {
                                        // Not sure what is matching here at the moment, it should have been what wasn't in the default list
                                            // alert(myValue+" is in the if portion");
                                            $('.primary-sections-list input[value='+myValue+']').parents('li').appendTo(".primary-sections-list");
                                    } else if ($('.primary-sections-list input[value='+myValue+']').length > 0) {
                                        // If it is already in the list, move it to the bottom
                                            $('.primary-sections-list input[value='+myValue+']').parents('li').appendTo(".primary-sections-list");
                                            $('.identify-section-'+myValue).hide();
                                            $('.'+myValue+'Section').prop('checked', true);
                                    } else {
                                        // If it is a default section, move it to the bottom and remove the selection to section link
                                            // alert(myValue+" is in the else portion");
                                            var myTitle = $(this).find("h3:first").text();
                                            var newSection = '<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span> <label><input type="checkbox" class="customSyllabusSection" checked value="'+myValue+'"> <span class="sectionTitle">'+myTitle+'</span></label></li>';
                                            $(newSection).appendTo(".primary-sections-list");
                                    }
                            }
                        });
                    // Move uncheck default items to bottom of primary-sections-list
                    $('.primary-sections-list input:checkbox').not(":checked").each(function (i) {
                        $(this).parents('li').appendTo(".primary-sections-list");
                    });
                }
            // Selection to section button
                function syllabusSelectionToSection(mceInstance) {
                    $("#primarySyllabusSectionsButtons").prepend(' <a class="syllabusSelectionToSection btn btn-mini" data-tooltip="left" title="Turn selected content into a new section.<br><span class=\'text-warning\'><strong>Content must contain a heading element!</strong></span>">\
                            <i class="icon-collection-save"></i> Selection to Section</a>');
                    $(".syllabusSelectionToSection").click(function (e) {
                        syllabusTemplateCheck();
                        wrapPrimarySection(mceInstance);
                    });
                }
            // Make primary-sections-list sortable so sections can be reordered
                function sortableSyllabusSections(sectionArray) {
                    $( ".primary-sections-list" ).sortable({
                        update: function( event, ui ) {
                            // Add the basic template style if one is not already set
                            syllabusTemplateCheck();
                            // loop through the checked sections and move or add them
                            $('.primary-sections-list input:checkbox:checked').each(function (i) {
                                checkSyllabusSection(this.value, sectionArray);
                            });
                        }
                    });
                    $( ".primary-sections-list" ).disableSelection();
                }
            // Wrap existing section as one of the default sections (i.e. Objectives, Readings, Lectures, etc)
                function wrapNamedSyllabusSection(sectionName, mceInstance) {
                    syllabusTemplateCheck();
                    var $contents = $("#course_syllabus_body_ifr").contents();
                    var ed = tinyMCE.get(mceInstance);
                    ed.focus(); 
                    ed.selection.setContent('<div class="'+sectionName+'">' + ed.selection.getContent() + '</div>');
                    var tempSection = $contents.find('.'+sectionName);
                    var container = $contents.find("#template-content");
                    $(container).append(tempSection);
                    $('.primary-sections-list input[value='+sectionName+']').prop('checked',true);
                    $('.identify-section-'+sectionName).hide();
                }
            // Wrap existing code into a new section and add to content portion "Selection to Section" button
                function wrapPrimarySection(mceInstance) {
                    var $contents = $("#course_syllabus_body_ifr").contents();
                    var ed = tinyMCE.get(mceInstance);
                    ed.focus(); 
                    ed.selection.setContent('<div class="temp">' + ed.selection.getContent() + '</div>');
                    var tempSection = $contents.find(".temp");
                    var sectionTitle = $(tempSection).find("h3").text();
                    var newClass = sectionTitle.replace(/\W/g, '');
                    var container = $contents.find("#template-content");
                    $(container).append(tempSection);
                    $(tempSection).removeClass("temp").addClass(newClass);
                }
            // If template is not there add it, will also remove and change old template
                function syllabusTemplateCheck() {
                    var $contents = $("#course_syllabus_body_ifr").contents();
                    if ($contents.find("#template-wrapper").length === 0) {
                        $contents.find("#tinymce").prepend('<div id="template-wrapper"><div id="template-content" class="syllabus-content" style="margin: 0;"><p>&nbsp;</p></div></div>');
                    }
                }


    ////// SYLLABUS SUBSECTIONS //////
        // Setup subsection panels
            function addSyllabusSubsections(mceInstance) {
                populateSubSection(informationSubSections, 'information', mceInstance);
                populateSubSection(outcomesSubSections, 'outcomes', mceInstance);
                populateSubSection(resourcesSubSections, 'resources', mceInstance);
                populateSubSection(activitiesSubSections, 'activities', mceInstance);
                populateSubSection(gradesSubSections, 'grades_', mceInstance);
                populateSubSection(policiesSubSections, 'policies', mceInstance);
            }
            function populateSubSection(subSectionArray, sectionParent, mceInstance) {
                var sectionTitle = sectionParent.replace("_", " ");
                var addAccordionSection = '<h3>\
                            '+sectionTitle+'\
                            <a class="help pull-right toolsHelp element_toggler" aria-controls="'+sectionParent+'Dialog" data-tooltip="left" title="Click to display '+sectionTitle+' help.">\
                                <span class="screenreader-only">About '+sectionTitle+'.</span>\
                            </a>\
                            </h3>\
                        <div>\
                        <ol class="unstyled '+sectionParent+'_sections-list sections_li">\
                        </ol>\
                        <form class="form-inline"><input id="new_'+sectionParent+'_SectionName" rel="'+sectionParent+'_sections-list" class="sectionTitleField" type="text" placeholder="New Section Title"><a href="#" id="add_'+sectionParent+'_Section" class="btn"><i class="icon-add"></i><span class="screenreader-only">Add New Section</span></a></form>\
                        <div id="'+sectionParent+'_SyllabusSectionsButtons">\
                        </div>\
                        </div>';
                    $("#custom-tools-accordion").append(addAccordionSection);
                    var sectionList = "."+sectionParent+"_sections-list"
                $.each(subSectionArray, function (key, value) {
                    var sectionTitle = key.replace(/_/g, " ");
                    $(sectionList).append('<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
                        <label><input type="checkbox" class="'+key+'Section" value="'+key+'"> <span class="section-title">'+sectionTitle+'</span></label>\
                        <a html="#" class="identify-subsection identify-subsection-'+key+' icon-collection-save" rel="'+key+'" data-tooltip="left" title="Turn selected content into <br>'+sectionTitle+' section"> Identify '+sectionTitle+' section</a>\
                        </li>');
                });
                syllabusSubSectionsSetup(subSectionArray, sectionList, sectionParent, mceInstance);
            }
        // Subsection Arrays
            var informationSubSections = {
                'instructors':instructors,
                'teachingAssistants':teachingAssistants,
                'course_description':course_description,
            }
            var outcomesSubSections = {
                'learning_outcomes':learning_outcomes
            }
            var resourcesSubSections = {
                'canvas':canvasInfo,
                'software':courseSoftware,
                'textbook-readings':courseText,
                'videos':courseVideos
            }
            var activitiesSubSections = {
                'readings_':courseReadings,
                'videos_':videoActivities,
                'labs':courseLabs,
                'discussions':courseDiscussions,
                'assignments_':courseAssignments,
                'quizzes':courseQuizzes,
                'exams':courseExams
            }
            var policiesSubSections = {
                'instructor_feedback':courseInstFeedback,
                'student_feedback':courseStudFeedback,
                'syllabus_changes':coursesSyllabusChanges,
                'submitting_files':courseSubmitFiles,
                'course_fees':courseFees,
                'late_work':courseLateWork
            }
            var gradesSubSections = {
                'course_assignments':courseComponents,
                'grade_scheme':courseGradeScheme
            }

        ////// Syllabus Subsection On Ready/Click functions  //////
            function syllabusSubSectionsSetup(sectionArray, sectionList, sectionParent, mceInstance) {
                setTimeout(function () {
                    identifySyllabusSubSections(sectionArray, sectionList, sectionParent);
                }, 300);

                // Functions to run when a section checkbox is changed
                    $(sectionList+' input:checkbox').change(function () {
                        if ($(this).is(":checked")) {
                            $(this).parents("li").find("a").hide();
                            syllabusTemplateCheck();
                            var parentCheckbox = '.'+sectionParent+'Section';
                            if ($(parentCheckbox).is(":checked")) {

                            } else {
                                $(parentCheckbox).prop('checked', true);
                                $('.primary-sections-list input:checkbox:checked').each(function (i) {
                                    checkSyllabusSection(this.value, primarySyllabusSections);
                                });
                            }

                            $(sectionList+' input:checkbox:checked').each(function (i) {
                                checkSyllabusSubSection(this.value, sectionParent, sectionArray);
                            });
                        } else {
                            $(this).parents("li").find("a").show();
                            var targetSection = "."+this.value;
                            markToRemove(targetSection);
                        }
                        $("#course_syllabus_body_ifr").contents().find("p:first").filter( function () {
                            return $.trim($(this).html()) == '&nbsp;';
                        }).remove();
                    });

                // "+" button next to new section field
                    $("#add_"+sectionParent+"_Section").click(function (e) {
                        e.preventDefault();
                        createSubSection(sectionArray, sectionList, sectionParent);
                    });
                // Button that turns selected text into a predefined section
                    $(".identify-subsection").click(function (e) {
                        e.preventDefault();
                        var sectionName = $(this).attr("rel");
                        var ed = tinyMCE.get(mceInstance);
                        ed.focus(); 
                        ed.selection.setContent('<div class="'+sectionName+'">' + ed.selection.getContent() + '</div>');
                        $(this).hide();
                        $(this).parent("li").find("input").prop('checked', true);
                    });
                // create a new section if return/enter is pressed in the new section field
                    $("#new_"+sectionParent+"_SectionName").keydown(function(event) {
                        if (event.keyCode == 13) {
                            event.preventDefault();
                            createSubSection(sectionArray, sectionList, sectionParent);
                            return false;
                        }
                    });
            }
            function additionalSubSectionSetup() {
                additionalInformationControls();
                additionalOutcomesControls();
                additionalGradesControls();
                sectionHelp();
            }

        ////// Syllabus Subsection Supporting functions  //////
            // Additional buttons/controls for various sections
                // Information Section
                    function additionalInformationControls() {
                        var informationBtns = '<div class="informationControls bordered-section"><h4>Additional Contacts:</h4>\
                            <div class="btn-group-label addInstructorSection">\
                                <div class="btn-group">\
                                    <a href="#" class="btn btn-mini addInstructor" data-tooltip="top" title="Add another instructor to <br>the Contact Information section"><i class="icon-add"></i><span class="screenreader-only">Add Instructor</span></a>\
                                    <a href="#" class="btn btn-mini removeInstructor" data-tooltip="top" title="Remove last instructor from <br>the Contact Information section"><i class="icon-minimize"></i><span class="screenreader-only">Remove Instructor</span></a>\
                                </div>\
                                Instructor\
                            </div>\
                            <div class="btn-group-label addTASection">\
                                <div class="btn-group">\
                                    <a href="#" class="btn btn-mini addTA" data-tooltip="top" title="Add another teaching assistant to <br>the Contact Information section"><i class="icon-add"></i><span class="screenreader-only">Add teaching assistant</span></a>\
                                    <a href="#" class="btn btn-mini removeTA" data-tooltip="top" title="Remove last teaching assistant from <br>the Contact Information section"><i class="icon-minimize"></i><span class="screenreader-only">Remove teaching assistant</span></a>\
                                </div>\
                                TA\
                            </div></div>';
                        $("#information_SyllabusSectionsButtons").append(informationBtns);

                        var additionalInstructor = '<div class="additionalInstructor"><h4>Instructor</h4>\
                            <ul style="list-style-type: none;">\
                                <li>Teacher Name</li>\
                                <li>797-1000</li>\
                                <li>teacher@usu.edu</li>\
                            </ul>\
                            <h5>Office Hours</h5>\
                            <p>List hours</p></div>';
                        var additionalTA = '<div class="additionalTA"><h4>Teaching Assistant</h4>\
                            <ul style="list-style-type: none;">\
                                <li>TA Name</li>\
                                <li>ta@usu.edu</li>\
                            </ul></div>';

                        $(".addInstructor").click(function (e) {
                            e.preventDefault();
                            $("#course_syllabus_body_ifr").contents().find(".instructors").append(additionalInstructor);
                            checkContacts();
                        });
                        $(".removeInstructor").click(function (e) {
                            e.preventDefault();
                            $("#course_syllabus_body_ifr").contents().find(".additionalInstructor:last").remove();
                            checkContacts();
                        });
                        $(".addTA").click(function (e) {
                            e.preventDefault();
                            $("#course_syllabus_body_ifr").contents().find(".teachingAssistants").append(additionalTA);
                            checkContacts();
                        });
                        $(".removeTA").click(function (e) {
                            e.preventDefault();
                            $("#course_syllabus_body_ifr").contents().find(".additionalTA:last").remove();
                            checkContacts();
                        });
                        $(".instructorsSection").change(function () {
                            checkContacts();
                        });
                        $(".teachingAssistantsSection").change(function () {
                            checkContacts();
                        });
                        function checkContacts() {
                            if ($("#course_syllabus_body_ifr").contents().find(".additionalInstructor").length > 0) {
                                $(".removeInstructor").removeClass("disabled");
                            } else {
                                $(".removeInstructor").addClass("disabled");
                            }
                            if ($("#course_syllabus_body_ifr").contents().find(".additionalTA").length > 0) {
                                $(".removeTA").removeClass("disabled");
                            } else {
                                $(".removeTA").addClass("disabled");
                            }
                            if ($(".instructorsSection:checked").length > 0) {
                                $(".addInstructorSection").show();
                            } else {
                                $(".addInstructorSection").hide();
                            }
                            if ($(".teachingAssistantsSection:checked").length > 0) {
                                $(".addTASection").show();
                            } else {
                                $(".addTASection").hide();
                            }
                            if ($(".instructorsSection:checked").length > 0 || $(".teachingAssistantsSection:checked").length > 0) {
                                $(".informationControls").show();
                            } else {
                                $(".informationControls").hide();
                            }
                        }
                        checkContacts();
                    }
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
                    
                    function additionalOutcomesControls() {
                        var learningOutcomesBtns = '<h4>Learning Outcomes</h4>\
                            <a class="btn btn-mini bloomsBtn" href="#" data-tooltip="top" title="Select action verbs from<br> Bloom\'s &rdquo;Revised&ldquo; Taxonomy">Bloom&rsquo;s Revised</a>\
                            <a class="btn btn-mini ideaBtn" href="#">IDEA Objectives</a>\
                            <div class="btn-group-label">Include Assessments:\
                            <div class="btn-group">\
                                <a href="#" class="btn btn-mini assessmentsYes" data-tooltip="top" title="Include assessments<br> below each outcome.">Yes</a>\
                                <a href="#" class="btn btn-mini assessmentsNo active" data-tooltip="top" title="Do not include assessments<br> below each outcome.">No</a>\
                            </div></div>\
                            <a class="btn btn-mini addOutcomes" href="#" style="display:none" data-tooltip="top" title="Insert a new Outcome/Assessment pair into the outcomes list.">Add Outcome/Assessment</a>';
                        $("#outcomes_SyllabusSectionsButtons").append(learningOutcomesBtns);
                        var bloomsBox = '<div id="bloomsBox" style="display:none" title="Bloom\'s Revised">\
                            <div class="btn-group-label">Insert At:\
                                <div class="btn-group">\
                                    <a class="btn btn-mini bloomsNewItem active" href="#" data-tooltip="top" tile="Will add a new list item to the &ldquo;Outcomes&rdquo; list.">New List Item</a>\
                                    <a class="btn btn-mini bloomsAtCursor" href="#">At Cursor</a>\
                                </div>\
                            </div>\
                            <div id="bloomsControls"></div>\
                            <div id="blooms"></div>\
                            </div>';
                        var ideaBox = '<div id="ideaBox" style="display:none;" title="IDEA Objectives">\
                            <div class="<div class="btn-group-label">Insert At:\
                                <div class="btn-group">\
                                    <a class="btn btn-mini ideaNewItem active" href="#" data-tooltip="top" tile="Will add a new list item to the &ldquo;Outcomes&rdquo; list.">New List Item</a>\
                                    <a class="btn btn-mini ideaAtCursor" href="#">At Cursor</a>\
                                </div>\
                            </div>\
                            <ol id="ideaControls">\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Gaining factual knowledge (terminology, classifications, methods, trends)</span> - IDEA Objective 1</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Learning fundamental principles, generalizations, or theories</span> - IDEA Objective 2</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Learning to Apply Course Material (to improve thinking, problem solving, and decisions)</span> - IDEA Objective 3</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Developing specific skills, competencies, and points of view needed by professionals in the field most closely related to this course</span> - IDEA Objective 4</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Acquiring skills in working with others as a member of a team</span> - IDEA Objective 5</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Developing creative capacities (writing, inventing, designing, performing in art, music, drama, etc.)</span> - IDEA Objective 6</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Gaining a broader understanding and appreciation of intellectual/cultural activity</span> - IDEA Objective 7</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Developing skill in expressing myself orally or in writing</span> - IDEA Objective 8</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Learning how to find and use resources for answering questions or solving problems</span> - IDEA Objective 9</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Developing a clearer understanding of, and commitment to, personal values</span> - IDEA Objective 10</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Learning to analyze and critically evaluate ideas, arguments, and points of view</span> - IDEA Objective 11</a></li>\
                                <li><a href="#" class="ideaObjective"><span class="objectiveText">Acquiring an interest in learning more by asking questions and seeking answers</span> - IDEA Objective 12</a></li>\
                            </ol>\
                            </div>';
                        var bloomsHelp = '<div class="well bloomsHelp" style="padding:5px;display:none;">\
                                <h5>Bloom&lsquo;s Help</h5>\
                                <p><small><span class="text-info"><strong>Select one of the six levels</strong></span> to see a list of action verbs. <span class="text-info"><strong>Click a verb</strong></span> to insert it.</small>\
                                <a href="#" class="closeHelp btn btn-mini">Close Help</a>\
                            </div>';
                        var ideaHelp = '<div class="well ideaHelp" style="padding:5px;display:none;">\
                                <h5>IDEA Objectives Help</h5>\
                                <p><small>Click an objective <span class="text-info"><strong>once to expand</strong></span>. When you have found one you need <span class="text-info"><strong>click again to apply</strong></span>.</small>\
                                <p><small>You can also use <span class="text-info"><strong>Tab</strong></span> and <span class="text-info"><strong>Shift+Tab</strong></span> to navigate through the objectives and <span class="text-info"><strong>Enter</strong></span> to apply.</p>\
                                <a href="#" class="closeHelp btn btn-mini">Close Help</a>\
                            </div>';
                        $("#outcomes_SyllabusSectionsButtons").addClass("bordered-section").append(bloomsBox+ideaBox+bloomsHelp+ideaHelp);
                        $(".learning_outcomesSection").change(function () {
                            checkOutcomesBox();
                        });
                        $(".closeHelp").click(function (e) {
                            e.preventDefault();
                            $(this).parents("div.well").slideUp();
                        });
                        function checkOutcomesBox() {
                            if ($(".learning_outcomesSection").is(":checked")) {
                                $("#outcomes_SyllabusSectionsButtons").show();
                            } else {
                                $("#outcomes_SyllabusSectionsButtons").hide();
                            }
                        }
                        checkOutcomesBox();
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
                                            $("#course_syllabus_body_ifr").contents().find("#outcomeList").append('<li>'+selectedWord+' </li>');
                                        } else {
                                            tinyMCE.execCommand('mceInsertContent', false, selectedWord+' ');
                                        }
                                    });
                                }
                            // Trigger for Bloom's dialog
                                $(".bloomsBtn").click(function (e) {
                                    e.preventDefault();
                                    scrollToElement(".outcomes");
                                    $("#bloomsBox").dialog({ position: { my: "right top", at: "left top", of: "#ui-accordion-custom-tools-accordion-panel-1" }, modal: false, width: 255 });
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
                        //// IDEA ////
                            // Trigger for IDEA dialog
                                $(".ideaBtn").click(function (e) {
                                    e.preventDefault();
                                    scrollToElement(".outcomes");
                                    $("#ideaBox").dialog({ position: { my: "right top", at: "left top", of: "#ui-accordion-custom-tools-accordion-panel-1" }, modal: false, width: 255 });
                                    $(".ideaHelp").slideDown();
                                    $("#ideaBox").parent("div").find(".ui-dialog-titlebar-close").click(function () {
                                        $(".ideaHelp").slideUp();
                                    });
                                });
                            // Selection Hover
                                $(".ideaObjective").click(function (e) {
                                    e.preventDefault();
                                    var selectedObjective = $(this).find('.objectiveText').text();
                                    if ($(this).hasClass("expandIdea")) {
                                        if ($(".ideaNewItem").hasClass("active")) {
                                            $("#course_syllabus_body_ifr").contents().find("#outcomeList").append('<li>'+selectedObjective+' </li>');
                                        } else {
                                            tinyMCE.execCommand('mceInsertContent', false, selectedObjective+' ');
                                        }
                                    }
                                    $(this).focus();
                                });
                                $(".ideaObjective").focus(function () {
                                    $(".expandIdea").removeClass("expandIdea");
                                    $(this).addClass("expandIdea");
                                });
                            // Determine whether word is inserted as a new item or at the cursor position
                                $(".ideaNewItem").click(function (e) {
                                    e.preventDefault();
                                    $(this).addClass("active");
                                    $(".ideaAtCursor").removeClass("active");
                                });
                                $(".ideaAtCursor").click(function (e) {
                                    e.preventDefault();
                                    $(this).addClass("active");
                                    $(".ideaNewItem").removeClass("active");
                                });
                            // Close IDEA help
                        // Check whether to include assessment in list or not
                            $(".assessmentsYes").click(function (e) {
                                e.preventDefault();
                                $(this).addClass("active");
                                $(".assessmentsNo").removeClass("active");
                                $(".addOutcomes").show();
                                var assessmentLi = '<ul class="assessmentList">\
                                        <li>Assessment Tools: </li>\
                                    </ul>';
                                $("#course_syllabus_body_ifr").contents().find("#outcomeList li").each(function () {
                                    if ($(this).next("li").length > 0) {
                                        $(this).after(assessmentLi);
                                    }
                                });
                                if (!$("#course_syllabus_body_ifr").contents().find("#outcomeList li:last").parent().hasClass("assessmentList")) {
                                    $("#course_syllabus_body_ifr").contents().find("#outcomeList li:last").after(assessmentLi);
                                }
                            });
                            $(".assessmentsNo").click(function (e) {
                                e.preventDefault();
                                $(this).addClass("active");
                                $(".assessmentsYes").removeClass("active");
                                $(".addOutcomes").hide();
                                $("#course_syllabus_body_ifr").contents().find(".assessmentList").remove();
                            });
                            // When the page loads, check yes if there are assessment lists
                                if ($("#course_syllabus_body_ifr").contents().find(".assessmentList").length > 0) {
                                    $(".assessmentsYes").addClass("active");
                                    $(".assessmentsNo").removeClass("active");
                                    $(".addOutcomes").show();
                                }
                        // Add Outcomes/Assessment button
                            $(".addOutcomes").click(function (e) {
                                scrollToElement(".outcomes");
                                $("#course_syllabus_body_ifr").contents().find("#outcomeList").append('<li>Outcome</li>\
                                    <ul class="assessmentList">\
                                        <li>Assessment Tools: </li>\
                                    </ul>');
                            });
                    }

                // Grades Section
                    function additionalGradesControls() {
                    // This function will pull the grade scheme from Canvas if it is checked otherwise it will give a message
                        function getGradeScheme() {
                            $("#course_syllabus_body_ifr").contents().find('#canvas_grade_scheme').load('/courses/'+coursenum+'/settings #course_grading_standard_enabled', function () {
                                if ($("#course_syllabus_body_ifr").contents().find('#course_grading_standard_enabled').is(":checked") == true) {
                                    $("#course_syllabus_body_ifr").contents().find('#canvas_grade_scheme').load('/courses/'+coursenum+'/settings .grading_standard_data', function () {
                                        $("#course_syllabus_body_ifr").contents().find('.grading_standard_data thead').remove();
                                        $("#course_syllabus_body_ifr").contents().find('.grading_standard_data .editing_box').remove();
                                        $("#course_syllabus_body_ifr").contents().find('.grading_standard_data caption').remove();
                                        $("#course_syllabus_body_ifr").contents().find('.grading_standard_data .insert_grading_standard').remove();
                                        $("#course_syllabus_body_ifr").contents().find('.grading_standard_data .displaying').contents().unwrap();
                                        $("#course_syllabus_body_ifr").contents().find('.grading_standard_data').attr('style', '').attr('data-mce-style','');
                                        $("#course_syllabus_body_ifr").contents().find('.grading_standard_data td').attr('style', '').attr('data-mce-style','');
                                        $("#course_syllabus_body_ifr").contents().find('.grading_standard_data').css('max-width', '225px').addClass('table table-condensed');
                                        $("#course_syllabus_body_ifr").contents().find('.grading_standard_data tr').each(function () {
                                            $(this).find("td:first").css({'width': '95px', 'padding-left':'5px;'}).attr('data-mce-style', 'width:100px;padding-left:5px;');
                                        });
                                        $("#course_syllabus_body_ifr").contents().find('.grading_standard_data .max_score_cell').css('text-align', 'right').attr('data-mce-style', 'text-align:right;padding-right:5px;');
                                        $(".grade-alert").remove();
                                    });
                                } else {
                                    $("#course_syllabus_body_ifr").contents().find('#canvas_grade_scheme').html('<p>Not currently using the Canvas grade scheme. You better change that!</p>')
                                    $(".grade-alert").remove();
                                    $(".gradeSchemeControls").append('<div class="grade-alert" style="margin-top:10px;"><p class="alert alert-error">This feature uses the grade scheme built into Canvas.<br>You have not configured your course to use the grade scheme.</p><a href="#" class="btn btn-danger gradeSchemeWalkthrough" style="margin-bottom: 10px;">Show Me How</a></div>');
                                    $(".gradeSchemeWalkthrough").click(function (e) {
                                        e.preventDefault();
                                        var defaulthref = $(".settings").attr("href");
                                        var newhref = defaulthref+"?task=setGradeScheme";
                                        $(".settings").attr({"data-tooltip":"right", "title":"Click here!<br>We will open it in a new tab.", "target":"_blank", "href": newhref}).trigger("mouseover").focus();
                                        $(".settings").click(function () {
                                            $(".settings").attr({"data-tooltip":"", "title":""}).trigger("mouseout");
                                            $(".updateGrade").attr({"data-tooltip":"top", "title":"When you have set your grade scheme<br>click this button"}).trigger("mouseenter").focus();
                                        });
                                    });
                                }
                            });
                        }
                        //  Grade Scheme Functions
                            $("#grades__SyllabusSectionsButtons").append('<div class="gradeSchemeControls bordered-section" style="display:none;">\
                                <h4>Grade Scheme</h4>\
                                <a class="btn btn-mini updateGrade">Update Grade Scheme</a>\
                                </div>');
                            // Check if initially checked
                                if ($(".grade_schemeSection").is(":checked")) {
                                    $(".gradeSchemeControls").show();
                                }
                            $(".grade_schemeSection").change(function () {
                                if ($(this).is(":checked")) {
                                    $(".gradeSchemeControls").show();
                                    getGradeScheme();
                                } else {
                                    $(".gradeSchemeControls").hide();
                                }
                            });
                            $(".updateGrade").click(function () {
                                getGradeScheme();
                            });

                        // Course Assignments
                            var componentPointsControls = '<div class="componentPointsControls bordered-section" style="display:none;">\
                                <h4>Course Assignments</h4>\
                                <div class="btn-group">\
                                    <a href="#" class="btn btn-mini cc-fromCanvas" data-tooltip="top" title="Move the assignment section below the syllabus into the grades portion.">From Canvas</a>\
                                    <a href="#" class="btn btn-mini cc-customTable" data-tooltip="top" title="Create a table for listing Course Assignments">Custom Table</a>\
                                </div>\
                                <div class="cc-fromCanvasControls" style="display:none;margin-top:10px;">\
                                    <p><small>This will store the current assignment list in the syllabus. Users visiting the syllabus will always see the updated version, but users visiting on a mobile device will see the stored version. The stored version will update whenever you edit your syllabus.</small></p>\
                                </div>\
                                </div>';
                            $("#grades__SyllabusSectionsButtons").append(componentPointsControls);
                            // Component Point options
                                $(".cc-fromCanvas").click(function (e) {
                                    e.preventDefault();
                                    $("#course_syllabus_body_ifr").contents().find("#canvasAssignmentList").remove();
                                    $("#course_syllabus_body_ifr").contents().find(".course_assignments").append('<div id="canvasAssignmentList" />')
                                    $("#syllabus").clone().appendTo($("#course_syllabus_body_ifr").contents().find("#canvasAssignmentList"));
                                    $(this).addClass("active");
                                    $(".cc-customTable").removeClass("active");
                                    $(".cc-fromCanvasControls").show();
                                });
                                $(".cc-customTable").click(function (e) {
                                    e.preventDefault();
                                    $(this).addClass("active");
                                    $(".cc-fromCanvas").removeClass("active");
                                    $(".cc-fromCanvasControls").hide();
                                    $("#tablesDialog").dialog({ position: { my: "right top", at: "left top", of: "#ui-accordion-custom-tools-accordion-header-4" }, modal: false, width: 255 });
                                    $("#course_syllabus_body_ifr").contents().find(".course_assignments").append('<div id="customComponentTable"><p>&nbsp;</p></div>');
                                    var ed = tinyMCE.get("course_syllabus_body");
                                    var newNode = ed.dom.select('#customComponentTable p');
                                    ed.selection.select(newNode[0]);
                                });
                            // Check if initially checked
                                $(".course_assignmentsSection").change(function () {
                                    if ($(this).is(":checked")) {
                                        $(".componentPointsControls").show();
                                    } else {
                                        $(".componentPointsControls").hide();
                                    }
                                    checkComponent();
                                });
                            // supporting functions
                                function checkComponent() {
                                    if ($(".course_assignmentsSection").is(":checked")) {
                                        $(".componentPointsControls").show();
                                    } else {
                                        $(".cc-fromCanvas").removeClass("active");
                                        $(".cc-customTable").removeClass("active");
                                    }
                                    if ($("#course_syllabus_body_ifr").contents().find("#syllabus").length > 0) {
                                        $(".cc-fromCanvas").addClass("active");
                                        $(".cc-fromCanvasControls").show();
                                        $("#course_syllabus_body_ifr").contents().find("#canvasAssignmentList").remove();
                                        $("#course_syllabus_body_ifr").contents().find(".course_assignments").append('<div id="canvasAssignmentList" />')
                                        $("#syllabus").clone().appendTo($("#course_syllabus_body_ifr").contents().find("#canvasAssignmentList"));
                                    }
                                }
                                checkComponent();
                    }

            // If the checked section exists, move it, if not add it
                function checkSyllabusSubSection(sectionName, sectionParent, sectionArray) {
                    // console.log(sectionParent);
                    console.log(sectionName);
                    if ($("."+sectionName+"Section").is(":checked")) {
                        var $contents = $("#course_syllabus_body_ifr").contents();
                        var container = $contents.find("."+sectionParent);
                        if ($contents.find("."+sectionName).length > 0) {
                            $contents.find("."+sectionName).appendTo(container).removeClass("toRemove");
                            checkRemove();
                        } else {
                            $("#course_syllabus_body_ifr").contents().find("."+sectionParent).append(sectionArray[sectionName]);
                            scrollToElement('.'+sectionName);
                        }
                    }
                }
            // Create a new section using the input in the template dialog
                function createSubSection(sectionArray, sectionList, sectionParent) {
                    console.log("Parent: "+sectionParent);

                    syllabusTemplateCheck();
                    // Check for parent section
                    if($("."+sectionParent+"Section").not(":checked")){
                        $("."+sectionParent+"Section").prop("checked", true).trigger("change");
                    }
                    // Grab name from text field
                        var newSectionName = $("#new_"+sectionParent+"_SectionName").val();
                    // Create a new class using the section name
                        var newSectionClass = newSectionName.replace(/\W/g, '');
                    // If class name already exists, modify the class name
                        if ($("#course_syllabus_body_ifr").contents().find("."+newSectionClass).length > 0) {
                            newSectionClass = newSectionClass+"2";
                        }
                    // Insert the new section into the TinyMCE editor
                        var newSection = '<div class="'+newSectionClass+'" style="margin-left:10px;">\
                                <h4>'+newSectionName+'</h4>\
                                <p>Insert content here.</p>\
                            </div>';
                        $("#course_syllabus_body_ifr").contents().find("."+sectionParent).append(newSection);
                    // Put focus on new section
                        scrollToElement('.'+newSectionClass);
                        $("#course_syllabus_body_ifr").contents().find('.'+newSectionClass).addClass("sectionHover");
                        setTimeout(function () {
                            $("#course_syllabus_body_ifr").contents().find('.'+newSectionClass).removeClass("sectionHover");
                        }, 1000);
                    // Create an <li> for this section in the Sections List
                        var newSectionControls = '<li>\
                            <span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span>\
                            <label><input type="checkbox" class="customSyllabusSection" checked value="'+newSectionClass+'">\
                                <span class="sectionTitle">&nbsp;'+newSectionName+'</span>\
                            </label>\
                            </li>';
                        $(newSectionControls).appendTo(sectionList);
                    // Clear the section name field
                        $("#new_"+sectionParent+"_SectionName").val("");
                    // Bind a change function to bring up the remove button when unchecked
                        $('.customSyllabusSection').change(function () {
                            if ($(this).is(":checked")) {
                                syllabusTemplateCheck();
                            } else {
                                var targetSection = "."+this.value;
                                markToRemove(targetSection);
                            }
                        });
                    // Show section on hover
                        bindHover();
                }

            // This function loops through existing content and then updates section controls
                function identifySyllabusSubSections(sectionArray, sectionList, sectionParent) {
                    var $contents = $("#course_syllabus_body_ifr").contents();
                    // for any div that does not have a class, add the text from the heading as the class
                        // console.log(sectionList);
                        $contents.find("."+sectionParent+" div:not([class])").each(function () {
                                var sectionTitle = $(this).find("h4").text();
                                var newClass = sectionTitle.replace(/\W/g, '');
                                $(this).addClass(newClass);
                        });
                    // take every div with a class
                        $contents.find("."+sectionParent).children("div").each(function () {
                            if ($(this+'[class]')) {
                                var myValue = $(this).attr('class').split(' ')[0];
                                // Check sections against default array
                                    if ($.inArray(myValue, sectionArray) !== -1) {
                                        // Not sure what is matching here at the moment, it should have been what wasn't in the default list
                                            // alert(myValue+" is in the if portion");
                                            $(sectionList+' input[value='+myValue+']').parents('li').appendTo(sectionList);
                                    } else if ($(sectionList+' input[value='+myValue+']').length > 0) {
                                        // If it is already in the list, move it to the bottom
                                            // alert(myValue+" should be being checked");
                                            $(sectionList+' input[value='+myValue+']').parents('li').appendTo(sectionList);
                                            $('.identify-subsection-'+myValue).hide();
                                            $('.'+myValue+'Section').prop('checked', true);
                                    } else {
                                        // If it is a default section, move it to the bottom and remove the selection to section link
                                            // alert(myValue+" is in the else portion");
                                            var myTitle = $(this).find("h4:first").text();
                                            var newSection = '<li><span title="Drag to reorder" class="move_item_link"><img alt="Move" src="/images/move.png?1366214258"></span> <label><input type="checkbox" class="customSyllabusSection" checked value="'+myValue+'"> <span class="sectionTitle">'+myTitle+'</span></label></li>';
                                            $(newSection).appendTo(sectionList);
                                    }
                            } else {
                                $(this).parents('li').appendTo(sectionList);
                            }
                            $(sectionList+' input:checkbox').not(":checked").each(function (i) {
                                $(this).parents('li').appendTo(sectionList);
                            });
                        });
                        sortableSyllabusSubSections(sectionArray, sectionList, sectionParent);
                    // Bind a change function to bring up the remove button when unchecked
                        $('.customSyllabusSection').change(function () {
                            if ($(this).is(":checked")) {
                                syllabusTemplateCheck();
                            } else {
                                var targetSection = "."+this.value;
                                markToRemove(targetSection);
                            }
                        });
                    // Move uncheck default items to bottom of '+sectionList+'
                    $('.'+sectionList+' input:checkbox').not(":checked").each(function (i) {
                        $(this).parents('li').appendTo('.'+sectionList);
                    });

                }

            // Make primary-sections-list sortable so sections can be reordered
                function sortableSyllabusSubSections(sectionArray, sectionList, sectionParent) {
                    $(sectionList).sortable({
                        update: function( event, ui ) {
                            // Add the basic template style if one is not already set
                            syllabusTemplateCheck();
                            // loop through the checked sections and move or add them
                            $(sectionList+' input:checkbox').each(function (i) {
                                checkSyllabusSubSection(this.value, sectionParent, sectionArray);
                            });
                        }
                    });
                    $(sectionList).disableSelection();
                }
            // Create help dialogs for each section
                function sectionHelp() {
                    var informationHelp = '<div id="informationDialog" data-turn-into-dialog=\'{"width":800,"modal":true}\' style="display:none" title="Information help">\
                            <p>Provide the following in the Information portion of your syllabus:</p>\
                            <h4>Course</h4>\
                            <p>Provide the course title, the course number, and the current term designation.</p>\
                            <h4>Suggested Sections</h4>\
                            <h5><strong>Contact Information</strong></h5>\
                            <p>Your title and primary contact method. Provide information about your communication preferences --when you will check email, how quickly you will respond, etc. --in the <strong>Course Policies</strong> section.</p>\
                            <a href="#">View Policies help</a>\
                            <p>If you are team teaching and/or have a Teaching Assistant, use the buttons in the &ldquo;Additional Contacts&rdquo; portion to add or remove contacts.</p>\
                            <h5><strong>Course Description</strong></h5>\
                            <p>A description of your course. Here are some suggested formats:</p>\
                            <ul>\
                                <li>Outcomes-based narrative: link together your Outcomes to tell the &ldquo;story&rdquo; of your course</li>\
                                <li>Questions: pose a series of questions that the course will help your student answer</li>\
                                <li>Anecdote: give an example from your experience that engages the student and creates a context for learning</li>\
                            </ul>\
                            <div class="button-container">\
                                <a class="btn dialog_closer">Close</a>\
                            </div>\
                            </div>';
                    var outcomesHelp = '<div id="outcomesDialog" data-turn-into-dialog=\'{"width":800,"modal":true}\' style="display:none" title="Outcomes help">\
                            <p><strong>Outcomes</strong> are statements created to define and/or measure desired student behavior.\
                                <strong>Learning Outcomes</strong> use an action verb to describe the measurable results of <strong>Learning Activities</strong>.\
                            <h4>Bloom&rsquo;s Revised</h4>\
                            <p>The &ldquo;Bloom&rsquo;s Revised&rdquo; tool provides a set of action verbs organized into six levels: remember, understand, apply, analyze, evaluate and create.\
                             The tool opens in a moveable dialog box.\
                             Clicking on a level opens a group of action verb buttons.\
                             You can choose whether clicking a verb creates a new Learning Outcome item or is inserted at the cursor position.</p>\
                            <h4>Outcomes</h4>\
                            The Learning Outcomes section uses a common &ldquo;stem&rdquo; for all outcomes:\
                            Upon completion of this course you will be able to:\
                            You may modify this stem by selecting the text in the text editor. You may also delete this stem if you would prefer to use different stems embedded in each learning outcome.\
                            <div class="button-container">\
                                <a class="btn dialog_closer">Close</a>\
                            </div>';
                    var resourcesHelp = '<div id="resourcesDialog" data-turn-into-dialog=\'{"width":800,"modal":true}\' style="display:none" title="Resources help">\
                            <strong>Resources</strong> are components available to influence and/or measure student behavior. <strong>Learning Resources</strong> are materials provided to achieve <strong>Learning Outcomes</strong> through <strong>Learning Activities</strong>.\
                            <h4>Suggested Headings</h4>\
                            <p>Provide the following in the Learning Resources section of your syllabus:</p>\
                            <h5><strong><em>Canvas</em></strong></h5>\
                            <p>The login information for Canvas and information on the best web browser(s) to use.</p>\
                            <h5><strong><em>Techinical Support</em></strong></h5>\
                            <p>Contact information--website links, telephone numbers, etc.--for technical support services available to students.</p>\
                            <h5><strong><em>Required Software</em></strong></h5>\
                            <p>A detailed list of all software needed for the course. DO NOT assume that students will have commonly-used software such as Microsoft Word or Microsoft PowerPoint. You may wish to provide information about open-source alternatives such as OpenOffice Writer.</p>\
                            <a href="http://www.openoffice.org/" target="_blank">Visit the Open Office website</a>\
                            <h5><strong><em>Textbook and/or other Reading Materials</em></strong></h5>\
                            <p>Information about textbooks, course packets, journal articles, and other reading materials used in the course. Include details such as textbook ISDN number(s), where to purchase reading materials and access information for password-protected digital assets.</p>\
                            <h5><strong><em>Videos</em></strong></h5>\
                            <p>Information about videos and/or other multimedia that will be used in the course. Also information about where (LMS, external website, etc.) and how (login information) students will access these resources. Information on software needed to run multimedia (Flash, HTML 5 browser, etc.) is placed in the Required Software section.</p>\
                            <div class="button-container">\
                                <a class="btn dialog_closer">Close</a>\
                            </div>';
                    var activitiesHelp = '<div id="activitiesDialog" data-turn-into-dialog=\'{"width":800,"modal":true}\' style="display:none" title="Activities help">\
                            <strong>Activities</strong> are opportunities created to influence and/or measure defined student behavior.\
                             <strong>Learning Resources</strong> are used in <strong>Learning Activities</strong> to achieve <strong>Learning Outcomes</strong>.\
                             There are two types of <strong>Learning Activities</strong>:\
                            <ul>\
                                <li><strong>Application Activities</strong> are opportunities for students to demonstrate knowledge and skills</li>\
                                <li><strong>Acquisition Activities</strong> are opportunities for students to gain knowledge and skills</li>\
                            </ul>\
                            Common <strong>Learning Activities</strong>:\
                            <ul>\
                                <li>Readings</li>\
                                <li>Videos</li>\
                                <li>Labs</li>\
                                <li>Discussions</li>\
                                <li>Assignments</li>\
                                <li>Assessments</li>\
                            </ul>\
                            Provide <em>general</em> information in the <strong>Learning Activities</strong> section of your syllabus: types, frequency and relationships to other learning activities.\
                            Provide <em>specific</em> information on learning activities in Canvas: instructions, examples and due dates/times.\
                            <div class="button-container">\
                                <a class="btn dialog_closer">Close</a>\
                            </div>';
                    var policiesHelp = '<div id="policiesDialog" data-turn-into-dialog=\'{"width":800,"modal":true}\' style="display:none" title="Policies help">\
                            <h4>Suggested Headings</h4>\
                            <p>Provide the following in the <strong>Course Policies</strong> section of your syllabus:</p>\
                            <h5><strong><em>Instructor Feedback/Communication</em></strong></h5>\
                            <p>The types of feedback and communication the instructor will provide, and which communication tools will be used. The response time for each type and tool.</p>\
                            <h5><strong><em>Student Feedback/Communication</em></strong></h5>\
                            <p>The types of feedback and communication the instructor will accept, and which communication tools will be used. The response time for each type and tool.</p>\
                            <h5><strong><em>Syllabus Changes</em></strong></h5>\
                            <p>The actions you will take if your syllabus must be revised. The actions students should take if there is a discrepancy between your syllabus, and other sources of information, i.e. - the learning management system.</p>\
                            <h5><strong><em>Submitting Electronic Files</em></strong></h5>\
                            <p>Any information the student may need regarding what types of files are acceptable and how to submit them.</p>\
                            <h5><strong><em>Course Fees</em></strong></h5>\
                            <p>Include information regarding any additional course fees that are required.</p>\
                            <h5><strong><em>Late Work</em></strong></h5>\
                            <p>Your expectations regarding late work:</p>\
                                <li>Acceptable circumstances</li>\
                                <li>Student responsibilties</li>\
                                <li>Penalties</li>\
                            <div class="button-container">\
                                <a class="btn dialog_closer">Close</a>\
                            </div>';
                    var grades_Help = '<div id="grades_Dialog" data-turn-into-dialog=\'{"width":800,"modal":true}\' style="display:none" title="Information help">\
                        <p>Content</p>\
                        <div class="button-container">\
                            <a class="btn dialog_closer">Close</a>\
                        </div>';
                    var helpSectionText = {
                        'information':informationHelp,
                        'outcomes':outcomesHelp,
                        'resources':resourcesHelp,
                        'activities':activitiesHelp,
                        'policies':policiesHelp,
                        'grades_':grades_Help
                    }
                    $.each(helpSectionText, function (key, value) {
                        $("#"+key+"_SyllabusSectionsButtons").after(value);
                    });
                }
            function bindHover() {
                $(".sections_li li").mouseover(function () {
                    $("#course_syllabus_body_ifr").contents().find(".sectionHover").removeClass("sectionHover");
                    var connectedSection = $(this).find("input").attr("value");
                    var timeoutID = setTimeout(function () {
                        $("#course_syllabus_body_ifr").contents().find("."+connectedSection).addClass("sectionHover");
                        scrollToElement("."+connectedSection);
                    }, 500);
                }).mouseout(function () {
                    clearTimeout(timeoutID);
                    var connectedSection = $(this).find("input").attr("value");
                    $("#course_syllabus_body_ifr").contents().find("."+connectedSection).removeClass("sectionHover");
                });
            }
            function scrollToElement(targetElement) {
                if($("#course_syllabus_body_ifr").contents().find(targetElement).length > 0){
                   $(tinymce.activeEditor.getBody()).find(targetElement).get(0).scrollIntoView();
                }
                if ($(".toggle_views_link").length > 0){
                    $(".toggle_views_link").get(0).scrollIntoView();
                }
            }

///////////////////////////////
//    TABLES                 //
///////////////////////////////

    ////// Custom Tools Accordion tab setup  //////
        function customTables(mceInstance) {
            var dialogContent = '<div id="tablesDialog" title="Custom Tables" style="display:none;">\
                <div class="btn-group tableOptions" style="margin-bottom:10px;">\
                    <a href="#" class="btn btn-mini active" rel=".tableNew">Create Table</a>\
                    <a href="#" class="btn btn-mini" rel=".tableLayout">Edit Table</a>\
                    <a href="#" class="btn btn-mini" rel=".tableStyles">Style Table</a>\
                </div>\
                <div class="tableNew">\
                    <div class="bordered-section">\
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
            $("#usu_tools").append(dialogContent);
        }
    ////// On Ready/Click functions  //////
        function tablesReady(mceInstance) {
            // Table Button
                $(".global_buttons").append('<a href="#" class="btn btn-mini customTableTrigger" style="margin-left:5px;">Custom Tables</a>');
                $(".customTableTrigger").click(function (e) {
                    $("#tablesDialog").dialog({ position: { my: "right top", at: "left top", of: "#ui-accordion-custom-tools-accordion-header-0" }, modal: false, width: 255 });
                });
            // Add table column
                $('.addTableColumn').click(function (e) {
                    e.preventDefault();
                    var ed = tinyMCE.get(mceInstance);
                    var parentTable = ed.dom.getParent(ed.selection.getNode(), 'table');
                    // add a temp class so that we can target table with jQuery
                        tinyMCE.DOM.addClass(parentTable, 'addColumn');
                    var cellCount = $("#course_syllabus_body_ifr").contents().find('.addColumn tbody tr:first td').length;
                    $("#course_syllabus_body_ifr").contents().find('.addColumn thead tr').append("<th>Heading</th>");
                    $("#course_syllabus_body_ifr").contents().find('.addColumn tbody tr').each(function () {
                        $(this).append("<td>Content</td>");
                    });
                    $("#course_syllabus_body_ifr").contents().find(".addColumn").removeClass("addColumn");
                });
            // Make the first table row headings
                $(".addTableHeading").click(function (e) {
                    var ed = tinyMCE.get(mceInstance);
                    var parentTable = ed.dom.getParent(ed.selection.getNode(), 'table');
                    // add a temp class so that we can target table with jQuery
                        tinyMCE.DOM.addClass(parentTable, 'markHeading');
                    // if the table does not have a thead section, add it and move the first row of table
                        if ($("#course_syllabus_body_ifr").contents().find(".markHeading thead").length === 0 ) {
                            var topRow = $("#course_syllabus_body_ifr").contents().find(".markHeading tr:first-child").html();
                            $("#course_syllabus_body_ifr").contents().find(".markHeading tr:first-child").remove();
                            $("#course_syllabus_body_ifr").contents().find(".markHeading").prepend("<thead>"+topRow+"</thead>");
                            $("#course_syllabus_body_ifr").contents().find(".markHeading thead td").each(function () {
                                $(this).replaceWith('<th>' + $(this).text().trim() + '</th>'); 
                            });
                        }
                    // remove temp class and check to see if it has the table class
                        $("#course_syllabus_body_ifr").contents().find(".markHeading").removeClass("markHeading");
                        checkTable(parentTable);
                });
            // Make table sortable
                $(".makeTableSortable").click(function (e) {
                    e.preventDefault();
                    var ed = tinyMCE.get(mceInstance);
                    var parentTable = ed.dom.getParent(ed.selection.getNode(), 'table');
                    // Get the styles from the parent element
                        var currentClass = tinyMCE.DOM.getAttrib(parentTable, 'class');
                    // If the parent already has the class, remove it otherwise add it
                        var regExpMatch = /\btablesorter\b/g;
                        if (currentClass.match(regExpMatch) == null) {
                            tinyMCE.DOM.addClass(parentTable, 'tablesorter');
                        } else {
                            tinyMCE.DOM.removeClass(parentTable, 'tablesorter');
                        }
                });
            // Buttons for manipulating the mce table
                $('.mceTableCommand').click(function (e) {
                    e.preventDefault();
                    var myCommand = $(this).attr("rel");
                    console.log(myCommand);
                    tinymce.activeEditor.execCommand(myCommand);
                });
            // Insert a table using the custom tool
                $('.insertTable').click(function (e) {
                    e.preventDefault();
                    insertTable();
                });
                $("#tableNumCols").keydown(function(event) {
                    if (event.keyCode == 13) {
                        event.preventDefault();
                        insertTable();
                        return false;
                    }
                });
                $("#tableNumRows").keydown(function(event) {
                    if (event.keyCode == 13) {
                        event.preventDefault();
                        insertTable();
                        return false;
                    }
                });
            // applying and removing tr backgrounds
                $(".rowBackgrounds").click(function (e) {
                    var ed = tinyMCE.get(mceInstance);
                    var parentTable = ed.dom.getParent(ed.selection.getNode(), 'table');
                    var parentRow = ed.dom.getParent(ed.selection.getNode(), 'tr');
                    // removeRowStyle(parentRow);
                    var rowClass = $(this).attr("rel");
                    tinyMCE.DOM.addClass(parentRow, rowClass);
                    checkTable(parentTable);
                });
            // Toggle between table sections
                $(".tableOptions a").click(function (e) {
                    e.preventDefault();
                    $(".tableOptions a").each(function () {
                        $(this).removeClass("active");
                        var connectedSection = $(this).attr("rel");
                        $(connectedSection).hide();
                    });
                    var showSection = $(this).attr("rel");
                    $(showSection).show();
                    $(this).addClass("active");
                });
            // Controls for Default, Bordered, Condensed, and Striped styles
                $(".tableStyle").click(function (e) {
                    e.preventDefault();
                    var ed = tinyMCE.get(mceInstance);
                    var myClass = $(this).attr('rel');
                    var parentTable = ed.dom.getParent(ed.selection.getNode(), 'table');
                    removeTableStyle(parentTable);
                    console.log(myClass);
                    tinyMCE.DOM.addClass(parentTable, myClass);
                });
        }
    ////// Supporting functions  //////
        // See if table already has the custom "table" class
            function checkTable(parentTable) {
                // Get the styles from the parent element
                    var currentClass = tinyMCE.DOM.getAttrib(parentTable, 'class');
                // If the parent already has the class, remove it otherwise add it
                    var regExpMatch = /\btable\b/g;
                    if (currentClass.match(regExpMatch) == null) {
                        tinyMCE.DOM.addClass(parentTable, 'table');
                    }
            }
        // Insert a table using the custom tool
            function insertTable() {
                var numCols = $("#tableNumCols").val();
                    if (numCols == "") {
                        numCols = 2;
                    }
                    var numRows = $("#tableNumRows").val();
                    if (numRows == "") {
                        numRows = 2;
                    }
                    var toInsert = '<table>';
                    if ($(".includeHeader").prop("checked")) {
                        numRows = numRows-1;
                        toInsert += '<thead><tr>';
                        for(var i=0; i<numCols; i++) {
                            toInsert += '<th></th>';
                        }
                        toInsert += '</tr></thead>';
                    }
                    toInsert += '<tbody>';
                    for(var i=0; i<numRows; i++) {
                        toInsert += '<tr>';
                        for (var j=0; j<numCols; j++) {
                        toInsert += '<td></td>';
                        }
                        toInsert += '</tr>';
                    }
                    toInsert += '</tbody></table>';
                    tinyMCE.execCommand('mceInsertContent', false, toInsert);
            }
        // clear out all custom row styles
            function removeRowStyle(parentRow) {
                tinyMCE.DOM.removeClass(parentRow, 'success');
                tinyMCE.DOM.removeClass(parentRow, 'error');
                tinyMCE.DOM.removeClass(parentRow, 'warning');
                tinyMCE.DOM.removeClass(parentRow, 'info');
            }
        // clear out all custom table styles
            function removeTableStyle(parentTable) {
                tinyMCE.DOM.removeClass(parentTable, 'table');
                tinyMCE.DOM.removeClass(parentTable, 'table-bordered');
                tinyMCE.DOM.removeClass(parentTable, 'table-condensed');
                tinyMCE.DOM.removeClass(parentTable, 'table-striped');
            }
