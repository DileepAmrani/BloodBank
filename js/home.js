document.getElementById(`profile`).addEventListener(`click`, function(){
    window.location.href = `../pages/profile.html`
})
document.getElementById(`donners`).addEventListener(`click`, function(){
  window.location.href = `../pages/donner.html`
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


// donner card
var database = firebase.database().ref("/")

document.getElementById(`donate`).addEventListener(`click`, function(){
  let data = document.getElementById(`donateGroups`);
  let blood = data.options[data.selectedIndex].value;
  // console.log(blood)

var userProfile = localStorage.getItem(`Current_user`)
userProfile = JSON.parse(userProfile)


if(userProfile.blood){
  alert(`You are already Donner`)
}
else{

const donnerObj ={
blood:blood,
age:userProfile.age,
city:userProfile.city,
email:userProfile.email,
name:userProfile.name,
picture:userProfile.picture,
number:userProfile.number,
} 

console.log(donnerObj)

  userProfile.blood  = donnerObj.blood
  
  localStorage.setItem(`Current_user`,JSON.stringify(userProfile))
database.child(`Donners/${userProfile.id}`).set(donnerObj)

  swal({
    title: "Good job!",
    text: "You are now a Life Saver!",
    icon: "success",
    button: "Ok!",
  });
}
})


// log out

document.getElementById(`logout`).addEventListener(`click`, function(){
  firebase.auth().signOut().then((res) => {

    localStorage.removeItem(`Current_user`);
    window.location.href = '../pages/signup.html'

}), (err) => {
    console.log(err, `signout error`)


}

})



//filter  

database.child(`Donners/`).on(`child_added`, (DonateNodes)=>{
  let groups = DonateNodes.val()

document.getElementById(`All`).innerHTML =+ document.getElementById(`All`).innerHTML +1
let a = document.getElementById(groups.blood)
a.innerHTML = (+ a.innerHTML) +1

})


// Scrol up button

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




// new Navigation

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}