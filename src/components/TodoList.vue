<template id="task-list">
  <div class="container mt-3 mb-5">
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
        <list-card v-for="list of itemList" :key="list.id" :list="list" />
      </b-list-group>
    </div>
  </div>
</template>

<script>
import listCard from "./listCard.vue";

export default {
  name: 'task-list',
  data() {
    return {
      itemName: "",
    };
  },
  components: {
    listCard
  },
  computed: {
    incomplete() {
      return this.$store.state.lists.filter(x => x.completed == false).length;
    },
    itemList() {
      return this.$store.state.lists;
    }
  },
  mounted() {
    this.$store.dispatch('getLists');
  },
  methods: {
    addList() {
      this.$store.dispatch('addItem', {
        item: this.itemName,
        completed: false
      });
      this.itemName = ""; // clear input value
    },
    clearCompleted() {
      this.$store.dispatch('clearCompleted', this.itemList)
    },
    clearAll() {
      this.$store.dispatch('clearAll', this.itemList);
    }
  }
}
</script>

<style>
.is-selected .itemName {
  text-decoration: line-through;
}
</style>
