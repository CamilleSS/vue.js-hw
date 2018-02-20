<template>
  <div>
    <h1>{{ title }}</h1>
    <div id="list-handle">
      <label>
        Hide sold cars
        <input v-model="soldHidden" type="checkbox">
      </label>
      <input v-model="newCarName" v-on:keyup.enter="addNewCar" type="text" placeholder="Add new on enter">
      <input v-model="filterQuery" v-on:keyup="filterCars" type="text" placeholder="Search">
      <button v-on:click="clearList">Clear List</button>
    </div>
    <ul>
      <li
        is="car-item"
        v-if="!car.hidden"
        v-for="(car, index) in soldHidden ? hiddenSold : cars"
        v-on:remove="cars.splice(index, 1)"
        :car="car"
        :key="car.id">
      </li>
    </ul>
  </div>
</template>

<script>
import CarItem from './CarItem.vue'

export default {
  name: 'CarShop',
  data () {
    return {
      title: 'Car Shop',
      filterQuery: '',
      cars: [],
      newCarName: '',
      nextCarId: 1,
      soldHidden: false
    }
  },
  computed: {
    hiddenSold: function () {
      return this.cars.filter(car => {
        return !car.sold
      })
    }
  },
  methods: {
    addNewCar: function () {
      if (this.newCarName) {
        this.cars.push({
          id: this.nextCarId++,
          name: this.newCarName
        })
        this.newCarName = ''
      }
    },
    filterCars: function () {
      this.cars.forEach(car => {
        if (!car.name.toLowerCase().includes(this.filterQuery.toLowerCase())) {
          this.$set(car, 'hidden', true)
        } else {
          this.$set(car, 'hidden', false)
        }
      })
    },
    clearList: function () {
      this.cars = []
    },
    handleSold: function () {
      if (this.soldHidden) {
        this.cars.forEach(car => {
          if (car.sold) {
            this.$set(car, 'hidden', true)
          }
        })
      } else {
        this.cars.forEach(car => {
          this.$set(car, 'hidden', false)
        })
      }
    }
  },
  components: {CarItem}
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
#list-handle > * {
  margin-right: 30px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
a {
  color: #42b983;
}
</style>
