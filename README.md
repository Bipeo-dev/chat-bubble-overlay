# ChatBubble - Un mini overlay pour les streamers muets
Petit overlay twitch permettant d'afficher sur son stream les messages envoyés sur son propre chat, sous la forme d'une bulle, donnant un repère visuel aux viewers

<img width="529" height="384" alt="image" src="https://github.com/user-attachments/assets/d4dcab69-77e8-4348-a834-329baefda5fa" />

## Fonctionnalités
- Aucune dépendance, une fois le fichier chargé sur OBS, fonctionne de lui même
- Aucune authentification requise, il faut néanmoins bien configurer l'overlay avant utilisation (voir plus bas)
- Personnalisable, que ce soit en terme de position, de taille et de couleur
- Supporte les émotes twitch, fixe et animés
- Augmente l'aura de 10

## Installation
- Extraire l'archive de l'overlay dans le dossier de votre choix
- Sur OBS, ajouter une nouvelle source navigateur, en fichier local, et selectionnez le fichier `index.html`
- Mettre en longueur et largeur de fenêtre respectivement "1920" et "1080"
- Laisser le code css de base
- Voila !
  
<img width="634" height="451" alt="image" src="https://github.com/user-attachments/assets/0d06af1a-6e8c-41a9-b1e2-bb1c370e2ab0" />

> ⚠️ Il faudra cependant configurer votre projet avant de l'ajouter, car sinon il sera sur ses paramètres par défaut !

## Configuration
> La configuration se fait à l'intérieur du projet, il suffit de modifier le contenu du fichier `config.js` localisé dans le dossier `js`
> Le fichier de configuration peut s'ouvrir avec n'importe quel éditeur de texte, un simple bloc note est suffisant

exemple de configuration :
```js
const CONFIG = {
  // indiquer le pseudo twitch de sa chaine (par exemple bipeo, ou autre)
  channel: "bipeo",

  // options de style
  style: {
    // couleur du texte des bulles de chat, accepte un mot clé, une couleur hexadecimale ou rgb au format rgb(255,255,255) ou transparente au format rgba(255,255,255,1)
    textColor: "#2061B6",
    // couleur du texte des bulles de chat, accepte un mot clé, une couleur hexadecimale ou rgb au format rgb(255,255,255) ou transparente au format rgba(255,255,255,1)
    backgroundColor: "#cde3ff",
    // rondeur de bordure, plus la valeur est elevée, plus la rondeur est intense
    borderRadius: "50px",
    // taille de la police
    fontSize: "18px",
  },

  chat: {
    // longueur maximale du cadre du chat
    maxWidth: "400px",

    // alignement du chat, accepte seulement trois valeurs : "left" | "center" | "right"
    alignment: "left",

    // delais en ms avant qu'un message disparait
    disappearDelay: 8000,
  },
};
```

## Autre trucs
- Si vous avez des questions hésitez pas à rejoindre mon [discord](https://t.co/lYetDu3GOI)
- N'hésitez pas à check mon [twitch](https://www.twitch.tv/bipeo), mon [twitter](https://x.com/Bipeo_dev) et mon [bluesky](https://bsky.app/profile/bipeo.bsky.social) !!
- Pour toute demande d'ajout de fonctionnalité je vous invite à la dev vous même et à faire une PR !!!!!!!!!
- Soyez des nerds

<img width="50" height="50" alt="IMG_4400" src="https://github.com/user-attachments/assets/b26cc827-a50d-49a6-92bf-da34f955ca52" />

