<template>
  <div class="menu-wrapper">
    <div class="old_item">
      <ul>
        <li>adshbord</li>
        <li>交易管理</li>
        <li>用户管理</li>
        <li>公司管理</li>
        <li>积分商城</li>
        <li>提现管理</li>
        <li>广告位</li>
        <router-link :to="{path:'/example/index'}"><li>焦小姐的朋友</li></router-link>
        <router-link :to="{path:'/message/index'}"><li>小道消息</li></router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>
