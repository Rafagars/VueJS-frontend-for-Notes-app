<template>
<div class="note-container">
    <h2>Mis Notas Activas</h2>
    <div v-for="note in notes.filter(n => !n.archived)" :key="note.id" class="note-card">
      <h3>{{ note.title }}</h3>
      <button @click="toggleArchive(note.id)">Archive</button>
      <button @click="removeNote(note.id)" class="btn-delete">Delete</button>
      <button @click="openEditModal(note)">Editar</button>

    <EditNoteModal 
      :isOpen="isModalOpen" 
      :note="selectedNote" 
      @close="isModalOpen = false" 
      @save="handleUpdate"
    />
    
    </div>

    <hr />

    <h2>Archivadas</h2>
    <div v-for="note in notes.filter(n => n.archived)" :key="note.id" class="note-card archived">
      <h3>{{ note.title }}</h3>
      <button @click="toggleArchive(note.id)">Unarchive</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import EditNoteModal from './EditNoteModal.vue';

const notes = ref([]);

const isModalOpen = ref(false);
const selectedNote = ref(null);

//Function to fetch the notes from the backend
const fetchNotes = async () => {
    try {
        const response = await api.getNotes();
        notes.value = response.data;
    } catch (error) {
        console.error("Error loading notes: ", error);
    }
};

onMounted(fetchNotes);

defineExpose({
    fetchNotes
});

const toggleArchive = async (id) => {
    try {
        await api.archiveNote(id);
        await fetchNotes(); 
    } catch(error) {
        console.error("Error while changing estate of the archive", error);
    }
};

const removeNote = async (id) => {
    if (confirm("Are you sure you want to delete this note?")) {
        try {
            await api.deleteNote(id);
            await fetchNotes();
        } catch (error) {
            alert("Error deleting the note");
        }
    };
}

const openEditModal = (note) => {
    selectedNote.value = note;
    isModalOpen.value = true;
};

const handleUpdate = async (data) => {
    try {
        await api.updateNote(data.id, data.title, data.content);
        isModalOpen.value = false;
        await fetchNotes();
    } catch (error) {
        alert("Error updating");
    }
};

</script>

<style scoped>
.note-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}
.archived { opacity: 0.6; background-color: #f9f9f9; }
button { margin-top: 5px; cursor: pointer; }
.actions { display: flex; gap: 10px; }
.btn-delete { background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 4px; }
.btn-delete:hover { background-color: #cc0000; }
</style>