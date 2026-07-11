const chatContainer = document.querySelector(".chat"); // miaou MIAOU

const apparition = CONFIG.chat.apparition;

if (apparition == "bas") {
  chatContainer.style.justifyContent = "flex-end";
}

const client = new tmi.Client({
  channels: [CONFIG.channel], // chaine du streamer voulu
});

// injection des styles depuis la config
var style = document.documentElement.style;
style.setProperty("--bubble-color", CONFIG.style.backgroundColor);
style.setProperty("--text-color", CONFIG.style.textColor);
style.setProperty("--border-radius", CONFIG.style.borderRadius);
style.setProperty("--font-size", CONFIG.style.fontSize);
style.setProperty("--border-width", CONFIG.style.borderWidth);

// j'ai volé une partie du code de ma propre DA parce que je fais ce que je veux
const parseMessage = (message, emotes) => {
  if (!emotes) return document.createTextNode(message);

  const replacements = [];
  for (const [emoteId, positions] of Object.entries(emotes)) {
    for (const pos of positions) {
      const [start, end] = pos.split("-").map(Number);
      replacements.push({ start, end, emoteId });
    }
  }
  replacements.sort((a, b) => a.start - b.start);

  const fragment = document.createDocumentFragment();
  let cursor = 0;

  for (const { start, end, emoteId } of replacements) {
    if (cursor < start) {
      fragment.appendChild(
        document.createTextNode(message.slice(cursor, start)),
      );
    }
    const img = document.createElement("img");
    img.src = `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/dark/2.0`; // je prie pour que ça marche pour tout
    img.alt = message.slice(start, end + 1);
    img.className = "emote";
    fragment.appendChild(img);
    cursor = end + 1;
  }

  if (cursor < message.length) {
    fragment.appendChild(document.createTextNode(message.slice(cursor)));
  }

  return fragment;
};

client.connect();

client.on("message", async (_channel, tags, message, self) => {
  if (self) return;
  if (!tags.badges || !tags.badges.broadcaster) return; // verif uniquement streamer

  const existingBubbles = [...chatContainer.querySelectorAll(".bubble")]; // petit flex avec le spread operator
  const firstRects = existingBubbles.map((b) => b.getBoundingClientRect()); // pareil ici ou ça map bien

  const bubble = document.createElement("div");
  bubble.className = "bubble";


  bubble.setAttribute("data-position", CONFIG.chat.position);

  if (CONFIG.chat.arrow)
    bubble.setAttribute("data-arrow-direction", CONFIG.chat.arrow);

  
  bubble.appendChild(parseMessage(message, tags.emotes));
  chatContainer.appendChild(bubble);


  // pour faire l'animation etou
  existingBubbles.forEach((bubble, i) => {
    const lastRect = bubble.getBoundingClientRect();
    const dy = firstRects[i].top - lastRect.top;
    bubble.animate(
      {
        transform: [`translateY(${dy}px)`, "translateY(0)"],
      },
      {
        duration: 300,
        easing: "ease",
      },
    );
  });

  if (CONFIG.chat.disappearDelay != -1) {
    await wait(CONFIG.chat.disappearDelay);
    await removeBubble(bubble).catch((err) =>
      console.error("Erreur lors de la suppression d'une bulle :", err),
    );
  } else {
    window.scrollBy({
      top: bubble.offsetHeight + 10,
      left: 0,
      behavior: "smooth",
    });
  }
});

/**
 * Supprime une bulle proprement
 *
 * @param {HTMLElement} bubble la bulle à faire disparaitre
 */
async function removeBubble(bubble) {
  bubble.classList.add("bubble-out");
  // trouve l'animation qui se lance à l'ajout de la classe bubble-out
  const bubbleOutAnimation = bubble
    .getAnimations()
    .find(
      (animation) =>
        animation instanceof CSSAnimation &&
        animation.animationName === "pop-out",
    );
  // et attendre qu'elle se termine si elle existe
  await bubbleOutAnimation?.finished;
  bubble.remove();
}

/**
 * Permet d'attendre {@link ms} (en millisecondes)
 *
 * @param {number} ms temps à attendre en millisecondes
 * @returns {Promise<void>} une promesse qui se résout après {@link ms} millisecondes
 */
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
