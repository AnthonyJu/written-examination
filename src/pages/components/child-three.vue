<template>
  <div id="my-chart" class="full" />
</template>

<script setup>
// import echarts from 'echarts'

const option = {
  title: {
    text: 'ECharts 示例',
  },
  tooltip: {},
  legend: {},
  xAxis: {
    data: ['一月', '二月', '三月', '四月', '五月'],
  },
  yAxis: {},
  series: [
    {
      name: '柱状图',
      // TODO 类型
      data: [5, 15, 25, 35, 45],
    },
    {
      name: '折线图',
      // TODO 类型
      data: [10, 20, 30, 40, 50],
    },
  ],
}

// TODO 初始化echarts展示
</script>
