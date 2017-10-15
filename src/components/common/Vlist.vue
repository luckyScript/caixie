<template>
  <table>
    <thead>
      <tr>
        <th style="width: 10%;">类别</th>
        <th>名称</th>
        <th style="width: 15%;">时间</th>
        <th style="width: 10%;">提供者</th>
        <th style="width: 10%;">评论/点击</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in listData">
        <td>{{item.type}}</td>
        <td><a :href="item.url">{{item.name}}</a></td>
        <td>{{item.time}}</td>
        <td></td>
        <td>{{item.click}}/{{item.comment}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  const { mapState, mapActions } = createNamespacedHelpers('list');
  export default {
    name: 'Vlist',
    data() {
      return {
        listData: [
          {
            type: '安全',
            name: '离别歌',
            url: 'asdf',
            time: '2017-10-17',
            click: '100',
            comment: '2',
          },{
            type: '技术',
            name: 'mierhuo',
            url: 'asdf',
            time: '2017-10-14',
            click: '10',
            comment: '2',
          },{
            type: '前端',
            name: 'tst',
            url: 'asdf',
            time: '2017-10-17',
            click: '100',
            comment: '2',
          },
        ]
      }
    },
    computed: {
      ...mapState({
        info: state => state.info
      })
    },

    created() {
      this.getData();
    },
    methods: {
      ...mapActions([
        'listTest'
      ]),
      getData () {
        this.listTest().then(result => {
          console.log('list', result);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  table {
    width: 80%;
    margin: 50px auto;
    border: 1px solid #2bbc8a;
    border-collapse: collapse;
    color: #c9cacc;
    thead {
      text-align: left;
      tr > th {
        color: #2bbc8a;
        background: #1b1b1b;
      }
    }
    th, td {
      padding: 10px;
      border: 1px dotted #2bbc8a;
      a {
        color: #c9cacc;
      }
    }
    td {
      height: 40px;
      line-height: 40px;
    }
    tr:nth-child(even) {
      background: #1b1b1b;
    }
  }
</style>
