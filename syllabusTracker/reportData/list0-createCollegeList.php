<?php
	// The following creates a JSON file of colleges and departments based on the selections from running "createAccountList.php"

	$fileContents = $_POST['jsonData'];
	echo $fileContents;
	// create json file pointer 
	$fp = @fopen('json/collegeList.json', 'w') or die('Could not open file, or file does not exist and failed to create.'); 

	// write text to file 
	@fwrite($fp, $fileContents) or die('Could not write to file.'); 

	// close file 
	@fclose($fp);
?>