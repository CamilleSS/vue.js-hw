<template>
  <div>
    <h1>{{ title }}</h1>
    <div id="list-handle">
      <label>
        Hide sold cars
        <input v-model="soldHidden" type="checkbox">
      </label>

      <input v-model="newCarName" v-on:keyup.enter="addNewCar" type="text" placeholder="Add new on enter">

      <input v-model="filterQuery" type="text" placeholder="Search">

      <button v-on:click="clearList">Clear List</button>
    </div>
    <ul>
      <li
        is="car-item"
        v-if="!car.hidden"
        v-for="(car, index) in outputCarList"
        v-on:remove="deleteCar(car)"
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
    outputCarList: function () {
      let cars = this.soldHidden ? this.unSoldCars : this.cars;

      return cars.filter(car => {
        return this.filterQuery.trim()
          ? car.name.toLowerCase().includes(this.filterQuery.toLowerCase())
          : car;
      });

      // return this.cars.filter(car => {
      //   if (this.filterQuery && this.soldHidden) {
      //     return !car.sold && car.name.toLowerCase().includes(this.filterQuery.toLowerCase())
      //   } else if (this.filterQuery) {
      //     return car.name.toLowerCase().includes(this.filterQuery.toLowerCase())
      //   } else if (this.soldHidden) {
      //     return !car.sold
      //   } else {
      //     return car
      //   }
      // })
    },

    unSoldCars() {
      return this.cars.filter(car => !car.sold);
    }
  },
  methods: {
    addNewCar: function () {
      if (this.newCarName) {
        this.cars.push({
          id: this.nextCarId++,
          name: this.newCarName,
          sold: false
        });

        this.newCarName = ''
      }
    },

    clearList: function () {
      this.cars = []
      this.nextCarId = 1
      this.filterQuery = ''
    },

    deleteCar(deletedCar) {
      const index = this.cars.findIndex(car => car.id === deletedCar.id);

      if (index !== -1) {
        this.cars.splice(index, 1);
      }
    }

    // not used
    // handleSold: function () {
    //   if (this.soldHidden) {
    //     this.cars.forEach(car => {
    //       if (car.sold) {
    //         this.$set(car, 'hidden', true)
    //       }
    //     })
    //   } else {
    //     this.cars.forEach(car => {
    //       this.$set(car, 'hidden', false)
    //     })
    //   }
    // }
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
