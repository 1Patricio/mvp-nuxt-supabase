<template>
  <UBlogPost title="Cadastro Realizado com sucesso" />
</template>
<script setup lang="ts">

const user = useSupabaseUser()

watch(user, () => 
  {
    if (user.value) {
      return navigateTo('/app')
    }
  },
  {
    immediate: true
  }
)
</script>