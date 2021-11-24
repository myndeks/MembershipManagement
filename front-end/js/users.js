// Render users
let order = 'asc';


async function getMemberships ()  {
  const response = await fetch(`http://localhost:3000/users/:${order}`);
  const json = await response.json();
  renderUsers(json);
}

function renderUsers (data) {
  const subWrapper = document.querySelector('.main--subscriptions');
  subWrapper.innerHTML = null;

  const items = data.map(user => {
    const user_box = document.createElement('div')
    user_box.classList.add('subscriptions--box');
    user_box.innerHTML = `
    <div class="user-heading">
      <div class="name">${user.name} ${user.surname}</div>
      <div class="email">Email: <span>${user.email}</span></div>
      <div class="membership">Membership: <span>${
        user.sub.map(name => {
          return name.name;
        })
      }</span></div>
    </div>
    `;

    subWrapper.append(user_box);
  });

}

const btnSort = document.querySelector('.btnSort');

btnSort.addEventListener('click', (e) => {
  if (e.target.textContent === 'asc') {
    btnSort.textContent = "dsc";
    order = 'dsc';
    getMemberships ();
  } else if (e.target.textContent === 'dsc') {
    btnSort.textContent = "asc"
    order = 'asc';
    getMemberships ();
  }
})

document.querySelector('.btnNew').addEventListener('click', () => {
  window.location.replace("addUser.html");
})

getMemberships ();
