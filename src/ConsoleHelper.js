//https://en.m.wikipedia.org/wiki/ANSI_escape_code#Colors

const frontColors = {
  'white': 37,
  'red': 31,
  'black': 30,
  'green': 32,
}

const backColors = {
  'white': 47,
  'red': 41,
  'black': 40,
  'green': 42,
}

export function colorize(line, frontColor, backColor){
  frontColor = frontColor ? frontColor : "white"
  backColor = backColor ? backColor : "black"

  return `\x1b[${frontColors[frontColor]}m\x1b[${backColors[backColor]}m${line}\x1b[0m\x1b[0m`
}