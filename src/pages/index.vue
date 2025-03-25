<template>
  <div class="container-index full">
    <div class="header h-75px w-1700px bg-red">header</div>

    <div class="aside aside-left h-800px w-300px bg-yellow">aside-left</div>
    <div class="aside aside-right h-800px w-300px bg-yellow">aside-right</div>

    <div class="main h-800px w-1200px bg-green">
      <ChildOne />
      <ChildTwo />
      <ChildThree />
      <ChildFour />
    </div>

    <div class="footer h-60px w-1700px bg-blue">footer</div>
  </div>
</template>

<script setup lang="ts">
import ChildFour from '@/pages/components/child-four.vue'
import ChildOne from '@/pages/components/child-one.vue'
import ChildThree from '@/pages/components/child-three.vue'
import ChildTwo from '@/pages/components/child-two.vue'
</script>

<style lang="scss" scoped>
.container-index {
  .header {

  }

  .aside {

    &.aside-left {

    }

    &.aside-right {

    }
  }

  .main{

  }

  .footer {

  }
}
</style>
