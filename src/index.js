const qrcode = require('qrcode-terminal');
const fs = require('fs')

const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

});

client.on('message', async message => {
	if(message.body.match('/nataren|Emi|Emiliano|bot|emi/i')) {
		message.reply('Hola, Estas hablando con el bot de Emi, en que puedo ayudarte? \n\nEmi estará de vuelta en unos instantes :D');
	}

  if (message.hasMedia && message.type === 'image' && message.body === '-sticker') {
    const media = await message.downloadMedia();
    const sticker = new MessageMedia(media.mimetype, media.data, media.filename);
    message.reply(sticker, undefined, { sendMediaAsSticker: true });
}
});



client.initialize();
