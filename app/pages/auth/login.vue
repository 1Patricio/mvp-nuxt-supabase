<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        title="Login"
        description="Entre com suas credências de acesso."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        @submit="loginWithEmailAndPassword"
      >
        <template #description>
          Não tem uma conta? 
          <ULink to="/auth/register" class="text-primary font-medium">Cadastre-se</ULink>
        </template>  

        <template #footer>
          <UDivider label="ou" class="my-2" />
          <UButton
            block
            variant="outline"
            icon="i-simple-icons-github"
            label="Entrar com github"
            @click="loginWithGithub"
          />
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>

<script setup lang="ts">
import type {  AuthFormField, FormSubmitEvent } from '@nuxt/ui'

const supabase = useSupabaseClient()
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

const loginWithEmailAndPassword = async (payload: FormSubmitEvent<{email: string, password: string}>) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: payload.data.email,
    password: payload.data.password,
  })

  if (error) {
    console.error(error)
    toast.add({
      title: 'Erro',
      description: error.message,
      color: 'error'
    })
  } else {
    navigateTo('/app')
  }
}

const loginWithGithub = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/confirm`
    }
  })
}
</script>