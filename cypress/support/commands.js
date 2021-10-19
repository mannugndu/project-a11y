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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add(
  "runAudit",
  ({ context = null, options = null, skipFailure = false } = {}) => {
    const severityIndicatorIcons = {
      minor: "⚪",
      moderate: "⚫",
      serious: "🟠",
      critical: "🔴",
    };

    function printOnConsole(violations) {
      cy.task(
        "log",
        `${violations.length} accessibility violation${
          violations.length === 1 ? "" : "s"
        } ${violations.length === 1 ? "was" : "were"} detected`
      );
      // pluck specific keys to keep the table readable
      const violationData = violations.map(
        ({ id, impact, description, nodes }) => ({
          id,
          impact,
          description,
          nodes: nodes.length,
        })
      );
      cy.task("table", violationData);
    }

    function callback(violations) {
      printOnConsole(violations);
      violations.forEach((violation) => {
        const nodes = Cypress.$(
          violation.nodes.map((node) => node.target).join(",")
        );

        Cypress.log({
          name: `${severityIndicatorIcons[violation.impact]} AllY`,
          consoleProps: () => violation,
          $el: nodes,
          message: `[${violation.help}](${violation.helpUrl})`,
        });

        violation.nodes.forEach(({ target }) => {
          Cypress.log({
            name: "->",
            consoleProps: () => violation,
            $el: Cypress.$(target.join(",")),
            message: target,
          });
        });
      });
    }
    console.log("options===>", context);
    cy.checkA11y(context, options, callback, skipFailure);
  }
);

// context?: axe.ElementContext,
// options?: Options, //rules
// violationCallback?: (violations: axe.Result[]) => void,
// skipFailures = false
