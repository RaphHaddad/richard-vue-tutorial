<template>
    <div>
      <button @click="callApi">Call API</button>
      <button @click="callSecureApi">Call Secure API</button>
      <div v-for="(service,index) in services" :key="index">
        <p>
          <img :src="service.iconUri" />
          <a :href="service.uri">{{service.name}}</a>
        </p>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      values: ["no data yet"],
      services: []
    }
  },
  methods: {
    async callApi() {
      try {
        const response = await axios.get("https://localhost:5000/api/values");
        this.values = response.data;
      } catch (err) {
        this.values.push("Ooops!" + err);
      }
    },
    async callSecureApi() {
      try {
        const response = await axios.get("https://localhost:5000/api/services");
        this.services = response.data;
      } catch (err) {
        console.log('secure api call failed');
      }
    }
  }
}
</script>