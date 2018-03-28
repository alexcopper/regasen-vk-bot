var auth = require('./auth.js');
var VK = require('vk-io-plus');

exports.init = function(settings, commands) {
    auth.init(settings).then((token) => {
        try {
            vk = new VK({
                token: token
            });
        } catch (err) {
            console.log(err);
        }

        vk.longpoll();
        vk.on('message', (info) => {
            var text = '';
            if (info.text.length < 50 && info.text.length > 0) {
                var _args = info.text.split(' ');
                var _cmd = _args[0];
                delete _args[0];
                var args = [];
                for (var i = 1; i < _args.length; i++) {
                    args.push(_args[i]);
                }
                for (var cmd in commands) {
                    if (cmd == _cmd) {
                        console.log(args);
                        text = commands[cmd](info.user, args);
                        info.send(text);
                        return true;
                    }
                }
            }
        });
    }).catch((error) => {
        console.log('error', error);
    });
}