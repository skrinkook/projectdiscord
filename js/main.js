const numberOfServerIcons = 15;

for (let i = 0; i < numberOfServerIcons; i++){
    const div = document.createElement("div");
    div.classList.add("scroller-server");
    div.classList.add(`gen${i + 1}`);
    document.querySelector(".left-scroller-guilds").appendChild(div);

    //CIRCLE FRAME
    const circle = document.createElement("div");
    circle.classList.add("server-icon");
    circle.classList.add(`genIconFrame${i + 1}`)
    fetchServersData().then(servers => {
        circle.style.backgroundImage = `url(..${servers[i].icon})`
      });
    document.querySelector(`.gen${i + 1}`).appendChild(circle);
    
    //Správne zobrazovanie čísiel upozornení, aby nepretekali
    fetchServersData().then(servers => {
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

    // PILL
    const pill = document.createElement("div");
    pill.classList.add("pill");
    pill.classList.add(`genPill${i + 1}`);
    document.querySelector(`.gen${i + 1}`).appendChild(pill)
}

const numberOfChannelsOpened = 30;

for (i = 0; i < numberOfChannelsOpened; i++){
    let div = document.createElement("div");
    div.classList.add("whitefillblock");
    document.querySelector(".message-column__upperhalf").appendChild(div);
}

