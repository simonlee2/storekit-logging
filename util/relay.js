const dotenv = require('dotenv');
const https = require('https');
const logger = require('./logger');

dotenv.config();

const test_relay_host = process.env.TEST_RELAY_HOST;

function relayNotification(body) {
    logger.debug(`Relaying notification to ${test_relay_host}`);

    if (process.env.NODE_ENV !== 'production') {
        logger.warn(`Trying to relay notification outside production. NODE_ENV=${process.env.NODE_ENV}`);
        return;
    }

    const options = {
        hostname: test_relay_host,
        path: '/notifications',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
    };

    const req = https.request(options);
    req.once('error', (e) => {
        logger.error(`Error relaying notification: ${e.message}`);
    });

    req.write(JSON.stringify(body));
    req.end();
}

module.exports = {
    relayNotification
};