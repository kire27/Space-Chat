// https://www.youtube.com/watch?v=zQyrwxMPm88&list=PLbRagc34eGYWMg-nEZlO0GqCuEaZdOgJa&index=6&t=86s
import './styles/index.css';
import { 
    React, 
    ReactDOM 
} from "./config/React-config"
import { App } from './config/Components-config';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
