import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailersService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(mailTo: string) {
    const message = `Booking reservation succeeds! Please check the detail via application.`;

    this.mailService.sendMail({
      from: process.env.EMAIL_SENDER,
      to: mailTo,
      subject: `Booking reservation status`,
      text: message,
    });
  }
}
