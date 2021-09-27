import {randomFaceImage} from "./randomFace";

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

let newPostText = ''
let newPostTextPlaceholder = 'add new post here'


export {posts, newPostText, newPostTextPlaceholder}
