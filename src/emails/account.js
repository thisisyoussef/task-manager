const sgMail = require("@sendgrid/mail");
const { default: isEmail } = require("validator/lib/isEmail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fromEmail = "youssefiahmedis@gmail.com";

//Welcome email
const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: fromEmail,
    subject: "Thanks for joining Task Manager!",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

//Cancelation email
const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: fromEmail,
    subject: "Sorry to see you go!",
    text: `Goodbye, ${name}. Is there anything we could've done to keep you on board?`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
