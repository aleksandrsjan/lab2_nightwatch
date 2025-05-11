module.exports = {
    test: client => {   
        client
            .url('https://tdlschool.com/')
            .maximizeWindow()
            .waitForElementVisible('.main-home')
            .waitForElementVisible('button.button--border')
            .click('button.button--border')
            .waitForElementVisible('.main-home a[href="/courses"]')
            .click('.main-home a[href="/courses"]')
            .waitForElementVisible('.app__page .courses')
            .assert.urlEquals('https://tdlschool.com/courses')
            .waitForElementVisible('input[name="email"]')
            .sendKeys('input[name="email"]', "test.com")
            .click('button[type="submit"]')
            .waitForElementVisible('span.input__error')
            .saveScreenshot('tests_screenshots/invalidEmail.png')
    }
}