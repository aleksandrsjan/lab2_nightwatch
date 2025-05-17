const { assert } = require("nightwatch");

module.exports = {
    before: () => {
        console.log('------------------------------------------------------------------------------------------');
    },

    beforeEach: (client) => {
        console.log('------------------------------------------------------------------------------------------');
    },

    tdlschoolInvalidEmail: client => {
        const data = {
            tdlURL: 'https://tdlschool.com',
            coursesURL: 'https://tdlschool.com/courses',
            invalidEmailValue: 'test.com',
            invalidEmailAddressText: 'Please provide a valid email address',
            invalidEmailScreen: 'tests_screenshots/ivalidEmail.png'     
        }   

        const selectors = {
            mainContainer: '.main-home',
            acceptCoockiesBtn: 'button.button--border',
            ourCoursesBtn: '.main-home a[href="/courses"]',
            coursesMainContainer: '.app__page .courses',
            footerEmailSubscribe: 'input[name="email"]',
            subscribeBtn: 'button[type="submit"]',
            invalidEmailAddress: 'span.input__error'

        }

        const setupPage = () =>  {
            client
                .url(data.tdlURL)
                .maximizeWindow()
                .waitForElementVisible(selectors.mainContainer)
                .waitForElementVisible(selectors.acceptCoockiesBtn)
                .click(selectors.acceptCoockiesBtn)
        }

        const ourCourses = () => {
            client 
                .waitForElementVisible(selectors.ourCoursesBtn)
                .click(selectors.ourCoursesBtn)
                .waitForElementVisible(selectors.coursesMainContainer)
                .assert.urlEquals(data.coursesURL)
        }

        const invalidEmailSubscribeFlow = () => {
            client 
                .waitForElementVisible(selectors.footerEmailSubscribe)
                .sendKeys(selectors.footerEmailSubscribe, data.invalidEmailValue)
                .click(selectors.subscribeBtn)
                .waitForElementVisible(selectors.invalidEmailAddress)
                .getText(selectors.invalidEmailAddress, function(text) {
                    client.assert.contains(text.value, data.invalidEmailAddressText);
                })
            client
                .saveScreenshot(data.invalidEmailScreen);
        }

        setupPage();
        ourCourses();
        invalidEmailSubscribeFlow();
    },

    tdlSchoolCarousel: client => {
        const data = {
            tdlURL: 'https://tdlschool.com',
            feedback: ''
        }

        const selectors = {
            mainContainer: '.main-home',
            acceptCoockiesBtn: 'button.button--border',
            carouselField: '.Carousel_container__oL_eh',
            activeTestimonials: '.slick-active.slick-current p',
            nextCarouselBtn: '.slick-arrow.slick-next',
            headerLogo: 'header a[href="/"]'
        }

        const openPage = () => {
            client
                .url(data.tdlURL)
                .maximizeWindow()
                .waitForElementVisible(selectors.mainContainer)
                //jau akceptēti no iepriekšējā testa
                // .waitForElementVisible(selectors.acceptCoockiesBtn)
                // .click(selectors.acceptCoockiesBtn)
        }

        const switchCards = async () => {
            const activeTextValue = await client.element(selectors.activeTestimonials).getText();

            if (data.feedback === activeTextValue) {
                throw new Error("feedback is the same as value");
            }

            data.feedback = activeTextValue;

            await client.click(selectors.nextCarouselBtn).pause(3000);
        }

        const carouselFlow = async () => {
            await client
                .waitForElementVisible(selectors.headerLogo)
                .click(selectors.headerLogo)
                .waitForElementVisible(selectors.mainContainer)
                .waitForElementVisible(selectors.activeTestimonials);

            for (let i = 0; i < 3; i++) {
                await switchCards();
            }
        }

        openPage();
        carouselFlow();
    },

    github: client => {
        const data = {
            githubURL: 'https://github.com',
            testEmail: '1234@gmail.com',
            testPassword: '12345',
            alertMessage:  'Incorrect username or password.'
        }

        const selectors = {
            mainContainer: 'main.font-mktg',
            headerSignInBtn: '.HeaderMenu-link--sign-in',
            loginForm: '#login',
            loginField: '#login_field',
            passwordField: '#password',
            signInBtn: '.js-sign-in-button',
            alertMessageField: '.js-flash-alert'
        }
        
        const openGitHub = () => {
            client
                .url(data.githubURL)
                .maximizeWindow()
                .waitForElementVisible(selectors.mainContainer)
        }

        const openLoginPageGitHub = () => {
            client  
                .waitForElementVisible(selectors.headerSignInBtn)
                .click(selectors.headerSignInBtn)
                .waitForElementVisible(selectors.loginForm)
        }

        const incorrectLogin = () => {
            client
                .waitForElementVisible(selectors.loginField)
                .sendKeys(selectors.loginField, data.testEmail)
                .waitForElementVisible(selectors.passwordField)
                .sendKeys(selectors.passwordField, data.testPassword)
                .click(selectors.signInBtn)

                .waitForElementVisible(selectors.alertMessageField)
                .getText(selectors.alertMessageField, function(message) {
                    // Nezināma iemesla dēļ dažreiz rindas beigās parādās atstarpe,
                    // tāpēc tiek izmantots trimEnd(), lai to noņemtu.
                    const value = message.value.trimEnd();
                    this.assert.strictEqual(value, data.alertMessage);
                })
        }
        
        openGitHub();
        openLoginPageGitHub();
        incorrectLogin();
    },

    yahooInvalidEmail: client => {
        const data = {
            yahooURL: 'https://yahoo.com/',
            invalidEmail: 'notEmail.com',
            expectedInvalidEmailText:"Sorry, we don't recognize this email."
        }

        const selectors = {
            headerContainer: '#Header',
            acceptCoockiesBtn: 'button[value="agree"]',
            loginContainerBtn: '#login-container',
            loginContainer: '.login-box',
            loginEmailField: '#login-username',
            loginBtn: '#login-signin',
            emailErrorField: '#username-error'
        }

        const openPage = () => {
            client  
                .url(data.yahooURL)
                .maximizeWindow()
                .waitForElementVisible(selectors.acceptCoockiesBtn)
                .click(selectors.acceptCoockiesBtn)
                .waitForElementVisible(selectors.headerContainer)
        }

        const invalidEmailFlow = () => {
            client
                .waitForElementVisible(selectors.loginContainerBtn)
                .click(selectors.loginContainerBtn)
                .waitForElementVisible(selectors.loginContainer)
                .waitForElementVisible(selectors.loginEmailField)
                .sendKeys(selectors.loginEmailField, data.invalidEmail)
                .sendKeys(selectors.loginBtn, Keys.ENTER)
                .waitForElementVisible(selectors.emailErrorField)
                .getText(selectors.emailErrorField, function(invalidEmailText) {
                    assert.strictEqual(invalidEmailText.value, data.expectedInvalidEmailText)
                })
        }
        
        openPage();
        invalidEmailFlow();
    },

    yahooInvalidSignUp: client => {
        const data = {
            yahooURL: 'https://yahoo.com/',
            firstName: 'Aleksandrs',
            emailName: 'aleksandrs12345test',
            password: 'Test-12345',
            month: 'January',
            day: '28',
            year: '2003',
            expectedError: 'Enter your last name.'
        }

        const selectors = {
            headerContainer: '#Header',
            acceptCoockiesBtn: 'button[value="agree"]',
            loginContainerBtn: '#login-container',
            createAccountBtn: '#createacc',
            createAccountForm: '#account-attributes-challenge',
            firstNameField: '#usernamereg-firstName',
            emailField: '#usernamereg-userId',
            passwordField: '#usernamereg-password',
            dateMonthField: '#usernamereg-month',
            dateDayField: '#usernamereg-day',
            dateYearField: '#usernamereg-year',
            checkTermsBtn: '.agree-checkbox-text',
            submitBtn: '#reg-submit-button',
            errorLastNameField: '#reg-error-lastName'
        }

        const openPage = () => {
            client  
                .url(data.yahooURL)
                .maximizeWindow()
                //jau akceptēti no iepriekšējā testa
                // .waitForElementVisible(selectors.acceptCoockiesBtn)
                // .click(selectors.acceptCoockiesBtn)
                .waitForElementVisible(selectors.headerContainer)
        } 
        
        const invalidSignupFlow = () => {
            client
                .waitForElementVisible(selectors.loginContainerBtn)
                .click(selectors.loginContainerBtn)
                .waitForElementVisible(selectors.createAccountBtn)
                .click(selectors.createAccountBtn)
                .waitForElementVisible(selectors.createAccountForm)
                .waitForElementVisible(selectors.firstNameField)
                .sendKeys(selectors.firstNameField, data.firstName)
                .waitForElementVisible(selectors.emailField)
                .sendKeys(selectors.emailField, data.emailName)
                .waitForElementVisible(selectors.passwordField)
                .sendKeys(selectors.passwordField, data.password)
                .setValue(selectors.dateMonthField, data.month)
                .sendKeys(selectors.dateDayField, data.day)
                .sendKeys(selectors.dateYearField, data.year)
                .click(selectors.checkTermsBtn)
                .waitForElementVisible(selectors.submitBtn)
                .click(selectors.submitBtn).pause(3000)
            client
                .waitForElementVisible(selectors.errorLastNameField)
                .getText(selectors.errorLastNameField, function(ErrorText) {
                    assert.strictEqual(ErrorText.value, data.expectedError);
                })
        }

        openPage();
        invalidSignupFlow();
    }

}