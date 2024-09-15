import React from 'react'
import ReactDOM from 'react-dom/client'

// Styles
import './styles/main.scss'
import 'react-toastify/dist/ReactToastify.css'

// Components
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ToastContainer } from 'react-toastify'

const rootElement = document.body.querySelector('#root')
if (!rootElement) {
	throw new Error('No root element found')
} else {
	ReactDOM
		.createRoot(rootElement)
		.render(
			<BrowserRouter>
				<App />
				<ToastContainer position='bottom-right' autoClose={3000} limit={5} newestOnTop theme='dark' />
			</BrowserRouter>
		)
}
