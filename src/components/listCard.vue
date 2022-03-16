<template>
    <b-list-group-item class="d-flex justify-content-between align-items-center">
        <div 
            @click="updateItem(list.id, !list.completed)"
            :class="{ 'is-selected': list.completed }"
            style="cursor:pointer"
        >
            <p class="itemName">{{list.item}}</p>
            <p style="font-size:small; color:grey">{{list.createdAt}}</p>
        </div>
        <div class="text-center">
            <b-button variant="link" @click="removeItem(list.id)">
                <b-icon icon="X" aria-hidden="true"></b-icon>
            </b-button>
        </div>
    </b-list-group-item>
</template>

<script>
export default {
    props: ['list'],
    methods: {
        removeItem(id) {
            this.$store.dispatch('removeItem', id);
        },
        updateItem(id, completed) {
            this.$store.dispatch('updateItem', {
                id: id,
                completed: completed
            });
            // await axios.patch(`http://localhost:3000/list/${id}`, {
            //     completed: completed
            // });
            // this.itemList = this.itemList.map((item) => {
            //     if (item.id === id) {
            //     item.completed = completed;
            //     }
            //     return item;
            // });

            // this.incomplete = this.itemList.filter(x => x.completed == false).length;
            // },
        }
    }
}
</script>