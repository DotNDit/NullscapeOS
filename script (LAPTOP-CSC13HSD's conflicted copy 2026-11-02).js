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

//call add window tap handling

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

var notes_content = [
  {
    title: "Welcome",
    date: "06/28/2023",
    content: `
      <p contenteditable="True">

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

          <i>Time Will Tell
                
            </br>

            ~ Thomas

          </i>

        </blockquote>

        <span contenteditable="true" style="padding: 16px; display: block; text-align: center; line-height: 125%;">

          You could write things like ideas, events, or anything really

        </span>

        

      </p>
    `
  }
]

function setNotesContent(index) {

    var notesContent = document.getElementById("notescontent")

    notesContent.innerHTML = notes_content[index].content
}

function addToSideBar(index) {
    var note = notes_content[index];
    var newDiv = document.createElement("div");

    newDiv.style.border = "solid";
    newDiv.style.borderRadius = "20px";
    newDiv.style.borderWidth = "1px";
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "column";

//fix

    newDiv.style.paddingLeft = "auto";
    newDiv.style.paddingRight = "auto";

    newDiv.innerHTML = `
      <p style="margin: 0px">${note.title}</p>

      <p style="font-size: 12px; margin: 0px;">${note.date}</p>
    `;

    newDiv.addEventListener("click", function() { 
        setNotesContent(index); 
    });

    sideBar.appendChild(newDiv);
}

//bugfix open note

openNotes();

function openNotes(){

    setNotesContent(0)

    for (let i = 0; i < notes_content.length; i++) {
     addToSideBar(i);
    }
}