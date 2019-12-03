import PostService from '../services/PostService'

export default ({
    strict: true,
    state: {
        posts: [],
        currJob: null
    },
    mutations: {
        updatePost(state, updatedPost) {
            const idx = state.posts.findIndex(post => post._id === updatedPost._id);
            state.posts.splice(idx, 1, updatedPost);
        },
        removePost(state, { postId }) {
            const idx = state.posts.findIndex(post => post._id === postId);
            state.posts.splice(idx, 1);
        }
    },
    actions: {
        async loadPosts(context) {
            const posts = await PostService.query()
            context.commit({ type: 'setPosts', posts })
            return posts;
        },
        async savePost(context, { post }) {
            const addedPost = await PostService.save(post)
            context.commit({ type: 'updatePost', addedPost })
            return addedPost;
        },
        async removePost(context, { id }) {
            await PostService.remove(id)
            context.commit({ type: 'removePost', id })
        }
    },
})