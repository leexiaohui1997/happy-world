<template>
  <div class="start-page">
    <h1 class="title">开心世界</h1>
    <div class="enter-btn" @click="handleEnter">进入世界</div>
  </div>
</template>

<script setup lang="ts">
const handleEnter = () => {
  // 进入世界的处理逻辑
  console.log('进入世界');
};
</script>

<style lang="scss" scoped>
.start-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(-46deg, rgba(255, 255, 255, 1) 0%, rgba(255, 228, 235, 1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    font-family: Inter;
    font-weight: 600;
    font-size: 48px;
    color: #d82fa8;
    margin-bottom: 290px;
    line-height: 1.21;
  }

  .enter-btn {
    width: 225px;
    height: 50px;
    background-color: #d82fa8;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Inter;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
    line-height: 1.21;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #c8289a;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
