module.exports = {
    "3. scenarijs": function(client) {
        let homePage = client.page.homePage();

        const data = {
            demoLogin: 'John Doe',
            demoPassword:'ThisIsNotAPassword',
            facility: 'Tokyo CURA Healthcare Center',
            apply: 'Yes',
            program: 'None',
            date: '15/07/2025',
            comment: 'Appointment in July'
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