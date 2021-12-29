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

module.exports = async (req, res) => {
  const { body } = req;

  const requiredFields = ['email', 'name', 'order'];
  const { order, total, name, email, mapleSyrup } = body;

  if (mapleSyrup) {
    return res.status(400).json({ message: 'Boop beep bop zzzsstt good bye' });
  }

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return res
        .status(400)
        .json({ message: `Oops! You are missing the ${field} field.` });
    }
  }

  if (body.order.length <= 0) {
    return res.status(400).json({ message: `Oops! The order is empty.` });
  }

  const html = generateOrderEmail({ order, total });

  await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${name} <${email}>`,
    subject: 'New Order!',
    html,
  });

  return res.status(400).json({ message: 'Success!' });
};
