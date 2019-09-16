document.getElementById(`SignUp`).style.display= "none"
document.getElementById(`loginForm`).style.display= "none"

document.getElementById(`loginBtn`).addEventListener(`click`, function(){
   document.getElementById(`loginForm`).style.display= "block"
   document.getElementById(`SignUp`).style.display= "none"
   document.getElementById(`slider`).style.display= "none"
})

document.getElementById(`signUpBtn`).addEventListener(`click`, function(){
    document.getElementById(`loginForm`).style.display= "none"
    document.getElementById(`slider`).style.display= "none"
    document.getElementById(`SignUp`).style.display= "block"
 })

//  slider script 

 var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 3000); // Change image every 2 seconds
}

// sign up 

var database = firebase.database().ref("/")

document.getElementById(`signupfirebase`).addEventListener(`click`, function(){
let name = document.getElementById(`nameId`)
let email = document.getElementById(`emailId`)
let password = document.getElementById(`passwordId`)
let city = document.getElementById(`cityId`)
let number = document.getElementById(`numberId`)
let picture = document.getElementById(`pictureId`)
let age = document.getElementById(`ageId`)

const signUpObj = {
    name:name.value,
    email:email.value,
    password:password.value,
    city :city .value,
    number:number.value,
    picture:picture.value.slice(12),
    age:age.value,
}


firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then(
function(res){
database.child(`User/${res.user.uid}`).set(signUpObj);
alert(`Sign Up Successful`)
document.getElementById(`SignUp`).style.display =  "none"
document.getElementById(`loginForm`).style.display =  "block"
    }
)
.catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(`Sign Up Un Successful`)

    // ...
  });


})

//log in firebase 

document.getElementById(`loginfirebase`).addEventListener(`click`, function(){
    let emailLog = document.getElementById(`emailIdLogin`)
    let passwordLog = document.getElementById(`passwordIdLogin`)

    const loginFirebaseObj = {
        emailLog:emailLog.value,
        password:passwordLog.value
    }

    
    
    
    firebase.auth().signInWithEmailAndPassword(emailLog.value, passwordLog.value).then(
            function(resObj){
            console.log(resObj.user.uid)
            database.child(`User/${resObj.user.uid}`).once('value',(value) => {
            let usersObj = value.val()
            console.log(usersObj)
            usersObj.id = value.key
            
            localStorage.setItem(`Current_user`,JSON.stringify(usersObj))

            window.location.href= `./pages/home.html`
        })
        alert(`Log In Successful`)

    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`Log In Un Successful`)
        console.log(errorMessage)
        console.log(errorCode)
        // ...
    });
})


