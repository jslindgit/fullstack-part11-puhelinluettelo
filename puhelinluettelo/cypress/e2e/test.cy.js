describe('Phonebook app', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000')
	})
	it('front page can be opened', () => {
		cy.contains('Phonebook')
	})
})
