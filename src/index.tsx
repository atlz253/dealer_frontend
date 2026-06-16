import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Root from "./pages/Root";

async function enableMocking() {
  if (window.location.hostname !== "atlz253.github.io") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  return worker.start({
    serviceWorker: {
      url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`
    }
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
