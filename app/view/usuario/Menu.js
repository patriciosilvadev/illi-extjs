Ext.define('Illi.view.usuario.Menu', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.usuarioMenu',
    itemId: 'toolbarMenuPrincipal',
    requires: [
        'Illi.view.usuario.entidade.Combo',
        'Illi.view.usuario.ComboArvore',
        'Illi.view.financeiro.parecer.Lista'
    ],
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            tabCenter: false,
            localUsuario: Illi.app.Local.get('usuario'),
            janelaAberta: {}
        });
        me.doDefinirSmallScreen(me);
        me.callParent(arguments);
    },
    listeners: {
        afterrender: function (tbar) {
            var nome_usuario = tbar.localUsuario.nome;
            var grupo_usuario = tbar.localUsuario.grupo_usuario.nome;
            var caching = tbar.localUsuario.cache;
            var menu = tbar.localUsuario.menu;
            tbar.add({
                xtype: 'image',
                src: Illi.app.Util.getPath("/resources/images/illi.png"), //Illi.path + '/resources/images/illi.png',
                tooltip: 'ILLI Software',
                width: 32,
                height: 32,
                margin: '0 10px 0 0',
                listeners: {
                    click: {
                        element: 'el', //bind to the underlying el property on the panel
                        fn: function () {
                            Ext.Ajax.request({
                                url: '../illi/redefinir_sessao/',
                                success: function (response) {
                                    Illi.app.Util.MSG('Atualizando Sistema...');
                                    closepage = true;
                                    window.location.reload(true);
                                }
                            });
                        }
                    }
                }
            });
            var id_usuario = Illi.app.Local.get("usuario").id;
            var segredo = Illi.app.Local.get("usuario").segredo;
            var gravatar = Illi.app.Util.getGravatar(Illi.app.Local.get("usuario").email);
            var iconCache = (caching ? 'icon-cache' : 'icon-homem');
            tbar.add({
                tooltip: "Perfil: " + nome_usuario,
                iconCls: 'large',
                scale: 'large',
                style: {
                    "background-image": "url('" + gravatar + "') !important;",
                    "background-repeat": "no-repeat",
                    "background-size": "100% 100%"
                },
                handler: function () {
                    Ext.create('Illi.view.usuario.Janela', {iconCache: iconCache, id_usuario: id_usuario, segredo: segredo}).show();
                }
            });
            tbar.add({
                xtype: 'button',
                tooltip: "Suporte",
                iconCls: 'icon-suporte large', // (tbar.smallScreen ? 'icon-anotacao medium' : 'icon-anotacao large')
                scale: 'large', // (tbar.smallScreen ? 'medium' : 'large')
                handler: function () {
                    try {
                        Ext.MessageBox.show({
                            title: 'Atenção',
                            msg: "<h3>Carregando acesso remoto</h3>",
                            waitConfig: {interval: 0}
                        });
                        var url = Illi.app.Local.get('suporte');
                        Ext.Ajax.request({
                            method: 'POST',
                            url: (url ? url : "http://127.0.0.1:12000/suporte"),
                            success: function (response) {

                                try {
                                    var retorno = Ext.JSON.decode(response.responseText);
                                    if (retorno.finalizado === true) {

                                    } else {
                                        window.open("http://app.illi.com.br/Remoto.exe", "illi");
                                    }
                                } catch (err) {
                                    window.open("http://app.illi.com.br/Remoto.exe", "illi");
                                }
                                Ext.MessageBox.hide();
                            },
                            failure: function () {
                                Ext.MessageBox.hide();
                                window.open("http://app.illi.com.br/Remoto.exe", "illi");
                            }
                        });
                    } catch (err) {
                        console.log(err);
                        window.open("http://app.illi.com.br/Remoto.exe", "illi");
                        Ext.MessageBox.hide();
                    }
                }
            });
            if (menu.length > 0) {
                eval("menu = " + menu + ";");
                tbar.add(menu);
            }
            tbar.doExibirBarraFlutuante();
        }
    },
    doExibirBarraFlutuante: function () {
        var tbar = this;
        var id_entidade = tbar.localUsuario.entidade.id;
        var barraFlutuante = Ext.widget({
            xtype: 'toolbar',
            border: true,
            rtl: false,
            floating: true,
            fixed: true,
            preventFocusOnActivate: true,
            items: [
                {
                    xtype: 'comboEntidade',
                    fieldLabel: false,
                    labelWidth: 75,
                    value: id_entidade,
                    listeners: {
                        select: function (combo) {
                            var id = combo.getValue();
                            if (id !== id_entidade) {
                                combo.setDisabled(true);
                                Ext.Ajax.request({
                                    url: '../illi/definir_entidade/',
                                    method: 'POST',
                                    params: {
                                        entidade: id
                                    },
                                    success: function (response) {
                                        Illi.app.Util.MSG('Atualizando Sistema...');
                                        if (response.responseText !== undefined) {
                                            var response = Ext.JSON.decode(response.responseText);
                                            if (response.controle) {
                                                Illi.app.Local.set('controle', response.controle);
                                            }
                                        }
                                        var redirect = '/illi/principal';
                                        closepage = true;
                                        window.location = redirect;
                                    }
                                });
                            }
                        }
                    }
                },
                '-',
                {
                    xtype: 'comboArvoreAcesso',
                    emptyText: 'Acesso Rápido',
                    handlerActionButton: tbar.onClickButton
                },
                {
                    tooltip: "Sair: ",
                    iconCls: 'small icon-sair',
                    scale: 'small',
                    handler: function () {
                        Illi.app.Util.MSG('Encerrando Sistema...');
                        closepage = true;
                        window.location = "http://" + window.document.location.host + (pdv ? "/illi/inicial" : "");
                    }
                }
            ],
            listeners: {
                afterlayout: function (flyBar) {
                    tbar.tbarAlign(barraFlutuante);
                    tbar.doDefinirSmallScreen(tbar);
                    Ext.EventManager.onWindowResize(function () {
                        var oldSmallScreen = tbar.smallScreen;
                        tbar.tbarAlign(flyBar);
                        tbar.doDefinirSmallScreen(tbar);
                        tbar.tbarRedimecionarIcone(tbar.items.items, oldSmallScreen);
                    });
                }
            }
        });
        barraFlutuante.show();
    },
    doDefinirSmallScreen: function (tbar) {
        tbar.smallScreen = (Ext.getBody().getViewSize().width < 1488 ? true : false);

    },
    tbarAlign: function (obj) {
        obj.alignTo(document.body, 'tr-tr', [(Ext.getScrollbarSize().width + 4) * (Ext.rootHierarchyState.rtl ? 1 : -1), -(document.body.scrollTop || document.documentElement.scrollTop) + 10]);
    },
    tbarRedimecionarIcone: function (items, small_antigo) {
        var tbar = this;
        var resolucao = Ext.getBody().getViewSize().width;
        //if ((small_antigo !== tbar.smallScreen) || (resolucao < 1000)) {
        Ext.Array.each(items, function (item) {
            if (item.texto !== undefined) {
                item.setText((tbar.smallScreen ? false : item.texto));
                item.setVisible(resolucao > 1025);
            }
        });
        // }
    }
});
