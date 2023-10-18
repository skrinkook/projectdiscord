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


/*const generateSpeechBubble = function(){
    //Hlavný div
    let bodyElement = document.body;
    let speechBubble = document.createElement("div");
    speechBubble.classList.add("speech-bubble");
    speechBubble.style.animation = "increaseSize 0.15s forwards";
    bodyElement.appendChild(speechBubble);

    let rectangle = document.createElement("div");
    rectangle.classList.add("rectangle");
    speechBubble.appendChild(rectangle);

    let triangle = document.createElement("div");
    triangle.classList.add("triangle");
    speechBubble.appendChild(triangle);

    let p = document.createElement("p");
    p.classList.add("speech-bubble__text")
    p.innerHTML = "Create DM";
    rectangle.appendChild(p);


    speechBubble.style.top = "200px";
}
*/

const generateProfileActivity = function(activityFromArray){
  if (activityFromArray.activity === 0) {
    if (activityFromArray["active-status"] === "online"){
        return "Online";
    } else if (activityFromArray["active-status"] === "notdisturb"){
        return "Not Disturb";
    } else if (activityFromArray["active-status"] === "away"){
      return "Idle";
    } else if (activityFromArray["active-status"] === "offline"){
      return "Offline";
    }

  } else {
    if (activityFromArray.activity !== "Spotify") {
      return "Playing " + activityFromArray.activity;
    } else {
      return "Listening to " + activityFromArray.activity;
    }
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
    if (userProfile["active-status"] === "online"){
      let greencircle = document.createElement("div");
      greencircle.classList.add("online-circle", `ocg${c}`);
      greencircle.style.border = "3px solid rgb(45, 48, 53)";
      document.querySelector(`.epfpg${i}`).appendChild(greencircle);
    //V prípade že je používateľ away
    } else if (userProfile["active-status"] === "away"){
      let awayCircle = document.createElement("div");
      let awaySubCircle = document.createElement("div");
      awayCircle.classList.add("away-circle", `acg${c}`);
      awayCircle.style.border = "3px solid rgb(45, 48, 53)";
      document.querySelector(`.epfpg${i}`).appendChild(awayCircle);
      awaySubCircle.classList.add("away-subcircle")
      awaySubCircle.style.backgroundColor = "rgb(45, 48, 53)"
      document.querySelector(`.acg${c}`).appendChild(awaySubCircle);
    //V prípade že je používateľ not Disturb
    } else if (userProfile["active-status"] === "notdisturb"){
      let notDisturbCircle = document.createElement("div");
      let notDisturbSubCircle = document.createElement("div");
      notDisturbCircle.classList.add("notdisturb-circle", `ndcg${c}`);
      notDisturbCircle.style.border = "3px solid rgb(45, 48, 53)";
      document.querySelector(`.epfpg${i}`).appendChild(notDisturbCircle);
      notDisturbSubCircle.classList.add("notdisturb-subcircle");
      document.querySelector(`.ndcg${c}`).appendChild(notDisturbSubCircle);
    } else if (userProfile["active-status"] === "offline") {
      let offlineCircle = document.createElement("div");
      let offlineSubCircle = document.createComment("div");
      offlineCircle.classList.add("offline-circle", `offcg${c}`);
      document.querySelector(`.epfpg${i}`).appendChild(offlineCircle);
      offlineSubCircle.classList.add("offline-subcircle");
      document.querySelector(`.offcg${c}`).appendChild(offlineSubCircle);
    }
    
    //Display Name, ID
    let displayName = document.createElement("h2");
    displayName.classList.add("column2_element-text", `dng${i}`);
    displayName.innerHTML = `${userProfile.name} <span class="c2-text-span">#${userProfile.id}</span><br><span class="c2-text-span-under">${generateProfileActivity(userProfile)}</span>`
    document.querySelector(`.eg${i}`).appendChild(displayName);

    generateElementIcons(i, userProfile);
  })
}