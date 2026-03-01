<template>
    <div class="modal-content">
        <h3>Edit Note</h3>
        <input v-model="editedTitle" placeholder="Title" />
        <textarea v-model="editedContent" placeholder="Content"></textarea>
        <div class="modal-actions">
            <button @click="save" class="btn-save"> Save Changes</button>
            <button @click="$emit('close')" class="btn-cancel">Cancel</button>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';

    const props = defineProps(['note', 'isOpen']);
    const emit = defineEmits(['close', 'save']);

    const editedTitle = ref('');
    const editedContent = ref('');

    watch(() => props.note, (newNote) => {
        if (newNote) {
            editedTitle.value = newNote.title;
            editedContent.value = newNote.content;
        }
    }, { immediate: true});

    const save = () => {
        emit('save', { id: props.note.id, title: editedTitle.value, content: editedContent.value });
    }
</script>

<style scoped>
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; }
.modal-content { background: white; padding: 20px; border-radius: 8px; width: 400px; display: flex; flex-direction: column; gap: 10px; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; }
.btn-save { background: #42b883; color: white; border: none; padding: 8px; cursor: pointer; }
.btn-cancel { background: #ccc; border: none; padding: 8px; cursor: pointer; }
</style>