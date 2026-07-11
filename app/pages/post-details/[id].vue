<!-- eslint-disable vue/no-v-html -->
<template>
  <UContainer>
    <UPage>
      <UPageCTA
        :title="post.title"
        :description="post.resume"
        orientation="horizontal"
        :ui="{ container: 'lg:p-8'}"
        variant="naked"
      >
        <img
          v-if="post.banner"
          :src="post.banner"
          width="320"
          height="364"
          alt="Illustration"
          class="w-full rounded-lg"
          loading="lazy"
        >
      </UPageCTA>
      <UBadge>
        {{ post.category.name }}
      </UBadge>
      <UPageBody>
        <div 
          class="prose dark:prose-invert max-w-none" 
          v-html="post.content"
        />
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const toast = useToast()
const route = useRoute();

const postId = computed(() => route.params.id ? Number(route.params.id) : undefined)
const post = ref()

if (postId.value) {
  const { data, error } = await client
  .from('post')
  .select('id, title, resume, banner, content, category(name))')
  .eq('id', postId.value)
  .single()

  if (error) {
    toast.add({
      title: 'Erro',
      description: error.message,
      icon: 'bx:erro',
      color: 'error'
    })
    navigateTo('/')
  } else {
    post.value = data
  }
}
</script>