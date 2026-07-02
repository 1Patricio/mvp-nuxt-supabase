<template>
  <USelect
    v-model="model"
    :items="items ?? []"
    :loading="pending"
    placeholder="Selecione uma categoria"
    class="w-full"
  />
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const toast = useToast()

const model = defineModel<number | undefined>()

const { data:items, pending } = await useAsyncData('categories', async () => {
  const { data } = await client.from('category').select('id, name')

  return data?.map(cat => {
    return {
      label: cat.name,
      value: cat.id
    }
  })
})

if (!items.value) {
  toast.add ({
    title: 'Erro',
    description: 'Não foi possível recuperar as categorias',
    icon:'bx:error',
    color: 'error'
  })
}

</script>