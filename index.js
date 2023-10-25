const form = document.getElementById('form');
form.addEventListener('submit', async event => {
  event.preventDefault();

  const data = new FormData(form);
  // Convert FormData to an object
  const formDataObject = {};
  data.forEach((value, key) => {
    formDataObject[key] = value;
  });

  // Convert the date field to ISO string
  formDataObject.dateTime = new Date(new Date(formDataObject.dateTime).toString().split('GMT')[0]+' UTC').toISOString();


  try {
    const res = await fetch("http://localhost:8080/createAppointment", {
      method: 'POST',
      body: JSON.stringify(formDataObject),
      headers: {
        'Content-Type': 'application/json'
      }
    },
    );
    const resData = await res.text();
    const divRes = document.getElementById('res');
    divRes.innerHTML = resData;

    console.log(resData)
  } catch (err) {
    console.log(err.message)
  }
});