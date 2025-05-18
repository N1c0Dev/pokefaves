describe('Test infinite scroll', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('/home')
  })

  it('scroll to Meowth position', () => {
    cy.scrollTo('bottom')
    cy.wait(1000)
    cy.scrollTo('bottom')
    cy.get(':nth-child(52) > .flex').click()
  })
})

