// Save options to chrome.storage.sync.
function save_options() {
    var magniStr = document.getElementById('strength').value;
    var magniSize = document.getElementById('size').value;
    var magniLoc = document.getElementsById('location');
    chrome.storage.sync.set({
        magnifierStrength: magniStr,
        magnifierSize: magniSize,
        magnifierLocation: magniLoc

    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        if (magniStr <= 0 || magniSize <= 0 ){
            status.textContent = 'Non-positive number detected, the magnifier might not behave as expected.'
        } else {
            status.textContent = 'Options saved.';
        }
        setTimeout(function() {
            status.textContent = '';
        }, 1550);
    });
};

// Restore data using the preferences stored in browser storage chrome
function restore_options() {
    chrome.storage.sync.get({
        magnifierStrength: 1,
        magnifierSize: 300,
        magnifierLocation: "top-left"
    }, function(items) {
        document.getElementById('strength').value = items.magnifierStrength;
        document.getElementById('size').value = items.magnifierSize;
        document.getElementById('location').value = items.magnifierLocation;
    });
};

// Reset the preference to default values
function reset_options(){
    chrome.storage.sync.clear(function(){
        restore_options();
        var status = document.getElementById('status');
        status.textContent = 'Options reset.';
        setTimeout(function() {
            status.textContent = '';
        }, 1200);
    });
};

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('reset').addEventListener('click', reset_options);