<template>
	<div v-if="isLoading" class="progress-bar" :style="{ width: progress + '%' }"></div>
  </template>
  
  <script setup lang="ts">
  
  defineProps({
	isLoading: {
		type: Boolean,
		default: false
	},
	progress: {
		type: Number,
		default: 0
	}
  })
</script>
  
  <style scoped>
  .progress-bar {
	position: fixed;
	top: 0;
	left: 0;
	height: 4px;
	background-color: var(--color-primary);
	transition: width .2s ease;
	z-index: 9999;
  }
  </style>
  