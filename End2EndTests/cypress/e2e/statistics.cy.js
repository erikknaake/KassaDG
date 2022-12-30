describe('statistics', () => {
   before(() => {
     cy.cleanDb();
     cy.setupProducts();
     cy.setupAccount();

       cy.request('POST', '/order', {
           accountId: 1,
           orderCommandLines: [
               {
                   id: 1,
                   amount: 2
               }
           ],
           deposit: 500
       });

       cy.request('POST', '/order', {
           accountId: 1,
           orderCommandLines: [
               {
                   id: 2,
                   amount: 4
               }
           ],
           deposit: 300
       });

       cy.visit('/management');
       cy.contains('Statistieken').click();
   });
   
   it('views overview statistics', () => {
      cy.contains('Totaal uitgegeven')
          .parent()
          .should('contain', '5.60');

       cy.contains('Totaal gestort')
           .parent()
           .should('contain', '8.00');

       cy.contains('Saldo')
           .parent()
           .should('contain', '2.40');
   });

    it('views detailed statistics', () => {
        cy.contains('product1')
            .parent()
            .should('contain', '2')
            .should('contain', '1.60');

        cy.contains('product2')
            .parent()
            .should('contain', '4')
            .should('contain', '4.00');
    });
});