//Helper for making ajax, fetch, others requests
const request = require('request');

function makeRequest(url="", method="GET", postData={}, options={}) {
    return new Promise((resolve, reject) => {
        if(Object.keys(options).length === 0) {
            if(method.toLowerCase() == "get") {
                options = {
                    method: method,
                    url: url,
                };
            } else {
                options = {
                    method: method,
                    body: Object.assign({}, postData),
                    json: true,
                    url: url,
                };
            }
        }
        request(options, function (error, response) {
            if (!error && response.statusCode == 200) {
                resolve(response.body);
            } else {
                reject(error);
            }
        });
    });
}

module.exports = {
    makeRequest,
};