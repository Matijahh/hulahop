import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import { layout, Template, templates } from './templates';
import Handlebars from 'handlebars';

type TemplateType = {
  fileName: 'order-receipt' | 'announcement' | 'order-notification';
  context: any;
};

@Injectable()
export class MailerService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  /**
   * Generic method of sending emails
   *
   * @param receiver receiver email address
   * @param template email template for body
   * @param parameters parameters for email template
   */

  /**
   * Creates email with header, body and footer
   *
   * @param template email template for body
   * @param parameters parameters for email template
   */
  createEmail(template, parameters) {
    const body = this.createBody(template, parameters);
    return body.toString();
  }

  /**
   * Creates body based on template and parameters
   */
  createBody(template, parameters) {
    let body = readFileSync(template.src, 'utf8');

    for (const parameter in parameters) {
      body = body.replace('{{' + parameter + '}}', parameters[parameter]);
    }
    return body;
  }

  async renderTemplate(templateName: Template, data: any, subject?: string) {
    const template = templates[templateName];
    const html = layout(template.content(data));

    const emailSubject = template.subject(subject);

    return {
      html,
      emailSubject,
    };
  }

  generateHtml(template: TemplateType): string {
    const html = fs.readFileSync(
      `src/providers/mailer/templates/${template.fileName}.hbs`,
      {
        encoding: 'utf-8',
      },
    );

    const compliedTemplate = Handlebars.compile(html);
    return compliedTemplate(template.context);
  }

  async sendOrderReceipt(options: { html: string; from: string; to: string }) {
    await this.transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: 'HulaHop -  Order Receipt',
      html: options.html,
    });
  }

  async sendOrderNotification(options: { html: string; from: string; to: string; sku: string }) {
    await this.transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: 'HulaHop -  Order Notification - ' + options.sku,
      html: options.html,
    });
  }

  async sendAnnouncement(options: {
    html: string;
    from: string;
    to: string;
    subject: string;
  }) {
    await this.transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }

  async sendEmailBySMTP(options: {
    template: Template;
    data: any;
    from: string;
    to: string | string[];
    headers?: any;
    subject?: string;
  }) {
    if (options.template) {
      const { html, emailSubject } = await this.renderTemplate(
        options.template,
        options.data,
        options.subject,
      );

      let res;
      let status;
      try {
        res = await this.transporter.sendMail({
          from: options.from,
          to: options.to,
          subject: emailSubject,
          html,
          headers: options.headers,
        });

        status =
          res?.accepted?.length > 0
            ? 'sent'
            : res?.rejected?.length > 0
              ? 'rejected'
              : 'invalid';
      } catch (e) {
        status = 'rejected';
      }

      return { message: status };
    }
  }
}
