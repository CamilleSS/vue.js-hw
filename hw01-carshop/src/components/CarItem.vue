<template>
    <li v-bind:class="{sold: car.sold}">
        <p v-if="!isEditing" v-on:click="startEditCar">{{ `${car.id}. ${car.name}` }}</p>

        <input v-if="isEditing" v-model="car.name" v-on:keyup.enter="endEditCar">

        <button v-on:click="handleSoldCar">{{car.sold ? 'Unsold' : 'Sold'}}</button>

        <button v-on:click="$emit('remove')">X</button>
    </li>
</template>

<script>
export default {
  // props: ['car'],

  props: {
    car: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isEditing: false,
      // newName: this.car.name
    }
  },

  methods: {
    handleSoldCar: function () {
      this.$set(this.car, 'sold', !this.car.sold)
    },

    startEditCar: function () {
      this.isEditing = true
    },

    endEditCar: function() {
      // this.$set(this.car, 'name', this.newName)

      this.isEditing = false
    }
  }
}
</script>

<style scoped>
  .sold {
    color: blueviolet
  }
  p {
    display: inline-block;
    margin-right: 20px;
  }
</style>
