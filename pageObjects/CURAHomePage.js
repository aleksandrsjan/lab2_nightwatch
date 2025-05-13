const pageCommands = {
    browsePage: function() {
        this.navigate()
            .maximizeWindow()
            .waitForElementVisible('@mainContainer');
    },

    clickMakeAppointment: function () {
        this.waitForElementVisible('@btnMakeAppointment')
            .click('@btnMakeAppointment')
    },

    login: function (login, password) {
        this.waitForElementVisible('@loginForm')
            .sendKeys('@loginField', login)
            .sendKeys('@passwordField', password)
            .click('@btnLogin')
    },

    fillAppointmentForm: function(facility, apply, program, date, comment) {
        this.waitForElementVisible('@appointmentSection'    )
            .setValue('@facilityField', facility)

            if(apply === 'Yes') {
                this.click('@applyForHospitalReadmission')
            }

            switch(program) {
                case 'Medicare':
                    this.click('@programMedicare');
                    break;
                case 'Medicaid':
                    this.click('@programMedicaid');
                    break;
                case 'None':
                    this.click('@programNone');
                    break;
            }

            this.setValue('@dateField', date)
                .setValue('@commentField', comment)
                .click('@btnBookAppointment')

    },

    checkAppointment: function(expectedFacility, expectedApply, expectedProgram, expectedDate, expectedComment) {
        this.waitForElementVisible('@appointamentConfirmation')
            .getText('@facilityValue', result => {
                console.log(result.value);
                this.assert.strictEqual(result.value, expectedFacility)
            })
            .getText('@applyValue', result => {
                console.log(result.value);
                this.assert.strictEqual(result.value, expectedApply)
            })
            .getText('@programValue', result => {
                console.log(result.value);
                this.assert.strictEqual(result.value, expectedProgram)
            })
            .getText('@dateValue', result => {
                console.log(result.value);
                this.assert.strictEqual(result.value, expectedDate)
            })
            .getText('@commentValue', result => {
                console.log(result.value);
                this.assert.strictEqual(result.value, expectedComment)
            })
            

    },

    logout: function () {
        this.waitForElementVisible('@btnMenu')
            .click('@btnMenu')
            .waitForElementVisible('@btnLogout')
            .click('@btnLogout')
    },

    checkAppointmentIsNotVisible: function() {
        this.expect.element('@facilityValue').to.not.be.present;
        this.expect.element('@applyValue').to.not.be.present;
        this.expect.element('@programValue').to.not.be.present;
        this.expect.element('@dateValue').to.not.be.present;
        this.expect.element('@commentValue').to.not.be.present;  
    }
};

module.exports = {
    url: 'https://katalon-demo-cura.herokuapp.com/',
    commands: [pageCommands],
    elements: {
        mainContainer: '.text-vertical-center',
        btnMakeAppointment: '#btn-make-appointment',
        loginForm: 'form.form-horizontal',
        loginField: '#txt-username',
        passwordField: '#txt-password',
        btnLogin: '#btn-login',
        appointmentSection: 'section#appointment',
        facilityField: '#combo_facility',
        applyForHospitalReadmission: '#chk_hospotal_readmission',
        programMedicare: '#radio_program_medicare',
        programMedicaid: '#radio_program_medicaid',
        programNone: '#radio_program_none',
        dateField: '#txt_visit_date.form-control',
        commentField: '#txt_comment',
        btnBookAppointment: '#btn-book-appointment',
        appointamentConfirmation: '#summary',
        facilityValue: '#facility',
        applyValue: '#hospital_readmission',
        programValue: '#program',
        dateValue: '#visit_date',
        commentValue: '#comment',
        btnMenu: '#menu-toggle',
        btnLogout: '[href="authenticate.php?logout"]'
    }
};