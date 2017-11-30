function saveOptions(e) {
  browser.storage.sync.set({
    startAddress: document.querySelector("#startAddress").value
  });
  e.preventDefault();
}

function restore() {
	browser.storage.sync.clear();
	restoreLocalization();
	restoreOptions();
}

function restoreLocalization() {
	document.querySelector("#startAddressDescription").innerHTML = browser.i18n.getMessage("optionsStartAddressDescription");
	document.querySelector("#startAddressLabel").innerHTML = browser.i18n.getMessage("optionsStartAddressLabel");
	document.querySelector("#saveButton").innerHTML = browser.i18n.getMessage("optionsSaveButton");
}

function restoreOptions() {
	var storageItem = browser.storage.sync.get('startAddress');
	storageItem.then((res) => {
		var address = res.startAddress;
		// if (routeStart === "undefined" || routeStart == null) {
			// address = "";
		// }
		
		document.querySelector("#startAddress").value = address;
  });
}

document.addEventListener('DOMContentLoaded', restore);
document.querySelector("form").addEventListener("submit", saveOptions);
