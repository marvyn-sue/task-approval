"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY); // Use your Resend API Key

export async function sendApprovalEmail(
  email: string,
  taskTitle: string,
  token: string
) {
  const approvalLink = `${process.env.FRONTEND_URL}/respond?token=${token}`;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev", // Use your email
      to: email,
      subject: `Task Approval Request`,
      html: `<p>You have a new task:  <strong>${taskTitle}</strong></p>
           <p>Please review and respond using the link below:</p>
           <a href="${approvalLink}">"${approvalLink}"</a>`,
    });
  } catch (error) {}
}
