describe('Order', () => {
    before(() => {
        cy.cleanDb();
        cy.setupAccount();
        cy.setupProducts();
    });

    it('Prompt wether or not to leave and leave order page in progress', () => {
        cy.visit('/');
        cy.get('tbody>tr').eq(0).click();
        cy.contains('Beheer').click();
        cy.contains('Ja').click();
        cy.url().should('include', '/management')
    });

    it('Prompt wether or not to leave and not leave order page in progress', () => {
        cy.visit('/');
        cy.get('tbody>tr').eq(0).click();
        cy.contains('Beheer').click();
        cy.contains('Nee').click();
        cy.url().should('include', '/order')
    });

    describe('order', () => {
        it('Makes an order with deposit', () => {
            cy.visit('/');
            cy.get('tbody>tr').eq(0).click();
            cy.get('#mat-input-1')
                .type('{selectall}20');
            cy.get('mat-expansion-panel')
                .contains('product1')
                .parent('tr')
                .contains('Toevoegen')
                .click()
                .click();
            cy.get('mat-expansion-panel')
                .contains('product1')
                .parent('tr')
                .contains('Verwijderen')
                .click();

            cy.get('mat-expansion-panel mat-expansion-panel')
                .click();

            cy.get('mat-expansion-panel')
                .contains('product3')
                .parent('tr')
                .contains('Toevoegen')
                .click()
                .click();

            // Check total on screen before payment
            cy.get('tfoot>tr')
                .eq(0)
                .should('contain', 'Totaal')
                .should('contain', '3.20');

            cy.get('button')
                .contains('Afrekenen')
                .click();

            // Validate saldo
            // 20 - 3.2 = 16.80
            cy.get('mat-chip').should('contain', '16.8');
        });

        describe('history', () => {
            beforeEach(() => {
                cy.visit('/');
                cy.get('tbody>tr').eq(0).contains('Geschiedenis').click();
            });

            it('Calculates totals', () => {
                cy.contains('Totaal')
                    .parent()
                    .should('contain', '3.20')
                    .should('contain', '20');
                cy.contains('Saldo')
                    .parent()
                    .should('contain', '16.80');
            });

            it('Shows detailed history', () => {
                cy.get('tbody>tr')
                    .eq(0)
                    .click();

                cy.contains('product1')
                    .parent()
                    .should('contain', 1)
                    .should('contain', '0.8');

                cy.contains('product3')
                    .parent()
                    .should('contain', 2)
                    .should('contain', '2.40');

                cy.contains('Storting')
                    .parent()
                    .should('contain', 20);

                cy.contains('Totaal')
                    .parent()
                    .should('contain', '-16.80');
            });
        });
    });

    describe('negative saldo', () => {
        before(() => {
            cy.request('PUT', 'account', {
                accountName: 'negativeAccount',
                balanceCents: -1,
                isActive: true
            });
        });

        it('Prompts when user has negative saldo and stays', () => {
            cy.visit('/');
            cy.contains('negativeAccount').click();
            cy.contains('Ga door').click();
            cy.url().should('include', '/order')
        });

        it('Prompts when user has negative saldo and leaves', () => {
            cy.visit('/');
            cy.contains('negativeAccount').click();
            cy.contains('Annuleer').click();
            cy.url().should('include', '/account')
        });
        
        it('Searches user', () => {
            cy.visit('/');
            cy.get('#mat-input-0')
                .type('seed');

            cy.get('tbody>tr')
                .eq(0)
                .should('contain', 'seedAccount');

            cy.get('#mat-input-0')
                .type('{selectall}negative');

            cy.get('tbody>tr')
                .eq(0)
                .should('contain', 'negativeAccount');
        });
    });
});
