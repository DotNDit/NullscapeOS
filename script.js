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

/*  |||||||
      Drag
    |||||||  */

dragElement(document.getElementById("welcomewindow"));
dragElement(document.getElementById("noteswindow"));

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

document.addEventListener("click", function(e) {
    if(e.target.closest("#welcomeopen") || e.target.closest("#welcomeclose") || e.target.closest("#welcomehide")) {
        handleOpenClose(document.getElementById("welcomewindow"), e);
    }
    else if(e.target.closest("#notesopen") || e.target.closest("#notesclose") || e.target.closest("#noteshide")) {
        handleOpenClose(document.getElementById("noteswindow"), e);
    }
});

var welcomeHide = 0;
var notesHide = 0;

function handleOpenClose(element, click){
    let openButton = element.id.replace("window", "open");
    let closeButton = element.id.replace("window", "close");
    let hideButton = element.id.replace("window", "hide");

    let hide = element.id.replace("window", "") + "Hide";
    let hideWindow = window[hide];

    if(click.target.closest("#" + openButton)){
        if(hideWindow === 1){
            unhideWindow(element)
        }
        else if(hideWindow === 0){
            openWindow(element)
        }
    }
    else if(click.target.closest("#" + closeButton)) {
        hideWindow = 0;
        closeWindow(element);
    }
    else if(click.target.closest("#" + hideButton)) {
        hideWindow = 1;
        closeWindow(element);
    }

    window[hide] = hideWindow;
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
}

function unhideWindow(element) {
    element.style.display = "flex";

    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
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

let biggestIndex = 1;

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}

function handleWindowTap(element) {

    let topBar = document.getElementById(element.id.replace("window", "header"));

    biggestIndex++;
    element.style.zIndex = biggestIndex;    
    topBar.style.zIndex = biggestIndex + 1;
}