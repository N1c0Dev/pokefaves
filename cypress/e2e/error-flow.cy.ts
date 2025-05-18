describe('Favorites flow', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('/home')
  })

  it('search "Scuero" gets an error and return to home view', () => {
    cy.get('#search-input').type('Scuero')
    cy.get('#error-container > h2', {timeout: 2000}).should('contain', 'Uh-oh!')
    cy.get('#back-home-button').click()
    cy.get('.grid > :nth-child(1) > .flex').should('exist')
  })
})
