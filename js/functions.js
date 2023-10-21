//Musel som preložiť komentáre do angličtiny, pretože moje IDE ma zjebávalo zakaždým keď to bolo po slovensky... 
//Used to gets data from json file
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

//This will generate red pill (+classes) with number of notifications for the guilds scroller on the left
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

//Get position of the element on the webpage
function getPosition(selector) {
    let element = document.querySelector(selector);
    let rect = element.getBoundingClientRect();
  return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
  }

const generateProfileActivity = function(activityFromArray){
  if (activityFromArray.activity === 0 && activityFromArray["active-status"] !== "offline" && activityFromArray.flag !== "blocked" && activityFromArray.flag !== "pending") {
    if (activityFromArray["active-status"] === "online"){
        return "Online";
    } else if (activityFromArray["active-status"] === "notdisturb"){
        return "Not Disturb";
    } else if (activityFromArray["active-status"] === "away"){
      return "Idle";
    } 
  } else {
    if (activityFromArray.activity !== "Spotify" && activityFromArray["active-status"] !== "offline" && activityFromArray.flag !== "blocked" && activityFromArray.flag !== "pending") {
      return "Playing " + activityFromArray.activity;
    } else if (activityFromArray["active-status"] !== "offline" && activityFromArray.flag !== "blocked" && activityFromArray.flag !== "pending"){
      return "Listening to " + activityFromArray.activity;
    }
  }
  if(activityFromArray["active-status"] === "offline" && activityFromArray.flag !== "blocked" && activityFromArray.flag !== "pending"){
    return "Offline"
  }
  if(activityFromArray["flag"] === "pending"){
    return "Outgoing friend request";
  }
  if (activityFromArray["flag"] === "blocked"){
    return "Blocked";
  }
  
}

//Generates message and options icons, for the column2
const generateElementIcons = function(count, oneUser){
  let iconContainer = document.createElement("div");
  iconContainer.classList.add("c2-icons", `c2i${count}`);
  document.querySelector(`.eg${count}`).appendChild(iconContainer);

  //Message Icon HTML Structure
  let messageIcon = document.createElement("div");
  messageIcon.classList.add("message-icon-c2", `mic2-${count}`);
  document.querySelector(`.c2i${count}`).appendChild(messageIcon);
  let messageIconSpan = document.createElement("span");
  messageIconSpan.classList.add("material-symbols-outlined");
  messageIconSpan.textContent = "chat";
  document.querySelector(`.mic2-${count}`).appendChild(messageIconSpan);

  //Options Icon HTML Structure
  let optionsIcon = document.createElement("div");
  optionsIcon.classList.add("options-icon-c2", `oic2-${count}`);
  document.querySelector(`.c2i${count}`).appendChild(optionsIcon);
  let optionsIconSpan = document.createElement("span");
  optionsIconSpan.classList.add("material-symbols-outlined");
  optionsIconSpan.textContent = "more_vert";
  document.querySelector(`.oic2-${count}`).appendChild(optionsIconSpan);

  //Events on click event
  messageIcon.addEventListener("click", function(){
    console.log("DM user: " + oneUser.name);
  })
  optionsIconSpan.addEventListener("click", function(){
    console.log("More options... " + oneUser.name)
  })
}

//Removes all profiles displayed in column2
const removeProfilesColumn2 = function(){
  let profiles = document.querySelectorAll(".column2__elementouter");
  profiles.forEach((profile) => {
    profile.remove();
  })
}

