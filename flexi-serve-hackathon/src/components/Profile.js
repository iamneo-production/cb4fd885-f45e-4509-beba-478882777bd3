import { useEffect, useState } from 'react'
import Card from './Card'

const Profile = ({ userId = sessionStorage.getItem('username') }) => {
  const [user, setUser] = useState(null)

  const fetchUserProfile = () => {
    fetch('http://localhost:8080/user/' + userId)
      .then((response) => (response.ok ? response.json() : {}))
      .then((user) => {
        setUser(user)
      })
  }

  useEffect(() => {
    fetchUserProfile()
  }, [userId])

  return user ? <Card items={user} title="Profile" /> : <div>Loading...</div>
}

export default Profile
