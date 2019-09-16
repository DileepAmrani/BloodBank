document.getElementById(`home`).addEventListener(`click`, function () {
    window.location.href = `../pages/home.html`
})
document.getElementById(`donners`).addEventListener(`click`, function () {
    window.location.href = `../pages/donner.html`
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


var userProfile = localStorage.getItem(`Current_user`)
userProfile = JSON.parse(userProfile)

console.log(userProfile.age)
document.getElementById(`profilePic`).src = userProfile.picture;
document.getElementById(`userName`).innerText = userProfile.name;
document.getElementById(`userEmail`).innerText = userProfile.email;
document.getElementById(`usercity`).innerText = userProfile.city;
document.getElementById(`userPhone`).innerText = userProfile.number;
document.getElementById(`userAge`).innerText = userProfile.age + " Year";

var database = firebase.database().ref(`/`)

document.getElementById(`EditProfile`).addEventListener(`click`, function () {
    document.getElementById(`prof`).style.display = "none";
    document.getElementById(`UpdatePro`).style.display = "block";
})

document.getElementById(`update`).addEventListener(`click`, function () {

    let name = document.getElementById(`nameId`)
    let city = document.getElementById(`cityId`)
    let number = document.getElementById(`numberId`)
    let picture = document.getElementById(`pictureId`)
    let age = document.getElementById(`ageId`)


    const profileUpdateObj = {
        name: name.value,
        email: userProfile.email,
        password: userProfile.password,
        id: userProfile.id,
        city: city.value,
        number: number.value,
        picture: picture.value.slice(12),
        age: age.value,
    }

    console.log(profileUpdateObj)

    database.child(`User/${userProfile.id}/`).set(profileUpdateObj)

    localStorage.setItem(`Current_user`, JSON.stringify(profileUpdateObj))
    window.location.reload()

    document.getElementById(`prof`).style.display = "block";
    document.getElementById(`UpdatePro`).style.display = "none";
})

document.getElementById(`requests`).addEventListener(`click`, function () {


    document.getElementById(`userProfile`).style.display = "none"
    database.child(`User/${userProfile.id}/Requests`).on(`child_added`, requestProp => {
        let request = requestProp.val();
        console.log(request)


        let requestMessDiv = document.getElementById(`requestMessage`)

        let aDiv = document.createElement(`div`)
        aDiv.setAttribute(`class`, `card`)

        requestMessDiv.appendChild(aDiv)

        let recName = document.createElement(`h1`)
        let recNameText = document.createTextNode(request.name)
        recName.appendChild(recNameText)

        aDiv.appendChild(recName)

        let recCity = document.createElement(`span`)
        recCity.setAttribute(`class`, `price`)
        let recCityText = document.createTextNode(request.city)
        recCity.appendChild(recCityText)

        aDiv.appendChild(recCity)

        let recnumber = document.createElement(`p`)
        recnumber.setAttribute(`class`, `price`)
        let recnumberText = document.createTextNode(request.number)
        recnumber.appendChild(recnumberText)

        aDiv.appendChild(recnumber)

        let span = document.createElement(`span`)
        let spanText = document.createTextNode(request.message)
        span.appendChild(spanText)
        aDiv.appendChild(span)

        let br = document.createElement(`br`)
        requestMessDiv.appendChild(br)


        let acceptBtn = document.createElement(`input`)
        acceptBtn.setAttribute(`type`, `button`)
        acceptBtn.setAttribute(`class`, `btn-success`)
        acceptBtn.setAttribute(`value`, `Accept`)
        acceptBtn.setAttribute(`id`, requestProp.key)
        aDiv.appendChild(acceptBtn)


        let declineBtn = document.createElement(`input`)
        declineBtn.setAttribute(`type`, `button`)
        declineBtn.setAttribute(`class`, `btn-danger`)
        declineBtn.setAttribute(`value`, `Decline`)
        declineBtn.setAttribute(`id`, requestProp.key)

        aDiv.appendChild(declineBtn)


        acceptBtn.addEventListener(`click`, function () {
            let messageObj = {
                message: "Your Request is Accepted",
                acepterId: userProfile.id
            }
            database.child(`User/${request.recieverId}/Messages`).push(messageObj)
            database.child(`User/${userProfile.id}/Requests/`).remove();

            document.getElementById(`requestMessage`).style.display = `none`

            alert(`Request Accepted`)
        })

        declineBtn.addEventListener(`click`, function () {
            alert(`Request Rejected`)
            let messageObj1 = {
                message: "Your Request is Rejected",
                acepterId: userProfile.id
            }
            database.child(`User/${request.recieverId}/Messages`).push(messageObj1)
            console.log(`1==>`, this.id)

            database.child(`User/${userProfile.id}/Requests/${this.id}/`).remove();
            this.parentNode.style.display = `none`


        })


    })




})

document.getElementById(`notif`).addEventListener(`click`, function () {
    document.getElementById(`userProfile`).style.display = "none"

    database.child(`User/${userProfile.id}/Messages`).on(`child_added`, Notification => {
        let mess = Notification.val()
        console.log(mess.acepterId)
        database.child(`User/${mess.acepterId}`).on(`value`, reqData => {
            let reqData1 = reqData.val()
            console.log(reqData1)
            let requestMessDiv1 = document.getElementById(`notification`)

            let aDiv1 = document.createElement(`div`)
            aDiv1.setAttribute(`class`, `card`)
            requestMessDiv1.appendChild(aDiv1)

            let bell = document.createElement(`img`)
            bell.setAttribute(`src` , `../icon/icons8-bell-64.png`)
            bell.style = `width: 50px;`
            aDiv1.appendChild(bell)

            let reqName = document.createElement(`h1`)
            let reqNameText = document.createTextNode(reqData1.name)
            reqName.appendChild(reqNameText)
            aDiv1.appendChild(reqName)


            let span1 = document.createElement(`span`)
            let spanText1 = document.createTextNode(mess.message)
            span1.appendChild(spanText1)
            aDiv1.appendChild(span1)

        })

    })
})




// notification counter
let count = 0
database.child(`User/${userProfile.id}/Requests`).on(`child_added`, requestProp => {
    count++
    document.getElementById(`totalRequest`).innerHTML = count;
})


let count1 = 0
database.child(`User/${userProfile.id}/Messages`).on(`child_added`, requestProp => {
    count1++
    document.getElementById(`totalNoti`).innerHTML = count1;
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
