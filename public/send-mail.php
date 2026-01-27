<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$form = $data["formData"] ?? [];

$to = "polina1510golubeva@gmail.com";
$from = "info@gloreal.ee";

$subject = "Новая заявка с сайта";

$html = "<h2>Новая заявка</h2><table cellspacing='0' cellpadding='6' border='1'>";

foreach ($form as $key => $value) {
    if (is_array($value)) {
        $value = implode(", ", $value);
    }
    $html .= "<tr><td><strong>$key</strong></td><td>$value</td></tr>";
}

$html .= "</table>";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/html;charset=UTF-8\r\n";
$headers .= "From: GLO Real Estate <{$from}>\r\n";
$headers .= "Reply-To: {$from}\r\n";
$headers .= "Return-Path: {$from}\r\n";

// отправка админу
$adminSent = mail($to, $subject, $html, $headers, "-f{$from}");

// автоответ клиенту
$clientSent = false;
if (!empty($form["email"])) {
    $clientMessage = "
        <p>Здравствуйте, {$form['name']}!</p>
        <p>Спасибо за ваш запрос. Мы свяжемся с вами в ближайшее время.</p>
    ";

    $clientSent = mail(
        $form["email"],
        "Спасибо за ваш запрос",
        $clientMessage,
        $headers,
        "-f{$from}"
    );
}

echo json_encode([
    "success" => true,
    "adminSent" => $adminSent,
    "clientSent" => $clientSent
]);
