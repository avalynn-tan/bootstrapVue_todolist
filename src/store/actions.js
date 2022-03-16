import axios from 'axios';

export const getLists = ({ commit }) => {
    axios.get(`http://localhost:3000/list`)
    .then(response => {
        commit('SET_LIST', response.data);
    })
}

export const addItem = ({ commit }, { item, completed }) => {
    const formatted_date = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    axios.post(`http://localhost:3000/list`, {
        item: item,
        completed: completed,
        createdAt: formatted_date
    })
    .then(response => {
        commit('ADD_ITEM', response.data);
    });
}

export const updateItem = ({ commit }, { id, completed }) => {
    axios.patch(`http://localhost:3000/list/${id}`, {
        completed: completed
    })
    .then(response => {
        commit('UPDATE_ITEM', response.data)
    })
}

export const removeItem = ({ commit }, id) => {
    axios.delete(`http://localhost:3000/list/${id}`)
    .then(() => {
        commit('REMOVE_ITEM', id);
    })
}

export const clearCompleted = ({ commit }, itemList) => {
    Promise.all(
        itemList.filter(x => x.completed == true)
        .map(function(item) {
          axios.delete(`http://localhost:3000/list/${item.id}`)
    })).then(() => {
        commit('SET_LIST', itemList.filter(x => x.completed == false));
    });
}

export const clearAll = ({ commit }, itemList) => {
    Promise.all(itemList.map(function(item) {
        axios.delete(`http://localhost:3000/list/${item.id}`)
      })).then(() => {
        commit('SET_LIST', []);
      });
}