module.exports = {
    "1. scenarijs":function (client) {
        let homePage = client.page.CURAHomePage();

        const data = {
            demoLogin: 'John Doe',
            demoPassword:'ThisIsNotAPassword',
            facility: 'Seoul CURA Healthcare Center',
            apply: 'Yes',
            program: 'Medicaid',
            date: '02/06/2025',
            comment: 'This is a test appointment'
        }
        
        homePage.browsePage();
        homePage.clickMakeAppointment();
        homePage.login(
            data.demoLogin, 
            data.demoPassword);
        homePage.fillAppointmentForm(
            data.facility,
            data.apply, 
            data.program, 
            data.date, 
            data.comment)
        homePage.checkAppointment(
            data.facility,
            data.apply, 
            data.program, 
            data.date, 
            data.comment)
        homePage.logout();
        homePage.checkAppointmentIsNotVisible();
    }
}