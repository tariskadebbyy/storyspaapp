import StoryApi from '../api/story-api';
import StoryView from '../view/story-view';

const StoryPresenter = {
  async render() {
    const container = document.getElementById('main-content');
    container.innerHTML = `
      <section aria-labelledby="story-heading">
        <h2 id="story-heading">Daftar Cerita</h2>
        <div id="story-list"></div>
      </section>
      <section aria-labelledby="map-heading">
        <h2 id="map-heading">Peta Lokasi Cerita</h2>
        <div id="map" style="height: 400px; margin-top: 1rem;"></div>
      </section>
    `;

    const token = localStorage.getItem('token');
    if (!token) {
      container.innerHTML = `
        <p>
          Silakan <a href="#/login">login</a> untuk melihat cerita.
        </p>
      `;
      return;
    }

    try {
      const data = await StoryApi.getStoriesWithLocation(token);
      StoryView.renderList(data.listStory);
      StoryView.renderMap(data.listStory);
    } catch (error) {
      container.innerHTML += `<p role="alert">Gagal memuat cerita: ${error.message}</p>`;
    }
  },
};

export default StoryPresenter;
