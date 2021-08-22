import { validateEmail } from "./validaEmail"

describe('validateEmail', () => {
  it('email should be valid', () => {
    expect(validaEmail('email@gmail.com')).toBe(true)
  })

  it('email should not be valid', () => {
    expect(validaEmail('@gmail.com')).not.toBe(true)
  })
})