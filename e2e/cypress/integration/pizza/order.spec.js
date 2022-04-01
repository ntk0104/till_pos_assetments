/// <reference types="cypress" />

context('Pizza order', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('case 1: customer default', () => {
        cy.get('[element-test="Small Pizza"]').within(() => {
            cy.get('.anticon-plus-circle').click();
        });
        cy.get('[element-test="Medium Pizza"]').within(() => {
            cy.get('.anticon-plus-circle').click();
        });
        cy.get('[element-test="Large Pizza"]').within(() => {
            cy.get('.anticon-plus-circle').click();
        });
        cy.get('[element-test="total"]').should('have.text',"Total: 49.97 $")
    })

    it('case 2: customer Microsoft', () => {
        cy.get('[element-test="Small Pizza"]').within(() => {
            cy.get('.anticon-plus-circle').click();
            cy.get('.anticon-plus-circle').click();
            cy.get('.anticon-plus-circle').click();
        });
        cy.get('[element-test="Large Pizza"]').within(() => {
            cy.get('.anticon-plus-circle').click();
        });
        cy.get('[type="radio"]').check('2')
        cy.get('[element-test="total"]').should('have.text',"Total: 45.97 $")
    })
  
    it('case 3: customer Amazon', () => {
        cy.get('[element-test="Medium Pizza"]').within(() => {
            cy.get('.anticon-plus-circle').click();
            cy.get('.anticon-plus-circle').click();
            cy.get('.anticon-plus-circle').click();
        });
        cy.get('[element-test="Large Pizza"]').within(() => {
            cy.get('.anticon-plus-circle').click();
        });
        cy.get('[type="radio"]').check('3')
        cy.get('[element-test="total"]').should('have.text',"Total: 67.96 $")
    })
  })
  