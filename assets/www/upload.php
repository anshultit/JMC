<?php

// Directory where uploaded images are saved
$dirname = "uploads"; 

// If uploading file

 echo  'test1233';
  print_r($_FILES["file"]["tmp_name"],$dirname."/".$_FILES["file"]["name"]);
  
  echo  'test';
if ($_FILES) {
    //print_r($_FILES);
	if(!is_dir($dirname) ){
		mkdir ($dirname, 0777, true); 
	}
    move_uploaded_file($_FILES["file"]["tmp_name"],$dirname."/".$_FILES["file"]["name"]);
}

// If retrieving an image
else if (isset($_GET['image'])) {
    $file = $dirname."/".$_GET['image'];

    // Specify as jpeg
    header('Content-type: image/jpeg');
  
    // Resize image for mobile
    list($width, $height) = getimagesize($file); 
    $newWidth = 120.0; 
    $size = $newWidth / $width;
    $newHeight = $height * $size; 
    $resizedImage = imagecreatetruecolor($newWidth, $newHeight); 
    $image = imagecreatefromjpeg($file); 
    imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height); 
    imagejpeg($resizedImage, null, 80); 
}
echo "File Upload successfully."

?>
