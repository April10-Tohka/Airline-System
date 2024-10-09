<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import request from "@/utils/request.js";
onMounted(() => {});
/**
 * DOM元素
 */
//显示原图的img标签
const originImage = ref(null);
//裁剪框
const cropBox = ref(null);
//阴影框
const shadowBox = ref(null);

// 手柄类型
const handles = [
  "crop-handle-nw",
  "crop-handle-ne",
  "crop-handle-sw",
  "crop-handle-se",
];
//裁剪图片的file对象
let clipImageFile;

const previewContainer = {
  "big-portrait": [{ size: 180 }],
  "small-portrait": [{ size: 100 }, { size: 50 }, { size: 30 }],
};

// 裁剪框状态
const state = reactive({
  top: 50,
  left: 50,
  width: 80,
  height: 80,
  isDragging: false,
  isResizing: false,
  handleType: "",
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
  startTop: 60,
  startLeft: 60,
});

// 计算裁剪框样式
const cropBoxStyle = computed(() => ({
  top: `${state.top}px`,
  left: `${state.left}px`,
  width: `${state.width}px`,
  height: `${state.height}px`,
}));

/**
 * 限制位置的函数
 * @param newTop 相对于父元素的Y
 * @param newLeft 相对于父元素的X
 * @param width cropBox元素的宽度
 * @param height cropBox元素的高度
 * @returns {{top: number, left: number}}
 */
const limitPosition = (newTop, newLeft, width, height) => {
  const container = shadowBox.value;
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  if (newTop < 0) {
    newTop = 0;
  }
  if (newLeft < 0) {
    newLeft = 0;
  }
  if (newLeft + width > containerWidth) {
    let dx = newLeft + width - containerWidth;
    newLeft = newLeft - dx;
  }
  if (newTop + height > containerHeight) {
    let dy = newTop + height - containerHeight;
    newTop = newTop - dy;
  }
  return { top: newTop, left: newLeft };
};

/*bug：调整大小的边界问题尚未解决*/
// 限制大小的函数
const limitSize = (newWidth, newHeight, newTop, newLeft) => {
  const container = shadowBox.value;
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
  console.log("拖动裁剪框时处理");
  if (!state.isDragging) return;

  const dx = event.clientX - state.startX;
  const dy = event.clientY - state.startY;

  const newTop = state.startTop + dy;
  const newLeft = state.startLeft + dx;
  // newTop、newLeft都是相对父元素的坐标
  const { top, left } = limitPosition(
    newTop,
    newLeft,
    state.width,
    state.height,
  );
  state.top = top;
  state.left = left;
  generateCroppedImage();
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
  console.log("调整大小时处理");
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
    const { top } = limitPosition(newTop, newLeft, state.width, state.height);
    state.top = top;
  }
  if (
    state.handleType === "crop-handle-nw" ||
    state.handleType === "crop-handle-sw"
  ) {
    const { left } = limitPosition(newTop, newLeft, state.width, state.height);
    state.left = left;
  }
  generateCroppedImage();
};

// 停止调整大小
const stopResizing = () => {
  state.isResizing = false;
  document.removeEventListener("mousemove", onHandleMouseMove);
  document.removeEventListener("mouseup", stopResizing);
};

/**
 * 获取裁剪区域的信息
 */
const getCropBoxInfo = () => {
  return {
    y: state.top,
    x: state.left,
    cutWidth: state.width,
    cutHeight: state.height,
  };
};

// 生成裁剪后的图片
const generateCroppedImage = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 180;
  canvas.height = 180;
  //获取原图
  const image = originImage.value;
  const cropBoxInfo = {
    ...getCropBoxInfo(),
  };

  //计算显示尺寸与原图尺寸的缩放比例
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  cropBoxInfo.x = cropBoxInfo.x * scaleX;
  cropBoxInfo.y = cropBoxInfo.y * scaleY;
  cropBoxInfo.cutWidth = cropBoxInfo.cutWidth * scaleX;
  cropBoxInfo.cutHeight = cropBoxInfo.cutHeight * scaleY;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    cropBoxInfo.x,
    cropBoxInfo.y,
    cropBoxInfo.cutWidth,
    cropBoxInfo.cutHeight,
    0,
    0,
    180,
    180,
  );

  // 将裁剪后的图像导出为 data URL 并赋值给，裁剪后预览图片
  previewImageUrl.value = canvas.toDataURL("image/png");
  debouncedToBlob(canvas);
};
//防抖处理canvas的toBlob方法
const debouncedToBlob = useDebounceFn((canvas) => {
  // 这里是需要防抖处理的代码
  canvas.toBlob((blob) => {
    clipImageFile = new File([blob], "avatar.jpeg", { type: "image/jpeg" });
  }, "image/jpeg");
}, 300); // 300 毫秒的防抖时间
//预览图片的地址
const previewImageUrl = ref(
  "https://dimg04.c-ctrip.com/images/0AS1k120009l60yh36D69_C_180_180.jpg",
);

