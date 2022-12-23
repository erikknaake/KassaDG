// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('cleanDb', () => {
    // cy.exec("cp ~/.KassaDG_linux-x64/Persistence/KassaDG.clean.db ~/.KassaDG_linux-x64/Persistence/KassaDG.db");
    // let copyCommand = `rm -f ${Cypress.env("TARGET_DB")} && cp `;
    // if(Cypress.env("CI")) {
    //     copyCommand = 'sudo ' + copyCommand;
    // }
    // copyCommand = `${copyCommand} ${Cypress.env("CLEAN_DB")} ${Cypress.env("TARGET_DB")} && echo "Cleared DB"`;
    // console.log(`Running ${copyCommand} to clear the db`);
    // cy.exec(copyCommand).then(x => console.log(x));

    cy.request('POST', '/migrate');
});

Cypress.Commands.add('setupAccount', () => {
   cy.request('PUT', '/account', {
       accountName: 'seedAccount',
       balanceCents: 0,
       isActive: true
   });
});

Cypress.Commands.add('setupProducts', () => {
    cy.request('PUT', '/productCategory', {
        CategoryName: 'topLevelSeedCategory',
        ParentCategoryId: null
    });

    cy.request('PUT', '/productCategory', {
        CategoryName: 'nesterSeedCategory',
        ParentCategoryId: 1
    });

    cy.request('PUT', '/product', {
        productName: 'product1',
        PricePerPieceCents: 80,
        ProductCategoryId: 1,
        AmountInStock: 20
    });

    cy.request('PUT', '/product', {
        productName: 'product2',
        PricePerPieceCents: 100,
        ProductCategoryId: 2,
        AmountInStock: 10
    });

    cy.request('PUT', '/product', {
        productName: 'product3',
        PricePerPieceCents: 120,
        ProductCategoryId: 2,
        AmountInStock: 15
    });
});