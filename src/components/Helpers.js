//Imena
export default function getRandomName() {
  const adjs = ["Tom", "Jenny", "Lea", "Nick"];
  const nouns = ["Clank: ", "Ratchet: ", "Cooper: ", "Nion: "];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    " " +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

//Boja
function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

export { randomColor };
