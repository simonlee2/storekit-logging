const https = require('https');

const logStoreKitComparisonWebhook = '/services/T029T9B5B/B04TE1NC8HW/RTaaWglH8A0VYQsFXr26igfw';

function processLogs(logs) {
    logs.forEach((log) => {
        const payload = makeLogErrorPayload(log);
        notifySlack(logStoreKitComparisonWebhook, payload);
    });
}

function makeLogErrorPayload(log) {
    const message = `##${log.message}`;
    const sk1Value = log.sk1;
    const sk2Value = log.sk2;
    const sk1Debug = JSON.stringify(log.debugInfo.sk1, null, 4);
    const sk2Debug = JSON.stringify(log.debugInfo.sk2, null, 4);
    const body = JSON.stringify({
        "text": "",
        "username": "StoreKit Logger",
        "icon_emoji": "money_mouth_face",
        "attachments": [
            {
                "fallback": log.message,
                "pretext": log.message,
                "color": "#D00000",
                "fields": [
                    {
                        "title": "StoreKit 1 Value",
                        "value": `\`\`\`${sk1Value}\`\`\``
                    },
                    {
                        "title": "StoreKit 2 Value",
                        "value": `\`\`\`${sk2Value}\`\`\``
                    }
                ]
            },
            {
                "fallback": "Debug Info",
                "color": "#D0D000",
                "fields": [
                    {
                        "title": "StoreKit 1 Debug",
                        "value": `\`\`\`${sk1Debug}\`\`\``
                    },
                    {
                        "title": "StoreKit 2 Debug",
                        "value": `\`\`\`${sk2Debug}\`\`\``
                    }        
                ]
            }
        ]
    });

    return body;
};

function notifySlack(webhook, payload) {
    const options = {
        hostname: "hooks.slack.com",
        path: webhook,
        method: "POST"
    };
    const req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`Problem hitting slack webhook: ${e.message}`);
    });

    req.write(payload);
    req.end();
}

module.exports = {
    processLogs,
};