const generateProfilesColumn2 = function(array){
  let i = 0;
  let spanChange = document.querySelector("#onlineTitleSpan");
  spanChange.textContent = array.length;

  //span.textContent = array.length;

  array.forEach((userProfile) => {

    i++
    //Outer Element
    let elementSection = document.querySelector(".column2__elementsection");
    let outerElement = document.createElement("div");
    outerElement.addEventListener("click", function(e){
      //console.log("I'm " + userProfile.name)
    })
    outerElement.classList.add("column2__elementouter", `oeg${i}`)
    elementSection.appendChild(outerElement);

    //Samotný element
    let element = document.createElement("div");
    element.classList.add("column2__element", `eg${i}`);
    document.querySelector(`.oeg${i}`).appendChild(element);

    //PFP element
    let elementPFP = document.createElement("div");
    elementPFP.classList.add("element-pfp", `epfpg${i}`);
    elementPFP.style.backgroundColor = userProfile["icon-color"];
    document.querySelector(`.eg${i}`).appendChild(elementPFP);

    //Status Icon
    let c = i; 
    //V prípade že používateľ je online
    if (userProfile["active-status"] === "online" && userProfile.flag !== "blocked" && userProfile.flag !== "pending"){
      let greencircle = document.createElement("div");
      greencircle.classList.add("online-circle", `ocg${c}`);
      greencircle.style.border = "3px solid rgb(45, 48, 53)";
      document.querySelector(`.epfpg${i}`).appendChild(greencircle);
    //V prípade že je používateľ away
    } else if (userProfile["active-status"] === "away" && userProfile.flag !== "blocked" && userProfile.flag !== "pending"){
      let awayCircle = document.createElement("div");
      let awaySubCircle = document.createElement("div");
      awayCircle.classList.add("away-circle", `acg${c}`);
      awayCircle.style.border = "3px solid rgb(45, 48, 53)";
      document.querySelector(`.epfpg${i}`).appendChild(awayCircle);
      awaySubCircle.classList.add("away-subcircle")
      awaySubCircle.style.backgroundColor = "rgb(45, 48, 53)"
      document.querySelector(`.acg${c}`).appendChild(awaySubCircle);
    //V prípade že je používateľ not Disturb
    } else if (userProfile["active-status"] === "notdisturb" && userProfile.flag !== "blocked" && userProfile.flag !== "pending"){
      let notDisturbCircle = document.createElement("div");
      let notDisturbSubCircle = document.createElement("div");
      notDisturbCircle.classList.add("notdisturb-circle", `ndcg${c}`);
      notDisturbCircle.style.border = "3px solid rgb(45, 48, 53)";
      document.querySelector(`.epfpg${i}`).appendChild(notDisturbCircle);
      notDisturbSubCircle.classList.add("notdisturb-subcircle");
      document.querySelector(`.ndcg${c}`).appendChild(notDisturbSubCircle);
    } else if (userProfile["active-status"] === "offline" && userProfile.flag !== "blocked" && userProfile.flag !== "pending") {
      let offlineCircle = document.createElement("div");
      let offlineSubCircle = document.createElement("div");
      offlineCircle.classList.add("offline-circle", `offcg${c}`);
      document.querySelector(`.epfpg${i}`).appendChild(offlineCircle);
      offlineSubCircle.classList.add("offline-subcircle");
      document.querySelector(`.offcg${c}`).appendChild(offlineSubCircle);
    } else if (userProfile.flag === "pending") {
      console.log(userProfile);
    }
    
    //Display Name, ID
    let displayName = document.createElement("h2");
    displayName.classList.add("column2_element-text", `dng${i}`);
    displayName.innerHTML = `${userProfile.name} <span class="c2-text-span">#${userProfile.id}</span><br><span class="c2-text-span-under">${generateProfileActivity(userProfile)}</span>`
    document.querySelector(`.eg${i}`).appendChild(displayName);

    if (userProfile.flag !== "blocked" && userProfile.flag !== "pending"){
      generateElementIcons(i, userProfile);
    }
  })
}

const buttonVisuals = function(buttonID){
  let inputSearch = document.querySelector(".inputsearch__input");
  inputSearch.value = "";
  let magnifyingGlass = document.querySelector("#magnifyingGlass");
  let closeIcon = document.querySelector("#InputColumn2CloseIcon");
  magnifyingGlass.style.display = "block";
  closeIcon.style.display = "none";

  let changeTitle = document.querySelector("#statusTab");
  let tabs = document.querySelectorAll(".afterSep");
  tabs.forEach(function(oneButton){
    oneButton.classList.remove("headerselected");
  })
  if (buttonID === "all") {
    let allButton = document.getElementById("allHeaderContainer");
    allButton.classList.add("headerselected");
    changeTitle.textContent = "all";
  } else if (buttonID === 'pending'){
    let pendingButton = document.getElementById("pendingHeaderContainer");
    pendingButton.classList.add("headerselected");
    changeTitle.textContent = "pending";
  } else if (buttonID === 'online'){
    let onlineButton = document.getElementById("onlineHeaderContainer");
    onlineButton.classList.add("headerselected");
    changeTitle.textContent = "online";
  } else if (buttonID === 'blocked'){
    let blockedButton = document.getElementById("blockedHeaderContainer");
    blockedButton.classList.add("headerselected");
    changeTitle.textContent = "blocked";
  }

}

