// var verifyCallback = function (response) {
//     //alert(response);
// };
// function onCaptchaChangeRegister(token) {
//     captcha_response = token;
//     document.querySelector('#captcha-register').nextElementSibling.classList.add('d-none');
// }

// var widgetId2;
// var onloadCallback = function () {
//     widgetId2 = grecaptcha.render('captcha-register', {
//         'sitekey': "6LeHQlUoAAAAAFnKD2_iHFOZiS1niPHk4ze1aHIU" || process.env.CAPTCHA_SITE_KEY,
//         'theme': 'dark',
//         'callback' : onCaptchaChangeRegister,
//     });
// };

// var onloadCallback = function() {
//     grecaptcha.render('#captcha-register', {
//       'sitekey' : '6LeHQlUoAAAAAFnKD2_iHFOZiS1niPHk4ze1aHIU'
//     });
// };