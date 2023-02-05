/// <reference types="cypress" />

describe("Frontend App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("page should have 1 input text bar", () => {
    cy.get(`[data-test='input-text']`).should("have.length", 1);
  });

  it("page should have 3 cards to display data", () => {
    cy.get(`[data-test='card']`).should("have.length", 3);
  });

  it("page should have a title with github written in it", () => {
    cy.get(`[data-test='title']`)
      .should("have.length", 1)
      .should(`contains.text`, "Github");
  });
});