function removeAllEventListenersOnSearchInput(){
  let searchInput = document.querySelector(".inputsearch__input");
  console.log(searchInput)
  searchInput.removeEventListener("input", handleInputSearchInputOnline);
  searchInput.removeEventListener("input", handleInputSearchInputAll);
  searchInput.removeEventListener("input", handleInputSearchInputPending);
  searchInput.removeEventListener("input", handleInputSearchInputBlocked);

  let closeButton = document.querySelector("#InputColumn2CloseIcon");
  closeButton.removeEventListener("click", handleCloseButtonClickOnline);
  closeButton.removeEventListener("click", handleCloseButtonClickAll);
  closeButton.removeEventListener("click", handleCloseButtonClickPending);
  closeButton.removeEventListener("click", handleCloseButtonClickBlocked);
}

//Searching Online Tab
function handleInputSearchInputOnline(e) {
  removeProfilesColumn2();
  const filteredUsers = currentOnline.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()));
  generateProfilesColumn2(filteredUsers);

  // Animácia ikonky
  let magnifyingGlass = document.querySelector("#magnifyingGlass");
  let closeIcon = document.querySelector("#InputColumn2CloseIcon");

  if (e.target.value === "") {
      magnifyingGlass.style.display = "block";
      closeIcon.style.display = "none";
  } else {
      magnifyingGlass.style.display = "none";
      closeIcon.style.display = "block";
  }
}

//Searching All tab
function handleInputSearchInputAll(e) {
  removeProfilesColumn2();
  const filteredUsers = currentAll.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()));
  generateProfilesColumn2(filteredUsers);

  // Animácia ikonky
  let magnifyingGlass = document.querySelector("#magnifyingGlass");
  let closeIcon = document.querySelector("#InputColumn2CloseIcon");

  if (e.target.value === "") {
      magnifyingGlass.style.display = "block";
      closeIcon.style.display = "none";
  } else {
      magnifyingGlass.style.display = "none";
      closeIcon.style.display = "block";
  }
}

//Searching Pending tab
function handleInputSearchInputPending(e) {
  removeProfilesColumn2();
  const filteredUsers = currentPending.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()));
  generateProfilesColumn2(filteredUsers);

  // Animácia ikonky
  let magnifyingGlass = document.querySelector("#magnifyingGlass");
  let closeIcon = document.querySelector("#InputColumn2CloseIcon");

  if (e.target.value === "") {
      magnifyingGlass.style.display = "block";
      closeIcon.style.display = "none";
  } else {
      magnifyingGlass.style.display = "none";
      closeIcon.style.display = "block";
  }
}

//Searching Blocked tab
function handleInputSearchInputBlocked(e) {
  removeProfilesColumn2();
  const filteredUsers = currentBlocked.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()));
  generateProfilesColumn2(filteredUsers);

  // Animácia ikonky
  let magnifyingGlass = document.querySelector("#magnifyingGlass");
  let closeIcon = document.querySelector("#InputColumn2CloseIcon");

  if (e.target.value === "") {
      magnifyingGlass.style.display = "block";
      closeIcon.style.display = "none";
  } else {
      magnifyingGlass.style.display = "none";
      closeIcon.style.display = "block";
  }
}

//Pridanie Eventu na close tlačítko - Online Tab
function handleCloseButtonClickOnline(){
  let input = document.querySelector(".inputsearch__input");
  input.value = "";
  let closeIcon = document.querySelector("#InputColumn2CloseIcon");
  closeIcon.style.display = "none";
  let magnifyingGlass = document.querySelector("#magnifyingGlass");
  magnifyingGlass.style.display = "block";
  removeProfilesColumn2();
  generateProfilesColumn2(currentTabNames);
}

//Pridanie Eventu na close tlačítko - All Tab
function handleCloseButtonClickAll(){
  let input = document.querySelector(".inputsearch__input");
  input.value = "";
  let closeIcon = document.querySelector("#InputColumn2CloseIcon");
  closeIcon.style.display = "none";
  let magnifyingGlass = document.querySelector("#magnifyingGlass");
  magnifyingGlass.style.display = "block";
  removeProfilesColumn2();
  generateProfilesColumn2(currentAll);
}

//Pridanie Eventu na close tlačítko - Pending Tab
function handleCloseButtonClickPending(){
  let input = document.querySelector(".inputsearch__input");
  input.value = "";
  let closeIcon = document.querySelector("#InputColumn2CloseIcon");
  closeIcon.style.display = "none";
  let magnifyingGlass = document.querySelector("#magnifyingGlass");
  magnifyingGlass.style.display = "block";
  removeProfilesColumn2();
  generateProfilesColumn2(currentPending);
}

