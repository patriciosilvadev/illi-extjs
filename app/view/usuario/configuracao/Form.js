Ext.define('Illi.view.usuario.configuracao.Form', {
    extend: 'Illi.view.AbstractForm',
    requires: [
        'Illi.view.usuario.grupo_usuario.Combo',
        'Ext.ux.TextMaskPlugin'
    ],
    alias: 'widget.formConfiguracaoUsuario',
    itemId: 'formConfiguracaoUsuario',
    title: false,
    combineErrors: false,
    msgTarget: 'side',
    defaultType: 'textfield',
    autoHeight: true,
    bodyPadding: 10,
    items: [
        {
            xtype: 'fieldset',
            title: 'Pré-definições',
            defaults: {
                anchor: '100%',
                typeAhead: false,
                autoHeight: true,
                allowBlank: true,
                plugins: ['clearbutton'],
                layout: {
                    type: 'hbox',
                    anchor: '60%',
                    bodyPadding: 10,
                    defaultMargins: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0
                    }
                }
            },
            items: [
                {
                    fieldLabel: 'Grupo de Usuário',
                    xtype: 'comboGrupoUsuario',
                    forceSelection: true,
                    name: 'id_grupo_usuario',
                    trigger2Cls: 'trigger-ajuda',
                    onTrigger2Click: function() {
                        Ext.create('Illi.view.configuracao.JanelaAjuda', {
                            title: 'Grupos de Usuários',
                            html: '<p>Se estiver pré-definido o grupo de usuário, ele será associado a todas as entidades automaticamente.</p><p>O campo "Associação Entidade / Grupo Usuário" não estará disponível se este usuário tiver associado a um grupo de usuário específico.</p>'
                        }).show();
                    }
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'PDV',
            defaults: {
                anchor: '100%',
                typeAhead: false,
                autoHeight: true,
                allowBlank: true,
                plugins: ['clearbutton'],
                layout: {
                    type: 'hbox',
                    anchor: '60%',
                    bodyPadding: 10,
                    defaultMargins: {
                        top: 0,
                        right: 5,
                        bottom: 0,
                        left: 0
                    }
                }
            },
            items: [
                {
                    fieldLabel: 'PIN Fiscal',
                    xtype: 'textfield',
                    name: 'pdv_pin_fiscal',
                    itemId: 'pdv_pin_fiscal',
                    readOnly: true,
                    plugins: false,
                    trigger2Cls: 'trigger-ajuda',
                    onTrigger2Click: function(a, b, c) {
                        Ext.create('Illi.view.configuracao.JanelaAjuda', {
                            title: 'Autenticador Fiscal',
                            html: '<p>Senha de autenticação das funções relacionadas abaixo.</p>'
                        }).show();
                    }
                },
                {
                    fieldLabel: 'Permissão Fiscal',
                    xtype: 'combobox',
                    forceSelection: true,
                    store: [
                        [0, 'Fechamento de Caixa'],
                        [5, 'Configuração'],
                        [7, 'Configuração de Impressão ECF'],
                        [8, 'Configuração de Impressão não-ECF'],
                        [1, 'Sangria'],
                        [2, 'Suprimento'],
                        [3, 'Desconto Item'],
                        [13, 'Acréscimo Item'],
                        [14, 'Desconto Venda'],
                        [15, 'Acréscimo Venda'],
                        [6, 'Troca / Devolução'],
                        [12, 'Cancelamento de Item'],
                        [9, 'Cancelamento de Venda'],
                        [10, 'Cancelamento de Devolução'],
                        [4, 'Impressão Segunda Via'],
                        [11, 'Impressão do Resumo de Fechamento de Caixa']
                        // 16
                    ],
                    multiSelect: true,
                    name: 'pdv_permissao_fiscal',
                    trigger2Cls: 'trigger-ajuda',
                    onTrigger2Click: function(a, b, c) {
                        Ext.create('Illi.view.configuracao.JanelaAjuda', {
                            title: 'Permissão Fiscal',
                            html: '<p>Determina qual ação do usuário poderá autenticar.</p>'
                        }).show();
                    }
                }
            ]
        }
    ]
});
