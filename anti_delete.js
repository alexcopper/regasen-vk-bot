var VK = require('vk-io-plus');

var auth = require('./auth.js');
exports.init = function(settings, user_ids) {
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
            for (var i = 0; i < user_ids.length; i++) {
                if (user_ids[i] == info.user && info.text == '!!') {
                    vk.api.messages.getHistory({
                            peer_id: info.peer,
                            count: 10
                        })
                        .then(response_ => {
                            var forwards = [];
                            for (var i = 0; i < response_.items.length; i++) {
                                forwards.push(response_.items[i].id);
                            }

                            info.send('Анти редактирование и удаление', { forward_messages: forwards.join() });
                        })
                        .catch((error) => {
                            console.error(error);
                        });

                }
            }
        });
    }).catch((error) => {
        console.log('error', error);
    });
}