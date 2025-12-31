<script setup lang="ts">
import { provide, ref, watchEffect } from 'vue'
import Cog from '@/components/icons/Cog.vue'
import BasicData from '@/components/icons/BasicData.vue'

const props = defineProps({
	steps: {
		type: Array<{ completed: boolean, title?: string, disabled: boolean, icon: any }>,
		required: true,
		default: [{ completed: false }, { completed: false }]
	},
	modelValue: {
		type: Number,
		default: 0
  	},
})

const emit = defineEmits(['update:modelValue'])
const internalValue = ref(props.modelValue)

const setCurrentStep = (index: number) => {
	if (index < props.steps.length) {
		emit('update:modelValue', index)
		for (let j = 0; j <= index; j++) {
			props.steps[j].completed = true
      	}

		for (let i = index + 1; i < props.steps.length; i++) {
			props.steps[i].completed = false
		}
    }
}

setCurrentStep(internalValue.value)

watchEffect(() => {
  internalValue.value = props.modelValue
  setCurrentStep(internalValue.value)
})



provide('setCurrentStep', setCurrentStep)
provide('currentStep', internalValue.value)

</script>

<template>
    <div class="steps">
      <div class="steps__header-web">
        <div
			v-for="(step, index) in steps"
			:key="index"
			class="steps--step"
			:class="{
				'steps--completed': step.completed,
				'steps--disabled': step.disabled,
				'steps--active': internalValue === index,
			}"
			@click="step.disabled ? null : setCurrentStep(index)">
		<span
		style="display: flex;"
			:class="{
			  'steps__header-web--active--circle': step.completed,
			  'steps__header-web--inactive--circle': !step.completed,
			}">
			<component :is="step.icon" :color="step.completed ? 'var(--color-white)' : 'var(--color-primary)' "/>
		  </span>
           {{ step?.title }}
        </div>
      </div>

      
      <div class="steps__content">
		<div class="steps__header-mobile">
			<div
				v-for="(step, index) in steps"
				:key="index"
				class="steps--step"
				:class="{
					'steps--completed': step.completed,
					'steps--active': internalValue === index,
				}"
				@click="setCurrentStep(index)">
			<span
				style="display: flex; align-items: center;"
				:class="{
				  'steps__header-web--active--circle': step.completed,
				  'steps__header-web--inactive--circle': !step.completed,
				}">
				<BasicData v-if="index === 0" :color="step.completed ? 'var(--color-white)' : 'var(--color-primary)' "/>
				<Cog v-else :color="step.completed ? 'var(--color-white)' : 'var(--color-primary)' "/>
			  </span>
			   <span>{{ step?.title }}</span>
			</div>
		</div>

        <slot :name="'step-' + internalValue"></slot>
      </div>
    </div>
</template>
  
<style scoped lang="scss">
.steps {
	&__header-web {
		display: flex;
		gap: 20px;

		&--active {}
	}

	&__header-mobile {
		display: none;

		&--active {
			&--circle {
			  display: flex;
			  background: var(--color-primary);
			  align-items: center;
			  justify-content: center;
			  border-radius: 100%;
			  height: 36px;
			  width: 36px;
			  min-width: 36px;
			}
		}

		&--inactive {
			&--circle {
			  display: flex;
			  background: rgba(var(--color-white-rgb), .1);
			  align-items: center;
			  justify-content: center;
			  border-radius: 100%;
			  height: 36px;
			  width: 36px;
			  min-width: 36px;
			}
		}
	}

	&--completed {
		
		font-family: var(--font-family-bold);
		
	}

	&--step {
		cursor: pointer;
		padding: 6px;
		display: flex;
		align-items: center;
		gap: 14px;
		user-select: none;
		border-radius: 150px;
		border-radius: 150px;
		border: 1px solid #EBEBEB;
		width: 162px;
		height: 30px;
	}

	&__content {
		width: 93%;
        padding: 54px 0;
        display: grid;
        row-gap: 26px;
        margin-right: 10px;
        position: absolute;
        left: 3vw;
	}
	
	&--active {
		font-size: 14px;
		border: 1px solid #6D39FF;
		background: #F2EDFF;
		color: #6D39FF;
	}

	&--inactive {
		font-size: 14px;
		color: rgba(var(--color-secondary-rgb), .6);
		transition: .6s;
	}

	&--disabled {
  		cursor: not-allowed;
	}
}

@media only screen 
    and (max-width: 805px) {

    .steps__content {
        margin-top: 36px;
    }
}

@media only screen 
    and (max-width: 670px) {

    .steps__header-web {
        display: none;
    }

    .steps__header-mobile {
        display: flex;

		justify-content: space-around;
    }
}
</style>
  