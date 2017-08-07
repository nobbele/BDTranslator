//META{"name":"Translate"}*//
var Translate = (function() {
class Translate {
	getName(){return "Translate"}
	getShortName() {return "Translate"}
	getDescription(){return "Translates text for you"}
	getVersion(){return "0.0.1"}
	getAuthor(){return "Nobbele"}
	load(){}
	unload(){}
	start() {
		var setting = [];
		window.ebEnabled = true;
		var self = this;
		var em = localStorage["emoteBlacklist"];
		if(em == undefined) return;
		JSON.parse(em).forEach(function(emote) {
			console.log(emote);
			setting.push(emote);
		});
		var node_modulepath = setting[0]; // change this to yours, it's usually in you user folder like "/Users/name" (You MUST put forward slash not backwards slash and it must begin with a forward slash)
		// change these 2 to the languages you want
		var LangTo = setting[1];
		var LangFrom = setting[2];
		// main
		$('body').keydown(function(e){
			if(e.keyCode=="113")
			{
				if(getSelectedText() != "") {
					var translate = require(node_modulepath + '/node_modules/node-google-translate-skidz');
					translate({
						text: getSelectedText(),
						source: LangFrom,
						target: LangTo
					}, function(result) {
						alert(getSelectedText() + " => " + result.translation);
					});
				} 
				e.preventDefault();
			}
		});
	}
	stop(){}
	observer(e) {}
	getSettingsPanel() {
	var em = localStorage["emoteBlacklist"];

    var html = '';
    html += '<h2>Emote Blacklist</2>';
    html += '<textarea id="emoteBlistTa" style="width:100%; min-height:200px;">';
    if(em != undefined) {
        JSON.parse(em).forEach(function(item) { 
            html += item + "\n";
        });
    }
    html += '</textarea>';
    html += '<button onclick="save()">Save</button>';
    html += '<span>Add emote names here to blacklist(1 per line)</span>';
	return html;
	}
}
return Translate
})();
function add(emote) {
    window.bemotes.push(emote);
}
function remove(emote) {
    var index = bemotes.indexOf(emote);
    if(index > -1) {
        window.bemotes.splice(index, 1);
    }
}
function clear() {
    var self = this;
    var em = localStorage["emoteBlacklist"];
    if(em == undefined) return;
    var em = JSON.parse(em);
    em.forEach(function(emote) {
        remove(emote);
});
}
function save() {
		clear();
		var blist = [];
		$("#emoteBlistTa").val().split("\n").forEach(function(item) { 
			blist.push(item);
		});
		localStorage["emoteBlacklist"] = JSON.stringify(blist);
	}
//setInterval(Translate, 1000);
// selection objects will differ between browsers
function getSelectedText() {
    var sel, text = "";
    if (window.getSelection) {
        text = "" + window.getSelection();
    } else if ( (sel = document.selection) && sel.type == "Text") {
        text = sel.createRange().text;
    }
    return text;
}
