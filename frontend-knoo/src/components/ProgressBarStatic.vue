<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div style="display: flex; align-items: center;">
        <div 
          v-for="(bar, index) in bars" 
          :key="index" 
          class="bar"
          :style="{'opacity': index < filledBars ? 1 - (index / filledBars) : 1}"
          :class="{'filled': index < filledBars}"
        ></div>
      </div>
      <div class="progress-label">2M</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const totalBars = 16;
const filledBars = 10;
const bars = ref(new Array(totalBars).fill(0));
</script>

<style scoped>
.progress-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.progress-bar {
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  width: 278px;
  height: 40px;
  display: flex;
  gap: 12px;
}

.bar {
  width: 10px;
  height: 30px;
  border-radius: 4px;
  margin: 0 2px;
  background-color: #F6F3FF;
  transition: background-color 0.3s;
}

.filled {
  background-color: rgba(127, 127, 255, 1);
}

.progress-label {
  right: 5px;
  background-color: rgba(127, 127, 255, 0.2);
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  color: #7f7fff;
}
</style>
