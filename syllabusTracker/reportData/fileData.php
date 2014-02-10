<?php
	// This page will loop through the courses and check their enrollments
	$term = $_GET['term'];

	ini_set('display_errors', 1);
	error_reporting(E_ALL ^ E_NOTICE);

	clearstatcache();
	$fileName = 'json/'.$_GET['term'].'.json';
	if (file_exists($fileName)) {
		echo '<span class="text-info"> Data generated: ' . date ("m/d/Y", filemtime($fileName)). '</span>';
	} else {
		echo '<span class="text-error"> Data not yet generated for this term</span>';
	}
?>