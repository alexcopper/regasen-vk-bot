var auth = require('./auth.js');
var VK = require('vk-io-plus');

exports.init = function(settings, name, exceptions, unique_settings) {
    auth.init(settings).then((token) => {
        try {
            vk = new VK({
                token: token
            });
        } catch (err) {
            console.log(err);
        }

        vk.longpoll();

        vk.on('chat.rename', (info) => {
            for (var i = 0; i < exceptions.length; i++) {
                if (info.chat == exceptions[i]) {
                    return true;
                }
            }
            for (var i = 0; i < unique_settings.length; i++) {
                if (unique_settings[i].id == info.chat) {
                    if (unique_settings[i].title == info.title) return true;
                    info.rename(unique_settings[i].title);
                    return true;
                }
            }
            if (info.title != name)
                info.rename(name);
        });
    }).catch((error) => {
        console.log('error', error);
    });
}