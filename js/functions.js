//Slúži na získanie údajov z servers.json file
function fetchServersData() {
    return fetch('servers.json')
      .then(response => response.json())
      .then(data => data.servers)
      .catch(error => {
        console.error(error);
      });
  }

function fetchJsonData() {
    return fetch('user-profiles.json')
        .then(response => response.json())
        .then(data => data.users)
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

//Získanie pozície elementu, vzhľadom na veľkosť dokumentu
function getPosition(selector) {
    let element = document.querySelector(selector);
    let rect = element.getBoundingClientRect();
    let position = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
    return position;
  }


