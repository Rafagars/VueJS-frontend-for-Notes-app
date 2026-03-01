<template>
    <form>
        <input v-model="title" placeholder="Note's title" required/>
        <textarea v-model="content" placeholder="Content..."></textarea>
        <button type="submit">Save Note</button>
    </form>
</template>

<script>
    import { ref } from 'vue';
    import api from '../services/api';

    const title = ref('');
    const content = ref('');
    const emit = defineEmits(['note-created']);

    const submitNote = async () => {
        try {
            await api.createNote(title.value, content.value);
            title.value = ''; 
            content.value = '';
            emit('note-created');
            alert("Note created successfully");
        } catch (error) {
            alert("Error saving: " + error.response?.data?.detail || error.message);
        }
    };
</script>

<style scoped>
.form-container { display: flex; flex-direction: column; gap: 10px; max-width: 400px; margin-bottom: 20px; }
input, textarea { padding: 8px; border-radius: 4px; border: 1px solid #ddd; }
button { background: #42b883; color: white; border: none; padding: 10px; cursor: pointer; }
</style>