var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/;

  //if(request.text && botRegex.test(request.text)) {
  if(request.name === "sim s" || request.name === "sim") {
    console.log("user "+ request.user_id + " has spoken");
    this.res.writeHead(200);
    var msg = randCollusionMsg();
    postMessage(msg);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function randCollusionMsg() {
  var msgs = [
    "* This member attempted to collude, thwarted only by the integrity of others.",
    "* The Houston Astros of fantasy football.",
    "* Forever tainted.",
    "* Lacks fantasy etiquette, stuck with the 'strick.",
    "* Shady. And I'm not talking about Lesean McCoy."
  ];

  var index = Math.floor(Math.random() * msgs.length);
  return msgs[index];
}

function postMessage(botMessage) {
  var botResponse, options, body, botReq;

  //botResponse = cool();
  botResponse = botMessage

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;