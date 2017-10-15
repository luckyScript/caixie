<template>
  <div class="pager">
    <ul>
      <li><a href="javascript:"></a></li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      ...
      <li>14</li>
      <li><a href="javascript:"></a></li>
    </ul>
    <br style="clear: both;">
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  .pager {
    width: 80%;
    margin: 0 auto;
  }
  ul {
    color: #c9cacc;
    float: right;
    li {
      display: inline-block;
      margin: 3px;
      padding: 3px 7px;
      border: 1px solid #2bbc8a;
      border-radius: 3px;
      cursor: pointer;
      a {
        color: #c9cacc;
        text-decoration: none;
      }
    }
    li:first-child a:before {
      content: '\00ab';
    }
    li:last-child a:before {
      content: '\00bb';
    }
  }
</style>
