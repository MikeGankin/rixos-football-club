const PHRASES = [
  "под руководством известных тренеров",
  "с участием звездных футболистов",
  "с рефери FIFA и UEFA",
];

const TYPE_DELAY = 70;
const ERASE_DELAY = 35;
const HOLD_DELAY = 1400;

export default function what(root = document) {
  const target = root.querySelector(".what__poster-typed");
  if (!target) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const phrase = PHRASES[phraseIndex];
    target.textContent = phrase.slice(0, charIndex);

    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      setTimeout(tick, HOLD_DELAY);
      return;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % PHRASES.length;
    }

    charIndex += deleting ? -1 : 1;
    setTimeout(tick, deleting ? ERASE_DELAY : TYPE_DELAY);
  };

  tick();
}
