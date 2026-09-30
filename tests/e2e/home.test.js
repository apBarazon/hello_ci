const { Builder, By } = require('selenium-webdriver');

describe('Home Page E2E Test', () => {
  let driver;

  beforeAll(async () => {
    // Connects to the Selenium container using environment variables specified in your lab
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
    // Navigate to your running Express app
    // (Use host.docker.internal to reach the host machine from inside a container, or localhost)
    await driver.get('http://host.docker.internal:3000');

    // Find the <h1> element on the page
    const headerElement = await driver.findElement(By.tagName('h1'));
    const headerText = await headerElement.getText();

    // The Assertion: Checks if the header text matches your app's greeting
    expect(headerText).toBe('Welcome to CI/CD');
  });
});