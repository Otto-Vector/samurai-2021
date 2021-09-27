import {randomFaceImage} from "./randomFace";

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

let header = 'Friends'

export {friends, header}
