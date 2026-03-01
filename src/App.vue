<script setup>
  import { ref } from 'vue';
  import NoteForm from './components/NoteForm.vue';
  import NoteList from './components/NoteList.vue';

  const noteListRef = ref(null);

  const refreshList = () => {
    if (noteListRef.value) {
      noteListRef.value.fetchNotes();
    }
  };
</script>

<template>
  <div class="app-container">
    <header>
      <h1> My Notes </h1>
    </header>

    <main>
      <section class="editor-section">
        <h2>Create New Note</h2>
        <NoteForm @note-created="refreshList" />
      </section>

      <hr />

      <section class="list-section">
        <NoteList ref="noteListRef" />
      </section>
    </main>
  </div>
</template>

<style scoped>
  .app-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 40px;
    color: #2c3e50;
  }

  h2 {
    color: #42b883;
  }

  hr {
    margin: 40px 0;
    border: 0;
    border-top: 1px solid #eee;
  }
</style>
