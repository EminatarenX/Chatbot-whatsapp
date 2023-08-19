const qrcode = require('qrcode-terminal');
const { buscarVideo, youtubeURL } = require('./helpers/index.js');

require('dotenv').config()


const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
    },
    authStrategy: new LocalAuth({ clientId: 'whatsapp-bot-emi'}),
});

client.on('qr', qr => {
    // qrcode.generate(qr, {small: true});
    console.log(qr)
});

client.on('ready', () => {
    console.log('Client is ready!');

});

client.on('message', async message => {
	if(message.body.match('/nataren|Emi|Emiliano|bot|oye|wey|we|contesta|Oye|emiBuenos dias|buenos dias|Hola/i')) {
		message.reply('Hola, Estas hablando con el bot de Emi, en que puedo ayudarte?🧐 \n\nEmi estará de vuelta en unos instantes :D \n\nPara ver los comandos disponibles escribe: \n/help');
        return
    }

    if(message.hasMedia && message.type === 'image' && message.body === '-sticker') {
        const media = await message.downloadMedia();
        const sticker = new MessageMedia(media.mimetype, media.data, media.filename);
        message.reply(sticker, undefined, { sendMediaAsSticker: true });

        return
    }else if(!message.hasMedia && message.body === '-sticker') {
        message.reply('No enviaste una imagen, por favor envía una imagen junto con la palabra -sticker para convertirla en sticker 😇.');
        return 
    }

    if(message.body === '/help') {
        message.reply('Estos son los comandos disponibles: \n\n-sticker: \nConvierte una imagen en sticker👌🏼 \n\n-song: \nBusca una cancion de Youtube🎥 \n\nsi escribes mi nombre automáticamente el bot responderá un mensaje por predeterminado 👾.');
        return
    }

    if(message.body.includes('-song') && message.body.replace('-song','').length === 0) {
        message.reply('Escribe -song "titulo de la cancion que busques" \n\nEjemplo:\n-song gatitos\n\n😇.');
        return

    }else if(message.body.includes('-song') && message.body.replace('-song','').length > 0){
        const busqueda = message.body.replace('-song','')

        const songEncontrado = await buscarVideo(busqueda)
        const id = songEncontrado.id.videoId
    
        const url = `${youtubeURL}${id}`

        message.reply(`🔎 ${songEncontrado.snippet.title}\n\n${url}`);
        return
    }
    
});





client.initialize();
