require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); 

const app = express();
const PORT = 3000;

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
const timestamp = new Date().getTime();
const hash = require('crypto').createHash('md5').update(timestamp + privateKey + publicKey).digest('hex');

app.use(cors());

app.get('/marvel/spider', async (req, res) => {
  try {

    
    const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=100&nameStartsWith=Spider`);

    const photos = response.data.data.results.map(character => ({
      id: character.id,
      name: character.name,
      thumbnail: character.thumbnail ? `${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}` : null
    })).filter(char => {
      return !char.thumbnail.includes('image_not_available')
    });

    res.json(photos);
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des photos depuis l\'API Marvel' });
  }
});


app.get('/marvel/search/:characterName', async (req, res) => {
  try {
    
    const characterName = req.params.characterName;

    const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=100&nameStartsWith=${characterName}`);

    const characters = response.data.data.results.map(character => ({
      id: character.id,
      name: character.name,
      thumbnail: character.thumbnail ? `${character.thumbnail.path}/portrait_medium.${character.thumbnail.extension}` : null
    })).filter(char => {
      return char.thumbnail && !char.thumbnail.includes('image_not_available');
    });

    res.json(characters);
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des personnages' });
  }
});


app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});


