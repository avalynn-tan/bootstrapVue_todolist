<template id="task-list">
  <div class="container">
    <div class="d-flex">
      <h1>Tasks 
        <transition name="fade">
          <small v-if="incomplete">({{ incomplete }})</small>
        </transition>
      </h1>
    </div>

    <div class="d-flex mb-3">
      <b-input-group class="mt-3">
        <b-form-input v-model="itemName" type="text"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-success" @click="addList()">Add</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>

    <div class="d-flex justify-content-end mb-3">
      <b-button variant="outline-warning mr-1" @click="clearCompleted()">Clear Completed</b-button>
      <b-button variant="outline-danger" @click="clearAll()">Clear All</b-button>
    </div>

    <div>
      <b-list-group>
        <b-list-group-item v-for="list of itemList" :key="list.id">
          <b-row>
            <b-col cols="11">
              <div 
                @click="updateItem(list.id, !list.completed)"
                :class="{ 'is-selected': list.completed }"
                style="cursor:pointer"
              >
                <p class="itemName">{{list.item}}</p>
                <p style="font-size:small; color:grey">{{list.createdAt}}</p>
              </div>
            </b-col>
            <b-col>
              <div class="text-center">
                <b-button variant="link" @click="removeItem(list.id)">
                  <b-icon icon="X" aria-hidden="true"></b-icon>
                </b-button>
              </div>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'task-list',
  data() {
    return {
      itemList: [],
      itemName: "",
      incomplete: 0
    };
  },
  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/list`);
      this.itemList = res.data;

      this.incomplete = this.itemList.filter(x => x.completed == false).length;

      console.log(this.incomplete);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async addList() {
      var formatted_date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      
      const res = await axios.post(`http://localhost:3000/list`, {
        item: this.itemName,
        completed: false,
        createdAt: formatted_date
      });
      this.itemList = [...this.itemList, res.data];
      this.itemName = "";

      this.incomplete = this.itemList.filter(x => x.completed == false).length;
    },
    async updateItem(id, completed) {
      await axios.patch(`http://localhost:3000/list/${id}`, {
        completed: completed
      });
      this.itemList = this.itemList.map((item) => {
        if (item.id === id) {
          item.completed = completed;
        }
        return item;
      });

      this.incomplete = this.itemList.filter(x => x.completed == false).length;
    },
    async removeItem(id) {
      await axios.delete(`http://localhost:3000/list/${id}`)
      this.itemList = this.itemList.filter(item => item.id !== id)
      this.incomplete = this.itemList.filter(x => x.completed == false).length;
    },
    async clearCompleted() {
      Promise.all(
        this.itemList.filter(x => x.completed == true)
        .map(function(item) {
          axios.delete(`http://localhost:3000/list/${item.id}`)
      })).then(() => {
        this.itemList = this.itemList.filter(x => x.completed == false);
      });
    },
    async clearAll() {
      Promise.all(this.itemList.map(function(item) {
        axios.delete(`http://localhost:3000/list/${item.id}`)
      })).then(() => {
        this.itemList = [];
        this.incomplete = 0;
      });
    }
  }
}
</script>

<style>
.is-selected .itemName {
  text-decoration: line-through;
}
</style>
