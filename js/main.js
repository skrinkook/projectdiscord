const numberOfServerIcons = 15; //bude treba upraviť aby číslo sa rovnalo počtu objektov servers v json file
/*---------------------------------------------------------------------*/
for (let i = 0; i < numberOfServerIcons; i++){
    //Div v ktorom bude ikonka, pill na boku a počet upozornení
    const div = document.createElement("div");
    div.classList.add("scroller-server");
    div.classList.add(`gen${i + 1}`);
    document.querySelector(".left-scroller-guilds").appendChild(div);

    //Vygeneruje samotný kruh pre ikonku serveru
    const circle = document.createElement("div");
    circle.classList.add("server-icon");
    circle.classList.add(`genIconFrame${i + 1}`);

    //Hover Eventy
    //Čo sa má stať keď užívateľ dá myšku ikonku
    circle.addEventListener("mouseenter", function(e){
        console.log(`Dal si myšku na button ${i + 1}`);
        //Zistí súradnice danej ikonky vzhľadom na veľkosť webstránky
        let element = document.querySelector(`.genIconFrame${i + 1}`);
        let rect = element.getBoundingClientRect();
        let position = {
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
        };

        //Vygenerovanie html štruktúry pre speech Bubble
        let bodyElement = document.body;
        let speechBubble = document.createElement("div");
        speechBubble.classList.add("speech-bubble");
        speechBubble.classList.add(`genSpeechBubble${i + 1}`);
        speechBubble.style.animation = "increaseSize 0.15s forwards";
        bodyElement.appendChild(speechBubble);
        let rectangle = document.createElement("div");
        rectangle.classList.add("rectangle");
        rectangle.classList.add(`genRectangle${i + 1}`);
        speechBubble.appendChild(rectangle);
        let triangle = document.createElement("div");
        triangle.classList.add("triangle");
        triangle.classList.add(`genTriangle${i + 1}`)
        speechBubble.appendChild(triangle);
        let p = document.createElement("p");
        p.innerHTML = "Lorem Ipsum looooool<br> lol";
        p.classList.add("speech-bubble__text");
        p.classList.add(`genBubbleText${i + 1}`);
        rectangle.appendChild(p);

        speechBubble.style.top = `${(position.top) + 8}px`; 
        fetchServersData("servers.json").then(servers => {
            p.innerHTML = `${servers[i].name}`;
          });
    })

    //Odstráni speech bubble, potom čo používateľ odišiel myškou preč
    //Podmienka if overí, či speechBubble nebol odstráni pri scroll Evente
    circle.addEventListener("mouseleave", function(e){
        let speechBubble = document.querySelector(`.genSpeechBubble${i + 1}`);
        if (speechBubble === null){
            return;
        }
        speechBubble.remove();
        console.log(`Odišiel si s myškou z buttonu ${i + 1}`)
    })

    //Nastaví obrázok pre daný server
    fetchServersData("servers.json").then(servers => {
        circle.style.backgroundImage = `url(..${servers[i].icon})`
      });
    document.querySelector(`.gen${i + 1}`).appendChild(circle);
    
    //Ak bude 0, tak nezobrazí nič
    //Inak vygeneruje red pill s číslom a podľa veľkosti čísla prispôsobí veľkosť pill
    //Ak upozornení bude viacej ako 1000, napíše 1K+
    fetchServersData("servers.json").then(servers => {
        let notificationsNumber = servers[i].notifications;
        if (notificationsNumber === 0){
            console.log("bola to nula");
            return;
        } else if (notificationsNumber <= 9) {
            console.log(notificationsNumber)
            generateRedPillAndNumber(i, notificationsNumber);
        } else if (notificationsNumber <= 99) {
            generateRedPillAndNumber(i, notificationsNumber);
            let displayRedBox = document.querySelector(`.genRedBox${i + 1}`)
            displayRedBox.style.width = "25px"
        } else if (notificationsNumber <= 999) {
            console.log(notificationsNumber + " väčšie ako 10");
            generateRedPillAndNumber(i, notificationsNumber);
            let displayRedBox = document.querySelector(`.genRedBox${i + 1}`)
            displayRedBox.style.width = "30px";
        } else {
            console.log(notificationsNumber + " bolo väčšie alebo rovné ako 1000")
            generateRedPillAndNumber(i, notificationsNumber);
            let displayRedBox = document.querySelector(`.genRedBox${i + 1}`)
            displayRedBox.style.width = "30px"; 
            let overwrite = document.querySelector(`.genDisplayNumber${i + 1}`);
            overwrite.textContent = "1K+";
        }

      });

    // Biely pill naboku, ak v json file je 1, vygeneruje ho
    fetchServersData("servers.json").then(servers => {
        let pill = servers[i].pill;
        if (pill === 1) {
            const pill = document.createElement("div");
            pill.classList.add("pill");
            pill.classList.add(`genPill${i + 1}`);
            document.querySelector(`.gen${i + 1}`).appendChild(pill)
        }

    });

}
/*---------------------------------------------------------------------*/

