import { validateEmail } from "./validateEmail"

describe('validateEmail', () => {
  it('email should be valid', () => {
    expect(validateEmail('email@gmail.com')).toBe(true)
  })

  it('email should not be valid', () => {
    expect(validateEmail('@gmail.com')).not.toBe(true)
  })
})