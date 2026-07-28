function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO: Alert the user of the job that they applied for!
    const formData = new FormData(e.target);
    const jobValue = formData.get('job');
    if (!jobValue) {
        alert("Please select a position!");
        return;
    }
	alert(`Thank you for applying to be a ${jobValue}!`)
}