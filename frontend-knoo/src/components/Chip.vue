<script setup lang="ts">
import { StatusEnum } from '@/enums/status.enum';
import { computed, type PropType } from 'vue'

const props = defineProps({
  type: {
	type: String as PropType<StatusEnum>,
	required: false,
	default: 'default'
  },
})

const type = computed(() => props.type)
</script>

<template>
    <div
		class="chip"
		v-class="{ [type]: true }">
		<label
			class="chip__label"
			v-class="{ [type]: true }"><slot /></label>
    </div>
</template>

<style lang="scss" scoped>
.chip {
	max-width: 100px;
	min-width: max-content;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 16px;
	padding: 10px;
	height: 22px;
	
	&--success {
		background-color: rgba(var(--color-success-rgb), .2);
	}

	&--error {
		background-color: rgba(var(--color-error-rgb), .2);
		color: rgba(var(--color-error-rgb), 1);
	}

	&--warning {
		background-color: rgba(var(--color-warning-rgb), .2);
		color: rgba(var(--color-warning-rgb), 1);
	}

	&--default {
		background-color: rgba(var(--color-black-rgb), .1);
		color: rgba(var(--color-primary-rgb), 1);
	}

	&--pixel-action {
		background-color: rgba(109, 57, 255, 1);
		color: var(--color-white);
	}

	&__label {
		font-family: var(--font-family-bold);
		font-size: 12px;

		&--success {
			color: #33D87F;
		}

		text-transform: capitalize;
	}
}
</style>