import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
    data: localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : []
}



const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer: (state, {payload}) => {
                state.data = [payload, ...state.data]
                localStorage.setItem('posts', JSON.stringify(state.data))},
            prepare: (title, content) => ({
                title,
                content,
                id: nanoid()
            })
    },
        deletePost:(state, {payload}) =>  {
            state.data = state.data.filter(p => p.id !== payload);
            localStorage.setItem('posts', JSON.stringify(state.data))
        }
    },
})

export const {addPost, deletePost} = postsSlice.actions

export const getAllPosts = s => s.posts.data

export default postsSlice.reducer