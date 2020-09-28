var username, noteName, textEntered, target; // Declare Variables

function getTarget(e) { //Declare function
    if (!e) { // If event object not present
        e = window.event; // Use IE5-8 or earlier fall back
    }
    return e.target || e.srcElement; // Return the target event
}

// This is where the record / pause controls and functions go...
// See right hand page

function writeLabel(e) { // Declare function
    target = getTarget(e); // Get target of event
    noteName = document.getElementById('noteName'); // Element that holds note
    textEntered = document.getElementById('noteInput').value; // Element that holds note
    noteName.textContent = textEntered; // Update note text

    // PREVENT THE LINK FROM TAKING YOU ELSEWHERE
    if (e.preventDefault) { //If preventDefault() supported
        e.preventDefault(); // Stop default action
    } else { // Otherwise
        e.returnValue = false; // IF fallback: stop default action
    }
}

function recordControls(e) {
    target = getTarget(e); // Get target of event

    if (e.preventDefault) { //If preventDefault() supported
        e.preventDefault(); // Stop default action
    } else {
        e.returnValue = false; // IF fallback: stop default action
    }

    var attr = target.getAttribute('data-state'); // Declare variable for target attribute() event
    if (attr === 'record') { // Declare attr as strict equal as record 
        target.textContent = 'stop'; // set text to stop
        target.setAttribute('data-state', 'stop'); // Set data-state attr to stop
    } else { // Otherwise
        target.textContent = 'record'; // Set text record
        target.setAttribute('data-state', 'record'); // Set data-state attr to record
    }
}

username = document.querySelector('form'); // Element that holds note
target = document.getElementById('link'); // Element that holds note

if (target.addEventListener || username.addEventListener) { // IF event listener supported
    username.addEventListener('keyup', function(e) { // For any click document
        writeLabel(e); // Call recorderControls()
    }, false); // Capture during bubble phase

    // If input event fires on username input call writeLabel()
    target.addEventListener('click', function(e) { // For any click document
        recordControls(e); // Call recordControls()
    }); // Capture during bubble phase
} else { // Otherwise
    username.attachEvent('onkeyup', function(e) { // IE fallback: any click
        writeLabel(e); // Calls writeLabel()
    });

    // If keyup event fires on username input call writeLabel()
    target.attachEvent('onclick', function(e) {
        recordControls(e); // Calls recordControls
    });
}