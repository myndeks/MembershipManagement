// display all current subscriptions
async function getMemberships ()  {
  const response = await fetch('http://localhost:3000/memberships');
  const json = await response.json();

  const formSelect = document.querySelector('#membership');

  const memberships = json.map(item => {
    const options = document.createElement('option');
    options.text = item.name;
    options.value = item.id;

    return options;
  });

  formSelect.append(...memberships)

  console.log(memberships);
  let selectedValue = document.querySelector('#membership');
  const value = selectedValue.options[selectedValue.selectedIndex].value;
  console.log(selectedValue.value);

}

async function addUser (data)  {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          "content-type": 'application/json'
      }
    });
    const json = await response.json()
    return json;
}


getMemberships();

const buttonAdd = document.querySelector('.btnAdd');

buttonAdd.addEventListener('click', async (e) => {
  e.preventDefault();

  let selectedValue = document.querySelector('#membership');
  const value = selectedValue.options[selectedValue.selectedIndex].value;

  const subForm = document.querySelector('form');

  const formData = new FormData(subForm);

  const name = formData.get('name');
  const surname = formData.get('surname');
  const email = formData.get('email');
  const service_id = selectedValue.value;

  await addUser({
    name, surname, email, service_id
  });
  window.location.replace('users.html');
})

function cancelSub () {
  const btnGoToAddSub = document.querySelector('.btnCancel');
  btnGoToAddSub.addEventListener('click', () => {
    window.location.replace("users.html");
  })
}
cancelSub ();
