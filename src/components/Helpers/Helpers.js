//Names
export default function getRandomName() {
  const adjs = ["Tom", "Jenny", "Lea", "Nick", "Blue", "Red", "Green"];
  const nouns = ["Clank: ", "Ratchet: ", "Cooper: ", "Nion: "];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    " " +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

//Colors
function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export { randomColor };
