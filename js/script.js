const chatContainer = document.querySelector(".chat"); // miaou

// injection de config pour la longueur max de la chatbox
chatContainer.style.maxWidth = CONFIG.chat.width;
chatContainer.style.minHeight = CONFIG.chat.height;

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

client.on("message", (channel, tags, message, self) => {
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
  existingBubbles.forEach((b, i) => {
    const lastRect = b.getBoundingClientRect();
    const dy = firstRects[i].top - lastRect.top;
    b.style.transition = "none";
    b.style.transform = `translateY(${dy}px)`;
    b.getBoundingClientRect();
    b.style.transition = "transform 0.3s ease";
    b.style.transform = "translateY(0)";
  });

  if (CONFIG.chat.disappearDelay != -1) {
    setTimeout(() => {
      bubble.classList.add("bubble-out");

      // autre delais pour appliquer la transition de depart avant de delete l'element
      setTimeout(() => {
        bubble.remove();
      }, 300);

    }, CONFIG.chat.disappearDelay);
  } else {
    window.scrollBy({top: bubble.offsetHeight + 10, left: 0, behavior: "smooth"})
  }
});
