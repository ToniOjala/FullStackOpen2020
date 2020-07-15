describe('BlogList app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Please log in')
    cy.contains('username')
    cy.contains('password')
    cy.contains('Log In')
  })
})