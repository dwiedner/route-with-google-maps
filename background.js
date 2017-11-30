const contextMenuId = "route-with-google-maps-contextmenu";

browser.contextMenus.create({
    id: contextMenuId,
    title: browser.i18n.getMessage("contextMenuTitle"),
    contexts: ["selection"],
	icons: { "16": "GoogleMaps.svg" }
	
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === contextMenuId) {
		var tld = GetTld();
		var routeDestination = GetRouteDestination(info);
		
		GetRouteStart(function(routeStart) {
			browser.tabs.create({
				active: true,
				url: BuildUrl(tld, routeStart, routeDestination)
			});
		});		
    }
});

function BuildUrl(tld, routeStart, routeDestination) {
	var url = "https://www.google." + tld + "/maps/";
	
	if (routeStart !== "undefined" && routeStart != null && routeStart != "") {
		url += "dir/" + routeStart;
	} else {
		url += "search";
	}
	
	url += "/" + routeDestination + "/";
	
	return url;
}

function GetTld() {
	var uiLanguage = browser.i18n.getUILanguage();
	if (uiLanguage === "de" || uiLanguage.startsWith("de-")) {
		return "de";
	} else {
		return "com";
	}
}

function GetRouteStart(callback) {
	var storageItemPromise = browser.storage.sync.get('startAddress');
	storageItemPromise.then((res) => {
		var address = res.startAddress;
		if (address === "undefined" || address == null) {
			address = "";
		} else {
			address = address.trim();
		}
		
		callback(encodeURI(address));
	});
}

function GetRouteDestination(info) {
	return encodeURI(info.selectionText.replace("\r\n", " ").replace("\n", " ").trim());
}