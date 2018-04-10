document.getElementsByTagName('head')[0].appendChild(document.createElement('script')).src = '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js'


var out = []; 
var btn = $("a[ng-click='selectPage(page.number, $event)']");

console.log("Found " + btn.length + " pages. Searching download links...")

for (var i = 0; i < btn.length; i++) {
	btn[i].click();
	await sleep(1000);
	console.log(i+1 + "/" + btn.length);
	$(".history-list li a").each(function(i) {
		out.push($(this)[0].href.replace("/users", "/rest/v1/users") + "/export?format=TCX");
	}); 
}
console.log("Done. Downloading all files at once...");

download(out);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function download(files) {
    $.each(files, function(key, value) {
        $('<iframe></iframe>')
            .hide()
            .attr('src', value)
            .appendTo($('body'))
            .load(function() {
                var that = this;
                setTimeout(function() {
                    $(that).remove();
                }, 100);
            });
    });
}