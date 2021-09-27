// import {createApi} from "unsplash-js";
//
// const unsplash = createApi({
//   accessKey: 'bJp02jGekvDqAaAFc8lMBK2xQRCesTtYm2TqMl7EwcI',
// });
//
// let images, dialogs
// unsplash.photos.getRandom({
//     query: 'face',
//     count: 10
//   }
// ).then(result => {
//   if (result.errors) {
//     // handle error here
//     console.log('error occurred: ', result.errors[0]);
//   } else {
//     // handle success here
//     images = result.response;
//     console.log(images)
//
//     dialogs = [
//       {
//         id: 1,
//         name: 'Dimych',
//         imageURL: images[1].urls.thumb
//       },
//
//   }
// });


import {randomFaceImage} from "./randomFace";

let dialogs = [
  {
    id: 1,
    name: 'Dimych',
    imageURL: randomFaceImage(1),
  },
  {
    id: 2,
    name: 'Andrew',
    imageURL: randomFaceImage(2),
  },
  {
    id: 3,
    name: 'Sveta',
    imageURL: randomFaceImage(3),
  },
  {
    id: 4,
    name: 'Sasha',
    imageURL: randomFaceImage(4),
  },
  {
    id: 5,
    name: 'Viktor',
    imageURL: randomFaceImage(5),
  },
  {
    id: 6,
    name: 'Valera',
    imageURL: randomFaceImage(6),
  }
]

let messages = [
  {id: 1, message: 'Hi'},
  {id: 5, message: 'How is your it-kamasutra?(5)'},
  {id: 3, message: 'Yo'},
  {id: 4, message: 'YoMi'},
  {id: 4, message: 'YoG'},
  {id: 6, message: 'YoZh'},
  {id: 1, message: 'Hi'},
  {id: 2, message: 'How is your it-kamasutra?'},
  {id: 3, message: 'Yo'},
  {id: 4, message: 'YoMi'},
  {id: 4, message: 'YoG'},
  {id: 5, message: 'YoZh'},

]

export {dialogs, messages}
