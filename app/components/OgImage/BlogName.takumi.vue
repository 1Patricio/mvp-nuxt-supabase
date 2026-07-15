<script setup lang="ts">
const { title = 'My Page', description = '' } = defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center p-[60px] bg-black text-white-900 dark:bg-black-900 dark:text-white">
    <h1 class="text-[72px] font-bold m-0 leading-tight text-center" style="text-wrap: balance;">
      {{ title }}
    </h1>
    <p v-if="description" class="text-[32px] opacity-60 mt-4 text-center max-w-[900px]">
      {{ description }}
    </p>
  </div>
</template>
