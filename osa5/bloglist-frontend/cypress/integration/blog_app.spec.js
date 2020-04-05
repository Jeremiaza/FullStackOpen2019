describe('Blog ', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Testiukkeli',
            username: 'testUser',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function () {
        cy.contains('Blogs')
    })
    it('login form can be opened', function () {
        cy.contains('login').click()
    })
    it('fails with wrong credentials', function () {
        cy.contains('login').click()
        cy.contains('Login to Blog App')
        cy.get('#username').type('testfail')
        cy.get('#pass').type('pass')-
        cy.get('#logintoapp').click()
        cy.contains('Wrong username or password')
    })
    describe('when logged in', function () {
        beforeEach(function () {
            cy.contains('login').click()
            cy.contains('Login to Blog App')
            cy.get('#username').type('testUser')
            cy.get('#pass').type('password')
            cy.get('#logintoapp').click()
        })
        it('blog creation form can be opened', function () {
            cy.contains('new blog').click()
        })
        it('a new blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('Blog Title by me!')
            cy.get('#author').type('me')
            cy.get('#url').type('myblog.com')
            cy.get('#likes').type('10')
            cy.get('#save-blog').click()
        })
        it('a new blog can be deleted', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('Blog Title by me!')
            cy.get('#author').type('Test guy')
            cy.get('#url').type('myblog2.com')
            cy.get('#likes').type('1011')
            cy.get('#save-blog').click()
            cy.contains('delete blog').click()
        })
        it('a new blog can be liked', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('Blog Title by me!')
            cy.get('#author').type('Test guy')
            cy.get('#url').type('myblog2.com')
            cy.get('#likes').type('1011')
            cy.get('#save-blog').click()
            cy.get('.likebutton').click()
            cy.get('#show-button').click()
            cy.contains('1012')
        })
    })
})