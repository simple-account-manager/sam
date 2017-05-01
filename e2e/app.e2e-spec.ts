import { AccountManagerPage } from './app.po';

describe('account-manager App', () => {
  let page: AccountManagerPage;

  beforeEach(() => {
    page = new AccountManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
