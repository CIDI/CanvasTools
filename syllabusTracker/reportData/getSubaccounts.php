<?php
	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	include 'syllabusAPI.php';
	$accountID = $_GET['accountID'];

	$pageNum = 1; // We will use this to bypass paginated results
	$perPage = 50; // This needs to match the ?per_page in the API url call (default is 10)



	// To handle paginated results we will loop through these commands a number of times
		// 5x50per page will cover <= 250 results
		echo '<ul>';
		// Get colleges
		for ($i=0; $i<3; $i++){
			$collegesList = listSubAccounts($accountID, $pageNum, $tokenHeader);
			$pageNum++;
			$collegeAccounts = json_decode($collegesList, true);
			$resultCount = count($collegeAccounts);
			// Variable to gather subaccount information
			for ($j=0; $j<$resultCount; $j++){
				$collegeName = $collegeAccounts[$j]['name'];
				$collegeAccountID = $collegeAccounts[$j]['id'];
				$parentAccountID = $collegeAccounts[$j]['parent_account_id'];
				$subList = "";
				// Get Departments
				$departmentPageNum = 1;
				for ($k=0; $k<5; $k++){
					$departmentList = listSubAccounts($collegeAccountID, $departmentPageNum, $tokenHeader);
					$departmentPageNum++;
					$departmentAccounts = json_decode($departmentList, true);
					$deptResultCount = count($departmentAccounts);
					if(isset($departmentAccounts[0]['name'])){
						for ($l=0; $l<$deptResultCount; $l++){
							$departmentName = $departmentAccounts[$l]['name'];
							$departmentAccountID = $departmentAccounts[$l]['id'];
							$deptParentAccountID = $departmentAccounts[$l]['parent_account_id'];
							$subList .= '<li id="account_'.$accountID.'" class="include department" rel="'.$departmentAccountID.'">
							<div class="btn-group">
								<a href="#" class="btn btn-mini addDept" title="Add Department"><i class="icon-ok"></i></a>
								<a href="#" class="btn btn-mini removeDept" title="Remove Department"><i class="icon-remove"></i></a>
							</div>
							<a href="https://usu.instructure.com/accounts/'.$departmentAccountID.'" target="_blank" title="View account in Canvas"><span class="deptName">'.$departmentName.'</span></a> (ID: '.$departmentAccountID.')
							</li>';
						}
					}
					if ($deptResultCount < $perPage){
						break;
					}
				}
				$initialState='';
				$buttons = '';
				if (strlen($subList) > 0){
					$initialState = "include";
					$buttons = '<div class="btn-group">
						<a href="#" class="btn btn-mini addCollege" title="Add College &amp; Departments"><i class="icon-ok"></i></a>
						<a href="#" class="btn btn-mini removeCollege" title="Remove College &amp; Departments"><i class="icon-remove"></i></a>
					</div> ';
					$subList = '<ol>'.$subList.'</ol>';
					$title = '<a href="https://usu.instructure.com/accounts/'.$collegeAccountID.'/sub_accounts" target="_blank" title="View subaccounts list in Canvas"><span class="collegeName">'.$collegeName.'</span></a>';
				} else {
					$initialState = "ignore";
					$buttons = '';
					$title = '<span class="collegeName">'.$collegeName.'</span>';
				}
				echo '<li id="account_'.$collegeAccountID.'" class="'.$initialState.' college" rel="'.$collegeAccountID.'">
					'.$buttons.$title.' (ID: '.$collegeAccountID.')<ol id="subaccounts_'.$accountID.'" class="subaccounts">'.$subList.'</ol>
				</li>';
			}

			// This is the second part of page control. It will exit the loop when all courses have been returned 
			if ($resultCount < $perPage){
				break;
			}
			// If the loop is to continue, this will set up for the next page of results
			echo $pageNum;
		}
		echo '</ul>';
?>