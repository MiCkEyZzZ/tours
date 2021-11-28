import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '../index'

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password })
})

describe('Login', () => {
  beforeEach(() => <Login login={ mockLogin } />)

  it('should display required error when value is invalid', async () => {
    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(2)
    expect(mockLogin).not.toBeCalled()
  })
})
