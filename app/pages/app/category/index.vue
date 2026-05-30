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
      class="flex-1 mt-2"
    />
  </div>
</template>

<script setup lang="ts">
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
</script>