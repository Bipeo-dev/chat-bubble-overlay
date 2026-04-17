# ChatBubble - Un mini overlay pour les streamers muets
Petit overlay twitch permettant d'afficher sur son stream les messages envoyés sur son propre chat, sous la forme d'une bulle, donnant un repère visuel aux viewers

<img width="529" height="384" alt="image" src="https://github.com/user-attachments/assets/d4dcab69-77e8-4348-a834-329baefda5fa" />

## Fonctionnalités
- Aucune dépendance, une fois le fichier chargé sur OBS, fonctionne de lui même
- Aucune authentification requise, il faut néanmoins bien configurer l'overlay avant utilisation (voir plus bas)
- Personnalisable, que ce soit en terme de position, de taille et de couleur
- Supporte les émotes twitch, fixe et animées
- Augmente l'aura de 10

## Installation OBS
- Extraire l'archive de l'overlay dans le dossier de votre choix
- Sur OBS, ajouter une nouvelle source navigateur, en fichier local, et selectionnez le fichier `index.html`
- Mettre en longueur et largeur de fenêtre ce que vous souhaitez, mais notez les bien, elles seront nécessaires pour la configuration
- Laisser le code css de base
- Voila !
  
<img width="634" height="451" alt="image" src="https://github.com/user-attachments/assets/0d06af1a-6e8c-41a9-b1e2-bb1c370e2ab0" />

> ⚠️ Il faudra cependant configurer votre projet avant que celui-ci ne fonctionne !

## Configuration
> La configuration se fait à l'intérieur du projet, il suffit de renommer le fichier `config.js.example` en `config.js` localisé dans le dossier `js` et d'en modifier le contenu
> Le fichier de configuration peut s'ouvrir avec n'importe quel éditeur de texte, un simple bloc note est suffisant

exemple de configuration :
```js
const CONFIG = {
  // Indiquer le pseudo twitch de sa chaine (par exemple bipeo, ou autre)
  channel: "bipeo",

  // Options de style :
  // Les couleurs acceptent le mots clés, couleur hexadécimale rgb au format rgb(255,255,255) et rgba (transparence) format rgba(255,255,255,1)
  style: {
    // Couleur du texte des bulles de chat
    textColor: "#2061B6",
    // Couleur du fond des bulles de chat
    backgroundColor: "#cde3ff",
    // Rondeur de bordure, plus la valeur est élevée, plus la rondeur est intense
    borderRadius: "50px",
    // Épaisseur de la bordure, plus la valeur est élevée, plus la bordure est épaisse : 0px pour aucune bordure
    borderWidth: "2px",
    // Taille de la police
    fontSize: "18px",
  },

  // Options de message :
  chat: {
    // Position d'apparition du chat, accepte seulement deux valeurs : "haut" | "bas"
    apparition: "bas",
    // Position des bulles de chat, accepte seulement trois valeurs : "gauche" | "droite" | "centre"
    position: "gauche",
    // Flèche de la bulle, accepte seulement trois valeurs : "gauche" | "droite" | "" 
    // Si vous mettez "", aucune flèche sur la bulle
    arrow: "gauche",

    // Delais en ms avant qu'un message disparait
    // Si vous mettez -1, le message ne disparaitra jamais
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

