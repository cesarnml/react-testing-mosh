import { User } from '@/entities'

type Props = {
  user: User
}

const UserAccount = ({ user }: Props) => {
  return (
    <>
      <h2>User Profile</h2>
      {user.isAdmin && <button>Edit</button>}
      <div>
        <strong>Name:</strong> {user.name}
      </div>
    </>
  )
}

export default UserAccount