// 处理文件上传的回调函数
function handleFileInputChange(e) {
  try {
    //获取file对象
    const file = e.target.files[0];
    console.log("文件上传，", file);
    //设置文件大小限制
    const limitFileSize = 3 * 1024 * 1024;
    //设置文件格式
    const limitFileType = ["image/jpeg", "image/png"];
    if (file.size > limitFileSize) {
      return window.alert("上传文件的大小不能超过3M");
    } else if (!limitFileType.includes(file.type)) {
      return window.alert("上传文件类型必须为png、jpg、jpeg其中一种格式");
    }
    //读取文件数据
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      let result = e.target.result;
      //显示原图的img标签赋值
      originImage.value.src = result;
      //预览图片的img标签赋值
      previewImageUrl.value = result;
    };
  } catch (e) {
    console.log("没有选择图片", e);
  }
}

//原图片加载完成时的回调函数
function handleOriginImageLoad(e) {
  console.log("origin-image图像加载完成时调用!", e);

  //获取裁剪区域的DOM元素
  const cutBox = document.getElementById("cut-box");
  cutBox.style.setProperty("background", "none");
  originImage.value.style.setProperty("display", "block");
  //根据原图的大小来自适应宽高
  adaptWidthAndHeight();
  generateCroppedImage();
  function adaptWidthAndHeight() {
    console.log("自适应宽高");
    /**
     * 1. 根据原图的大小进行自适应宽高
     * 2. getBoundingClientRect获取到原图DOM元素的宽高，w h
     * 3. 阴影框的宽高= w , h
     * 4. 被裁剪的图像的宽高= w , h
     * 5. 显示阴影框，被裁剪图片
     */

    //获取原图的大小
    const originImageNaturalWidth = originImage.value.naturalWidth;
    const originImageNaturalHeight = originImage.value.naturalHeight;
    // 判断图片宽高比来设置适应方式
    if (originImageNaturalWidth > originImageNaturalHeight) {
      // 图片宽比高大，设置宽度充满，高度自适应
      originImage.value.style.width = "100%";
      originImage.value.style.height = "auto";
    } else {
      // 图片高比宽大，设置高度充满，宽度自适应
      originImage.value.style.width = "auto";
      originImage.value.style.height = "100%";
    }
    //图片自适应完成后，获取图片的宽高
    let { width, height } = originImage.value.getBoundingClientRect();
    cutBox.style.setProperty("--width", `${width}px`);
    cutBox.style.setProperty("--height", `${height}px`);
    shadowBox.value.style.display = "block";
  }
}

function uploadClipImage() {
  console.log("点击保存按钮,上传裁剪图片");
  if (!clipImageFile) {
    alert("请先上传图片");
    return;
  }
  const formData = new FormData();
  formData.append("avatar", clipImageFile);
  request({
    url: "/api/upload/avatar",
    method: "post",
    data: formData,
  });
}
</script>

