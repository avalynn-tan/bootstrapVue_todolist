export const SET_LIST = (state, lists) => {
    state.lists = lists;
}

// export const ADD_ITEM = (state, { item, completed, formatted_date }) => {
export const ADD_ITEM = (state, list) => {
    state.lists.push(list);
}

export const UPDATE_ITEM = (state, list) => {
    state.lists = state.lists.map((item) => {
        if (item.id === list.id) {
            item = list;
        }
        return item;
    });
}

export const REMOVE_ITEM = (state, id) => {
    state.lists = state.lists.filter(x => x.id !== id);
}