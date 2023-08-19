const OpenAI = require('openai')
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function generarRespuesta (promp){

  try {

    const response = await openai.chat.completions.create({
      messages: [{ 
        role: 'user', 
        content: promp
        
      }],
      model: 'gpt-3.5-turbo',
  });

    return response.choices[0].message.content; 
    
  } catch (error) {
    console.log(error)
  }
  
}

module.exports = {
    generarRespuesta,
}