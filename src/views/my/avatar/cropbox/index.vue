<script setup>
import { ref, reactive, computed } from "vue";

// 裁剪框和容器的引用
const cropBoxRef = ref(null);
const containerRef = ref(null);

// 裁剪框状态
const state = reactive({
  top: 50,
  left: 50,
  width: 200,
  height: 150,
  isDragging: false,
  isResizing: false,
  handleType: "",
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
  startTop: 0,
  startLeft: 0,
});

// 手柄类型
const handles = [
  "crop-handle-nw",
  "crop-handle-ne",
  "crop-handle-sw",
  "crop-handle-se",
];

// 计算裁剪框样式
const cropBoxStyle = computed(() => ({
  top: `${state.top}px`,
  left: `${state.left}px`,
  width: `${state.width}px`,
  height: `${state.height}px`,
}));

// 限制位置的函数
const limitPosition = (newTop, newLeft) => {
  const container = containerRef.value;

  const maxTop = container.offsetHeight - state.height;
  const maxLeft = container.offsetWidth - state.width;

  return {
    top: Math.min(Math.max(0, newTop), maxTop),
    left: Math.min(Math.max(0, newLeft), maxLeft),
  };
};

// 限制大小的函数
const limitSize = (newWidth, newHeight, newTop, newLeft) => {
  const container = containerRef.value;

  const maxWidth = container.offsetWidth - newLeft;
  const maxHeight = container.offsetHeight - newTop;

  return {
    width: Math.min(newWidth, maxWidth),
    height: Math.min(newHeight, maxHeight),
  };
};

// 开始拖动裁剪框
const startDraggingCropBox = (event) => {
  state.isDragging = true;
  state.startX = event.clientX;
  state.startY = event.clientY;
  state.startTop = state.top;
  state.startLeft = state.left;

  document.addEventListener("mousemove", onCropBoxMouseMove);
  document.addEventListener("mouseup", stopDraggingCropBox);
};

// 拖动裁剪框时处理
const onCropBoxMouseMove = (event) => {
  if (!state.isDragging) return;

  const dx = event.clientX - state.startX;
  const dy = event.clientY - state.startY;

  const newTop = state.startTop + dy;
  const newLeft = state.startLeft + dx;

  const { top, left } = limitPosition(newTop, newLeft);

  state.top = top;
  state.left = left;
};

// 停止拖动裁剪框
const stopDraggingCropBox = () => {
  state.isDragging = false;
  document.removeEventListener("mousemove", onCropBoxMouseMove);
  document.removeEventListener("mouseup", stopDraggingCropBox);
};

// 开始调整大小
const startResizing = (event, handleType) => {
  state.isResizing = true;
  state.handleType = handleType;
  state.startX = event.clientX;
  state.startY = event.clientY;
  state.startWidth = state.width;
  state.startHeight = state.height;
  state.startTop = state.top;
  state.startLeft = state.left;

  document.addEventListener("mousemove", onHandleMouseMove);
  document.addEventListener("mouseup", stopResizing);
};

// 调整大小时处理
const onHandleMouseMove = (event) => {
  if (!state.isResizing) return;

  const dx = event.clientX - state.startX;
  const dy = event.clientY - state.startY;

  let newWidth = state.startWidth;
  let newHeight = state.startHeight;
  let newTop = state.startTop;
  let newLeft = state.startLeft;

  switch (state.handleType) {
    case "crop-handle-nw":
      newWidth = state.startWidth - dx;
      newHeight = state.startHeight - dy;
      newTop = state.startTop + dy;
      newLeft = state.startLeft + dx;
      break;
    case "crop-handle-ne":
      newWidth = state.startWidth + dx;
      newHeight = state.startHeight - dy;
      newTop = state.startTop + dy;
      break;
    case "crop-handle-sw":
      newWidth = state.startWidth - dx;
      newHeight = state.startHeight + dy;
      newLeft = state.startLeft + dx;
      break;
    case "crop-handle-se":
      newWidth = state.startWidth + dx;
      newHeight = state.startHeight + dy;
      break;
  }

  // 限制大小和位置
  const { width, height } = limitSize(newWidth, newHeight, newTop, newLeft);

  state.width = width;
  state.height = height;

  // 保证裁剪框不会超出容器的顶部和左侧
  if (
    state.handleType === "crop-handle-nw" ||
    state.handleType === "crop-handle-ne"
  ) {
    const { top } = limitPosition(newTop, newLeft);
    state.top = top;
  }
  if (
    state.handleType === "crop-handle-nw" ||
    state.handleType === "crop-handle-sw"
  ) {
    const { left } = limitPosition(newTop, newLeft);
    state.left = left;
  }
};

// 停止调整大小
const stopResizing = () => {
  state.isResizing = false;
  document.removeEventListener("mousemove", onHandleMouseMove);
  document.removeEventListener("mouseup", stopResizing);
};
</script>

<template>
  <div class="container" ref="containerRef">
    <div
      class="crop-box"
      ref="cropBoxRef"
      :style="cropBoxStyle"
      @mousedown="startDraggingCropBox"
    >
      <div
        class="crop-handle"
        v-for="handle in handles"
        :key="handle"
        :class="handle"
        @mousedown.stop="startResizing($event, handle)"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  position: relative;
  width: 200px;
  height: 150px;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
}

.crop-box {
  position: absolute;
  border: 2px solid blue;
}

/**
    裁剪框四个手柄的样式
     */
.crop-handle {
  position: absolute;
  z-index: 20;
  border: 1px solid #eeeeee;
  background-color: #333333;
  opacity: 0.7;
  width: 7px;
  height: 7px;
}
$crop-handles: (
  "nw": -4px auto auto -4px,
  "ne": -4px -4px auto auto,
  "sw": auto auto -4px -4px,
  "se": auto -4px -4px auto,
);
@each $handle, $value in $crop-handles {
  .crop-handle-#{$handle} {
    inset: $value;
    cursor: #{$handle}-resize;
  }
}
</style>
