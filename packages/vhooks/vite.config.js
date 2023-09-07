import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  plugins: [vue(), vueJsx()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
}
