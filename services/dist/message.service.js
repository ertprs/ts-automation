"use strict";
exports.__esModule = true;
var venom_bot_1 = require("venom-bot");
venom_bot_1["default"]
    .create()
    .then(function (client) { return start(client); })["catch"](function (erro) {
    console.log(erro);
});
function start(client) {
    client.onMessage(function (message) {
        if (message.body === 'bruh' && message.isGroupMsg === false) {
            client
                .sendText(message.from, 'Welcome Venom 🕷')
                .then(function (result) {
                console.log('Result: ', result); //return object success
            })["catch"](function (erro) {
                console.error('Error when sending: ', erro); //return object error
            });
        }
    });
}
