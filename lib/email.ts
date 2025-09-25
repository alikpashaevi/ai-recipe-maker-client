export interface EmailRequest {
  email: string;
  subject: string;             
  body: string; 
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export class EmailService {
static async sendEmail(request: EmailRequest): Promise<void> {
  const params = new URLSearchParams({             
    email: request.email,                          
    subject: request.subject,
    body: request.body,      
  });         
              
  const response = await fetch(`${API_BASE_URL}/email?${params.toString()}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Email sending failed");
  }
}}
