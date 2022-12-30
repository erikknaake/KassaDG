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
            .type('topLevelCategory', {force: true} );
        cy.contains('Toevoegen').click();
        cy.get('app-category mat-expansion-panel mat-panel-title').should('contain', 'topLevelCategory');
        cy.url().should('include', '/products')
    });

    it('Creates nestedCategory', () => {
        cy.visit('/products');
        cy.get('mat-expansion-panel').contains('Voeg categorie toe').click();
        cy.get('input[name="categoryName"]')
            .type('nestedCategory', {force: true} );
        cy.get('button:visible').contains('Toevoegen').click();
        cy.get('app-category mat-expansion-panel mat-expansion-panel mat-panel-title').should('contain', 'nestedCategory');
        cy.url().should('include', '/products');
    });

    it('Creates productInNestedCategory', () => {
        cy.visit('/products');
        cy.get('mat-expansion-panel mat-expansion-panel').click();
        cy.get('mat-expansion-panel mat-expansion-panel').contains('Voeg product toe').click();
        cy.get('input[name="productName"]')
            .type('productInNestedCategory', {force: true} );
        cy.get('input[name="pricePerPiece"]')
            .type('0.8', {force: true} );
        cy.get('input[name="amountInStock"]')
            .type('10', {force: true} );
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

    describe('Delete category', () => {
        before(() => {
            cy.cleanDb();
            cy.setupProducts();
            cy.visit('/products');
        });

        beforeEach(() => {
            cy
                .contains('topLevelCategory2')
                .get('button')
                .contains('Verwijder categorie')
                .click();
        });
        
        it('Does not category after prompt', () => {
            cy.contains('Nee').click();
            cy
                .contains('topLevelCategory2')
                .should('exist');
        });

        it('Deletes product after prompt', () => {
            cy.contains('Ja').click();
            cy
                .contains('topLevelCategory2')
                .should('not.exist');
        });

    });
})