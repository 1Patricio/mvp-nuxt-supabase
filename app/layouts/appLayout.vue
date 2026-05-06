<template>
  <UDashboardGroup>
    <AppSidebar />
    <UDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Dashboard">
          <template #right>
            <UTooltip text="Logout">
              <UButton
                color="neutral"
                variant="ghost"
                icon="material-symbols:logout"
                aria-label="Logout"
                @click="logout"
              />
            </UTooltip>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script setup lang="ts">
const router = useRouter()

function logout(){
  router.push('/')
}
</script>