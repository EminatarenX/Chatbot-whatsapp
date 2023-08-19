const { google }  = require('googleapis');
const fs = require('fs')
require('dotenv').config();

const GOOGLE_KEY = process.env.GOOGLE_KEY;

const youtube = google.youtube({
    version: 'v3',
    auth: GOOGLE_KEY
})

async function buscarVideo(busqueda) {
  try {
    
    const {data} = await youtube.search.list({
        part: 'id,snippet',
        q: busqueda,
        maxResults: 1,
        type: 'video'
    })

    const video = data.items[0]

    return video

  } catch (error) {
    console.log(error)
  }

}



const youtubeURL = process.env.YOUTUBE_URL

module.exports = {
    buscarVideo,
    youtubeURL,

}