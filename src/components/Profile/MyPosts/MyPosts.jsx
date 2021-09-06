import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

    // console.log(props)

    // let posts = [
    //     {id: 1, message: 'Hi, how are you?', likesCount: 12},
    //     {id: 2, message: 'It\'s my first post', likesCount: 11},
    //     {id: 3, message: 'It\'s my SECOND post', likesCount: 9}
    // ]

    let postsElements = props.prop.map( args => <Post {...args}/> )

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea>z</textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
}

export default MyPosts;
