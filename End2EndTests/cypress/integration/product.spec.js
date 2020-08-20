describe('Create product', () => {
    before(() => {
        cy.cleanDb();
    });

    it('Creates topLevelCategory', () => {
        cy.visit('/');
        cy.contains('Beheer').click();
        cy.contains('Beheer Producten').click();
        cy.contains('Voeg categorie toe').click();
        cy.get('input[name="categoryName"]')
            .type('topLevelCategory');
        cy.contains('Toevoegen').click();
        cy.get('app-category mat-expansion-panel mat-panel-title').should('contain', 'topLevelCategory');
        cy.url().should('include', '/products')
    });

    it('Creates nestedCategory', () => {
        cy.visit('/products');
        cy.get('mat-expansion-panel').contains('Voeg categorie toe').click();
        cy.get('input[name="categoryName"]')
            .type('nestedCategory');
        cy.contains('Toevoegen').click();
        cy.get('app-category mat-expansion-panel mat-expansion-panel mat-panel-title').should('contain', 'nestedCategory');
        cy.url().should('include', '/products');
    });

    it('Creates productInNestedCategory', () => {
        cy.visit('/products');
        cy.get('mat-expansion-panel mat-expansion-panel').click();
        cy.get('mat-expansion-panel mat-expansion-panel').contains('Voeg product toe').click();
        cy.get('input[name="productName"]')
            .type('productInNestedCategory');
        cy.get('input[name="pricePerPiece"]')
            .type('0.8');
        cy.get('input[name="amountInStock"]')
            .type('10');
        cy.contains('Voeg product toe').click();
        cy.get('app-category mat-expansion-panel mat-expansion-panel tbody>tr')
            .eq(0)
            .should('contain', 'productInNestedCategory')
            .should('contain', '0.8')
            .should('contain', '10');
        cy.url().should('include', '/products')
    });
    
    describe('delete product', () => {
        beforeEach(() => {
            cy.visit('/products');
            cy.get('mat-expansion-panel mat-expansion-panel').click();
            cy.get('mat-expansion-panel mat-expansion-panel').contains('Verwijder product').click();
        });

        it('Does not delete product after prompt', () => {
            cy.contains('Nee').click();
            cy.get('app-category mat-expansion-panel mat-expansion-panel tbody>tr')
                .eq(0)
                .should('contain', 'productInNestedCategory')
                .should('contain', '0.8')
                .should('contain', '10');
        });
        
        it('Deletes product after prompt', () => {
            cy.contains('Ja').click();
            cy.get('app-category mat-expansion-panel mat-expansion-panel tbody>tr').should('not.exist');
        });
    });
})