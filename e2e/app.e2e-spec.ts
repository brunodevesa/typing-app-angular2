import { TypingAppPage } from './app.po';

describe('typing-app App', () => {
  let page: TypingAppPage;

  beforeEach(() => {
    page = new TypingAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
