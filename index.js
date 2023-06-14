const fs = require('fs');
const telegraf = require('telegraf');
require("dotenv").config();
const ocrSpaceApi = require('ocr-space-api');

var options =  { 
    apikey: process.env.OCR_TOKEN,
    language: 'eng', // Português
    imageFormat: 'image/png', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
    isOverlayRequired: true
  };
const path = '/home/rusmanov/Pictures/Screenshots';
const bot = new telegraf.Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    fs.watch(path, (eventType, filename) => {
            if (eventType === 'rename') {
                ocrSpaceApi.parseImageFromLocalFile(path + '/' + filename, options)
            .then(async function (parsedResult) {
                const user_input = parsedResult.parsedText;
                ctx.sendMessage(user_input);
            })
        }
    })
})

bot.launch();
