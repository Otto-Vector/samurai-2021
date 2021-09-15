let imageURL = 'https://source.unsplash.com/random/64x64?face'

const randPos = (min=5,max=850) => Math.floor(Math.random() * (max - min + 1)) + min
let randomFaceImage = (pos = randPos())=> `${imageURL}?${pos}`


let friends = [
  {
    id: 32,
    imageURL: randomFaceImage(),
    name : 'Alex',
  },
  {
    id: 33,
    imageURL: randomFaceImage(),
    name : 'Max',
  },
  {
    id: 38,
    imageURL: randomFaceImage(),
    name : 'Aton',
  },
]

export {friends}
