<template>
    <form @submit.prevent="submitNote" class="form-container">
        <input v-model="title" placeholder="Note's title" required/>
        <textarea v-model="content" placeholder="Content..."></textarea>

        <div class="tags-input-container">
            <div v-for="(tag, index) in tags" :key="index" class="tag-chip">
                {{ tag }}
                <span @click="removeTag(index)" class="remove-icon">×</span>
            </div>
            <input 
                v-model="currentTag"
                @keydown.enter.prevent="addTag"
                @keydown.space.prevent="addTag"
                placeholder="Add tags (Enter or Space)"
            />
        </div>

        <button type="submit" :disabled="!title">Save Note</button>
    </form>
</template>

<script setup>
    import { ref } from 'vue';
    import api from '../services/api';

    const title = ref('');
    const content = ref('');
    const tags = ref([]);
    const currentTag = ref('');
    const emit = defineEmits(['note-created']);

    const addTag = () => {
        const val = currentTag.value.trim().toLowerCase();
        if (val && !tags.value.includes(val)){
            tags.value.push(val);
        }
        currentTag.value = '';
    };

    const removeTag = (index) => {
        tags.value.splice(index, 1);
    };

    const submitNote = async () => {
        try {
            await api.createNote(title.value, content.value, tags.value);
            title.value = ''; 
            content.value = '';
            tags.value = [];
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