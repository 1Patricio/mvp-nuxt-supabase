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

const categories = ref<CategoriesList[]>([])

async function getCategories() {
  const { data, error } = await client.from('category').select()

    if (error) {
    toast.add({
      title: 'Erro',
      description: error.message,
      icon: 'bx:erro',
      color: 'error'
    })
  } else {
    categories.value = data.map((category) => {
      return {
        id: category.id,
        name: category.name
      }
    })
  }
}

onMounted(async () => {
  await getCategories()
})
</script>