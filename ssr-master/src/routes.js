import App from './components/app';
import About from './components/about';

export default [
  {
    path: '/',
    component: App,
    exact: true,
  }, {
    path: '/about',
    component: About,
    exact: true,
  },
];
