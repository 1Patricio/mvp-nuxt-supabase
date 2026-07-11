<template>
  <UPage>
    <UPageBody>
      <UContainer>
        <UBlogPosts
          orientation="horizontal"
          :posts="posts ?? []"
        />
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
const client = useSupabaseClient()

const { data: posts } = await useAsyncData('posts', async () => {
  const { data } = await client
  .from('post')
  .select('id, title, resume, banner, created_at, category(name)')
  .order('created_at', {ascending: false})

  return data?.map((post) => ({
    title: post.title,
    description: post.resume || '',
    image: post.banner ? { src: post.banner, alt: post.title } : undefined,
    date: new Date(post.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
    badge: post.category 
      ? { label: (post.category as { name:string }).name } 
      : undefined,
    to: `/post-details/${post.id}`  
  }))
})
</script>

