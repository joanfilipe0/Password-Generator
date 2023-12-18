describe('Testes do Gerador de Senhas', () => {

  beforeEach(() => {
    cy.visit('/index.html') // Acessando o Html para testes
  })

  it('Verifica se os checkboxes estão funcionando corretamente', () => {
    // Verifica se os checkboxes estão marcados por padrão
    cy.get('#include-special').should('be.checked')
    cy.get('#include-numbers').should('be.checked')
    cy.get('#include-uppercase').should('be.checked')
    cy.get('#include-lowercase').should('be.checked')

    // Desmarca os checkboxes
    cy.get('#include-special').uncheck()
    cy.get('#include-numbers').uncheck()
    cy.get('#include-uppercase').uncheck()
    cy.get('#include-lowercase').uncheck()

    // Verifica se os checkboxes foram desmarcados corretamente
    cy.get('#include-special').should('not.be.checked')
    cy.get('#include-numbers').should('not.be.checked')
    cy.get('#include-uppercase').should('not.be.checked')
    cy.get('#include-lowercase').should('not.be.checked')
  })

  it('Verifica Senha Gerada com Todos CheckBoxes', () => {
    // Gera senha com todos os checkboxes marcados
    cy.get('#include-special').check()
    cy.get('#include-numbers').check()
    cy.get('#include-uppercase').check()
    cy.get('#include-lowercase').check()
    cy.get('[onclick="generatePassword()"]').click()

    // Obtém a senha gerada
    cy.get('#password').invoke('val').then((senhaCompleta) => {
      
      cy.log('Senha Gerada:', senhaCompleta); // Imprime o valor da Senha Gerada

      // Verifica se a senha contém caracteres especiais
      cy.get('#include-special').invoke('prop', 'checked').then((isChecked) => {
        if (isChecked) {
          expect(senhaCompleta).to.match(/[!@#$%^&*()_\-+=<>?/[\]{}.,]/);
        }
      });

      // Verifica se a senha contém números
      cy.get('#include-numbers').invoke('prop', 'checked').then((isChecked) => {
        if (isChecked) {
          expect(senhaCompleta).to.match(/[0-9]/);
        }
      });

      // Verifica se a senha contém letras maiúsculas
      cy.get('#include-uppercase').invoke('prop', 'checked').then((isChecked) => {
        if (isChecked) {
          expect(senhaCompleta).to.match(/[A-Z]/);
        }
      });

      // Verifica se a senha contém letras minúsculas
      cy.get('#include-lowercase').invoke('prop', 'checked').then((isChecked) => {
        if (isChecked) {
          expect(senhaCompleta).to.match(/[a-z]/);
        }
      });
    })
  })

  it('Verifica Caracteres Especiais', () => {

    // Desmarca todos os checkboxes
    cy.get('#include-special').uncheck();
    cy.get('#include-numbers').uncheck();
    cy.get('#include-uppercase').uncheck();
    cy.get('#include-lowercase').uncheck();

    // Gera senha com checkbox de caracteres especiais marcado
    cy.get('#include-special').check()
    cy.get('[onclick="generatePassword()"]').click()

    // Obtém a senha gerada
    cy.get('#password').invoke('val').then((senhaCompleta) => {
      
      cy.log('Senha Gerada:', senhaCompleta); // Imprime o valor da Senha Gerada
      // Verifica se a senha contém caracteres especiais
      cy.get('#include-special').invoke('prop', 'checked').then((isChecked) => {
        if (isChecked) {
          expect(senhaCompleta).to.match(/[!@#$%^&*()_\-+=<>?/[\]{}.,]/);
        }
      });
    });
  });

  it('Verifica Números', () => {

    // Desmarca todos os checkboxes
    cy.get('#include-special').uncheck();
    cy.get('#include-numbers').uncheck();
    cy.get('#include-uppercase').uncheck();
    cy.get('#include-lowercase').uncheck();

    // Gera senha com checkbox de números marcado
    cy.get('#include-numbers').check()
    cy.get('[onclick="generatePassword()"]').click()

    // Obtém a senha gerada
    cy.get('#password').invoke('val').then((senhaCompleta) => {
      
      cy.log('Senha Gerada:', senhaCompleta); // Imprime o valor da Senha Gerada
      // Verifica se a senha contém números
      cy.get('#include-numbers').invoke('prop', 'checked').then((isChecked) => {
        if (isChecked) {
          expect(senhaCompleta).to.match(/[0-9]/);
        }
      });
    });
  });

  it('Verifica Letra Maíuscula', () => {


    // Desmarca todos os checkboxes
    cy.get('#include-special').uncheck();
    cy.get('#include-numbers').uncheck();
    cy.get('#include-uppercase').uncheck();
    cy.get('#include-lowercase').uncheck();


    // Gera senha com checkbox de letras maiúsculas marcado
    cy.get('#include-uppercase').check()
    cy.get('[onclick="generatePassword()"]').click()

    // Obtém a senha gerada
    cy.get('#password').invoke('val').then((senhaCompleta) => {

      cy.log('Senha Gerada:', senhaCompleta);  // Imprime o valor da Senha Gerada
      // Verifica se a senha contém letras maiúsculas
      cy.get('#include-uppercase').invoke('prop', 'checked').then((isChecked) => {
        if (isChecked) {
          expect(senhaCompleta).to.match(/[A-Z]/);
        }
      });
    });
  });

  it('Verifica Letra Minúscula', () => {

    // Desmarca todos os checkboxes
    cy.get('#include-special').uncheck();
    cy.get('#include-numbers').uncheck();
    cy.get('#include-uppercase').uncheck();
    cy.get('#include-lowercase').uncheck();


    // Gera senha com checkbox de letras minúsculas marcado
    cy.get('#include-lowercase').check()
    cy.get('[onclick="generatePassword()"]').click()

    // Obtém a senha gerada
    cy.get('#password').invoke('val').then((senhaCompleta) => {

      cy.log('Senha Gerada:', senhaCompleta); // Imprime o valor da Senha Gerada
      // Verifica se a senha contém letras minúsculas
      cy.get('#include-lowercase').invoke('prop', 'checked').then((isChecked) => {
        if (isChecked) {
          expect(senhaCompleta).to.match(/[a-z]/);
        }
      });
    });
  });

  it('Verifica Tamanho da Senha', () => {

    // Define um comprimento de senha específico
    const comprimentoSenha = 16;
    cy.get('#password-length').clear().type(comprimentoSenha.toString())
    cy.get('[onclick="generatePassword()"]').click()

    // Obtém a senha gerada
    cy.get('#password').invoke('val').then((senhaCompleta) => {
      cy.log('Senha Gerada:', senhaCompleta);
      // Verifica se o tamanho da senha é igual ao comprimento especificado
      expect(senhaCompleta.length).to.equal(comprimentoSenha);
    });
  });

})