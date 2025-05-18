describe('Favorites flow', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('/home')
  })

  const openDetailsModal = (index = 1) => {
    cy.get(`.grid > :nth-child(${index}) > .flex`).click()
  }

  const toggleFavorite = (index = 1) => {
    cy.get(`.grid > :nth-child(${index}) > .flex > svg`).click()
  }

  const assertModalContains = (text: string) => {
    cy.get(':nth-child(1) > .ml-1').should('contain', text)
  }

  const closeModal = () => {
    cy.get('#close-modal').click()
  }

  it('adds and removes Charmeleon from favorites', () => {
    openDetailsModal(5)
    assertModalContains('charmeleon')
    closeModal()

    toggleFavorite(5)

    cy.get('#favorite-button').click()
    openDetailsModal()
    assertModalContains('charmeleon')
    closeModal()

    toggleFavorite()
    cy.get('.grid > :nth-child(1) > .flex > svg').should('not.exist')
  })

  it('adds Pikachu to favorites from search input', () => {
    cy.get('#search-input').type('pikachu')
    cy.get('.grid > :nth-child(1) > .flex', { timeout: 5000 }).should('contain.text', 'pikachu')

    openDetailsModal()
    assertModalContains('pikachu')
    closeModal()

    toggleFavorite()

    cy.get('#favorite-button').click()
    cy.get('.grid > :nth-child(1) > .flex > svg').should('exist')
  })

  it('adds and removes Pidgeotto from details modal', () => {
    cy.scrollTo(0, 1000)
    openDetailsModal(17)
    assertModalContains('pidgeotto')
    cy.get('#details-actions-container > svg').click()
    closeModal()

    cy.get('#favorite-button').click()
    openDetailsModal()
    assertModalContains('pidgeotto')
    cy.get('#details-actions-container > svg').click()
    closeModal()
    cy.get('.grid > :nth-child(1) > .flex > svg').should('not.exist')
  })
})
