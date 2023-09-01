import { render } from '@testing-library/react'
import Card from './Card'

describe('Card Component', () => {
  it('renders card with header and body', () => {
    const mockItems = {
      key1: 'value1',
      key2: 'value2',
    }

    const { getByText } = render(
      <Card title="Test Title" items={mockItems} />
    )

    // Check for card title in header
    expect(getByText('Test Title')).toBeInTheDocument()

    // Check for values in card body
    expect(getByText('key1')).toBeInTheDocument()
    expect(getByText('key2')).toBeInTheDocument()
  })
})