//Odstráni scrollBubble počas scrollovania, ak scrollBubble bol odstránený už pri mouseleave evente, tak funkciu vráti
document.querySelector(".left-scroller-guilds").addEventListener("scroll", function(e){
    let speechBubble = document.querySelector(".speech-bubble");
    if (speechBubble === null) {
        return;
    }
    speechBubble.remove();
    console.log("scroll test")
})

//Vygenerovanie užívateľov
/*---------------------------------------------------------------------*/
fetchJsonData().then(users => {
    let userProfiles = users;
    openedProfiles = userProfiles.filter(user => user.opened === 1);
    for (i = 0; i < openedProfiles.length; i++){
        let columnElement = document.createElement("div");
        columnElement.classList.add("message-column__element");
        columnElement.classList.add(`columnElementGen${i + 1}`)
        document.querySelector(".message-column__upperhalf").appendChild(columnElement);

        let elementPfp = document.createElement("div");
        elementPfp.classList.add("element-pfp");
        elementPfp.classList.add(`pfpGen${i + 1}`);
        //Vygeneroanie random farby || Zrejme to zmením lebo po každom cmd R je to ine, alebo ulozit do local storage
        const randomColor = '#' + Math.random().toString(16).substr(2, 6);
        elementPfp.style.backgroundColor = randomColor;
        document.querySelector(`.columnElementGen${i + 1}`).appendChild(elementPfp);

        //Pokiaľ je užívateľ online
        if (openedProfiles[i]["active-status"] === "online") {
            let onlineCircle = document.createElement("div");
            onlineCircle.classList.add("online-circle");
            document.querySelector(`.pfpGen${i + 1}`).appendChild(onlineCircle);
        //Pokiaĺ je užívateľ away
        } else if (openedProfiles[i]["active-status"] === "away") {
            let awayCircle = document.createElement("div");
            let awaySubCircle = document.createElement("div");
            awayCircle.classList.add("away-circle");
            awayCircle.classList.add(`away-circleGen${i + 1}`)
            awaySubCircle.classList.add("away-subcircle");
            document.querySelector(`.pfpGen${i + 1}`).appendChild(awayCircle);
            document.querySelector(`.away-circleGen${i + 1}`).appendChild(awaySubCircle);
        //Pokiaľ je užívaľ Not Disturb
        } else if (openedProfiles[i]["active-status"] === "notdisturb"){
            let notDisturbCircle = document.createElement("div");
            let notDisturbSubCircle = document.createElement("div");
            notDisturbCircle.classList.add("notdisturb-circle");
            notDisturbCircle.classList.add(`notdisturb-circleGen${i + 1}`);
            notDisturbSubCircle.classList.add("notdisturb-subcircle");
            document.querySelector(`.pfpGen${i + 1}`).appendChild(notDisturbCircle);
            document.querySelector(`.notdisturb-circleGen${i + 1}`).appendChild(notDisturbSubCircle);
        } else {
            let offlineCircle = document.createElement("div");
            let offlineSubCircle = document.createElement("div");
            offlineCircle.classList.add("offline-circle");
            offlineCircle.classList.add(`offline-circleGen${i + 1}`);
            offlineSubCircle.classList.add("offline-subcircle");
            document.querySelector(`.pfpGen${i + 1}`).appendChild(offlineCircle);
            document.querySelector(`.offline-circleGen${i + 1}`).appendChild(offlineSubCircle);
        }
        



        
    }

  });

//Vypne context menu pri right click na stránke
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
   });
   
//Odstráni family center element po kliknutí 
document.querySelector("#familyCenterClose").addEventListener("click", function(e){
    const removeElement = document.querySelector("#familyCenterElement");
    removeElement.remove();
})

//Kliknutie na + tlačítko
document.querySelector(".direct-messages__add-symbol").addEventListener("click", function(e){
    console.log("add symbol")
})

console.log(`Position from top: ${getPosition(".direct-messages__add-symbol").top}`);

document.querySelector("#closeElement1").addEventListener("click", function(e){
    const removeElement = document.querySelector("#element1");
    removeElement.remove();
})

