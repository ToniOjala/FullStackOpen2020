describe('BlogList app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Matti Meikäläinen',
      username: 'matmei',
      password: 'sala123'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Please log in')
    cy.contains('username')
    cy.contains('password')
    cy.contains('Log In')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('matmei')
      cy.get('#password').type('sala123')
      cy.get('#login-button').click()

      cy.contains('Logged in as Matti Meikäläinen')
    })

    it('fails with incorrect credentials', function() {
      cy.get('#username').type('matmei')
      cy.get('#password').type('väärä123')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(139, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'matmei', password: 'sala123' })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('Test Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.testurl.com')
      cy.get('#create-button').click()

      cy.contains('Blog added')
      cy.contains('Test Title - by Test Author')
    })
  })
})