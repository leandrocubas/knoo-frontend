<script setup lang="ts">
defineProps({
  color: {
    type: String,
    required: false,
    default: '#715F64'
  }
})
</script>

<template>
    
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_1_431)">
        <path :style="{ stroke: color }" d="M1.65625 9.45874C1.65625 5.92324 1.65625 4.15549 2.75425 3.05674C3.85375 1.95874 5.62075 1.95874 9.15625 1.95874C12.6918 1.95874 14.4595 1.95874 15.5575 3.05674C16.6562 4.15624 16.6562 5.92324 16.6562 9.45874C16.6562 12.9942 16.6562 14.762 15.5575 15.86C14.4602 16.9587 12.6918 16.9587 9.15625 16.9587C5.62075 16.9587 3.853 16.9587 2.75425 15.86C1.65625 14.7627 1.65625 12.9942 1.65625 9.45874Z" stroke-width="1.5"/>
        <path :style="{ stroke: color }" d="M5.40625 13.9587V7.20874M9.15625 13.9587V4.95874M12.9062 13.9587V10.2087" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <defs>
        <clipPath id="clip0_1_431">
          <rect width="18" height="18" fill="white" transform="translate(0.15625 0.45874)"/>
        </clipPath>
      </defs>
    </svg>
</template>