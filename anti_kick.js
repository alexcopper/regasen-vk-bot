var vkObject = require('vk-io-plus');

var auth = require('./auth.js');
exports.init = function(settings1, settings2, user1_id, user2_id) {
    auth.init(settings1).then((token) => {
        try {
            auth.init(settings2).then((token2) => {
                user1 = new vkObject({
                    token: token
                });

                user1.longpoll();

                user1.on('chat.kick', (info) => {
                    if (info.kick == user2_id)
                        info.invite(info.kick);
                });

                user2 = new vkObject({
                    token: token2
                });

                user2.longpoll();

                user2.on('chat.kick', (info) => {
                    if (info.kick == user1_id)
                        info.invite(info.kick);
                });
            }).catch((error) => {
                console.log('error', error);
            });
        } catch (err) {
            console.log(err);
        }
    }).catch((error) => {
        console.log('error', error);
    });
}