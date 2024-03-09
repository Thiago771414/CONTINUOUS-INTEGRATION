describe("Gestão de usuários",() => {

    beforeEach(() => {
        cy.exec('npm --prefix ../user-api run clear:db')
    })

    it("Deve cadastrar um novo usuário",() => {
        //abrir formulário
        cy.visit('/#/users');
        cy.get('a[aria-label=Create]').click();

        //preencher campos
        cy.get('#name').type('Darth Vader');
        cy.get('#email').type('Vader@gmail.com');

        //enviar formulário
        cy.get('button[type=submit]').click();

        //confirmar formulário
        cy.get('a[href="#/users"]', { timeout: 10000 }).click();

        //export to excel
        cy.visit('/#/users');
        cy.contains('span', 'Export').click();
    })

    describe("Listagem", () => {
        it("contendo um usuário", () => {
            cy.request('Post', 'http://localhost:4000/users',{
                name: 'Jonathan',
                email: 'jonathan@gmail.com',
            }).should(response => {
                expect(response.status).to.eq(201);
                cy.visit('/users')
                cy.contains('.MuiTable-root tbody tr', 'Jonathan').should('exist');
            })
        })
    
        it("Sem usuários", () => {
            cy.visit('/users')
            cy.contains('.MuiTable-root tbody tr', 'Jabuticaba').should('not.exist');

            //deletar todos os usuários da tabela, valida pelo dom
            /*
            cy.visit('/#/users')
            cy.contains('No User yet').should('exist');
            cy.contains('Do you want to add one?').should('exist');
            cy.contains('Create').should('exist');
            */
        })

        it("Editar um usuário", () => {
            cy.request('POST', 'http://localhost:4000/users', {
                name: 'leia',
                email: 'leia@gmail.com',
            }).should(response => {
                expect(response.status).to.eq(201);
                cy.visit(`/#/users/${response.body.id}`);
                cy.get('#name').should('be.visible').clear().type('Luke skywalker');
                cy.get('#email').should('be.visible').clear().type('skywalker@starlight');
                cy.get('button[type=submit]').click();
                cy.get('a[href="#/users"]', { timeout: 10000 }).click(); 
            });
        })
    })

    describe("Remoção", () => {
        it("a partir da listagem", () => {
            cy.request('POST', 'http://localhost:4000/users', {
                name: 'Anakin Skywalker',
                email: 'Skywalker@gmail.com',
            }).should(response => {
                cy.visit('/users');
                cy.contains('.MuiTable-root tbody tr', 'Anakin').should('exist')
                .find('input[type=checkbox]').check();
                cy.get('button[aria-label=Delete]').click();
            });
        })
        it("a partir do formulário de edição", () => {
            cy.request('POST', 'http://localhost:4000/users', {
                name: 'Yoda',
                email: 'threeFingers@gmail.com',
            }).should(response => {
                cy.visit(`/#/users/${response.body.id}`);
                cy.get('button[aria-label=Delete]').click();
                cy.wait(1000)
                cy.contains('No User yet').should('exist');
                cy.contains('Do you want to add one?').should('exist');
                cy.contains('Create').should('exist');
            });
        })
    })    
})


