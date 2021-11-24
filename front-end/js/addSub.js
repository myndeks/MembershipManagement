// Create subscriptionco

async function addSub (data)  {
    const response = await fetch('http://localhost:3000/memberships', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          "content-type": 'application/json'
      }
    });
    const json = await response.json()
    return json;
}

const subForm = document.querySelector('form');
const buttonAdd = document.querySelector('.form--name .btnAdd');

buttonAdd.addEventListener('click', async (e) => {
  e.preventDefault();

  const formData = new FormData(subForm);

  const name = formData.get('name');
  const price = formData.get('price');
  const description = formData.get('description');

  await addSub({
    name, price, description
  });
  window.location.replace('index.html');
})

function cancelSub () {
  const btnGoToAddSub = document.querySelector('.btnCancel');
  btnGoToAddSub.addEventListener('click', () => {
    window.location.replace("index.html");
  })
}
cancelSub ();
