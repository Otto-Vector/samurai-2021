import profileReducer, { profileActions, ProfileReducerStateType } from './profile-reducer'
import { PostType, ProfileType } from './types/types'

    let state: ProfileReducerStateType = {
        posts: [
            {
                id: 1,
                imageURL: 'randomFaceImage()',
                message: 'Hi, how are you?',
                likesCount: 12,
            },
            {
                id: 2,
                imageURL: 'randomFaceImage',
                message: 'It\'s my first post',
                likesCount: 11,
            },
            {
                id: 3,
                imageURL: 'randomFaceImage()',
                message: 'It\'s my SECOND post',
                likesCount: 9,
            },
        ] as PostType[],
        newPostTextPlaceholder: 'add new post here' as string | null,
        profile: null as ProfileType | null,
        isFetching: true,
        isAuthProfile: false,
        isFollowCurrent: false,
        isFollowFetching: false,

        profileStatusText: null as string | null,
        profileStatusFetching: true,
        profileStatusPlaceholder: 'input status here' as string | null,
    }

test( 'new post should be incremented', () => {
    const action = profileActions.addPost( 7, 'newPost 7' )
    const newState = profileReducer( state, action )

    expect(newState.posts.length).toBe(4)
} )


test( 'new post message should be added to 0 position as text', () => {
    const action = profileActions.addPost( 7, 'newPost 7' )
    const newState = profileReducer( state, action )

    expect(newState.posts[0].message).toBe('newPost 7')
} )

test( 'after deleting posts should be decremented (if id correct)', () => {
    const action = profileActions.deletePost( 3)
    const newState = profileReducer( state, action )

    expect(newState.posts.length).toBe(2)
} )
