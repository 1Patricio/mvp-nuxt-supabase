<template>
  <div>
    <div class="flex justify-end">
      <UButton
        to="/app/category/form"
      >
        Criar Categoria
      </UButton>
    </div>
    <UTable
      :data="categories"
      :loading="pending"
      :ui="{ tr: 'cursor-pointer'}"
      class="flex-1 mt-2"
      @select="editCategory"
    />
  </div>
</template>

<script setup lang="ts">
import type { TableRow } from '@nuxt/ui'
definePageMeta({
  layout: 'app-layout'
})

type CategoriesList = {
  id: number,
  name: string,
}

const client = useSupabaseClient()
const toast = useToast()

const { data: categories, error, pending } = await useAsyncData('categories', async () => {
  const { data } = await client.from('category').select()

  return data?.map((cat) => {
    return {
      id: cat.id,
      name: cat.name
    }
  })
});

if (error.value) {
  toast.add({
    title: 'Erro',
    description: error.value.message,
    icon: 'bx:erro',
    color: 'error'
  })
} 

function editCategory(_e: Event, row: TableRow<{ id: number; name: string }>) {
  navigateTo(`/app/category/form?id=${row.original.id}`)
}
</script>