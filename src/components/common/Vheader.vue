<template>
  <header>
    <nav>
      <div class="title">
        <p><span>采</span>撷</p>
      </div>
      <ul>
        <li>登陆</li>
        <li>分类</li>
        <li>新增</li>
        <li>关于</li>
      </ul>
    </nav>
  </header>
</template>

<script>
 export default {
   name: 'Vheader',
   data() {
     return {}
   }
 }
</script>

<style lang="scss">
  nav {
    width: 70%;
    height: 100px;
    color: #d480aa;
    margin: 0 auto;
    padding-top: 30px;
    .title {
      color: #2bbc8a;
      font-size: 30px;
      span {
        font-size: 60px;
        float: left;
        margin-right: 15px;
      }
    }
    ul {
      list-style: none;
      overflow: hidden;
      li {
        float: left;
        width: 70px;
        margin-right: 30px;
        border-right: 1px dashed #d480aa;
      }
      li:last-child {
        border-right: 0;
      }
    }
  }
</style>
