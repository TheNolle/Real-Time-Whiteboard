import React from 'react'

// Styles
import '../styles/components/welcome.scss'

// Components
import { Link } from 'react-router-dom'

export default function Welcome(): React.ReactElement {
	return (
		<div className='welcome-container'>
			<h1>Welcome to the Real-Time Collaborative Whiteboard!</h1>
			<p>
				Collaborate with others in real-time on a virtual whiteboard. Create rooms, invite others with room codes,
				and work together seamlessly.
			</p>
			<ul>
				<li>Create and join rooms with unique codes.</li>
				<li>Set passcodes for extra security.</li>
				<li>Use drawing tools, text, shapes, and upload images.</li>
				<li>Real-time collaboration with multiple users.</li>
				<li>Compatible with both desktop and mobile devices.</li>
			</ul>
			<p>
				To get started, please <Link to='/register'>Register</Link> or <Link to='/login'>Login</Link>.
			</p>
		</div>
	)
}
