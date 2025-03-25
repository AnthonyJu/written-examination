<template>
  <div id="my-map" class="full" />
</template>

<script setup>
import MapImageLayer from '@arcgis/core/layers/MapImageLayer'
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import '@arcgis/core/assets/esri/themes/light/main.css'

const layer = new MapImageLayer({
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
  title: 'World Street Map',
})

const map = new Map({
  // TODO 添加图层
})

const view = new MapView({
  // TODO 设置相关参数
  ui: {
    components: [],
  },
})

// TODO 初始化地图展示

// TODO 监听地图点击事件并打印坐标

// TODO 在地图上添加一个点标记
</script>
