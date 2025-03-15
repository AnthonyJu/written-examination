import type { App } from 'vue'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

export const router = createRouter({
  routes: setupLayouts(routes),
  history: createWebHashHistory(),
})

const WhiteList: string[] = []

router.beforeEach((to, from, next) => {
  if (WhiteList.includes(to.path)) next()
  else next()
})

export default (app: App) => app.use(router)
