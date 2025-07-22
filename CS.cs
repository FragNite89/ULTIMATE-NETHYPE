body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #141414;
  color: #fff;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #000;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: #e50914;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  color: #fff;
  text-decoration: none;
}

.profile-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  background: #1f1f1f;
  padding: 2rem;
  border-radius: 10px;
}

.auth-container input,
.auth-container button {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
}

.auth-container button {
  background: #e50914;
  color: #fff;
  border: none;
  border-radius: 5px;
}

#auth-toggle {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

#recommended-movies {
  display: none;
  padding: 2rem;
  gap: 1rem;
}

.media-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
}
