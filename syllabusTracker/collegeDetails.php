<?php
	// This page will loop through the courses and check their enrollments


	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	include 'reportData/syllabusAPI.php';
	?>
			<?php 
				$indexNum = $_GET['indexNum'];
				echo '<div class="collegeList college-'.$indexNum.'">';
				$fileName = 'reportData/json/'.$_GET['term'].'_details_'.$indexNum.'.json';
				if (file_exists($fileName)) {
					$currentList = file_get_contents($fileName);
					$data = json_decode($currentList, true);
					$courseCount = count($data);
					$college = $data[0]['collegeName'];
					echo '<h2>'.$college.'</h2>';
					$departmentCount = count($data[0]['departments']);
					for ($j=0; $j<$departmentCount; $j++){
						$departmentName = $data[0]['departments'][$j]['deptName'];
						echo '<h3 id="deptHeading-'.$j.'" rel="'.$j.'">'.$departmentName.'</h3>';
						echo '<ol id="deptCourseList-'.$j.'">';
						$courseCount = count($data[0]['departments'][$j]['courses']);
						if($courseCount>0){
							for ($k=0; $k<$courseCount; $k++){
								$courseID = $data[0]['departments'][$j]['courses'][$k]['courseID'];
								$courseName = $data[0]['departments'][$j]['courses'][$k]['courseName'];
								$usingCanvas = $data[0]['departments'][$j]['courses'][$k]['usingCanvas'];
								$campusCode = $data[0]['departments'][$j]['courses'][$k]['campusCode']; 
								$deliveryMethod = $data[0]['departments'][$j]['courses'][$k]['deliveryMethod'];
								$hasSyllabus = $data[0]['departments'][$j]['courses'][$k]['hasSyllabus'];
								if(isset($data[0]['departments'][$j]['courses'][$k]['syllabusTool'])){
									$syllabusTool = $data[0]['departments'][$j]['courses'][$k]['syllabusTool'];
								} else {
									$syllabusTool = "";
								}

								$instructorCount = count($data[0]['departments'][$j]['courses'][$k]['instructors']);
								if($instructorCount==1){
									$instructor = $data[0]['departments'][$j]['courses'][$k]['instructors'][0]['instructorName'];
									$instructors = '<a href="#" class="instructorIcon" data-toggle="tooltip" title="'.$instructor.'"><i class="icon-user"></i></a>';
									$instructorSpanList = '<span class="instructorName hide">'.$instructor.'</span>';
								} elseif ($instructorCount>1) {
									$instructors = '';
									$instructorSpanList = '';
									for ($l=0; $l<$instructorCount; $l++){
										$instructor = $data[0]['departments'][$j]['courses'][$k]['instructors'][$l]['instructorName'];
										$instructors .= $instructor.'<br>';
										$instructorSpanList .= '<span class="instructorName hide">'.$instructor.'</span>';
									}
									$instructors = rtrim($instructors, '<br>');
									$instructors = '<a href="#" class="instructorIcon" data-toggle="tooltip" title="'.$instructors.'"><i class="icon-group"></i></a>';
								} else {
									$instructors = '<a href="#" class="instructorIcon" data-toggle="tooltip" title="No Instructors"><i class="icon-user noInstructor"></i></a>';
									$instructorSpanList = '<span class="instructorName hide">No Instructor</span>'; 
								}
								if($syllabusTool == "true"){
									$syllabusTool = ' <i class="icon-magic"></i>';
								} else {
									$syllabusTool = '';
								}
								if($usingCanvas == "true"){
									if($hasSyllabus == "true"){
										$syllabusClass = "hasSyllabus";
										$syllabusIcon = "icon-ok-sign";
									} else {
										$syllabusClass = "noSyllabus";
										$syllabusIcon = "icon-question-sign";
									}
									echo '<li class="'.$courseID.' '.$campusCode.' '.$deliveryMethod.' '.$syllabusClass.' usingCanvas">
										<i class="'.$syllabusIcon.'"></i> <a class="course" href="syllabusDetails.php?courseID='.$courseID.'" target="_blank" rel="'.$courseID.'" data-toggle="tooltip" title="View Syllabus">'.$courseName.'</a>
										<a href="https://usu.instructure.com/courses/'.$courseID.'" class="canvasLink" target="_blank" data-toggle="tooltip" title="Open course in Canvas"><i class="icon-share-alt"></i></a>
										'.$instructors.$instructorSpanList.$syllabusTool.'
										</li>';
								} else {
									echo '<li class="'.$courseID.' '.$campusCode.' '.$deliveryMethod.' notUsingCanvas"><i class="icon-remove-sign"></i> '.$courseName.' <a href="https://usu.instructure.com/courses/'.$courseID.'" class="canvasLink" target="_blank" title="Open course in Canvas"><i class="icon-share-alt"></i></a>
										'.$instructors.$instructorSpanList.'
										</li>';
								}
							}
						} else {
							echo 'No courses this term';
						}
						echo '</ol>';
					}
				} else {
					echo '<div class="alert alert-error">No data has been generated for the selected term.</div>';
				}
			?>
	</div>