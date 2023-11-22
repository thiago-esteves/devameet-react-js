import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import { router } from './router';
import './assets/styles/global.scss';


ReactDOM.createRoot(document.getElementById('root')as HTMLAnchorElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  
  </React.StrictMode>,
)
