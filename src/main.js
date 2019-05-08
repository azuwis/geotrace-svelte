import App from './App.svelte';
import 'normalize.css';
import './css/skeleton.css';

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

window.app = app;

export default app;
