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
    },

    webRTCTests: client => {
        const baseUrl = 'https://v3demo.mediasoup.org/?roomId=';
        const participantName = 'part1';

        const timeout = 10*1000;
        const callDuration = 30*1000;

        const selectors = {
            participantNameField: '.display-name.editable:not(.loading)',
            ready: '.icon.connected'
        };

        client
            .url(baseUrl)
            .waitForElementVisible(selectors.ready, timeout)

            //Set participant's name for traceability
            .click(selectors.participantNameField)
            .sendKeys(selectors.participantNameField, [participantName, Keys.ENTER])

            .pause(callDuration / 2)
            .saveScreenshot('tests_screenshots/WebRTC_Call.png')
            .pause(callDuration / 2);
    },

    webRTCTests2: client => {
        const baseUrl = 'https://v3demo.mediasoup.org/?roomId=';
        const participantName = 'participant 2';

        const timeout = 10*1000;
        const callDuration = 30*1000;

        const selectors = {
            participantNameField: '.display-name.editable:not(.loading)',
            ready: '.icon.connected'
        };

        client
            .url(baseUrl)
            .waitForElementVisible(selectors.ready, timeout)

            //Set participant's name for traceability
            .click(selectors.participantNameField)
            .sendKeys(selectors.participantNameField, [participantName, Keys.ENTER])

            .pause(callDuration / 2)
            .saveScreenshot('tests_screenshots/WebRTC_Call2.png')
            .pause(callDuration / 2);
    }
}