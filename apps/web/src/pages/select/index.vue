<template>
  <div class="select-character-page">
    <h1 class="title">选择角色</h1>
    <div v-if="characters.length > 0" class="character-list">
      <div
        v-for="(character, index) in characters"
        :key="character.id"
        class="character-item"
        :class="{ selected: selectedCharacterId === character.id }"
        @click="selectCharacter(character.id)"
      >
        <div class="character-content">
          <div class="number-badge">
            <span class="number">{{ index + 1 }}</span>
          </div>
          <div class="character-info">
            <span class="character-name">{{ character.name }}</span>
            <span class="account">（{{ character.account }}）</span>
          </div>
          <div v-if="character.isRecent" class="recent-tag"></div>
          <div v-if="selectedCharacterId === character.id" class="selected-indicator">
            <div class="indicator-outer">
              <div class="indicator-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      <div class="empty-text">暂无角色</div>
    </div>
    <div class="button-container">
      <button
        class="btn btn-primary"
        :class="{ disabled: !selectedCharacterId }"
        :disabled="!selectedCharacterId"
        @click="handleEnterGame"
      >
        进入游戏
      </button>
      <button class="btn btn-secondary" @click="handleCreateCharacter">新建角色</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

interface Character {
  id: number;
  name: string;
  account: string;
  isRecent?: boolean;
}

// 模拟角色数据，实际应该从 API 获取
const characters = ref<Character[]>([
  {
    id: 1,
    name: '角色名字',
    account: '账号',
    isRecent: true,
  },
  {
    id: 2,
    name: '角色名字',
    account: '账号',
  },
  {
    id: 3,
    name: '角色名字',
    account: '账号',
  },
  {
    id: 4,
    name: '角色名字',
    account: '账号',
  },
]);

const selectedCharacterId = ref<number | null>(1);

const selectCharacter = (id: number) => {
  selectedCharacterId.value = id;
};

const handleEnterGame = () => {
  if (selectedCharacterId.value) {
    // 进入游戏的处理逻辑
    console.log('进入游戏', selectedCharacterId.value);
  }
};

const handleCreateCharacter = () => {
  // 跳转到创建角色页面
  router.push('/create');
};
</script>

<style lang="scss" scoped>
.select-character-page {
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
    margin: 0 0 20px 0;
    line-height: 1.21;
    width: 163px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .character-list {
    width: 331px;
    min-height: 216px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 76px;
  }

  .character-item {
    width: 331px;
    height: 42px;
    background-color: rgba(215.77, 47.03, 167.96, 0.1);
    border-radius: 7px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      background-color: rgba(215.77, 47.03, 167.96, 0.15);
    }

    &.selected {
      background-color: rgba(215.77, 47.03, 167.96, 0.1);
    }
  }

  .character-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 11px 25px;
    box-sizing: border-box;
    position: relative;
    gap: 5px;
  }

  .number-badge {
    width: 20px;
    height: 20px;
    background-color: #9e8a8a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .number {
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: #ffe8f9;
    line-height: 1;
  }

  .character-info {
    display: flex;
    align-items: center;
    gap: 0;
    flex: 1;
    min-width: 0;
    margin-left: 5px;
  }

  .character-name {
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #27041d;
    line-height: 1.21;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .account {
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #9e8a8a;
    line-height: 1.21;
    white-space: nowrap;
  }

  .recent-tag {
    width: 46px;
    height: 20px;
    background-color: #2f89d7;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    flex-shrink: 0;

    &::before {
      content: '最近';
      font-family: Inter, sans-serif;
      font-weight: 600;
      font-size: 12px;
      color: #f5f5f5;
      line-height: 1;
    }
  }

  .selected-indicator {
    width: 20px;
    height: 20px;
    margin-left: auto;
    flex-shrink: 0;
  }

  .indicator-outer {
    width: 20px;
    height: 20px;
    border: 1px solid #d82fa8;
    border-radius: 10px;
    background-color: #ffe8f9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .indicator-inner {
    width: 10px;
    height: 10px;
    background-color: #d82fa8;
    border-radius: 5px;
  }

  .empty-state {
    width: 331px;
    height: 216px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 76px;
  }

  .empty-text {
    font-family: Inter, sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: #ff95e3;
    text-align: center;
    line-height: 1.21;
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

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 1;
    }
  }

  .btn-primary {
    width: 132px;
    height: 36.44px;
    background-color: #d82fa8;

    &:hover:not(:disabled) {
      background-color: #c8289a;
    }

    &.disabled {
      background-color: #dd98c9;
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
