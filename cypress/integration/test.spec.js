describe("[Test Accessibility for {PAGE} and {URL}]", () => {
  before(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("Run audit on full page", () => {
    cy.runAudit();
  });

  it("Run audit on navbar", () => {
    cy.runAudit({
      context: "nav.navbar",
    });
  });

  it("Run audit on header", () => {
    cy.runAudit({
      context: "div.banner",
    });
  });

  it("Run audit on header but skip rule contrast", () => {
    cy.runAudit({
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
      context: "a",
    });
  });
});