//Pridanie Eventu na close tlačítko - Blocked Tab
function handleCloseButtonClickBlocked(){
  let input = document.querySelector(".inputsearch__input");
  input.value = "";
  let closeIcon = document.querySelector("#InputColumn2CloseIcon");
  closeIcon.style.display = "none";
  let magnifyingGlass = document.querySelector("#magnifyingGlass");
  magnifyingGlass.style.display = "block";
  removeProfilesColumn2();
  generateProfilesColumn2(currentBlocked);
}


const generateActivityColumn3 = function(usersArray){
  let i = 0;
  usersArray.sort((a, b) => a.name.localeCompare(b.name));

  usersArray.forEach((oneUser) => {
    i++
    //console.log(oneUser.activity);
    let activityElement = document.createElement("div");
    activityElement.classList.add("activity-element", `AEG${i}`)
    document.querySelector(".activity-column").appendChild(activityElement);

    let activityElementInner = document.createElement("div");
    activityElementInner.classList.add("activity-element__inner", `AEIG${i}`);
    document.querySelector(`.AEG${i}`).appendChild(activityElementInner);

    let elementPFP = document.createElement("div");
    elementPFP.classList.add("element-pfp", `AEIPFPG${i}`)
    elementPFP.style.backgroundColor = oneUser["icon-color"];
    activityElementInner.appendChild(elementPFP);

    if (oneUser["active-status"] === "online"){
      let onlineCircle = document.createElement("div");
      onlineCircle.classList.add("online-circle", `c3ocg${i}`);
      elementPFP.appendChild(onlineCircle);
    } else if (oneUser["active-status"] === "away"){
      let awayCircle = document.createElement("div");
      awayCircle.classList.add("away-circle", `c3acg${i}`);
      let awaySubCircle = document.createElement("div");
      awaySubCircle.classList.add("away-subcircle");
      elementPFP.appendChild(awayCircle);
      awayCircle.appendChild(awaySubCircle);
    } else if (oneUser["active-status"] === "notdisturb"){
      let notDisturbCircle = document.createElement("div");
      notDisturbCircle.classList.add("notdisturb-circle", `c3ndcg${i}`);
      let notDisturbSubCircle = document.createElement("div");
      notDisturbSubCircle.classList.add("notdisturb-subcircle");
      elementPFP.appendChild(notDisturbCircle);
      notDisturbCircle.appendChild(notDisturbSubCircle);
    }

    let displayName = document.createElement("h2");
    displayName.classList.add("column2_element-text", "c3-activity-text")
    displayName.innerHTML = `${oneUser.name}<span class="c2-text-span-under"><br>${oneUser.activity} - </span><span class="c2-text-span-under c3-time">${Math.floor(Math.random() * 5) + 1}h</span>`;
    activityElementInner.appendChild(displayName);

    let activityIcon = document.createElement("div");
    activityIcon.classList.add("activity-element-icon");

    activityElementInner.appendChild(activityIcon);

    if (oneUser.activity === "League of Legends") {
      let innerDetails = document.createElement("div");
      innerDetails.classList.add("activity-element__innerDetails");
      activityElement.appendChild(innerDetails);
      activityIcon.style.backgroundImage = "url(../icons/leagueofLegendsSmallLogo.png)";

      innerDetails.innerHTML = `
        <div class="c3-large-icon" style="background-image: url(../icons/leagueoflegendsLogo.png);"></div>
        <div class="details-text">
          <h2 class="details-text-heading">
            <span class="C3Line1">Playing a game</span><br>
            <span class="C3Line2">In Game</span><br>
            <span class="C3Line3 c3g${i}">00:00 elapsed</span>
          </h2>
        </div>
      `;

  
    const timerElement = document.querySelector(`.c3g${i}`);
    let minutes = Math.floor(Math.random() * 40) + 1;
    let seconds = Math.floor(Math.random() * 59) + 1;
    let timerInterval;

    function updateTimer() {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }

      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");
      timerElement.textContent = formattedMinutes + ":" + formattedSeconds + " elapsed";
    }

    timerInterval = setInterval(updateTimer, 1000);



    } else if (oneUser.activity === "Grand Theft Auto V"){
      activityIcon.style.backgroundImage = "url(../icons/gtaVlogo.png)";
    } else if (oneUser.activity === "Minecraft"){
      activityIcon.style.backgroundImage = "url(../icons/minecraftLogo.png)";
    } else if (oneUser.activity === "Spotify"){
      activityIcon.style.backgroundImage = "url(../icons/spotifyLogo.png)"
    }



  })
}