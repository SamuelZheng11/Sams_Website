// Written by ChatGPT
export function getRandomHexColor(): string {
    const hexChars = "0123456789ABCDEF";
    let hexcode = "#";
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * hexChars.length);
      hexcode += hexChars[randomIndex];
    }

    return hexcode;
}