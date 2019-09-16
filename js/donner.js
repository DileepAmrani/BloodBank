document.getElementById(`toHome`).addEventListener(`click`, function () {
    window.location.href = `../pages/home.html`
})
document.getElementById(`toProfile`).addEventListener(`click`, function () {
    window.location.href = `../pages/profile.html`
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

var database = firebase.database().ref("/")

database.child(`Donners`).on(`child_added`, value => {
    let doner = value.val();
    doner.id= value.key
    console.log(doner.id)

    let cardDiv = document.getElementById(`allDonners`)

    let newDiv1 = document.createElement(`div`)
    newDiv1.setAttribute(`class`, `row`)


    let newDiv2 = document.createElement(`div`)
    newDiv2.setAttribute(`class`, `column`)

    let newDiv = document.createElement(`div`)
    newDiv.setAttribute(`class`, `card`)
    newDiv.setAttribute(`id`, `card`)

    newDiv2.appendChild(newDiv)
    newDiv1.appendChild(newDiv2)
    let img = document.createElement(`img`)
    img.setAttribute(`src`, doner.picture)
    newDiv.appendChild(img)

    let h2 = document.createElement(`h3`)
    let h2txt = document.createTextNode(doner.name)
    h2.appendChild(h2txt)
    newDiv.appendChild(h2)

    let h3 = document.createElement(`h4`)
    h3.setAttribute(`class`,`bloodGroups`)
    let h3txt = document.createTextNode(doner.blood)
    h3.appendChild(h3txt)
    newDiv.appendChild(h3)
    
    let detailBtn = document.createElement(`input`)
    detailBtn.setAttribute(`type`, `button`)
    detailBtn.setAttribute(`value`, `Detail`)
    detailBtn.setAttribute(`id`, doner.id)
    detailBtn.setAttribute(`class`, `button`)
    newDiv.appendChild(detailBtn)
    cardDiv.appendChild(newDiv)
 
    detailBtn.addEventListener(`click`, function(){
  
            let profileId = this.id;
            localStorage.setItem(`donnerProfile`, JSON.stringify(profileId));
            window.location.href = `../pages/donnerProfile.html`
        
     })
    // filter by blood group
    
document.getElementById(`donateGroups`).addEventListener(`click`, function(){

    let data = document.getElementById(`donateGroups`);
    let blood1 = data.options[data.selectedIndex].value;


    if(blood1 === `Blood Group`){
        document.getElementById(detailBtn.id).parentNode.style.display = `block`;
        
    }

    else if(doner.blood === blood1){
        document.getElementById(detailBtn.id).parentNode.style.display = `block`;
    }

    else if(doner.blood !== blood1){
        document.getElementById(detailBtn.id).parentNode.style.display = `none`
    }
 
})

    // // filter whho can give blood group
    
    document.getElementById(`yourGroups`).addEventListener(`click`, function(){

        let data1 = document.getElementById(`yourGroups`);
        let blood2 = data1.options[data1.selectedIndex].value;

        var a = document.getElementsByClassName(`bloodGroups`)

for(var i = 0; i < a.length; i++){
    if(blood2 === `A+ve`){
    if(a[i].innerHTML === `A+ve` || a[i].innerHTML === `A-ve` || a[i].innerHTML === `O+ve` || a[i].innerHTML === `O-ve`){
        a[i].parentNode.style.display = `block`
    }
    else{
        a[i].parentNode.style.display = `none`  
    }
        
    }

    if(blood2 === `A-ve`){
        if( a[i].innerHTML === `A-ve` || a[i].innerHTML === `O-ve`){
            a[i].parentNode.style.display = `block`
        }
        else{
            a[i].parentNode.style.display = `none`  
        }
            
    }

    if(blood2 === `B+ve`){
        if(a[i].innerHTML === `B+ve` || a[i].innerHTML === `B-ve` || a[i].innerHTML === `O+ve` || a[i].innerHTML === `O-ve`){
            a[i].parentNode.style.display = `block`
        }
        else{
            a[i].parentNode.style.display = `none`  
        }
            
    }

    if(blood2 === `B-ve`){
        if(a[i].innerHTML === `B-ve`|| a[i].innerHTML === `O-ve`){
            a[i].parentNode.style.display = `block`
        }
        else{
            a[i].parentNode.style.display = `none`  
        }
            
    }

    if(blood2 === `AB+ve`){
        if(a[i].innerHTML === `AB+ve` || a[i].innerHTML === `AB-ve` ||a[i].innerHTML === `A+ve` || a[i].innerHTML === `A-ve` || a[i].innerHTML === `B+ve` || a[i].innerHTML === `B-ve` || a[i].innerHTML === `O+ve` || a[i].innerHTML === `O-ve`){
            a[i].parentNode.style.display = `block`
        }
        else{
            a[i].parentNode.style.display = `none`  
        }
            
    }

    if(blood2 === `AB-ve`){
        if(a[i].innerHTML === `AB-ve` || a[i].innerHTML === `A-ve` || a[i].innerHTML === `B-ve`  || a[i].innerHTML === `O-ve`){
            a[i].parentNode.style.display = `block`
        }
        else{
            a[i].parentNode.style.display = `none`  
        }
            
    }

    if(blood2 === `O+ve`){
        if(a[i].innerHTML === `O+ve` || a[i].innerHTML === `O-ve`){
            a[i].parentNode.style.display = `block`
        }
        else{
            a[i].parentNode.style.display = `none`  
        }
            
    }

    if(blood2 === `O-ve`){
        if( a[i].innerHTML === `O-ve`){
            a[i].parentNode.style.display = `block`
        }
        else{
            a[i].parentNode.style.display = `none`  
        }
            
    }




}

    
        // document.getElementById(detailBtn.id).parentNode.style.display = `block`;
        // document.getElementById(`card`).setAttribute(`class`,`card`)
        // else if(doner.blood === blood1){
        //     document.getElementById(detailBtn.id).parentNode.style.display = `block`;
        // }
    
        // else if(doner.blood !== blood1){
        //     document.getElementById(detailBtn.id).parentNode.style.display = `none`
        // }
     
    })

    // filter by city

    document.getElementById(`filterCity`).addEventListener(`click`, function(){
    
        let str = document.getElementById(`donnerCity`).value;
        var city = str.toLowerCase();

        if(city === ""){
            document.getElementById(detailBtn.id).parentNode.style.display = `block`;
        }
        else if(doner.city.toLowerCase() === city){
            document.getElementById(detailBtn.id).parentNode.style.display = `block`;
        }
    
       else if(doner.city.toLowerCase() !== city){
            document.getElementById(detailBtn.id).parentNode.style.display = `none`
        }
    })

})



// new Navigation

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }