import './app.css';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('svelte-app') as HTMLElement,
});

export default app;
