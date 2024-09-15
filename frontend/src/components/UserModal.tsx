import React from 'react'

// Styles
import '../styles/components/user-modal.scss'

interface UserModalProps {
	users: {
		username: string
		socketId: string
	}[]
	onClose: () => void
}

export default function UserModal(props: UserModalProps): React.ReactElement {
	return (
		<div className='user-modal'>
			<div className='modal-content'>
				<h3>Connected Users</h3>
				<ul>
					{props.users.map((user, index) => (
						<li key={index}>
							<span className='avatar'>{user.username[0].toUpperCase()}</span>
							<span>{user.username}</span>
						</li>
					))}
				</ul>
				<button onClick={props.onClose}>Close</button>
			</div>
		</div>
	)
}
