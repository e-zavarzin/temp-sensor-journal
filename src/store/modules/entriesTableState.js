import i18n from '../../helpers/i18n.js'

export default {
    state: {
        entriesList: [],
    },

    getters: {
        getEntriesList: state => {
            return state.entriesList;
        },
    },

    mutations: {
        setEntriesList: (state, items) => {
            state.entriesList = items;
        },

        addEntry: (state, item) => {
            state.entriesList.unshift(item);
        },

        deleteEntries: (state, items) => {
            const deletedIds = items.map((item) => item.id);
            state.entriesList = state.entriesList
                .filter((item) => !deletedIds.includes(item.id));
        },
    },

    actions: {
        fetchEntriesList() {
            // some code to fetch entries list here
        },

        addEntry: ({ state, commit }, { newEntry } ) => {
            // some code to send POST request with new entry

            const entriesList = state.entriesList;

            if (!entriesList.find((item) => item.id === newEntry.id)) {
                commit('addEntry', newEntry);
            } else {
                // Throw error if id of new entry already exists
                throw new Error(i18n.t('error.entry.already.exists', { id: newEntry.id }));
            }
        },

        editEntry: ({ state, commit }, { originEntry, editedEntry }) => {
            // some code to send PUT request with edited entry

            const entriesList = state.entriesList;

            if (!(entriesList.find((item) => item.id === editedEntry.id
                && originEntry.id !== editedEntry.id))) {
                const idx = entriesList.findIndex((entry) => entry.id === originEntry.id);
                entriesList[idx] = editedEntry;
                commit('setEntriesList', entriesList);
            } else {
                // Throw error if new id of edited entry already exists
                throw new Error(i18n.t('error.entry.already.exists', { id: editedEntry.id }));
            }
        },

        deleteEntries: ({ commit }, items) => {
            // some code to send DELETE request with entries

            commit('deleteEntries', items);
        },

        getEntryById: ({ state }, id) => {
            // some code to fetch entry details by id

            return state.entriesList.find((entry) => entry.id === id);
        }
    }
}
