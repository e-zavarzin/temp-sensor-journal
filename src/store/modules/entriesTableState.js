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

        addEntryToList: (state, items) => {
            const checkedItemsIds = state.entriesList.map((item) => item.id);
            items.forEach((item) => {
                if (!checkedItemsIds.includes(item.id)) {
                    state.entriesList.push(item);
                }
            });
        },

        deleteEntriesFromList: (state, items) => {
            const deletedIds = items.map((item) => item.id);
            state.entriesList = state.entriesList
                .filter((item) => !deletedIds.includes(item.id));
        },
    },

    actions: {
        fetchEntriesList({ commit }) {
            // some code to fetch sensors list here
            const items = [
                {
                    "id": 1,
                    "temperature": "32",
                },
                {
                    "id": 2,
                    "temperature": "44",
                },
            ]
            setTimeout(() => {
                commit('setEntriesList', items);
            }, 1000)
        },

        addEntryToList: ({ commit }, items) => {
            commit('addCheckedEntries', items);
        },

        deleteEntriesFromList: ({ commit }, items) => {
            commit('deleteEntriesFromList', items);
        },
    }
}
