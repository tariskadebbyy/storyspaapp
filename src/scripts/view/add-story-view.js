let selectedLat = null;
let selectedLon = null;

const AddStoryView = {
  stream: null,

  initCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.stream = stream;
      document.getElementById('camera').srcObject = stream;
    });
  },

  captureImage() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const dataURL = canvas.toDataURL('image/jpeg');
    return this.dataURLtoBlob(dataURL);
  },

  dataURLtoBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  },

  initMap() {
    const map = L.map('map').setView([-2.5, 118], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    let marker = null;

    map.on('click', function (e) {
      selectedLat = e.latlng.lat;
      selectedLon = e.latlng.lng;

      document.getElementById('latText').innerText = selectedLat.toFixed(5);
      document.getElementById('lonText').innerText = selectedLon.toFixed(5);

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng).addTo(map);
      }
    });
  },

  getLocation() {
    return { lat: selectedLat, lon: selectedLon };
  }
};

export default AddStoryView;
