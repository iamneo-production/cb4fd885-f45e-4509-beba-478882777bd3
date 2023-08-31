import { useEffect, useState } from 'react'
import Card from './Card'
import { useErrorBoundary } from 'react-error-boundary'

const Profile = ({ userId = sessionStorage.getItem('username') }) => {
  const [user, setUser] = useState(false)
  const { showBoundary } = useErrorBoundary();

  const fetchUserProfile = () => {
    fetch('http://localhost:8080/user/' + userId)
      .then((response) => (response.ok ? response.json() : {}))
      .then((user) => {
        setUser(user)
      }).catch((err) => {
        showBoundary(err);
      })
  }

  useEffect(() => {
    fetchUserProfile()
  }, [userId])

  return user && <Card items={user} title="Profile" footer={false} />
}

export default Profile
