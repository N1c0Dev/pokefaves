describe('Browse all views', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
  })

  it('visits welcome view and navigates forward', () => {
    cy.visit('/')
    cy.get('img').should('have.attr', 'alt', 'Pikachu waving')
    cy.contains('h1', 'Welcome to the Pokedex')
    cy.contains('p', 'The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.')
    cy.get('#welcome-button').click()
  })

  it('interacts with "favorite" and "list all" buttons', () => {
    cy.visit('/home')
    cy.get('#favorite-button').click()
    cy.get('#list-all-button').click()
  })
})
