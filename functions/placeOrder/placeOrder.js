const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const generateOrderEmail = ({ order, total }) =>
  `<div>
  <h2>You recent order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in next 20 mins.</p>
  <ul>
  ${order.map(
    (item) =>
      `<li><img src="${item.thumbnail}" alt="${item.name}"/> ${item.size} ${item.name} - ${item.price}</li>`
  )}
  </ul>
  </div>`;

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field.`,
        }),
      };
    }
  }

  const { order, total, name, email } = body;

  const html = generateOrderEmail({ order, total });

  console.log(html);

  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${name} <${email}>`,
    subject: 'New Order!',
    html,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success!' }),
  };
};
