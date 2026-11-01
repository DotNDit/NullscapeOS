/*  |||||||
      Time
    |||||||  */

setInterval(function() {

    document.querySelector("#timePart").innerHTML = new Date().toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    document.querySelector("#datePart").innerHTML = new Date().toLocaleString(['en-GB'], {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    });

}, 1000);

/*  ||||||||||||
     Initialize
    ||||||||||||  */

initializeWindow(document.getElementById("welcomewindow"));
initializeWindow(document.getElementById("noteswindow"));

function initializeWindow(element) {
    dragElement(element);
    addWindowTapHandling(element);
}

/*  |||||||
      Drag
    |||||||  */

// call drag element

function dragElement(element) {
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;

    let dynamicHeaderId = element.id.replace("window", "header");
    let dynamicHeader = document.getElementById(dynamicHeaderId);

    if (dynamicHeader) {
        dynamicHeader.onmousedown = startDragging;
        dynamicHeader.ontouchstart = startDragging;
    }
    else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;

        let dynamicCloseButtonId = element.id.replace("window", "close");
        let dynamicHideButtonId = element.id.replace("window", "hide");

        if(e.target.closest('#' + dynamicCloseButtonId) || e.target.closest('#' + dynamicHideButtonId)) {
            return; // Prevent dragging when clicking on the close button
        }

        e.preventDefault();

        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;

        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

/*  ||||||||||||||
     Open & Close
    ||||||||||||||  */

var sideBar = document.getElementById("sidebar");
var appContainer = document.getElementById("appcontainer");

let biggestIndex = 1;
sideBar.style.zIndex = 1;
appContainer.style.zIndex = 2;


document.addEventListener("click", function(e) {
    if(e.target.closest("#welcomeopen") || e.target.closest("#welcomeclose") || e.target.closest("#welcomehide")) {
        handleOpenClose(document.getElementById("welcomewindow"), e);
    }
    else if(e.target.closest("#notesopen") || e.target.closest("#notesclose") || e.target.closest("#noteshide")) {
        handleOpenClose(document.getElementById("noteswindow"), e);
    }
});

const windowHide = {
    welcomeHide: 0,
    notesHide: 0
}

//left off here

function handleOpenClose(element, click){
    let openButton = element.id.replace("window", "open");
    let closeButton = element.id.replace("window", "close");
    let hideButton = element.id.replace("window", "hide");

    let hide = element.id.replace("window", "Hide");

    if(click.target.closest("#" + openButton)){
        if(windowHide[hide] === 1){
            unhideWindow(element)
        }
        else if(windowHide[hide] === 0){
            if(element.id == "noteswindow" && (sideBar && sideBar.children.length === 0)){
                openNotes();
            }

            openWindow(element)
        }
    }
    else if(click.target.closest("#" + closeButton)) {
        windowHide[hide] = 0;
        closeWindow(element);
    }
    else if(click.target.closest("#" + hideButton)) {
        windowHide[hide] = 1;

        if(element.id == "noteswindow"){
            openNotes();
        }

        closeWindow(element);
    }

//  window[hide] = hideWindow;
}

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {

    let topBar = document.getElementById(element.id.replace("window", "header"));

    element.style.display = "flex";
    element.style.top = "50%";
    element.style.left = "50%";
    element.style.transform = "translate(-50%, -50%)";

    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
    sideBar.style.zIndex = biggestIndex + 1;
    appContainer.style.zIndex = biggestIndex + 2;
}

function unhideWindow(element) {

    let topBar = document.getElementById(element.id.replace("window", "header"));

    element.style.display = "flex";

    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
    sideBar.style.zIndex = biggestIndex + 1;
    appContainer.style.zIndex = biggestIndex + 2;
}

/* ||||||||
    Select
   ||||||||  */

//       pls do as feature
/*
let selectedIcon = undefined;

function selectIcon(element) {

    element.classList.add("selected");

    selectedIcon = element;
}

function deselectIcon(element) {

    element.classList.remove("selected")

    selectedIcon = undefined;
}

function handleIconTap(element) {
    if(element.classList.contains("selected")){

        deselectIcon(element);

        openWindow(window);
    }
    else {
        selectIcon(element);
    }
}
*/
/*  |||||||||
     Z-Index
    |||||||||  */

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}

