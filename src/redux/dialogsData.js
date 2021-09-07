let imageURL = 'https://source.unsplash.com/random/64x64?face'

const randPos = (min=5,max=850) => Math.floor(Math.random() * (max - min + 1)) + min
let randomFaceImage = (pos = randPos())=> `${imageURL}?${pos*5}`


let dialogs = [
    {
        id: 1,
        name: 'Dimych',
        imageURL: randomFaceImage,
    },
    {
        id: 2,
        name: 'Andrew',
        imageURL: randomFaceImage,
    },
    {
        id: 3,
        name: 'Sveta',
        imageURL: randomFaceImage,
    },
    {
        id: 4,
        name: 'Sasha',
        imageURL: randomFaceImage,
    },
    {
        id: 5,
        name: 'Viktor',
        imageURL: randomFaceImage,
    },
    {
        id: 6,
        name: 'Valera',
        imageURL: randomFaceImage,
    }
]

let messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How is your it-kamasutra?'},
    {id: 3, message: 'Yo'},
    {id: 4, message: 'YoMi'},
    {id: 4, message: 'YoG'},
    {id: 6, message: 'YoZh'}
]

export {dialogs, messages}
