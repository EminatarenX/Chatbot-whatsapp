const qrcode = require('qrcode-terminal');
const fs = require('fs')

const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox']
    },
});

client.on('qr', qr => {
    // qrcode.generate(qr, {small: true});
    console.log(qr)
});

client.on('ready', () => {
    console.log('Client is ready!');

});

client.on('message', async message => {
	if(message.body.match('/nataren|Emi|Emiliano|bot|oye|wey|we|contesta|Oye|emi/i')) {
		message.reply('Hola, Estas hablando con el bot de Emi, en que puedo ayudarte?🧐 \n\nEmi estará de vuelta en unos instantes :D \n\nPara ver los comandos disponibles escribe: /help');
	}

    if(message.hasMedia && message.type === 'image' && message.body === '-sticker') {
        const media = await message.downloadMedia();
        const sticker = new MessageMedia(media.mimetype, media.data, media.filename);
        message.reply(sticker, undefined, { sendMediaAsSticker: true });
    }else if(!message.hasMedia && message.body === '-sticker') {
        message.reply('No enviaste una imagen, por favor envía una imagen junto con la palabra -sticker para convertirla en sticker 😇.');
    }

    if(message.body === '/help') {
        message.reply('Estos son los comandos disponibles: \n\n-sticker: Convierte una imagen en sticker \n\nsi escribes mi nombre automáticamente el bot responderá un mensaje por predeterminado.');
    }
});



client.initialize();
