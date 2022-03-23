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
        addCheckedEntries: (state, items ) => {
            const checkedItemsIds = state.checkedEntries.map((item) => item.id);
            items.forEach((item) => {
                if (!checkedItemsIds.includes(item.id)) {
                    state.checkedEntries.push(item);
                }
            });
        },
        deleteCheckedEntries: (state, items) => {
            const deletedIds = items.map((item) => item.id);
            state.checkedEntries = state.checkedEntries
                .filter((item) => !deletedIds.includes(item.id));
        },
    },
    actions: {
        addCheckedEntries: ({ commit }, items) => {
            commit('addCheckedEntries', items);
        },
        deleteCheckedEntries: ({ commit }, items) => {
            commit('deleteCheckedEntries', items);
        },
    }
}
