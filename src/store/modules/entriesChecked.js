export default {
    state: {
        checkedEntries: [],
    },
    getters: {
        getCheckedEntries: state => {
            return state.checkedEntries;
        },

    },
    mutations: {
        addEntriesToChecked: (state, items ) => {
            const checkedItemsIds = state.checkedEntries.map((item) => item.id);
            items.forEach((item) => {
                if (!checkedItemsIds.includes(item.id)) {
                    state.checkedEntries.push(item);
                }
            });
        },
        removeEntriesFromChecked: (state, items) => {
            const deletedIds = items.map((item) => item.id);
            state.checkedEntries = state.checkedEntries
                .filter((item) => !deletedIds.includes(item.id));
        },
    },
    actions: {
        addEntriesToChecked: ({ commit }, items) => {
            commit('addEntriesToChecked', items);
        },
        removeEntriesFromChecked: ({ commit }, items) => {
            commit('removeEntriesFromChecked', items);
        },
    }
}
