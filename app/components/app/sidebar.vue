<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const user = useSupabaseUser()

const items: NavigationMenuItem[][] = [[
  {
    label: 'Home',
    icon: 'i-lucide-house',
    to:'/app',
  }, 
  {
    label: 'Categorias',
    icon: 'material-symbols:category-outline',
    to:'/app/category',
  }
]]

</script>

<template>
  <UDashboardSidebar collapsible resizable :ui="{ footer: 'border-t border-default' }">
    <template #header="{ }">
      <!-- <Logo v-if="!collapsed" class="h-5 w-auto shrink-0" /> -->
      <UIcon name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto" />
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
      />
    </template>

    <template #footer="{ collapsed }">
      <UButton
        :label="collapsed ? undefined : user.email"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>
