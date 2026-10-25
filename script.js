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

dragElement(document.getElementById("welcomewindow"));

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

/*
var welcomeScreen = document.querySelector("#welcomewindow");

function closeWindow(element) {
  element.style.display = "none";
}

function openWindow(element) {
  element.style.display = "flex";

  element.style.top = "50%";
  element.style.left = "50%";
  element.style.tranform = "trans(-50%, -50%)"
}

function reOpenWindow(element) {
    element.style.display = "flex";
}

var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", function(){
    closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function(){
    openWindow(welcomeScreen);
};
*/

let welcomeHide = 0;

document.addEventListener("click", function(e) {

    let welcome = document.getElementById('welcomewindow');
    

    if(e.target.closest('#welcomeopen')){
        if(welcomeHide === 0){
            welcome.style.top = "50%";
            welcome.style.left = "50%";
            welcome.style.transform = "translate(-50%, -50%)";
        }
        
        welcome.style.display = 'flex';
    }
    else if(e.target.closest('#welcomeclose')) {
        welcomeHide = 0;
        welcome.style.display = 'none';
    }
    else if(e.target.closest('#welcomehide')) {
        welcomeHide = 1;
        welcome.style.display = 'none';
    }
});