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
          label="Cadastrar"
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

const state = reactive({
  name: undefined,
})

type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.name) errors.push({ 
    name: 'name', 
    message: 'Insira um nome de categoria válido' 
  })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>
