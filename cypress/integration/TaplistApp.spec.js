describe('Taplist app', function() {
  beforeEach(function() {
    cy.clearLocalStorage()
    cy.wait(1000)
    cy.request('POST', 'http://localhost:3002/api/testing/reset')
    const newUser = {
      username: "Test User2",
      name: "Test User2",
      password: "testpassword2"
    }
    cy.request('POST', 'http://localhost:3002/api/users/', newUser)
    let credentials = { username: newUser.username, password: newUser.password }
    console.log(credentials)
    cy.visit('http://localhost:3000')
    console.log('Did the test get this far?')
  })

  describe('Non-logged in user', function() {
    it('Front page can be opened', function() {
      cy.contains('BeerStock')
      cy.contains('Log in to view your beer list')
    })

    it('Login works as expected', function() {
      cy.get('#user-login-dropdown').click()
      cy.get('#login-username-field').type('Test User2')
      cy.get('#login-password-field').type('testpassword2')
      cy.get('.login-form').contains('Login').click()
      cy.contains('Test User2')
    })
  })

  describe('Logged in user', function() {
    beforeEach(function() {
      let credentials = { username: 'Test User2', password: 'testpassword2' }
      cy.login(credentials)
    })
    it('New tap can be created', function() {
      const newTap = {
        name: "Test Tap",
        style: "IPA",
        abv: "7.0",
        ibu: "75",
        type: "Bottle",
        unit: "oz",
        brewery: "Test Brewery",
        remaining: 10,
        description: "Test tap for E2E tests",
        color: "Pale"
      }
        console.log(localStorage)
        const authorization = `bearer ${JSON.parse(localStorage.getItem('loggedInUser')).token}`
        console.log(authorization)
        let options = {
          method: 'POST',
          url: 'http://localhost:3002/api/taps/',
          body: newTap,
          headers: { Authorization: authorization }
        } 
        cy.request(options) 
      }
    )
  })
})