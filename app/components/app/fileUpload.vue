<template>
  <div>
    <img
      v-if="model && !file"
      :src="model"
      alt="image preview"
      class="w-full max-h-64 object-cover rounded-md border border-muted"
    >
    <UFileUpload
      v-model="file"
      :accept="accept ?? 'image/*'"
      :loading="uploading"
      class="w-full min-h-48"
      label="Envie o banner do seu artigo"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  bucket: string,
  accept?: string
}>()

const model = defineModel<string | null>()
const client = useSupabaseClient()
const toast = useToast()

const file = ref<File | null>(null)
const uploading = ref(false)

watch(file, async (newFile) => {
  if (!newFile) return
  
  uploading.value = true
  const ext = newFile.name.split('.').pop()
  const fileName = `${Date.now()}.${ext}`

  const { error } = await client.storage
  .from(props.bucket)
  .upload(fileName, newFile, { upsert: true })

  if (error) {
    toast.add({
      title: 'Erro no upload',
      description: error.message,
      icon: 'bx:erro',
      color: 'error'
    })
    file.value = null
    uploading.value = false
    return
  }

  const { data } = client.storage
  .from(props.bucket)
  .getPublicUrl(fileName)

  model.value = data.publicUrl
  file.value = null

  uploading.value = false
})
</script>
