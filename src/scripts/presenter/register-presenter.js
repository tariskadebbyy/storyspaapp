const RegisterPresenter = {
  async render() {
    const container = document.getElementById('main-content');
    container.innerHTML = `
      <h2>Register</h2>
      <form id="registerForm">
        <label>Nama <input type="text" name="name" required /></label><br>
        <label>Email <input type="email" name="email" required /></label><br>
        <label>Password <input type="password" name="password" required /></label><br>
        <button type="submit">Daftar</button>
      </form>
      <p>Sudah punya akun? <a href="#login">Login di sini</a></p>
    `;

    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.name.value;
      const email = form.email.value;
      const password = form.password.value;

      const response = await fetch('https://story-api.dicoding.dev/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      if (result.error) {
        alert('Registrasi gagal: ' + result.message);
      } else {
        alert('Berhasil daftar, silakan login!');
        window.location.hash = '#login';
      }
    });
  }
};

export default RegisterPresenter;
