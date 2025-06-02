const BASE_URL = 'https://story-api.dicoding.dev/v1';

const StoryApi = {
  async getStoriesWithLocation(token) {
    const response = await fetch('https://story-api.dicoding.dev/v1/stories?location=1', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return await response.json();
  },

  async login(email, password) {
    const response = await fetch('https://story-api.dicoding.dev/v1/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await response.json();
  },

  async addStory(formData, token) {
    const response = await fetch('https://story-api.dicoding.dev/v1/stories', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Gagal mengunggah cerita');
    return await response.json();
  },
};

export default StoryApi;
