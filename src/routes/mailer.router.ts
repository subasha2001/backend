import { Order } from "../models/order.model";
import asyncHandler from "express-async-handler";
import { User } from "../models/user.model";
import { Router } from "express";
const router = Router();
const path = require("path");

const nodemailer = require("nodemailer");

export const sendPaymentConfirmationEmailForUser = async (
  userEmail: string,
  orderDetails: Order
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  
  const attachments = orderDetails.items.map((product, index) => ({
    filename: `${product.product.name}.jpg`,
    path: `./uploads/${product.product.imageDis}`,
  }));

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Payment Confirmation - Order # " + orderDetails.id,
    text:
      `Dear ${orderDetails.name},\n\n` +
      `We are pleased to inform you that your payment for Order #${orderDetails.id} has been successfully confirmed.\n\n` +
      `Here are the details of your order:\n` +
      `Order ID: ${orderDetails.id}\n` +
      `Items: ${orderDetails.items
        .map((item) => `${item.product.name} (Qty: ${item.quantity})`)
        .join(", ")}\n` +
      `Total Price: ₹${orderDetails.totalPrice}\n\n` +
      `Thank you for shopping with us.\n\nBest Regards,\nGold Palace Jewellery Team`,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendPaymentConfirmationEmailForAdmin = async (
  user: User,
  orderDetails: Order
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const attachments = orderDetails.items.map((product, index) => ({
    filename: `${product.product.name}.jpg`,
    path: `./uploads/${product.product.imageDis}`,
  }));

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "subashayyanar1@gmail.com",
    subject: "Payment Confirmation - Order # " + orderDetails.id,
    "From ": user.name,
    text:
      `${orderDetails.name} placed an order,\n\n` +
      `And payment for Order #${orderDetails.id} has been successfully confirmed and Verified.\n\n` +
      `Here are the details of the order:\n` +
      `Order ID: ${orderDetails.id}\n` +
      `productId: ${orderDetails.items.map((item) => `${item.product.id}`)}\n` +
      `Items: ${orderDetails.items
        .map((item) => `${item.product.name} (Qty: ${item.quantity})`)
        .join(", ")}\n` +
      `Total Price: ₹${orderDetails.totalPrice}\n\n`,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

router.post(
  "/send-email",
  asyncHandler(async (req, res) => {
    const { name, email, number, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nNumber: ${number}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json("Email sent successfully");
    } catch (error) {
      res.status(500).json("Failed to send email");
    }
  })
);
export default router;
