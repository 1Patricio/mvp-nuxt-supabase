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
      :data="data"
      class="flex-1"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'app-layout'
})

const data = ref([
  {
    id: '1',
    date: '2026-05-19',
    status: 'ativo',
    email: 'andersongpatricio@hotmail.com',
    amount: 9999,
  }
])
</script>