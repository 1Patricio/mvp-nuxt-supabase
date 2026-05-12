<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard 
      v-if="showForm"
      class="w-full max-w-md"
    >
      <UAuthForm
        title="Cadastre-se"
        description="Cadastre-se com suas credências de acesso."
        icon="mdi:register"
        :fields="fields"
        :providers="providers"
        @submit="registerWithEmailAndPassword"
      >
        <template #description>
          Já possui uma conta? 
          <ULink to="/auth/login" class="text-primary font-medium">Faça Login</ULink>
        </template>  
      </UAuthForm>
    </UPageCard>
    <UPageCard 
      v-else
      class="w-full max-w-md"
      title="Verifique sua caixa de email"
      descrition="Enviamos um link para você acessar"
    />
  </div>
</template>

<script setup lang="ts">
import type {  AuthFormField, FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
const toast = useToast()

const showForm = ref(true)

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Cadastre seu email',
  required: true
}, {
  name: 'password',
  label: 'Senha',
  type: 'password',
  placeholder: 'Cadastre sua senha',
  required: true
},]

const registerWithEmailAndPassword = async (payload: FormSubmitEvent<{email: string, password: string}>) => {
  const {error} = await supabase.auth.signUp({
    email: payload.data.email,
    password: payload.data.password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/confirm`
    }
  })

  if(error) {
    console.error(error)
    toast.add({
      title: 'Erro',
      description: error.message,
      color: 'Error'
    })
  } else {
    showForm.value = false 
  }
}

</script>