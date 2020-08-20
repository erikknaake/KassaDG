describe('Create account', () => {
    beforeEach(() => {
        cy.cleanDb();
    });
    
    it('Creates cypressTestAccount', () => {
        cy.visit('/');
        cy.contains('Beheer').click();
        cy.contains('Beheer Accounts').click();
        cy.contains('Voeg account toe').click();
        cy.get('input[name="name"]')
            .type('cypressTestAccount');
        cy.contains('Aanmaken').click();
        cy.get('tbody>tr').eq(0).should('contain', 'cypressTestAccount')
        cy.url().should('include', '/accounts')
    })
})