const numberOfServerIcons = 15;

for (i = 0; i < numberOfServerIcons; i++){
    let div = document.createElement("div");
    div.classList.add("scroller-server");
    document.querySelector(".left-scroller-guilds").appendChild(div);
}

const numberOfChannelsOpened = 30;

for (i = 0; i < numberOfChannelsOpened; i++){
    let div = document.createElement("div");
    div.classList.add("whitefillblock");
    document.querySelector(".message-column__upperhalf").appendChild(div);
}