<template>
  <div>
    <div class="header">
      <h3>我的头像</h3>
    </div>
    <ul class="account-form">
      <li>
        <label class="avatar-label">头像</label>
        <label for="file-input" class="file-input-label">上传图片</label>
        <input
          type="file"
          id="file-input"
          style="display: none"
          accept="image/jpeg,image/png,image/jpg"
          @change="handleFileInputChange"
        />
        <span class="upload-file-tip"
          >仅支持jpg,gif,png格式图片，且文件小于2M</span
        >
      </li>
      <li>
        <div class="portrait-container">
          <div class="load-portrait">
            <div class="cut-box" id="cut-box">
              <img
                src=""
                id="origin-img"
                @load="handleOriginImageLoad"
                ref="originImage"
                alt=""
              />
              <div class="shadow-box" ref="shadowBox">
                <div
                  class="crop-box"
                  ref="cropBox"
                  :style="cropBoxStyle"
                  @mousedown="startDraggingCropBox"
                >
                  <div
                    :class="['crop-handle', handle]"
                    v-for="(handle, index) in handles"
                    :key="index"
                    @mousedown.stop="startResizing($event, handle)"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div class="preview-container">
            <div
              v-for="(portrait, key) in previewContainer"
              :class="[key]"
              :key="key"
            >
              <dt
                class="preview"
                v-for="(item, index) in portrait"
                :key="index"
              >
                <div :class="[`preview-image-container-${item.size}`]">
                  <img :src="previewImageUrl" class="preview-image" alt="" />
                </div>
                <p class="preview-size">{{ item.size }}X{{ item.size }}像素</p>
              </dt>
            </div>
          </div>
        </div>
      </li>
      <li style="display: flex; align-items: center">
        <button class="save-btn" @click="uploadClipImage">保存</button>
        <i class="save-btn-tip-icon"></i>
        <span style="color: #999999; font-size: 12px">
          新头像将在审核后生效
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.header {
  background-color: #eaf5ff;
  border-top: 2px solid #155ebd;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border-bottom: 1px solid #c5ddf4;
  line-height: 35px;
  padding-left: 10px;
  height: 33px;
  > h3 {
    font-size: 14px;
  }
}
.account-form {
  padding: 20px 10px;
  border: 1px solid #cccccc;
  border-top: none;
  li {
    padding-left: 6%;
    margin-bottom: 5px;
  }
}
//头像label样式
.avatar-label {
  display: inline-block;
  width: 60px;
  padding-right: 20px;
  line-height: 32px;
  text-align: right;
  font-size: 14px;
  color: #333333;
}
//上传图片input label样式
.file-input-label {
  display: inline-block;
  width: 79px;
  height: 25px;
  margin-right: 10px;
  line-height: 25px;
  background-image: url("https://pic.c-ctrip.com/platform/online/my/user/btn_myctrip.png");
  background-repeat: no-repeat;
  background-position: -78px -735px;
  text-align: center;
  font-family: Arial, serif;
  font-size: 12px;
}
//上传图片描述
.upload-file-tip {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #666666;
}

.portrait-container {
  padding-left: 80px;
  display: flex;
  flex-direction: row;
}
.load-portrait {
  height: 325px;
}
#cut-box {
  --width: 500px;
  --height: 400px;
  $cut-box-width: 300px;
  $cut-box-height: 300px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: $cut-box-width;
  height: $cut-box-height;
  margin-bottom: 5px;
  border: 1px dashed #b8cadd;
  background: url("https://pic.c-ctrip.com/platform/online/my/user/upload_bg.jpg")
    center no-repeat #f7fbff;
  //显示原图的img标签
  #origin-img {
    width: 100%;
    height: 100%;
    display: none;
    user-select: none;
  }
  //裁剪图片的阴影框
  .shadow-box {
    position: absolute;
    background-color: white;
    opacity: 0.5;
    z-index: 80;
    display: none;
    width: var(--width);
    height: var(--height);
  }
  //裁剪框
  .crop-box {
    position: absolute;
    z-index: 90;
    cursor: move;
    border: 1px dashed #333333;
    background-color: transparent;
    user-select: none;

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
  }
}

//预览图片区域样式
.preview-container {
  display: flex;
  flex-direction: column;
  align-items: start;
  .small-portrait {
    display: flex;
    flex-direction: row;
    align-items: end;
    margin-top: 10px;
  }
  .preview {
    margin-left: 38px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //设置规定预览图片大小的p元素
    .preview-size {
      line-height: 22px;
      color: #333333;
      font-size: 12px;
      text-align: center;
    }
  }
}
//不同预览图片尺寸的样式
$preview-image-container-widths: (
  "180": 180px,
  "100": 100px,
  "50": 50px,
  "30": 30px,
);
@each $width, $value in $preview-image-container-widths {
  .preview-image-container-#{$width} {
    width: calc($value + 10px);
    height: calc($value + 10px);
    .preview-image {
      border: 1px solid #dfdfdf;
      padding: 3px;
      width: $value;
      height: $value;
    }
  }
}

//保存按钮样式
.save-btn {
  margin-left: 80px;
  height: 27px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  padding-inline: 18px;
  line-height: 27px;
  background-color: #eaf5ff;
  color: #2b2b2d;
  margin-right: 10px;
  & :hover {
    background-color: #00b5e5;
  }
}
.save-btn-tip-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  background-image: url("https://pic.c-ctrip.com/myctripv2/un_16x16.png?1012.png=");
  background-repeat: no-repeat;
  background-position: 0 -654px;
  display: inline-block;
}
</style>
