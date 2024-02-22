
require('dotenv').config(); 
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.get('/marvel/photos', async (req, res) => {
  try {
    const publicKey = process.env.MARVEL_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_PRIVATE_KEY;
    const timestamp = new Date().getTime();
    const hash = require('crypto').createHash('md5').update(timestamp + privateKey + publicKey).digest('hex');
    
    const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);
    
    const photos = response.data.data.results.map(character => ({
      id: character.id,
      name: character.name,
      thumbnail: character.thumbnail ? `${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}` : null
    }));

    res.json();
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des photos depuis l\'API Marvel' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});


