// Render info
async function getMemberships ()  {
  const response = await fetch('http://localhost:3000/memberships');
  const json = await response.json();
  renderMemberships(json);
}

function renderMemberships (data) {
  const subWrapper = document.querySelector('.main--subscriptions');
  subWrapper.innerHTML = null;

  const items = data.map(sub => {
    const sub_box = document.createElement('div')
    sub_box.classList.add('subscriptions--box');
    sub_box.innerHTML = `
      <div class="box--heading">
        <h4>$ ${sub.price} ${sub.name}</h4>
        <p>${sub.description}</p>
      </div>

      <div class="box--bottom">
        <button key=${sub.id} type="button" name="button"><i  key=${sub.id} class="fas fa-trash-alt"></i></button>
      </div>
    `;

    subWrapper.append(sub_box);
  });

  deleteSub();
}

// Delete Membership
async function deleteMemberships (id)  {
  const response = await fetch(`http://localhost:3000/memberships/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(),
    headers: {
        "content-type": 'application/json'
    }
  });
  const json = await response.json();

  getMemberships(json);
}

function deleteSub (data) {
  const deletBtn = document.querySelectorAll('.box--bottom');
  const deleteId = deletBtn.forEach(item => {
    item.addEventListener('click', (e) => {
      deleteMemberships(e.target.attributes.key.nodeValue);
    })
  });

}

function renderSubPage () {
  const btnGoToAddSub = document.querySelector('.info--button button');
  btnGoToAddSub.addEventListener('click', () => {
    window.location.replace("addMembership.html");
  })
}
renderSubPage ();

// Puslapiui užsikrovus renderinam subscriptions
getMemberships();
