import {createApi} from "unsplash-js";

const unsplash = createApi({
  accessKey: 'bJp02jGekvDqAaAFc8lMBK2xQRCesTtYm2TqMl7EwcI',
});

let images
unsplash.photos.getRandom ({
    query: 'face',
    count: 10
  }
).then(result => {
  if (result.errors) {
    // handle error here
    console.log('error occurred: ', result.errors[0]);
  } else {
    // handle success here
    images = result.response;
  }
});

console.log(images)

// urn:ietf:wg:oauth:2.0:oob

export {images}
