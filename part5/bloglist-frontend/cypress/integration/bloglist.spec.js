describe('BlogList app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Matti Meikäläinen',
      username: 'matmei',
      password: 'sala123'
    })
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Maija Meikäläinen',
      username: 'majmei',
      password: 'asd123'
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

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'FirstBlog', author: 'AuthorOne', url: 'www.firstblog.com', likes: 81 })
        cy.createBlog({ title: 'SecondBlog', author: 'AuthorOne', url: 'www.secondtblog.com' })
        cy.createBlog({ title: 'ThirdBlog', author: 'AuthorTwo', url: 'www.thirdblog.com', likes: 12 })
      })

      it('a blog can be liked', function() {
        cy.contains('SecondBlog - by AuthorOne')
          .contains('Show').click()

        cy.contains('likes 0')
          .contains('Like').click()

        cy.contains('likes 1')
      })

      it('the creator of a blog can remove it', function() {
        cy.contains('ThirdBlog - by AuthorTwo')
          .contains('Show').click()

        cy.contains('Remove').click()

        cy.contains('Blog removed')
        cy.should('not.contain', 'ThirdBlog - by AuthorTwo')
      })

      it('a user cannot remove blogs created by someone else', function() {
        cy.contains('Log Out').click()
        cy.login({ username: 'majmei', password: 'asd123' })
        cy.contains('ThirdBlog - by AuthorTwo')
          .contains('Show').click()

        cy.should('not.contain', 'Remove')
      })

      it.only('blogs are sorted according to likes', function() {
        cy.contains('FirstBlog')
          .contains('Show').click()

        cy.contains('SecondBlog')
          .contains('Show').click()

        cy.contains('ThirdBlog')
          .contains('Show').click()

        cy.get('.blog')
          .then(results => {
            cy.get(results[0]).contains('likes 81')
            cy.get(results[1]).contains('likes 12')
            cy.get(results[2]).contains('likes 0')
          })
      })
    })
  })
})