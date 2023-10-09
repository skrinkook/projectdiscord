//Slúži na získanie údajov z servers.json file
function fetchServersData() {
    return fetch('servers.json')
      .then(response => response.json())
      .then(data => data.servers)
      .catch(error => {
        console.error(error);
      });
  }

//Vygeneruje Red pill a príslušné číslo podľa json file a priradí classes
const generateRedPillAndNumber = function(i, notificationsNumber){
    let displayRedBox = document.createElement("div");
    displayRedBox.classList.add("icon-status__active");
    displayRedBox.classList.add(`genRedBox${i + 1}`);
    document.querySelector(`.genIconFrame${i + 1}`).appendChild(displayRedBox);
    let displayNumber = document.createElement("p");
    displayNumber.textContent = notificationsNumber;
    displayNumber.classList.add("icon-status__active__number");
    displayNumber.classList.add(`genDisplayNumber${i + 1}`);
    document.querySelector(`.genRedBox${i + 1}`).appendChild(displayNumber);
}