import React from 'react'

// Styles
import '../styles/components/user-display.scss'

// Components
import UserModal from './UserModal'

interface UserDisplayProps {
	users: {
		username: string
		socketId: string
	}[]
}

export default function UserDisplay(props: UserDisplayProps): React.ReactElement {
	const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)

	return (
		<div className='user-display'>
			{props.users.slice(0, 3).map((user, _) => (
				<div key={user.socketId} className='user'>
					<span className='avatar' title={user.username}>
						{user.username[0].toUpperCase()}
					</span>
				</div>
			))}
			{props.users.length > 3 && (
				<div className='more-users' onClick={() => setIsModalOpen(true)} title='More users'>
					+{props.users.length - 3}
				</div>
			)}

			{isModalOpen && <UserModal users={props.users} onClose={() => setIsModalOpen(false)} />}
		</div>
	)
}
