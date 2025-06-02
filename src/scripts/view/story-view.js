import L from 'leaflet';

const StoryView = {
  renderList(stories) {
    const listContainer = document.getElementById('story-list');
    listContainer.innerHTML = '';

    stories.forEach(story => {
      const article = document.createElement('article');
      article.className = 'story-item';
      article.setAttribute('tabindex', '0'); // agar bisa fokus pakai keyboard
      article.innerHTML = `
        <img src="${story.photoUrl}" alt="Foto oleh ${story.name}" width="150" />
        <h3>${story.name}</h3>
        <p>${story.description}</p>
        <p><small aria-label="Koordinat lokasi">📍 (${story.lat?.toFixed(3)}, ${story.lon?.toFixed(3)})</small></p>
      `;
      listContainer.appendChild(article);
    });
  },

  renderMap(stories) {
    const map = L.map('map').setView([-2.5, 118], 4); // Pusat Indonesia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map © OpenStreetMap contributors'
    }).addTo(map);

    // Tambahkan invalidateSize agar peta bisa ditampilkan dengan benar
    setTimeout(() => {
      map.invalidateSize();
    }, 0);

    stories.forEach(story => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon]).addTo(map);
        marker.bindPopup(`<strong>${story.name}</strong><br>${story.description}`);
      }
    });
  }
};

export default StoryView;
