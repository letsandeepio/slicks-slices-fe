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
  ${order
    .map(
      (item) =>
        `<li><img src="${item.thumbnail}" alt="${item.name}"/> ${item.size} ${item.name} - ${item.price}</li>`
    )
    .join('')}
  </ul>
  <p>Your total is <strong>${total}</strong> due at pickup</p>
  <style>
      ul {
        list-style: none;
      }
  </style>
  </div>`;

const wait = async (ms = 0) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms));

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  const requiredFields = ['email', 'name', 'order'];
  const { order, total, name, email, mapleSyrup } = body;

  if (mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Boop beep bop zzzsstt good bye' }),
    };
  }

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

  if (body.order.length <= 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Oops! The order is empty.`,
      }),
    };
  }

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
