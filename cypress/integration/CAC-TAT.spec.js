// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />
describe("Central de Atendimento ao Cliente TAT", function () {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", function () {
    cy.get("#firstName")
      .should("be.visible")
      .type("Teste", { options: 0 })
      .should("have.value", "Teste");

    cy.get("#lastName")
      .should("be.visible")
      .type("QA", { options: 0 })
      .should("have.value", "QA");

    cy.get("#email")
      .should("be.visible")
      .type("teste.qa@gmail.com")
      .should("have.value", "teste.qa@gmail.com");

    cy.get("#phone")
      .should("be.visible")
      .type("11987427590", { options: 0 })
      .should("have.value", "11987427590");

    cy.get("#open-text-area")
      .should("be.visible")
      .type("Teste QA")
      .should("have.value", "Teste QA");

    cy.contains("button", "Enviar").should("be.visible").click();

    cy.get(".success")
      .should("be.visible")
      .should("contains.text", "Mensagem enviada com sucesso.");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.get("#firstName")
      .should("be.visible")
      .type("Teste", { options: 0 })
      .should("have.value", "Teste");

    cy.get("#lastName")
      .should("be.visible")
      .type("QA", { options: 0 })
      .should("have.value", "QA");

    cy.get("#email")
      .should("be.visible")
      .type("teste.qa")
      .should("have.value", "teste.qa");

    cy.get("#phone")
      .should("be.visible")
      .type("11987427590", { options: 0 })
      .should("have.value", "11987427590");

    cy.get("#open-text-area")
      .should("be.visible")
      .type("Teste QA")
      .should("have.value", "Teste QA");

    cy.contains("button", "Enviar").should("be.visible").click();
    cy.get(".error").should("contains.text", "Valide os campos obrigatórios!");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido", function () {
    cy.get("#firstName")
      .should("be.visible")
      .type("Teste", { options: 0 })
      .should("have.value", "Teste");

    cy.get("#lastName")
      .should("be.visible")
      .type("QA", { options: 0 })
      .should("have.value", "QA");

    cy.get("#email")
      .should("be.visible")
      .type("teste.qa")
      .should("have.value", "teste.qa");

    cy.get("#phone-checkbox").should("be.visible").check().should("be.checked");

    cy.get("#open-text-area")
      .should("be.visible")
      .type("Teste QA")
      .should("have.value", "Teste QA");

    cy.contains("button", "Enviar").should("be.visible").click();
    cy.get(".error").should("contains.text", "Valide os campos obrigatórios!");
  });

  it("verifica se o campo telefone aceita valor não numérico", function () {
    cy.get("#phone")
      .should("be.visible")
      .type("ABC@TESTE``!#$%*&¨¨%?Ç", { options: 0 })
      .should("be.empty");
  });
  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .should("be.visible")
      .type("Teste", { options: 0 })
      .should("have.value", "Teste")
      .clear()
      .should("be.empty");

    cy.get("#lastName")
      .should("be.visible")
      .type("QA", { options: 0 })
      .should("have.value", "QA")
      .clear()
      .should("be.empty");

    cy.get("#email")
      .should("be.visible")
      .type("teste.qa@gmail.com")
      .should("have.value", "teste.qa@gmail.com")
      .clear()
      .should("be.empty");

    cy.get("#phone")
      .should("be.visible")
      .type("11987427590", { options: 0 })
      .should("have.value", "11987427590")
      .clear()
      .should("be.empty");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.contains("button", "Enviar").should("be.visible").click();
    cy.get(".error").should("contain.text", "Valide os campos obrigatórios!");
  });

  it("envia o formuário com sucesso usando um comando customizado", function () {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success")
      .should("be.visible")
      .should("contains.text", "Mensagem enviada com sucesso.");
  });

  it("seleciona cada produto das opções disponíveis", function () {
    cy.get("#product").select("Cursos");
    cy.get("#product").should("have.value", "cursos");

    cy.get("#product").select("Blog");
    cy.get("#product").should("have.value", "blog");

    cy.get("#product").select("Mentoria");
    cy.get("#product").should("have.value", "mentoria");

    cy.get("#product").select("YouTube");
    cy.get("#product").should("have.value", "youtube");
  });

  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked")
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", function () {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(($el) => {
        cy.get($el).check().should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get("#file-upload")
      .should("be.visible")
      .selectFile("./cypress/fixtures/example.json")
      .then(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get("#file-upload")
      .should("be.visible")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .then(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json", { encoding: null }).as("arqExemplo");
    cy.get("#file-upload")
      .should("be.visible")
      .selectFile("@arqExemplo")
      .then(($input) => {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get('a[href="privacy.html"]').should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get('a[href="privacy.html"]')
      .invoke("removeAttr", "target")
      .click()
      .url()
      .should("contain", "privacy.html");
  });

  it("testa a página da política de privacidade de forma independente", function () {
    cy.get('a[href="privacy.html"]')
      .invoke("removeAttr", "target")
      .click()
      .url()
      .should("contain", "privacy.html");
  });
});
