import { createMemoryHistory, createRouter } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
});

router.afterEach(to => {
  document.title = to.meta.title || '开心世界';
});

export default router;
