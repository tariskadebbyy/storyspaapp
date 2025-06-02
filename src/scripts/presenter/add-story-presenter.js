import AddStoryView from '../view/add-story-view';
import StoryApi from '../api/story-api';

const AddStoryPresenter = {
  async render() {
    const container = document.getElementById('main-content');
    container.innerHTML = `
      <h2>Tambah Cerita</h2>
      <form id="addStoryForm">
        <label for="description">Deskripsi:</label>
        <input type="text" id="description" required><br><br>

        <label>Ambil Gambar:</label><br>
        <video id="camera" autoplay playsinline width="300"></video><br>
        <button type="button" id="captureBtn">📸 Ambil Foto</button><br>
        <canvas id="canvas" style="display:none;"></canvas>
        <br><br>

        <label>Pilih Lokasi:</label><br>
        <div id="map" style="height: 300px;"></div>
        <p>Latitude: <span id="latText">-</span>, Longitude: <span id="lonText">-</span></p>
        <br>

        <button type="submit">📝 Tambahkan Cerita</button>
      </form>
    `;

    AddStoryView.initCamera();
    AddStoryView.initMap();

    document.getElementById('addStoryForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const description = document.getElementById('description').value;
      const imageBlob = AddStoryView.captureImage();
      const { lat, lon } = AddStoryView.getLocation();
      const token = localStorage.getItem('token');

      if (!lat || !lon || !imageBlob) {
        alert('Gambar dan lokasi wajib diisi.');
        return;
      }

      const formData = new FormData();
      formData.append('description', description);
      formData.append('photo', imageBlob, 'photo.jpg');
      formData.append('lat', lat);
      formData.append('lon', lon);

      try {
        await StoryApi.addStory(formData, token);
        alert('Cerita berhasil ditambahkan!');
        window.location.hash = '#home';
      } catch (error) {
        alert('Gagal tambah cerita: ' + error.message);
      }
    });
  }
};

export default AddStoryPresenter;
