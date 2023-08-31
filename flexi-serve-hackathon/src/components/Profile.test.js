import { render, waitFor, act } from '@testing-library/react'
import Profile from './Profile'

const mockData = {
  id: '3',
  name: 'Saravanan Kandasamy',
  password: 'test123',
  email: 'emailtoksaravanan@gmail.com',
  phone: '07721544510',
  country: 'uk',
  address: 'Apartment 3, 93 Clements Road',
  gender: 'male',
  orders: [],
}

beforeEach(() => {
  fetch.resetMocks()
})

describe('Profile Component', () => {
  it('fetches user profile and renders Card component', async () => {
    fetch.mockResponseOnce(JSON.stringify(mockData))
    // Render the component
    const { queryByText } = render(<Profile userId="3" />)

    // Wait for the fetch operation to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/user/3')

      // Assert that the Card component is rendered
      expect(queryByText('Profile')).toBeInTheDocument()
    })
  })
})
