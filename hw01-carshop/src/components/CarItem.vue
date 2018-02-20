<template>
    <li v-bind:class="{sold: car.sold}">
      <p v-if="!isEditing" v-on:click="startEditCar(car)">{{ `${car.id}. ${car.name}` }}</p>
      <input v-if="isEditing" v-model="newName" v-on:keyup.enter="endEditCar(car)">
      <button v-on:click="markCarSold(car)">Sold</button>
      <button v-on:click="$emit('remove')">X</button>
    </li>
</template>

<script>
export default {
  props: ['car'],
  data () {
    return {
      isEditing: false,
      newName: this.car.name
    }
  },
  methods: {
    markCarSold: function (car) {
      this.$set(car, 'sold', true)
    },
    startEditCar: function (car) {
      this.isEditing = true
    },
    endEditCar: function (car) {
      this.$set(car, 'name', this.newName)
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
