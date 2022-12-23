describe('Create account', () => {
    before(() => {
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
        cy.get('tbody>tr').eq(0).should('contain', 'cypressTestAccount');
        cy.url().should('include', '/accounts');
    });

    it('Deactivates account', () => {
        cy.visit('/');
        cy.contains('Beheer').click();
        cy.contains('Beheer Accounts').click();
        cy.contains('Deactiveer').click();

        cy.contains('Accounts').click();
        cy.url().should('contain', '/accounts');
        cy.should('not.contain', 'cypressTestAccount');
        cy.get('tbody>tr').should('not.exist');
        
        cy.contains('Beheer').click();
        cy.contains('Beheer Accounts').click();
        cy.contains('Activeer').click();

        cy.contains('Accounts').click();
        cy.url().should('contain', '/accounts');
        cy.get('tbody>tr').eq(0).should('contain', 'cypressTestAccount')
    });
    
    describe('Delete accounts', () => {
        beforeEach(() => {
            cy.visit('management');
            cy.contains('Beheer Accounts').click();
            cy.contains('Verwijder').click();
        });

        it('Prompts and does not deletes account', () => {
            cy.contains('Nee').click();
            cy.get('tbody>tr').eq(0).should('contain', 'cypressTestAccount');
        });
        
        it('Prompts and deletes account', () => {
            cy.contains('Ja').click();
            cy.get('tbody>tr').should('not.exist');
        });
    });
    
    
})