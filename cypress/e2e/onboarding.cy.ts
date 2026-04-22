describe("Nexora Onboarding — parcours complet", () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit("/");
    });

    describe("Étape 1 — Contact", () => {
        it("affiche le formulaire de contact", () => {
            cy.get("[data-cy=contact-form]").should("exist");
            cy.get("[data-cy=input-firstName]").should("exist");
            cy.get("[data-cy=input-lastName]").should("exist");
            cy.get("[data-cy=input-email]").should("exist");
        });

        it("affiche les erreurs si le formulaire est soumis vide", () => {
            cy.get("[data-cy=btn-next-contact]").click();
            cy.contains("Le prénom doit contenir au moins 2 caractères").should("exist");
            cy.contains("Le nom doit contenir au moins 2 caractères").should("exist");
            cy.contains("Adresse email invalide").should("exist");
        });

        it("passe à l'étape 2 si le formulaire est valide", () => {
            cy.get("[data-cy=input-firstName]").type("Marie");
            cy.get("[data-cy=input-lastName]").type("Dupont");
            cy.get("[data-cy=input-email]").type("marie.dupont@startup.io");
            cy.get("[data-cy=input-phone]").type("0612345678");
            cy.get("[data-cy=input-role]").type("CTO");
            cy.get("[data-cy=btn-next-contact]").click();
            cy.url().should("include", "/company");
        });
    });

    describe("Étape 2 — Entreprise", () => {
        beforeEach(() => {
            cy.get("[data-cy=input-firstName]").type("Marie");
            cy.get("[data-cy=input-lastName]").type("Dupont");
            cy.get("[data-cy=input-email]").type("marie.dupont@startup.io");
            cy.get("[data-cy=btn-next-contact]").click();
            cy.url().should("include", "/company");
        });

        it("affiche le formulaire entreprise", () => {
            cy.get("[data-cy=company-form]").should("exist");
            cy.get("[data-cy=input-company-name]").should("exist");
        });

        it("affiche une erreur si le nom est manquant", () => {
            cy.get("[data-cy=btn-next-company]").click();
            cy.contains("Nom de l'entreprise requis").should("exist");
        });

        it("passe à l'étape 3 si le formulaire est valide", () => {
            cy.get("[data-cy=input-company-name]").type("Acme Inc.");
            cy.get("[data-cy=select-sector]").select("SaaS / Logiciel");
            cy.get("[data-cy=select-size]").select("10–49 collaborateurs");
            cy.get("[data-cy=btn-next-company]").click();
            cy.url().should("include", "/metier");
        });
    });

    describe("Étape 3 — Projet", () => {
        beforeEach(() => {
            cy.get("[data-cy=input-firstName]").type("Marie");
            cy.get("[data-cy=input-lastName]").type("Dupont");
            cy.get("[data-cy=input-email]").type("marie.dupont@startup.io");
            cy.get("[data-cy=btn-next-contact]").click();
            cy.url().should("include", "/company");
            cy.get("[data-cy=input-company-name]").type("Acme Inc.");
            cy.get("[data-cy=select-sector]").select("SaaS / Logiciel");
            cy.get("[data-cy=select-size]").select("10–49 collaborateurs");
            cy.get("[data-cy=btn-next-company]").click();
            cy.url().should("include", "/metier");
        });

        it("affiche le formulaire projet", () => {
            cy.get("[data-cy=project-form]").should("exist");
            cy.get("[data-cy=textarea-description]").should("exist");
        });

        it("affiche une erreur si description trop courte", () => {
            cy.get("[data-cy=textarea-description]").type("Trop court");
            cy.get("[data-cy=btn-next-project]").click();
            cy.contains("Décrivez votre projet en au moins 20 caractères").should("exist");
        });
    });

    describe("Étape 4 — Confirmation", () => {
        beforeEach(() => {
            // On visite directement /merci avec les données dans le store
            cy.visit("/merci");
        });

        it("affiche la page de confirmation", () => {
            cy.url().should("include", "/merci");
        });

        it("affiche le bouton nouvelle demande", () => {
            cy.contains("Soumettre une nouvelle demande").should("exist");
        });

        it("permet de soumettre une nouvelle demande", () => {
            cy.contains("Soumettre une nouvelle demande").click();
            cy.url().should("eq", "http://localhost:3001/");
        });
    });
});