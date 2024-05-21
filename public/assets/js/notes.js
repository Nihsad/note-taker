document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes');
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
    const newNoteBtn = document.getElementById('new-note');
    const saveNoteBtn = document.getElementById('save-note');
    const clearFormBtn = document.getElementById('clear-form');

    const fetchNotes = async () => {
        const response = await fetch('/api/notes');
        const notes = await response.json();
        notesList.innerHTML = '';
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note.title;
            li.dataset.id = note.id;
            notesList.appendChild(li);
        });
    };

    const saveNote = async () => {
        const note = { title: noteTitle.value, text: noteText.value };
        await fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(note)
        });
        fetchNotes();
        clearForm();
    };

    const clearForm = () => {
        noteTitle.value = '';
        noteText.value = '';
        saveNoteBtn.classList.add('hidden');
        clearFormBtn.classList.add('hidden');
    };

    notesList.addEventListener('click', async (e) => {
        if (e.target.tagName === 'LI') {
            const response = await fetch('/api/notes');
            const notes = await response.json();
            const note = notes.find(n => n.id === e.target.dataset.id);
            noteTitle.value = note.title;
            noteText.value = note.text;
            saveNoteBtn.classList.add('hidden');
            clearFormBtn.classList.add('hidden');
        }
    });

    newNoteBtn.addEventListener('click', () => {
        clearForm();
        saveNoteBtn.classList.remove('hidden');
        clearFormBtn.classList.remove('hidden');
    });

    saveNoteBtn.addEventListener('click', saveNote);
    clearFormBtn.addEventListener('click', clearForm);

    fetchNotes();
});