function handleWindowTap(element) {

    var topBar = document.getElementById(element.id.replace("window", "header"));

    biggestIndex++;
    element.style.zIndex = biggestIndex;    
    topBar.style.zIndex = biggestIndex + 1;
    sideBar.style.zIndex = biggestIndex + 1;
    appContainer.style.zIndex = biggestIndex + 2;

}

var defaultNotes = [
  {
    title: "Welcome",
    date: "06/28/2023",
    content: `
      <div contenteditable="True">

        <span contenteditable="true" style="display: block; text-align: center;">Welcome to <strong>Pondering Notes!</strong>

          </br>

          </br>

          <img src="" style="width: 96px; border-radius: 16px" />

          </br>
                
          </br>

          This is a place in which ponderer himself lends his power to you, feel free to store anything here!

        </span>

        <blockquote

          style="background-color: #F9F9F9; margin-top: 16x; margin-bottom: 16px; margin-left: 0px; margin-right: 0px; padding: 16px; border-radius: 16px;" contenteditable="true">

          <i>
          
          Anything is possible.     

          </i>

        </blockquote>

        <span contenteditable="true" style="padding: 16px; display: block; text-align: center; line-height: 125%;">

          You could write things like ideas, events, or anything really

        </span>

      </div>
    `
  }
]

function loadNotes() {
  try {
    var saved = JSON.parse(localStorage.getItem("pondering_notes"));
    if (Array.isArray(saved) && saved.length > 0) return saved;
  } catch (e) {
    console.warn("Saved notes were corrupted, resetting.", e);   
  }
  return JSON.parse(JSON.stringify(defaultNotes));            
}

function saveNotes() {
  localStorage.setItem("pondering_notes", JSON.stringify(notes_content));
}

var notes_content = loadNotes();
saveNotes();

var currentActiveIndex = parseInt(localStorage.getItem("active_note_index"), 10);
if (isNaN(currentActiveIndex) || currentActiveIndex < 0 || currentActiveIndex >= notes_content.length) {
  currentActiveIndex = 0;
}

var sideBar;
var notesContentArea;

function setNotesContent(index) {
  var sidebarDivs = sideBar.querySelectorAll(".note-tab-item");

  if (index === undefined || index < 0 || !notes_content[index]) {
    notesContentArea.innerHTML = "";
    currentActiveIndex = -1;
    localStorage.setItem("active_note_index", -1);
    sidebarDivs.forEach(function (div) { div.style.backgroundColor = "transparent"; });
    return;
  }

  currentActiveIndex = index;
  localStorage.setItem("active_note_index", index);
  notesContentArea.innerHTML = notes_content[index].content;

  for (var i = 0; i < sidebarDivs.length; i++) {
    sidebarDivs[i].style.backgroundColor = (i === index) ? "#e8e8e8" : "transparent";
  }
}

