<template>
  <div id="webgl" style="margin: 200px auto"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(300);

const scene = new THREE.Scene();
//创建一个长方体几何对象Geometry
const geometry = new THREE.BoxGeometry(100, 100, 100);
//创建一个材质对象Material
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000, //0xff0000设置材质颜色为红色
  transparent: false, //开启透明
  opacity: 1 //设置透明度
});
// 两个参数分别为几何体geometry、材质material
const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
//设置网格模型在三维空间中的位置坐标，默认是坐标原点
mesh.position.set(60, 60, 60);

// 光源
const pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.position.set(100, 100, 100); //点光源放在x轴上

scene.add(mesh);
scene.add(axesHelper);
// scene.add(pointLight); //点光源添加到场景中

// 实例化一个透视投影相机对象
// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
const camera = new THREE.PerspectiveCamera(30, 800 / 500, 1, 3000);
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(800, 800, 800);
//指向mesh对应的位置
camera.lookAt(mesh.position);

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
// 定义threejs输出画布的尺寸(单位:像素px)
const width = 1000; //宽度
const height = 600; //高度
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
// renderer.render(scene, camera); //执行渲染操作

const clock = new THREE.Clock();
function render() {
  const spt = clock.getDelta() * 1000; //毫秒
  //   console.log('两帧渲染时间间隔(毫秒)', spt);
  //   console.log('帧率FPS', 1000 / spt);
  renderer.render(scene, camera); //执行渲染操作
  mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}

onMounted(() => {
  document.getElementById('webgl').appendChild(renderer.domElement);
  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    // renderer.render(scene, camera); //执行渲染操作
  }); //监听鼠标、键盘事件

  render();
});
</script>

<style lang="scss" scoped></style>
