<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$subject = $_POST['subject'];

$email_from = 'info@Eduford.com';
$email_subject = "New Form Submission";
$email_body = "Name: $name.\n".
              "Email: $visitor_email.\n".
              "Message: $message.\n".
              "Subject: $subject.\n";

$email_to = "$aryanmishra1851@gmail.com";

$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";

mail($email_to, $email_subject, $email_body, $headers);
header("Location: Contact.html");

?>