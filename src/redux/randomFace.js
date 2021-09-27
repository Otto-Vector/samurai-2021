let imageURL = 'https://source.unsplash.com/random/64x64?face'

const randPos = (min = 5, max = 850) => Math.floor(Math.random() * (max - min + 1)) + min
let randomFaceImage = (pos = randPos()) => `${imageURL}?${pos * 5}`

export {randomFaceImage}
