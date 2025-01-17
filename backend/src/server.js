const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const subscription = require('./routes/subscription');
const stakingInfo = require('./routes/staking-info');
const availabilityHistory = require('./routes/history');

const telegramBotWebhook = require('./routes/webhooks/telegram');
const btcpayWebhook = require('./routes/webhooks/btcpay');

app.use(cors({
    exposedHeaders: ['Content-Disposition'],
}));

// starts all cronjobs
require('./cronjobs');

app.use(bodyParser.json());

app.use('/subscription', subscription);
app.use('/get-staking-info', stakingInfo);
app.use('/history', availabilityHistory);
app.use(`/telegram${process.env.TELEGRAM_BOT_TOKEN}`, telegramBotWebhook);
app.use(`/btcpay${process.env.BTCPAY_STORE_ID}`, btcpayWebhook);

module.exports = app;
