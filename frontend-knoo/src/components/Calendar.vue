<script setup lang="ts">
import { computed, ref } from 'vue'
import { format, add, sub, startOfMonth, endOfMonth, getDay, eachDayOfInterval, isSameDay, isAfter, isBefore, isWithinInterval } from 'date-fns'
import { cloneDeep } from 'lodash'

const start = ref<Date | null>(null)
const end = ref<Date | null>(null)
const days = ref<{ date: Date, selected: boolean, between?: boolean }[]>([])
const date = ref(format(new Date(), 'yyyy-MM-dd'))
const month_name = computed(() => format(new Date(date.value), 'MMMM'))
const first_day_month = computed<Date>(() => startOfMonth(new Date(date.value)))
const last_day_month = computed<Date>(() => endOfMonth(new Date(date.value)))
const day_of_week = computed(() => getDay(first_day_month.value) + 1)

const emit = defineEmits(['selected'])

const construct_calendar = () => {
    days.value = eachDayOfInterval({
        start: first_day_month.value,
        end: last_day_month.value,
    }).map((date => ({
        selected: isDateSelected(date) ?? false,
        date,
        between: isDateBetween(date) ?? false
    })))

}

const isDateBetween = (date: Date) => {
    return start.value && end.value && isWithinInterval(date, { start: start.value, end: end.value })
}

const isDateSelected = (date: Date) => {
    return (start.value && isSameDay(date, start.value)) || (end.value && isSameDay(date, end.value))
}

construct_calendar()


const next_month = () => {
    const old_date = cloneDeep(date.value)
    date.value = format(add(new Date(old_date), { months: 1 }), 'yyyy-MM-dd')
    construct_calendar()
}

const previous_month = () => {
    const old_date = cloneDeep(date.value)
    date.value = format(sub(new Date(old_date), { months: 1 }), 'yyyy-MM-dd')
    construct_calendar()
}

const clear_selections = () => {
  days.value.forEach((d: any) => {
    d.selected = false
    d.between = false
  })
}

const mark_between = () => {
  if (start.value !== null && end.value !== null) {
    eachDayOfInterval({
        start: start.value,
        end: end.value
    }).forEach((date) => {
        if(!start.value || !end.value) return
        const date_to_mark = days.value.find(date_to_mark => isSameDay(date_to_mark.date, date))
        if(date_to_mark && !isSameDay(date_to_mark.date, start.value) && !isSameDay(date_to_mark.date, end.value)){
            date_to_mark.between = true
        }
    })
  }
}

const daySelected = (item: { date: Date, selected: boolean, between?: boolean }) => {
   
    if (!start.value || (start.value && end.value)) {
        start.value = item.date
        end.value = null
        clear_selections()
        item.selected = !item.selected
        return
    }
    
    if (isAfter(item.date, start.value)) {
        end.value = item.date
        item.selected = !item.selected
        mark_between()
        return
    }

    if (isBefore(item.date, start.value)) {
        return
    }

    start.value = item.date 
}

const select = (): void => {
    if(!start.value || !end.value) return

    emit('selected', {
        initial_date: format(new Date(start.value), 'yyyy-MM-dd'),
        finish_date: format(new Date(end.value), 'yyyy-MM-dd')
    })
}
</script>

<template>
    <section class="range">
        <div class="range__action">
            <button :disabled="!start || !end" @click="select">Ok</button>
        </div>
        <div class="range__header">
            <svg @click="previous_month" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.8572 14.0344H4.42871" stroke="#fff" stroke-width="1.66023" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.9677 6.56348L4.42871 14.0345L11.9677 21.5055" stroke="#fff" stroke-width="1.66023" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>                
            <label>{{month_name}}</label>
            <svg @click="next_month" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.58953 14.0347L23.0181 14.0347" stroke="#fff" stroke-width="1.66023" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.4791 21.5056L23.0181 14.0346L15.4791 6.56356" stroke="#fff" stroke-width="1.66023" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
                
        </div>
        <div class="range__weekly-days">
            <span>D</span>
            <span>S</span>
            <span>T</span>
            <span>Q</span>
            <span>Q</span>
            <span>S</span>
            <span>S</span>
        </div>

        <div class="range__dates">
            <div
                style="display: flex; align-items: center; justify-content: center;"
                @click="daySelected(item)" v-for="(item, index) in days" :key="index"
                :style="index === 0 ? { 'grid-column-start': day_of_week } : ''">
                <span
                    v-class="{ selected: item.selected, between: item.between }"
                    class="range__dates__day">{{format(item.date, 'dd')}}</span>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.range {
    width: 100%;
    display: grid;
    gap: 20px;
    &__header {
        display: flex;
        justify-content: space-between;
        gap: 6px;
        width: 100%;

        label {
            font-family: var(--font-family-bold);
            font-size: 16px;
        }
        
        svg {
            cursor: pointer;
        }
    }
    
    &__weekly-days {
        width: 100%;
        display: flex;
        gap: 10px;
        justify-content: space-between;
        border-bottom: 1px solid rgba(113, 95, 100, .4);
        padding: 10px 0;

        span {
            font-size: 14px;
            color: #8C8E92;
        }
    }

    &__dates {
        display: grid;
        grid-template-columns: repeat(7, calc(100% / 7 - (2px)));
        align-items: center;
        justify-content: center;
        gap: 10px;      

        &__day {
            display: flex;
            justify-content: center;
            text-align: center;
            border-radius: 100%;
            width: 30px;
            height: 30px;
            align-items: center;
            cursor: pointer;

            &--between {
                background-color: #9E1240;
            }

            &--selected {
                background-color: var(--color-primary);
                font-family: var(--font-family-bold);
            }
        }
    }

    &__action {
        display: flex;
        justify-content: flex-end;
        button {
            border: none;
            background-color: var(--color-primary);
            color: var(--color-white);
            text-transform: uppercase;
            font-family: var(--font-family-bold);
            font-size: 14px;
            padding: 6px;
            width: 54px;
            border-radius: 6px;
            cursor: pointer;
            &:disabled {
                opacity: .3;
                cursor: not-allowed;
            }
            &:not(:disabled):hover {
                background-color: var(--color-primary-600);
                transition: .3s;
            }
        }
    }
}
</style>