<template>
  <div class="flex justify-center">
    <UForm 
      :validate="validate" 
      :state="state" 
      class="space-y-4 lg:min-w-lg min-w-full" 
      @submit="onSubmit"
    >
      <UFormField label="Banner" name="banner">
        <AppFileUpload v-model="state.banner" bucket="posts" />
      </UFormField>  


      <UFormField label="Categoria" name="category_id">
        <AppCategorySelect v-model="state.category_id" />
      </UFormField>  

      <UFormField label="Título do Artigo" name="title">
        <UInput v-model="state.title" class="w-full"/>
      </UFormField>

      <UFormField label="Breve resumo do artigo" name="resume">
        <UInput v-model="state.resume" class="w-full"/>
      </UFormField>

      <UEditor 
        v-slot="{ editor }" 
        v-model="state.content" 
        content-type="html" 
        class="max-w-lg min-h-40 border border-muted"
      >
        <UEditorToolbar 
          :editor="editor" 
          :items="items" 
          layout="fixed" 
          class="border border-muted"
        />
      </UEditor>

      <div class="flex gap-2">
        <UButton 
          to="/app/post"
          label="Cancelar"
          variant="outline"

        />

        <UButton 
          type="submit"
          :label="postId ? 'Atualizar' : 'Cadastrar'" 
        />
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { FormError, EditorToolbarItem, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'app-layout'
})

const route = useRoute();
const postId = computed(() => route.query.id ? Number(route.query.id) : undefined)

const client = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const state = reactive({
  banner: null as string | null ,
  title: '',
  resume: '',
  content: '',
  category_id: undefined as number | undefined,
})

const items: EditorToolbarItem[][] = [
  [
    {
      icon: 'i-lucide-heading',
      tooltip: { text: 'Headings' },
      content: {
        align: 'start'
      },
      items: [
        {
          kind: 'heading',
          level: 1,
          icon: 'i-lucide-heading-1',
          label: 'Heading 1'
        },
        {
          kind: 'heading',
          level: 2,
          icon: 'i-lucide-heading-2',
          label: 'Heading 2'
        },
        {
          kind: 'heading',
          level: 3,
          icon: 'i-lucide-heading-3',
          label: 'Heading 3'
        },
        {
          kind: 'heading',
          level: 4,
          icon: 'i-lucide-heading-4',
          label: 'Heading 4'
        }
      ]
    }
  ],
  [
    {
      kind: 'mark',
      mark: 'bold',
      icon: 'i-lucide-bold',
      tooltip: { text: 'Bold' }
    },
    {
      kind: 'mark',
      mark: 'italic',
      icon: 'i-lucide-italic',
      tooltip: { text: 'Italic' }
    },
    {
      kind: 'mark',
      mark: 'underline',
      icon: 'i-lucide-underline',
      tooltip: { text: 'Underline' }
    },
    {
      kind: 'mark',
      mark: 'strike',
      icon: 'i-lucide-strikethrough',
      tooltip: { text: 'Strikethrough' }
    },
    {
      kind: 'mark',
      mark: 'code',
      icon: 'i-lucide-code',
      tooltip: { text: 'Code' }
    }
  ]
]

if (postId.value) {
  const { data, error } = await client
  .from('post')
  .select('id, title, resume, banner, content, category_id')
  .eq('id', postId.value)
  .single()

  if (error) {
    toast.add({
      title: 'Erro',
      description: error.message,
      icon: 'bx:erro',
      color: 'error'
    })
    navigateTo('/app/post')
  } else {
    state.title = data.title || ''
    state.resume = data.resume || ''
    state.content = data.content || ''
    state.category_id = data.category_id
    state.banner = data.banner || null
  }
}

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.title) errors.push({ name: 'title', message: 'Insira um nome válido' })
  if (!state.resume) errors.push({ name: 'resume', message: 'Insira um resumo válido' })
  if (!state.category_id) errors.push({ name: 'category_id', message: 'Insira uma categoria válida' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const isEdit = !!postId.value
  
  const { error } = isEdit
  ? await client.from('post').update({
      banner: state.banner,
      title: state.title, 
      resume: state.resume,
      content: state.content, 
      category_id: state.category_id as number,
    })
    .eq('id', postId.value)
  : await client.from('post').insert({
    banner: state.banner,
    title: state.title,
    resume: state.resume,
    content: state.content, 
    category_id: state.category_id as number,
    user_id: user.value?.sub as string
  })

  if (error) {
    toast.add({
      title: 'Erro',
      description: error.message,
      icon: 'bx:erro',
      color: 'error'
    })
  } else {
    toast.add({ 
      title: 'Successo', 
      description: `Post ${ isEdit ? 'atualizado' : 'salvo' } com sucesso`, 
      color: 'success' 
    })
    navigateTo('/app/post')
  }
}
</script>
