describe("[Test Accessibility for {PAGE} and {URL}]", () => {
  before(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("Run audit on full page", () => {
    cy.runAudit({
      skipFailure: true,
    });
  });

  it("Run audit on navbar", () => {
    cy.runAudit({
      context: "nav.navbar",
      skipFailure: true,
    });
  });

  it("Run audit on header", () => {
    cy.runAudit({
      context: "div.banner",
      skipFailure: true,
    });
  });

  it("Run audit on header but skip rule contrast", () => {
    cy.runAudit({
      skipFailure: true,
      context: "div.banner",
      options: {
        rules: {
          "color-contrast": { enabled: false },
        },
      },
    });
  });

  it("Run audit on allLinks", () => {
    cy.runAudit({
      skipFailure: true,
      context: "a",
    });
  });
});
