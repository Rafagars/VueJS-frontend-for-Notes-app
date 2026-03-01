import axios from 'axios';

const api = axios.create({
    // FastAPI's URL
    baseURL: 'http://localhost:8000'
});

export default {
    // Gets actives notes
    getNotes(){
        return api.get('/notes');
    },
    // Creates a new note
    createNote(title, content){
        return api.post('/notes', {title, content});
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