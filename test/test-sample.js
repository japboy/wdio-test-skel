import { expect } from 'chai'

describe('Sample', () => {
  it('Access Google top page', () => {
    browser.url('https://www.google.com/')
    expect(browser.getTitle()).to.equal('Google')
  })

  it('Check visual regression', () => {
    browser.checkDocument([])
  })
})