function addToSideBar(index) {
  var note = notes_content[index];
  var newDiv = document.createElement("div");

  newDiv.className = "note-tab-item";
  newDiv.setAttribute("data-note-index", index);
  newDiv.style.position = "relative";
  newDiv.style.border = "solid";
  newDiv.style.borderRadius = "20px";
  newDiv.style.borderWidth = "1px";
  newDiv.style.textAlign = "center";
  newDiv.style.width = "100px";
  newDiv.style.height = "40px";
  newDiv.style.margin = "5px";
  newDiv.style.marginBottom = "0px";
  newDiv.style.paddingTop = "10px";
  newDiv.style.cursor = "pointer";

  if (index === currentActiveIndex) {
    newDiv.style.backgroundColor = "#e8e8e8";
  }

  var titleEl = document.createElement("p");
  titleEl.style.fontSize = "14px";
  titleEl.style.margin = "0px";
  titleEl.textContent = note.title;

  var dateEl = document.createElement("p");
  dateEl.style.fontSize = "10px";
  dateEl.style.margin = "0px";
  dateEl.textContent = note.date;

  newDiv.appendChild(titleEl);
  newDiv.appendChild(dateEl);

  var deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = "&times;";
  deleteBtn.style.position = "absolute";
  deleteBtn.style.top = "0px";
  deleteBtn.style.right = "8px";
  deleteBtn.style.backgroundColor = "#ff5f56";
  deleteBtn.style.color = "white";
  deleteBtn.style.fontSize = "16px";
  deleteBtn.style.fontWeight = "bold";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.borderRadius = "10px";
  deleteBtn.style.width = "15px";
  deleteBtn.style.height = "15px";

  deleteBtn.addEventListener("mousedown", function (e) {
    e.stopPropagation();
    e.preventDefault();
    deleteNote(index);
  });

  newDiv.appendChild(deleteBtn);

  newDiv.addEventListener("click", function () {
    setNotesContent(index);
  });

  sideBar.appendChild(newDiv);
}

function openNotes() {
  var addNoteElement = document.getElementById("addnote");

  sideBar.innerHTML = "";

  notes_content.forEach(function (note, i) {
    addToSideBar(i);
  });

  if (addNoteElement) {
    sideBar.appendChild(addNoteElement);
  }

  if (notes_content.length > 0) {
    if (currentActiveIndex < 0 || currentActiveIndex >= notes_content.length) {
      currentActiveIndex = 0;
    }
    setNotesContent(currentActiveIndex);
  } else {
    setNotesContent(undefined);
  }
}

function deleteNote(index) {
  if (index < 0 || index >= notes_content.length) return;

  notes_content.splice(index, 1);
  saveNotes();

  if (index < currentActiveIndex) {
    currentActiveIndex--;
  } else if (index === currentActiveIndex) {
    currentActiveIndex = Math.min(index, notes_content.length - 1);
  }

  openNotes();
}

function addNote() {
  var dynamicNewNote = {
    title: "Note " + notes_content.length,
    date: new Date().toLocaleDateString("en-GB"),
    content: `
      <div contenteditable="true">
        <span style="display: block; text-align: center; line-height: 125%; border-radius: 20px;">Hello there, this is your very own note!</span>
      </div>
    `
  };

  notes_content.push(dynamicNewNote);
  saveNotes();

  currentActiveIndex = notes_content.length - 1;
  openNotes();
}

function init() {
  sideBar = document.getElementById("sideBar") || document.getElementById("sidebar");
  notesContentArea = document.getElementById("notescontent");

  if (!sideBar || !notesContentArea) {
    console.error("Pondering Notes: couldn't find #sideBar or #notescontent in the page.");
    return;
  }

  openNotes();

  notesContentArea.addEventListener("input", function () {
    if (currentActiveIndex >= 0 && notes_content[currentActiveIndex]) {
      notes_content[currentActiveIndex].content = this.innerHTML;
      saveNotes();
    }
  });

  var addBtn = document.getElementById("addnote");
  if (addBtn) addBtn.addEventListener("click", addNote);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}



var wallpapers = [
  "./images/Mart Wallpaper.png",
  "./images/wallpaper2.png",
  "./images/wallpaper3.png"
];

var currentWallpaper = parseInt(localStorage.getItem("wallpaper_index"), 10);
if (isNaN(currentWallpaper) || currentWallpaper >= wallpapers.length) {
  currentWallpaper = 0;
}

function applyWallpaper() {
  document.body.style.backgroundImage = "url('" + encodeURI(wallpapers[currentWallpaper]) + "')";
  localStorage.setItem("wallpaper_index", currentWallpaper);
}

applyWallpaper(); 

var bgButton = document.getElementById("bgbutton");
if (bgButton) {
  bgButton.addEventListener("click", function () {
    currentWallpaper = (currentWallpaper + 1) % wallpapers.length; 
    applyWallpaper();
  });
}
