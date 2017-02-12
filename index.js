var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var baseURL = "https://thepiratebay.org/search/";
var suffixURL = "/0/100/205";
var transmissionCmd = "transmission-remote -n 'user:password*' -a ";
var sys = require('sys');
var exec = require('child_process').exec;

var array = fs.readFileSync('toget.txt', 'utf8').toString().split("\n");

if (array.length > 0) {
    array.forEach(function (entry) {

        var url = baseURL + encodeURIComponent(entry) + suffixURL;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(body),
                    magnetURL = $("a[title='Download this torrent using magnet']").attr('href');

                var torrentCommand = transmissionCmd + magnetURL;

                exec(torrentCommand, puts);
            } else {
                console.log("Error (request): " + error);
            }
        });
    });
}

function puts(error, stdout, stderr) { sys.puts(stdout) }