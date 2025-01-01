
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Dossier où se trouvent vos fichiers HTML, JS, et ressources
app.use(express.static(path.join(__dirname)));

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
