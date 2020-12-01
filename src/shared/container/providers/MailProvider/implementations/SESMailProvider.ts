import { injectable, inject } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';

import mailConfig from '@config/mail';

import MailProvider from '@shared/container/providers/MailProvider/models/MailProvider';
import MailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/MailTemplateProvider';
import SendMailDTO from '@shared/container/providers/MailProvider/dtos/SendMailDTO';

@injectable()
export default class SESMailProvider implements MailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: MailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'sa-east-1',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: SendMailDTO): Promise<void> {
    const { name: fromName, email: fromEmail } = mailConfig.defaults.from;
    await this.client.sendMail({
      from: {
        name: from?.name || fromName,
        address: from?.email || fromEmail,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
