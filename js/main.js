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


fetch('test.json')
  .then(response => response.json())
  .then(data => {
    let dataParse = data.servers[0]
    let dataParseJSON = JSON.stringify(dataParse);
    console.log(dataParseJSON)
    console.log(data.servers[0]);
  })
  .catch(error => {
    console.error(error);
  });