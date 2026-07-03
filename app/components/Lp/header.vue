<template>
  <UHeader>
    <template #title>
      <span class="font-bold text-lg">Blog News</span>
    </template>

    <template #right>
      <UColorModeButton />

      <UTooltip text="Go to Login">
        <UButton
          color="neutral"
          variant="ghost"
          to="/app"
          icon="material-symbols:login"
          aria-label="Login"
        />
      </UTooltip>
    </template>
  </UHeader>
</template>
