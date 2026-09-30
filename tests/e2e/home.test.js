const { Builder, By } = require('selenium-webdriver');

describe('Home Page E2E Test', () => {
  let driver;

  beforeAll(async () => {
    const seleniumUrl = process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub';
    driver = await new Builder()
      .forBrowser('chrome')
      .usingServer(seleniumUrl)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should display the correct header text', async () => {
    // Target the Jenkins container directly inside the Docker network
    await driver.get('http://jenkins:3000');

    const headerElement = await driver.findElement(By.tagName('h1'));
    const headerText = await headerElement.getText();

    expect(headerText).toBe('Welcome to CI/CD');
  });
});