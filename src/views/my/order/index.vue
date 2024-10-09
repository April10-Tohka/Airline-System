<script setup>
let isResizing = false;
let currentHandle;
let startX, startY, startWidth, startHeight, startLeft, startTop;

const cropBox = document.getElementById("crop-box");
const handles = document.querySelectorAll(".handle");

// 监听鼠标按下事件
handles.forEach((handle) => {
  handle.addEventListener("mousedown", function (e) {
    isResizing = true;
    currentHandle = handle;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = cropBox.offsetWidth;
    startHeight = cropBox.offsetHeight;
    startLeft = cropBox.offsetLeft;
    startTop = cropBox.offsetTop;

    document.body.style.userSelect = "none";
  });
});

document.addEventListener("mousemove", function (e) {
  if (isResizing) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (currentHandle.classList.contains("top-left")) {
      cropBox.style.width = `${startWidth - dx}px`;
      cropBox.style.height = `${startHeight - dy}px`;
      cropBox.style.left = `${startLeft + dx}px`;
      cropBox.style.top = `${startTop + dy}px`;
    } else if (currentHandle.classList.contains("top-right")) {
      cropBox.style.width = `${startWidth + dx}px`;
      cropBox.style.height = `${startHeight - dy}px`;
      cropBox.style.top = `${startTop + dy}px`;
    } else if (currentHandle.classList.contains("bottom-left")) {
      cropBox.style.width = `${startWidth - dx}px`;
      cropBox.style.height = `${startHeight + dy}px`;
      cropBox.style.left = `${startLeft + dx}px`;
    } else if (currentHandle.classList.contains("bottom-right")) {
      cropBox.style.width = `${startWidth + dx}px`;
      cropBox.style.height = `${startHeight + dy}px`;
    }

    // 确保裁剪框不超出容器边界
    const containerRect = cropBox.parentElement.getBoundingClientRect();
    const boxRect = cropBox.getBoundingClientRect();
    if (boxRect.left < containerRect.left) {
      cropBox.style.left = "0px";
      cropBox.style.width = `${startWidth}px`;
    }
    if (boxRect.top < containerRect.top) {
      cropBox.style.top = "0px";
      cropBox.style.height = `${startHeight}px`;
    }
    if (boxRect.right > containerRect.right) {
      cropBox.style.width = `${containerRect.width - boxRect.left}px`;
    }
    if (boxRect.bottom > containerRect.bottom) {
      cropBox.style.height = `${containerRect.height - boxRect.top}px`;
    }
  }
});

document.addEventListener("mouseup", function () {
  isResizing = false;
  document.body.style.userSelect = "auto";
});

function getCropData() {
  const cropBox = document.getElementById("crop-box");
  const image = document.getElementById("image");

  const cropRect = cropBox.getBoundingClientRect();
  const imageRect = image.getBoundingClientRect();

  const cropX = cropRect.left - imageRect.left;
  const cropY = cropRect.top - imageRect.top;
  const cropWidth = cropRect.width;
  const cropHeight = cropRect.height;

  return {
    cropX,
    cropY,
    cropWidth,
    cropHeight,
  };
}

// 示例：获取裁剪数据并输出
const cropData = getCropData();
console.log(cropData);

function cropImage() {
  const { cropX, cropY, cropWidth, cropHeight } = getCropData();
  const image = document.getElementById("image");

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = cropWidth;
  canvas.height = cropHeight;

  const imageElement = new Image();
  imageElement.src = image.src;

  imageElement.onload = function () {
    ctx.drawImage(
      imageElement,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    // 生成裁剪后的图片
    const croppedImage = canvas.toDataURL("image/jpeg");
    console.log(croppedImage);

    // 你可以将裁剪后的图片显示或保存
    document.body.appendChild(canvas); // 显示裁剪后的图片
  };
}

// 调用裁剪
cropImage();
</script>

<template>
  <div class="order-tips">
    <div>
      <i class="order-tips-icon"></i>
      <span style="font-size: 12px">
        您可以在线查看近一年订单，如需查找更久之前的订单，请至携程app或致电95010；您也可以使用右边下载功能下载历史所有订单
      </span>
    </div>
    <a>下载所有历史订单</a>
  </div>

  <div class="crop-container">
    <img
      id="image"
      src="../../../assets/娜维娅.jfif"
      alt="Image"
      width="300"
      height="300"
    />
    <div class="crop-box" id="crop-box">
      <!-- 四个可调整大小的手柄 -->
      <div class="handle top-left"></div>
      <div class="handle top-right"></div>
      <div class="handle bottom-left"></div>
      <div class="handle bottom-right"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
//订单提示
.order-tips {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  a {
    color: #0066cf;
    background-image: url("https://pic.c-ctrip.com/myctripv2/un_16x16.png?1012.png=");
    background-repeat: no-repeat;
    background-position: 0 -158px;
    padding-left: 20px;
    font-size: 12px;
  }
}
.order-tips-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  background-image: url("https://pic.c-ctrip.com/myctripv2/un_16x16.png?1012.png=");
  background-repeat: no-repeat;
  background-position: 0 -654px;
  display: inline-block;
}

.crop-box {
  position: absolute;
  border: 2px solid #00ff00;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
  background: transparent;
  cursor: move;
}

.handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #00ff00;
}

.top-left {
  top: -6px;
  left: -6px;
  cursor: nwse-resize;
}

.top-right {
  top: -6px;
  right: -6px;
  cursor: nesw-resize;
}

.bottom-left {
  bottom: -6px;
  left: -6px;
  cursor: nesw-resize;
}

.bottom-right {
  bottom: -6px;
  right: -6px;
  cursor: nwse-resize;
}
</style>
