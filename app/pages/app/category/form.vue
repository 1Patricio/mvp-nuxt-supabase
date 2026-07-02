<template>
  <div class="flex justify-center">
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Nome da Categoria" name="name">
        <UInput v-model="state.name" />
      </UFormField>

      <div class="flex gap-2">
        <UButton 
          to="/app/category"
          label="Cancelar"
          variant="outline"
        />

        <UButton 
          type="submit"
          :label="categoryId ? 'Atualizar' : 'Cadastrar'" 
        />
      </div>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'app-layout'
})

const route = useRoute();
const categoryId = computed(() => route.query.id ? Number(route.query.id) : undefined)

const client = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const state = reactive({
  name: '',
})

if (categoryId.value) {
  const { data, error } = await client
  .from('category')
  .select('name')
  .eq('id', categoryId.value)
  .single()

  if (error) {
    toast.add({
      title: 'Erro',
      description: error.message,
      icon: 'bx:erro',
      color: 'error'
    })
    navigateTo('/app/category')
  } else {
    state.name = data.name
  }
}

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.name) errors.push({ 
    name: 'name', 
    message: 'Insira um nome de categoria válido' 
  })
  return errors
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const isEdit = !!categoryId.value
  
  const { error } = isEdit
  ? await client.from('category').update({name: state.name}).eq('id', categoryId.value)
  : await client.from('category').insert({name: state.name,user_id: user.value?.sub})

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
      description: `Categoria ${ isEdit ? 'atualizada' : 'salva' } com sucesso`, 
      color: 'success' 
    })
    navigateTo('/app/category')
  }
}
</script>
