module.exports = {
    "2. scenarijs": function(client) {
        let homePage = client.page.homePage();

        const data = {
            demoLogin: 'John Doe',
            demoPassword:'ThisIsNotAPassword',
            facility: 'Hongkong CURA Healthcare Center',
            apply: 'No',
            program: 'Medicare',
            date: '01/01/2026',
            comment: 'Appointment in 2026'
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