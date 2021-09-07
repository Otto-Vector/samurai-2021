import {posts} from "./PostsData.js"
import {dialogs, messages} from "./dialogsData"
import {friends} from "./friendsData";

const state = {
    profilePage: {
      posts: posts
    },
    dialogsPage: {
        dialogs: dialogs,
        messages: messages
    },
    sidebar: {
        friends: friends
    }
}

export {state}
