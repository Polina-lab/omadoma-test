<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$texts = [
  'en' => [
    'subject_user' => 'We received your request',
    'greeting' => 'Hello',
    'thanks' => 'Thank you for contacting Gloreal.',
    'approvement' => 'We have received your request. We will respond within 24 hours.',
    'auto' => 'This is an automatic email. Please do not reply directly.',
    'contact' => 'If you need to reach us, please email info@gloreal.ee',
    'regards' => 'Best regards,',
    'team' => 'GloReal Team'
  ],
  'ru' => [
    'subject_user' => 'Мы получили вашу заявку',
    'greeting' => 'Здравствуйте',
    'thanks' => 'Спасибо за обращение в Gloreal.',
    'approvement' => 'Мы получили Ваш запрос. Обязательно ответим в течение 24 часов.',
    'auto' => 'Это автоматическое письмо. Пожалуйста, не отвечайте на него напрямую.',
    'contact' => 'Если вам нужно связаться с нами, напишите на info@gloreal.ee',
    'regards' => 'С уважением,',
    'team' => 'Команда GloReal'
  ],
  'et' => [
    'subject_user' => 'Saime teie päringu',
    'greeting' => 'Tere',
    'thanks' => 'Täname, et võtsite ühendust Glorealiga.',
    'approvement' => 'Saime Sinu pakkumise kätte. Vastame kindlasti 24h jooksul.',
    'auto' => 'See on automaatne kiri. Palun ärge vastake sellele otse.',
    'contact' => 'Kui soovite meiega ühendust võtta, kirjutage aadressile info@gloreal.ee',
    'regards' => 'Lugupidamisega,',
    'team' => 'GloReal meeskond'
  ]
];

// === 1. Получаем JSON ===
$data = json_decode(file_get_contents("php://input"), true);

// вместо $_POST
$recaptchaToken = $data['recaptchaToken'] ?? '';

$secretKey = "6LfPDXIsAAAAAH_dAVTe6ECUkJ_RGfjluiGQXxb_";
$verify = file_get_contents(
    "https://www.google.com/recaptcha/api/siteverify?secret="
    . $secretKey
    . "&response=" . $recaptchaToken
);

$responseData = json_decode($verify);
if (!$responseData->success) {
    echo json_encode(["success" => false, "error" => "reCAPTCHA failed"]);
    exit;
}

// === 3. Получаем и валидируем поля ===
$lang = in_array($data['lang'] ?? '', ['en','ru','et']) 
    ? $data['lang'] 
    : 'en';
$name = trim($data["name"] ?? '');
$email = trim($data["email"] ?? '');
$message = trim($data["message"] ?? '');

$t = $texts[$lang];

if (!$name || !$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "error" => "Invalid name or email"]);
    exit;
}

// Защита от header injection
function sanitizeHeader($str) {
    return str_replace(["\r", "\n"], '', $str);
}
$infoEmail = "info@gloreal.ee";
$from = "noreply@gloreal.ee";
$replyTo = sanitizeHeader($email);

// === 3. Формируем тело письма динамически ===
$body_you = "Uus päring kohulehelt:\n\n";
foreach ($data as $key => $value) {
    if ($key === 'recaptchaToken') continue;
    if (is_array($value)) $value = implode(", ", $value);
    $body_you .= ucfirst($key) . ": " . $value . "\n";
}

$subject_you = "Uus päring kohulehelt";
$headers_admin  = "From: Gloreal <info@gloreal.ee>\r\n";
$headers_admin .= "Reply-To: $replyTo\r\n";
$headers_admin .= "Content-Type: text/plain; charset=UTF-8\r\n";

$headers = "From: $from\r\nReply-To: $replyTo\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Отправляем себе
mail($infoEmail, $subject_you, $body_you, $headers_admin);

if ($email) {

$year = date("Y");
$subject_user = $t['subject_user'];

$body_user = <<<HTML
<html>
<body style="margin:0; padding:0; background:#f4f4f4; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; padding:40px; border-radius:8px;">

          <tr>
            <td align="center" style="padding-bottom:30px;">
              <img src="https://gloreal.ee/logo.png" width="160" alt="Gloreal">
            </td>
          </tr>

          <tr>
            <td style="color:#333333; font-size:16px; line-height:1.6;">
              <h2 style="margin:0 0 20px 0;">
                {$t['greeting']} {$name},
              </h2>

              <p>{$t['thanks']}</p>

              <p><strong>{$t['approvement']}</strong></p>

              <p style="margin-top:30px; font-size:14px; color:#777;">
                {$t['auto']}<br>
                {$t['contact']}
              </p>

              <p style="margin-top:40px;">
                {$t['regards']}<br>
                {$t['team']}
              </p>

              <hr style="margin:40px 0; border:none; border-top:1px solid #eee;">

              <p style="font-size:12px; color:#aaa;">
                © {$year} Gloreal | www.gloreal.ee
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

$headers_user  = "MIME-Version: 1.0\r\n";
$headers_user .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers_user .= "From: Gloreal <info@gloreal.ee>\r\n";
$headers_user .= "Reply-To: info@gloreal.ee\r\n";
mail($email, $subject_user, $body_user, $headers_user);
}

// === 5. Ответ фронтенду ===
echo json_encode(["success" => true]);
?>