import './app.css';
import App from './App.svelte';

console.log('hi');
const app = new App({
  target: document.getElementById('svelte-app') as HTMLElement,
});

export default app;
