import vueJsx from '@vitejs/plugin-vue-jsx'

export default {
  plugins: [vueJsx()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
}
