<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [[
  {
    label: 'Home',
    icon: 'i-lucide-house',
    active: true
  }, 
  {
    label: 'Inbox',
    icon: 'i-lucide-inbox',
    badge: '4'
  }, 
  {
    label: 'Contacts',
    icon: 'i-lucide-users'
  }, 
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    defaultOpen: true,
    children: [
      {
        label: 'General'
      }, 
      {
        label: 'Members'
      }, 
      {
        label: 'Notifications'
      }
    ]
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
        :avatar="{
          src: 'https://github.com/benjamincanac.png',
          loading: 'lazy' as const
        }"
        :label="collapsed ? undefined : 'Anderson Patricio'"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>

