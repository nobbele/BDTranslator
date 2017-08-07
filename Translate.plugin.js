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
		var node_modulepath = "/Users/nobbele"; // change this to yours, it's usually in you user folder like "/Users/name" (You MUST put forward slash not backwards slash and it must begin with a forward slash)
		// change these 2 to the languages you want
		var LangTo = "en";
		var LangFrom = "ja";
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
}
return Translate
})();
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
