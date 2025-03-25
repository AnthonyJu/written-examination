<template>
  <div class="full flex-center">
    <el-input v-model="value" />
  </div>
</template>

<script setup>
// TODO 使用 useUserStore

// TODO 接收App.vue提供的值

const value = ref('user.name')

// TODO 失去焦点时修改store中的name
</script>
