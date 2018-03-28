var VK = require('vk-io-plus');

var settings1 = {
    app: 6324993,
    pass: '',
    phone: '+'
};

var settings2 = {
    app: 6324993,
    pass: '',
    phone: '+'
};

var exceptions_chat_id_rename = [50, 35, 53, 70, 72]; //Ид бесед в которых не надо менять название
var unique_chat_name = [
    { id: 71, title: 'СССР 2.0 | 12.01.2018' },
];

require('./anti_kick.js').init(settings1, settings2, 458796047, 421534614);
require('./anti_rename.js').init(settings1, '', exceptions_chat_id_rename, unique_chat_name);
require('./anti_delete.js').init(settings1, [421534614]); //[421534614] массив кто может юзать антиудаление смс

var commands = {
    '!когда': function(user_id, args) {
        var message = '';

        switch (getRandomInt(1, 4)) {
            case 1:
                message = 'завтра';
                break;
            case 2:
                message = 'сегодня';
                break;
            case 3:
                message = 'через ' + getRandomInt(5, 30) + ' лет';
                break;
            case 4:
                message = 'через ' + getRandomInt(5, 30) + ' дней';
                break;
        }

        if (args.length == 2) {
            if (args[0] == 'я') args[0] = 'ты';
            message = args[1] + ' ' + args[0] + ' ' + message;
        }
        return message;
    }
};


require('./router.js').init(settings1, commands);
require('./http_server.js').init();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//*/