<template>
  <div class="create-character-page">
    <h1 class="title">创建角色</h1>
    <div class="form-container">
      <div class="input-group">
        <input
          v-model="formData.characterName"
          type="text"
          class="input-field"
          placeholder="角色名字"
        />
      </div>
      <div class="input-group">
        <input v-model="formData.account" type="text" class="input-field" placeholder="设置账号" />
      </div>
      <div class="input-group">
        <input
          v-model="formData.password"
          type="password"
          class="input-field"
          placeholder="设置密码"
        />
      </div>
    </div>
    <div class="button-container">
      <button class="btn btn-primary" @click="handleCreate">创建角色</button>
      <button class="btn btn-secondary" @click="handleExisting">已有角色</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
  characterName: '',
  account: '',
  password: '',
});

const handleCreate = () => {
  // 创建角色的处理逻辑
  // TODO: 这里应该调用 API 创建角色
  console.log('创建角色', formData.value);

  // 创建成功后跳转到选择角色页面
  // 实际项目中应该等待 API 响应成功后再跳转
  router.push('/select');
};

const handleExisting = () => {
  // 已有角色，跳转到选择角色页面
  router.push('/select');
};
</script>

<style lang="scss" scoped>
.create-character-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(-46deg, rgba(255, 255, 255, 1) 0%, rgba(255, 228, 235, 1) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 143px;
  box-sizing: border-box;

  .title {
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 24px;
    color: #d82fa8;
    text-align: center;
    margin: 0 0 41px 0;
    line-height: 1.21;
    width: 163px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-container {
    width: 283px;
    display: flex;
    flex-direction: column;
    margin-bottom: 49px;
  }

  .input-group {
    width: 283px;
    height: 51px;
    position: relative;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &:nth-child(2) {
      margin-bottom: 13px;
    }
  }

  .input-field {
    width: 100%;
    height: 50px;
    background-color: #f5f5f5;
    border: 2px solid #d82fa8;
    border-radius: 20px;
    padding: 0 16.5px;
    box-sizing: border-box;
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #303133;
    outline: none;
    transition: all 0.3s ease;

    &::placeholder {
      color: #999999;
      font-family: Inter, sans-serif;
      font-weight: 600;
      font-size: 16px;
    }

    &:focus {
      background-color: #ffffff;
    }
  }

  .button-container {
    display: flex;
    gap: 18px;
    justify-content: center;
    align-items: center;
  }

  .btn {
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.21;
    outline: none;

    &:active {
      transform: scale(0.98);
    }
  }

  .btn-primary {
    width: 132px;
    height: 36.44px;
    background-color: #d82fa8;

    &:hover {
      background-color: #c8289a;
    }
  }

  .btn-secondary {
    width: 133px;
    height: 36.44px;
    background-color: #2f89d7;

    &:hover {
      background-color: #2778c4;
    }
  }
}
</style>
