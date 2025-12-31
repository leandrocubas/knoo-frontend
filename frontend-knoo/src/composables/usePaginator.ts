import { Pagination, type IPagination } from '@/interfaces/pagination.interface'
import { ref, computed, watch, type Ref } from 'vue'

export function usePaginator(emit: (event: 'page', pageIndex: number) => void, pagination: IPagination | null) {
  if(!pagination) {
    pagination = new Pagination()
  }

  const maxPages = computed(() => Math.ceil(pagination!.totalItems / pagination!.pageSize))
  const visiblePages = ref<Array<number | string>>([])

  const updateVisiblePages = () => {
    const total: number = maxPages.value
    const current = pagination!.pageIndex

    visiblePages.value = [1]

    let start = current ? Math.max(2, current - 1) : 0
    let end = current ? Math.min(total - 1, current + 1) : 0

    if (start > 2) {
      visiblePages.value.push('...')
    }

    for (let i = start; i <= end; i++) {
      visiblePages.value.push(i)
    }

    if (end < total - 1) {
      visiblePages.value.push('...')
    }

    visiblePages.value.push(total)
  }

  watch([() => pagination!.pageIndex, maxPages], updateVisiblePages, { immediate: true })

  const goToPage = (page: number | string) => {
    if (page !== '...' && typeof page === 'number') {
      pagination!.pageIndex = page

      emit('page', page)
    }
  }

  const nextPage = () => {
    if (pagination!.pageIndex < maxPages.value) {
      goToPage(pagination!.pageIndex + 1)
    }
  }

  const previousPage = () => {
    if (pagination!.pageIndex > 1) {
      goToPage(pagination!.pageIndex - 1)
    }
  }

  return {
    visiblePages,
    nextPage,
    previousPage,
    goToPage,
    maxPages
  }
}
