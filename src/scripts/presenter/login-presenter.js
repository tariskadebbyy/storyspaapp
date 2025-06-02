import StoryApi from '../api/story-api';

const LoginPresenter = {
  async render() {
    const container = document.getElementById('main-content');
    container.innerHTML = `
      <h2>Login</h2>
      <form id="loginForm">
        <label>Email <input type="email" name="email" required /></label><br>
        <label>Password <input type="password" name="password" required /></label><br>
        <button type="submit">Login</button>
      </form>
      <p>Belum punya akun? <a href="#register">Daftar di sini</a></p>
    `;

    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;

      const result = await StoryApi.login(email, password);
      if (result.error) {
        alert('Login gagal: ' + result.message);
        return;
      }

      // Simpan token ke localStorage
      localStorage.setItem('token', result.loginResult.token);
      window.location.hash = '#home';
    });
  },
};

export default LoginPresenter;
