import LoginPresenter from '../presenter/login-presenter';
import RegisterPresenter from '../presenter/register-presenter';
import StoryPresenter from '../presenter/story-presenter.js';
import AddStoryPresenter from '../presenter/add-story-presenter';

const routes = {
  '#/login': LoginPresenter,
  '#login': LoginPresenter,
  '#/register': RegisterPresenter,
  '#/add-story': AddStoryPresenter,
  '#/home': StoryPresenter,
  '#home': StoryPresenter,
  '': StoryPresenter,
};

export const router = async () => {
  let hash = window.location.hash || '#/home';
  console.log('Current hash:', hash); // ⬅ Tambahkan ini

  const presenter = routes[hash];

  if (!presenter) {
    document.getElementById('main-content').innerHTML = '<h2>404 Not Found</h2>';
    return;
  }

  if (document.startViewTransition) {
    document.startViewTransition(() => presenter.render());
  } else {
    await presenter.render();
  }
};

// Event listener in app.js
window.addEventListener('hashchange', router);
window.addEventListener('load', router);
