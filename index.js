const express = require('express');
const dotenv = require('dotenv');
const logger = require('./util/logger');
const slackWebhookService = require('./services/slack_webhook_service');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.post('/logError', async (req, res) => {
    slackWebhookService.processLogs(req.body.logs);
    res.sendStatus(200);
})

app.get('*', async (_req, res) => {
    res.send(`"I'm not superstitious, but I am a little stitious."<br>—Michael Scott"`)
});

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
});