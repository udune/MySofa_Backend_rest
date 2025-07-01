import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { getToday } from '@/src/utils/getToday.util';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;

  onModuleInit() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_SERVICE_USER,
        pass: process.env.EMAIL_SERVICE_PASS,
      },
    });
  }

  checkEmailFormat(email: string): boolean {
    return !!email && email.includes('@');
  }

  getWelcomeTemplate(nickname: string): string {
    return `
        <html>
            <body>
                <h1>[${getToday()}] ${nickname}님 마이소파 가입을 환영합니다!</h1>
                <br/>
                <hr/>
                <br/>
                <div>${nickname} Welcome!</div>
            </body>
        </html>
    `;
  }

  async sendWelcomeEmail(email: string, nickname: string): Promise<void> {
    const html = this.getWelcomeTemplate(nickname);
    await this.transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to: email,
      subject: '[마이소파] 가입을 축하합니다!!',
      html,
    });
  }
}
