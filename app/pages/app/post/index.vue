<template>
  <div>
    <div class="flex justify-end">
      <UButton
        to="/app/post/form"
      >
        Criar Artigo
      </UButton>
    </div>
    <UTable
      :data="posts"
      :loading="pending"
      :ui="{ tr: 'cursor-pointer'}"
      empty="Nenhum artigo encontrado"
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

const { data: posts, error, pending } = await useAsyncData('posts', async () => {
  const { data } = await client.from('post').select('id, title')

  return data! || []
});

if (error.value) {
  toast.add({
    title: 'Erro',
    description: error.value.message,
    icon: 'bx:erro',
    color: 'error'
  })
} 

function editCategory(_e: Event, row: TableRow<{ id: number; title: string }>) {
  navigateTo(`/app/post/form?id=${row.original.id}`)
}
</script>