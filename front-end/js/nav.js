if (
  document.location.pathname === '/' ||
  document.location.pathname.indexOf('index') >-1 ||
  document.location.pathname.indexOf('addMembership') >-1 ) {
   document.querySelector('.mmberships').classList.add('active-link');
 }

 if (
   document.location.pathname.indexOf('users') >-1 ||
   document.location.pathname.indexOf('addUser') >-1 ) {
    document.querySelector('.users').classList.add('active-link');
  }
