describe('stock', () => {
    before(() => {
       cy.cleanDb();
       cy.setupProducts();
    });
    
    it('Updates all stock', () => {
        cy.visit('/management');
        cy.contains('Beheer Voorraad').click();
        
        cy.get('#mat-input-0').type('{selectall}21');
        cy.get('#mat-input-1').type('{selectall}8');
        cy.contains('Update voorraad').click();
        
        cy.visit('/stock');

        cy.get('#mat-input-0').should('have.value', '21');
        cy.get('#mat-input-1').should('have.value', '8');
        cy.get('#mat-input-2').should('have.value', '15');
    });

    it('Reset all stock', () => {
        cy.visit('/stock');

        cy.contains('Reset voorraad').click();
        cy.get('#mat-input-0').should('have.value', '0');
        cy.get('#mat-input-1').should('have.value', '0');
        cy.get('#mat-input-2').should('have.value', '0');
    });
});