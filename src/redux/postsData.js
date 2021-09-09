let imageURL = 'https://source.unsplash.com/random/64x64?face'

const randPos = (min=5,max=850) => Math.floor(Math.random() * (max - min + 1)) + min
let randomFaceImage = (pos = randPos())=> `${imageURL}?${pos}`

let posts = [
  {
    id: 1,
    imageURL: randomFaceImage(),
    message: 'Hi, how are you?',
    likesCount: 12
  },
  {
    id: 2,
    imageURL: randomFaceImage(),
    message: 'It\'s my first post',
    likesCount: 11
  },
  {
    id: 3,
    imageURL: randomFaceImage(),
    message: 'It\'s my SECOND post',
    likesCount: 9
  }
]

export {posts}
