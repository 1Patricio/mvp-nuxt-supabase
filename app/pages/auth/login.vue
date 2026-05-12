<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        title="Login"
        description="Entre com suas credências de acesso."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        @submit="onSubmit"
      >
        <template #description>
          Não tem uma conta? 
          <ULink to="/auth/register" class="text-primary font-medium">Cadastre-se</ULink>
        </template>  
      </UAuthForm>
    </UPageCard>
  </div>
</template>

<script setup lang="ts">
import type {  AuthFormField } from '@nuxt/ui'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toast = useToast()

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
},]

function onSubmit() {
  console.log('submit')
}
</script>