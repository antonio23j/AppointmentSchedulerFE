const form = document.getElementById('form')
form.addEventListener('submit', async event => {
    event.preventDefault();

    const data = new FormData(form);
    // Convert FormData to an object
    const formDataObject = {};
    data.forEach((value, key) => {
        formDataObject[key] = value;
        console.log(value);
    });

    //Convert the date field to ISO String
    formDataObject.date = new Date(formDataObject.date).toISOString();

    try {

        const res = await fetch("http://localhost:8080/getAppointmentsByDate?date=" + formDataObject.date, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const resData = await res.json();
        const table = document.getElementById('tbody');
        table.innerHTML = "";
        resData.forEach((element) => {
            const row = table.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            const cell3 = row.insertCell();
            const cell4 = row.insertCell();
            const cell5 = row.insertCell();
            cell1.innerHTML = element['id'];
            cell2.innerHTML = element['name'];
            cell3.innerHTML = new Date(element['startDateTime']).toLocaleString();
            cell4.innerHTML = element['duration'];
            cell5.innerHTML = new Date(element['endDateTime']).toLocaleString();
        })
        console.log(resData);
    } catch(err){
        console.log(err.message);
    }

})