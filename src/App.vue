<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/* uview ui */
@import 'uview-ui/index.scss';
/* my style */
@import './style/base.css';
@import './style/root.css';
/* #ifdef H5 */
html {
  color: var(--text-color-inverse);
  font-size: var(--font-size-base);
}
/* #endif */
/* #ifndef H5 */
page {
  color: var(--text-color-inverse);
  font-size: var(--font-size-base);
}
/* #endif */
</style>
