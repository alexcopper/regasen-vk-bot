var VK = require('vk-io-plus');
exports.init = function(settings) {
    return new Promise((resolve, reject) => {
        var vk = new VK({});
        vk.setting(settings);

        const auth = vk.standaloneAuth();

        auth.run()
            .then((token) => {
                resolve(token);
            })
            .catch((error) => {
                reject(error);
            });
    });
}