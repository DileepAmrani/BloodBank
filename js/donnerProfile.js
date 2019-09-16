document.getElementById(`toHome`).addEventListener(`click`, function () {
    window.location.href = `../pages/home.html`
})
document.getElementById(`toProfile`).addEventListener(`click`, function () {
    window.location.href = `../pages/profile.html`
})

// log out

document.getElementById(`logout`).addEventListener(`click`, function () {
    firebase.auth().signOut().then((res) => {

        localStorage.removeItem(`Current_user`);
        window.location.href = '../pages/signup.html'

    }), (err) => {
        console.log(err, `signout error`)


    }

})


var donnerProfile = localStorage.getItem(`donnerProfile`)
donnerProfile = JSON.parse(donnerProfile)
console.log(donnerProfile)

var database = firebase.database().ref("/")

database.child(`Donners/${donnerProfile}`).on(`value`, value => {
    let doner = value.val();
    console.log(doner)

    var picdiv = document.getElementById(`userPic`)
    var proPic = document.createElement(`img`)
    proPic.setAttribute(`class`, `hoverZoomLink`)
    proPic.setAttribute(`src`, doner.picture)
    picdiv.appendChild(proPic)
    document.getElementById(`nameDonner`).innerHTML = doner.name;
    document.getElementById(`cityDonner`).innerHTML = doner.city;
    document.getElementById(`bloodDonner`).innerHTML = "Blood Group: " + doner.blood;
    document.getElementById(`ageDonner`).innerHTML = "Age: " + doner.age;
    document.getElementById(`emailDonner`).innerHTML = "Email: " + doner.email;
    document.getElementById(`phoneDonner`).innerHTML = "Phone Number: " + doner.number;

    document.getElementById(`requestBtn`).addEventListener(`click`, function () {
        var userProfile = localStorage.getItem(`Current_user`)
        userProfile = JSON.parse(userProfile)
        console.log(userProfile)

        database.child(`User/${userProfile.id}/`).on(`value`, requestProp => {
            let request = requestProp.val();
        console.log(request)

        database.child(`User/${donnerProfile}/Requests`).on(`value`, requestPro => {
            let request1 = requestPro.val();
console.log(request1)
            if(request1 === null){
                if(donnerProfile === request.email){
                    alert(`Sorry! , You can't send request to You`)
                   }
                   else{
                       
                       var reciever = localStorage.getItem(`Current_user`)
                       reciever = JSON.parse(reciever)

                       database.child(`User/${donnerProfile}/Requests`).push({
                           message: `You have a Blood Request`,
                           recieverId: reciever.id,
                           name: reciever.name,
                           city: reciever.city,
                           number: reciever.number
                       })
                       alert(`Request Sent`);
                   }
            }
            else{
                if(request1.recieverId === donnerProfile)   {
                    if(donnerProfile === request.email){
                        alert(`Sorry! , You can't send request to You`)
                       }
                       else{
                           
                           var reciever = localStorage.getItem(`Current_user`)
                           reciever = JSON.parse(reciever)
                           database.child(`User/${donnerProfile}/Requests`).push({
                               message: `You have a Blood Request`,
                               recieverId: reciever.id,
                               name: reciever.name,
                               city: reciever.city,
                               number: reciever.number
                           })
                           alert(`Request Sent`);
                       }
                   }
            }

    })
})
    
    })
})


// new Navigation Responsive

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }