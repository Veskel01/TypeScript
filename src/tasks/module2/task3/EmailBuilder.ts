import is from 'is_js';
import Email, { IEmail } from './Email';

const errorHandler = (error: string) => {
  throw new Error(error);
};

const throwErrorOnInvalidEmail = (email: string): boolean => {
  if (is.empty(email)) {
    errorHandler('Invalid email address');
  }
  return true;
};

const throwErrorOnInvalidTitle = (title: string): boolean => {
  if (is.empty(title)) {
    errorHandler('Tittle cannot be empty');
  }
  return true;
};

const throwErrorOnInvalidHTML = (html: string): boolean => {
  if (is.empty(html)) {
    errorHandler('Invalid HTML code');
  }
  return true;
};

interface IEmailBuilder {
  _email: IEmail;
  from: string;
  to: string;
  cc?: string[];
  bcc?: string[];
  title: string;
  HTML: string;
  setSendEmailFrom: (from: string) => this;
  setSendEmailTo: (to: string) => this;
  setEmailCC: (carbonCopy: string) => this;
  setEmailBCC: (blindCarbonCopy: string) => this;
  setEmailTitle: (title: string) => this;
  setHTML: (HTML: string) => this;
  build: () => IEmail;
}

class EmailBuilder implements IEmailBuilder {
  _email!: IEmail;
  from!: string;
  to!: string;
  cc?: string[];
  bcc?: string[];
  title!: string;
  HTML!: string;
  constructor() {
    this.from;
    this.to;
    this.cc;
    this.bcc;
    this.title;
    this.HTML;
  }

  setSendEmailFrom(from: string): this {
    throwErrorOnInvalidEmail(from);
    this.from = from;
    return this;
  }

  setSendEmailTo(to: string): this {
    throwErrorOnInvalidEmail(to);
    this.to = to;
    return this;
  }

  setEmailCC(carbonCopy: string): this {
    throwErrorOnInvalidEmail(carbonCopy);
    this.cc = [];
    if (!this.cc.includes(carbonCopy)) {
      this.cc.push(carbonCopy);
    }
    return this;
  }

  setEmailBCC(blindCarbonCopy: string): this {
    throwErrorOnInvalidEmail(blindCarbonCopy);
    this.bcc = [];
    if (!this.bcc.includes(blindCarbonCopy)) {
      this.bcc.push(blindCarbonCopy);
    }
    return this;
  }

  setEmailTitle(title: string): this {
    throwErrorOnInvalidTitle(title);
    this.title = title;
    return this;
  }

  setHTML(HTML: string): this {
    throwErrorOnInvalidHTML(HTML);
    this.HTML = HTML;
    return this;
  }

  build(): IEmail {
    const email: IEmail = new Email(this.from, this.to, this.title, this.HTML, this.cc, this.bcc);
    return email;
  }
}

export default EmailBuilder;
