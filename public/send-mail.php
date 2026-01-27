<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$form = $data["formData"] ?? [];

$to = "polina1510golubeva@gmail.com";
$from = "info@gloreal.ee";

$subject = "Новая заявка с сайта";

// plain text версия
$plain = "Новая заявка с сайта\n\n";
foreach ($form as $key => $value) {
    if (is_array($value)) {
        $value = implode(", ", $value);
    }
    $plain .= "$key: $value\n";
}

// HTML версия
$html = "<h2>Новая заявка</h2><table cellspacing='0' cellpadding='6' border='1'>";
foreach ($form as $key => $value) {
    if (is_array($value)) {
        $value = implode(", ", $value);
    }
    $html .= "<tr><td><strong>$key</strong></td><td>$value</td></tr>";
}
$html .= "</table>";

// граница для multipart
$boundary = md5(time());

// заголовки
$headers = "From: GLO Real Estate <{$from}>\r\n";
$headers .= "Reply-To: {$from}\r\n";
$headers .= "Return-Path: {$from}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Message-ID: <" . uniqid() . "@gloreal.ee>\r\n";
$headers .= "Date: " . date('r') . "\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"{$boundary}\"\r\n";

// тело письма
$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
$body .= $plain . "\r\n";

$body .= "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
$body .= $html . "\r\n";

$body .= "--{$boundary}--";

// отправка админу
$adminSent = mail($to, $subject, $body, $headers, "-f{$from}");

// автоответ клиенту
$clientSent = false;
if (!empty($form["email"])) {
    $clientSubject = "Спасибо за ваш запрос";
    $clientPlain = "Здравствуйте, {$form['name']}!\nСпасибо за ваш запрос. Мы свяжемся с вами в ближайшее время.";
    $clientHtml = "<p>Здравствуйте, {$form['name']}!</p><p>Спасибо за ваш запрос. Мы свяжемся с вами в ближайшее время.</p>";

    $clientBody = "--{$boundary}\r\n";
    $clientBody .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $clientBody .= $clientPlain . "\r\n";

    $clientBody .= "--{$boundary}\r\n";
    $clientBody .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $clientBody .= $clientHtml . "\r\n";

    $clientBody .= "--{$boundary}--";

    $clientSent = mail($form["email"], $clientSubject, $clientBody, $headers, "-f{$from}");
}

echo json_encode([
    "success" => true,
    "adminSent" => $adminSent,
    "clientSent" => $clientSent
]);
