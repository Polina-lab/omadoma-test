<?php
header("Content-Type: application/json");
error_reporting(0);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';
require __DIR__ . '/phpmailer/Exception.php';

$data = json_decode(file_get_contents("php://input"), true);
$form = $data["formData"] ?? [];

$mail = new PHPMailer(true);

try {
    // SMTP настройки
    $mail->isSMTP();
    $mail->Host = 'smtp.elkdata.ee';
    $mail->SMTPAuth = true;
    $mail->Username = 'info@gloreal.ee';
    $mail->Password = 'SuperGR1GD';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;

    // От кого
    $mail->setFrom('info@gloreal.ee', 'GLO Real Estate');

    // Кому
    $mail->addAddress('info@gloreal.ee');

    // Тема
    $mail->Subject = "Новая заявка с сайта";

    // HTML письмо
    $html = "<h2>Новая заявка</h2><table cellspacing='0' cellpadding='6' border='1'>";
    foreach ($form as $key => $value) {
        if (is_array($value)) $value = implode(", ", $value);
        $html .= "<tr><td><strong>$key</strong></td><td>$value</td></tr>";
    }
    $html .= "</table>";

    $mail->isHTML(true);
    $mail->Body = $html;

    $adminSent = $mail->send();

    // Автоответ клиенту
    $clientSent = false;
    if (!empty($form["email"])) {
        $mail2 = new PHPMailer(true);
        $mail2->isSMTP();
        $mail2->Host = 'smtp.elkdata.ee';
        $mail2->SMTPAuth = true;
        $mail2->Username = 'info@gloreal.ee';
        $mail2->Password = 'SuperGR1GD';
        $mail2->SMTPSecure = 'ssl';
        $mail2->Port = 465;

        $mail2->setFrom('info@gloreal.ee', 'GLO Real Estate');
        $mail2->addAddress($form["email"]);
        $mail2->Subject = "Спасибо за ваш запрос";
        $mail2->isHTML(true);
        $mail2->Body = "<p>Здравствуйте, {$form['name']}!</p><p>Спасибо за ваш запрос. Мы свяжемся с вами в ближайшее время.</p>";

        $clientSent = $mail2->send();
    }

    echo json_encode([
        "success" => true,
        "adminSent" => $adminSent,
        "clientSent" => $clientSent
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
