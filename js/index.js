firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        window.location.href = `./pages/home.html`
      // ...
    } else {
      // User is signed out.
      window.location.href = `./pages/signup.html`
      // ...
    }
  });