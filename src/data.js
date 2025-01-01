// Fichier: data.js
export { categories, creerPoubelles, dechets, niveaux };

// Configuration des déchets
const dechets = [
   { id: 1, nom: "Boîte en conserve", categorie: "metal", image: "boite_en_conserve.png" },
   { id: 2, nom: "Canette", categorie: "metal", image: "canette.png" },
   { id: 3, nom: "Couche", categorie: "non_triable", image: "couche.png" },
   { id: 4, nom: "Journal", categorie: "papier", image: "journal.png" },
   { id: 5, nom: "Papier froissé", categorie: "papier", image: "papier_froisse.png" },
   { id: 6, nom: "Pile", categorie: "non_triable", image: "pile.png" },
   { id: 7, nom: "Pot de yaourt", categorie: "plastique", image: "pot_de_yaourt.png" },
   { id: 8, nom: "Reste de repas", categorie: "organique", image: "reste_de_repas.png" },
];

// Configuration des catégories de poubelles
const categories = [
    { id: 1, nom: "Plastique et Métaux", categorie: ["plastique", "metal"], couleurCorps: 0xffff00, couleurCouvercle: 0xffd700 }, // Jaune
    { id: 2, nom: "Papier et Carton", categorie: "papier", couleurCorps: 0x87ceeb, couleurCouvercle: 0x4682b4 }, // Bleu
    { id: 3, nom: "Organique", categorie: "organique", couleurCorps: 0x8b4513, couleurCouvercle: 0x654321 }, // Brun
    { id: 4, nom: "Non triable", categorie: "non_triable", couleurCorps: 0x808080, couleurCouvercle: 0x696969 }, // Gris
];

// Configuration des niveaux
const niveaux = [
   {
       id: 1,
       nom: "Débutant",
       vitesse: 1,
       typesDechets: ["plastique", "organique"],
       vies: 5,
   },
   {
       id: 2,
       nom: "Apprenti",
       vitesse: 1.5,
       typesDechets: ["plastique", "organique", "papier"],
       vies: 5,
   },
   {
       id: 3,
       nom: "Intermédiaire",
       vitesse: 2,
       typesDechets: ["plastique", "organique", "papier", "metal"],
       vies: 4,
   },
   {
       id: 4,
       nom: "Avancé",
       vitesse: 2.5,
       typesDechets: ["plastique", "organique", "papier", "metal", "non_triable"],
       vies: 3,
   },
   {
       id: 5,
       nom: "Expert",
       vitesse: 3,
       typesDechets: ["plastique", "organique", "papier", "metal", "non_triable"],
       vies: 2,
   },
];


function creerPoubelles(scene) {
    const positions = [
        { x: 150, y: 500 },
        { x: 450, y: 500 },
        { x: 750, y: 500 },
        { x: 1050, y: 500 },
    ];

    const poubelles = [];

    categories.forEach((cat, index) => {
        // Conteneur pour regrouper les éléments de la poubelle
        const poubelle = scene.add.container(positions[index].x, positions[index].y);
        poubelle.setSize(500, 800); // Taille de la poubelle
        poubelle.setInteractive();
        poubelle.categorie = cat.categorie;

        // Dessin du corps de la poubelle (forme rectangulaire)
        const corps = scene.add.graphics();
        corps.fillStyle(cat.couleurCorps, 1);
        corps.fillRoundedRect(-100, -150, 200, 300, 10); // Dessin du corps
        poubelle.add(corps);

        // Dessin du couvercle 
        const couvercle = scene.add.graphics();
        couvercle.fillStyle(cat.couleurCouvercle, 1);
        couvercle.fillRoundedRect(-80, -120, 160, 20, 10); // Dessin du couvercle
        poubelle.add(couvercle);

        // Dessin d'une charnière pour l'ouverture
        const charniere = scene.add.graphics();
        charniere.fillStyle(0x555555, 1); // Couleur grise pour la charnière
        charniere.fillRect(-5, -100, 10, 10); // Petite barre au centre supérieur
        poubelle.add(charniere);

        // Ajout du logo de recyclage au centre du corps
        const symbole = scene.add.text(0, 0, '♻', {
            font: '40px Arial',
            color: '#ffffff',
            align: 'center',
        });
        symbole.setOrigin(0.5);
        poubelle.add(symbole);

        // Ajout de la poubelle au tableau
        poubelles.push(poubelle);
    });

    return poubelles;
}
