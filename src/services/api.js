import axios from 'axios';

const api = axios.create({
    // FastAPI's URL
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
});

export default {
    // Gets actives notes
    getNotes(tag = ''){
        return api.get('/notes', {
            params: tag ? {tag: tag} : {}
        });
    },
    // Creates a new note
    createNote(title, content, tags = []){
        return api.post('/notes', {title, content, tags});
    },
    archiveNote(noteId) {
        return api.patch(`/notes/${noteId}/archive`);
    },
    deleteNote(noteId) {
        return api.delete(`/notes/${noteId}`);
    },
    updateNote(noteId, title, content) {
        return api.put(`/notes/${noteId}?title=${title}&content=${content}`);
    }
};