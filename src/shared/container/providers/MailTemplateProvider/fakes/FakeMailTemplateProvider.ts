import MailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/MailTemplateProvider';

class FakeMailTemplateProvider implements MailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail template';
  }
}

export default FakeMailTemplateProvider;
