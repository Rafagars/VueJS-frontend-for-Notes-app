<template>
  <div class="filter-section">
    <input v-model="tagFilter" placeholder="Filter by tag..." @input="fetchFilteredNotes" class="filter-input" />
  </div>

  <div class="note-container">
    <h2>My Active Notes</h2>
    <div v-for="note in notes.filter(n => !n.archived)" :key="note.id" class="note-card">
      <h3>{{ note.title }}</h3>
      <p>{{ note.content }}</p>
      
      <div class="tags-display" v-if="note.tags && note.tags.length">
        <span v-for="tag in note.tags" :key="tag.id" class="tag-badge">
          #{{ tag.name }}
        </span>
      </div>

      <div class="actions">
        <button @click="toggleArchive(note.id)">Archive</button>
        <button @click="removeNote(note.id)" class="btn-delete">Delete</button>
        <button @click="openEditModal(note)">Edit</button>
      </div>
    </div>

    <hr />

    <EditNoteModal 
      v-if="isModalOpen"
      :isOpen="isModalOpen" 
      :note="selectedNote" 
      @close="isModalOpen = false" 
      @save="handleUpdate"
    />
    
    <h2>Notes Archived</h2>
    <div v-for="note in notes.filter(n => n.archived)" :key="note.id" class="note-card archived">
      <h3>{{ note.title }}</h3>
      <button @click="toggleArchive(note.id)">Unarchive</button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import EditNoteModal from './EditNoteModal.vue';

const notes = ref([]);

const isModalOpen = ref(false);
const selectedNote = ref(null);
const tagFilter = ref('');

//Function to fetch the notes from the backend
const fetchNotes = async () => {
    try {
        const response = await api.getNotes();
        notes.value = response.data;
    } catch (error) {
        console.error("Error loading notes: ", error);
    }
};

const fetchFilteredNotes = async () => {
    try {
        const response = await api.getNotes(tagFilter.value);
        notes.value = response.data;
    } catch (error) {
        console.error("Error filtering notes:", error);
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

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 10px 0;
}

.tag-badge {
  background-color: #e0e0e0;
  color: #555;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.85em;
  font-weight: bold;
}

.filter-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>