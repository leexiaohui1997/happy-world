function setRem() {
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // 得到html的Dom元素
  const htmlDom = document.getElementsByTagName('html')[0]!;
  // 设置根元素字体大小，以375px设计稿为基准
  htmlDom.style.fontSize = (htmlWidth / 375) * 100 + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};
