Ext.define('Illi.view.movimentacao.conferencia.pagamento.Form', {
    extend: 'Illi.view.AbstractForm',
    alias: 'widget.formPagamentoConferenciaMovimentacao',
    itemId: 'formPagamentoConferenciaMovimentacao',
    requires: [
        'Illi.view.financeiro.prazo.Combo',
        'Illi.view.configuracao.operacao.Combo',
        'Ext.ux.TextMaskPlugin'
    ],
    totalPedido: false,
    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            border: false,
            bodyBorder: false,
            defaultType: 'textfield',
            fieldDefaults: {
                anchor: '70%',
                labelAlign: 'left',
                labelClsExtra: 'texto-negrito',
                labelWidth: 200,
                allowBlank: false,
                combineErrors: false,
                msgTarget: 'side'
            },
            items: [
                Illi.app.Util.campoMoeda('total_pedido', false, false, {minValue: false, allowBlank: true, hidden: true, value: me.totalPedido}),
                Illi.app.Util.campoMoeda('total_pago', false, false, {minValue: false, allowBlank: true, hidden: true}),
                {
                    xtype: 'fieldcontainer',
                    combineErrors: true,
                    msgTarget: 'side',
                    layout: 'hbox',
                    defaults: {
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Data Primeira Parcela',
                            name: 'data_parcela',
                            imteId: 'data_parcela',
                            value: new Date(),
                            submitFormat: 'Y-m-d'
                        },
                        {
                            xtype: 'checkboxfield',
                            fieldLabel: 'Dia de Vencimento Fixo',
                            name: 'vencimento_fixo',
                            allowBlank: false,
                            checked: true,
                            padding: '0 0 0 10'
                        }
                    ]
                },
                {
                    xtype: 'comboPrazo',
                    itemId: 'comboPrazo',
                    fieldLabel: 'Forma de Pagamento'
                },
                {
                    xtype: 'fieldset',
                    title: false,
                    border: false,
                    padding: 0,
                    bodyPadding: 0,
                    defaults: {
                        layout: {
                            type: 'hbox',
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
                            xtype: 'fieldcontainer',
                            items: [
                                Illi.app.Util.campoMoeda('valor_pago', 'Valor Pago', false, {minValue: 0.01}),
                                {
                                    itemId: 'adicionar',
                                    action: 'adicionar',
                                    xtype: 'button',
                                    text: 'Adicionar'
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        me.callParent(arguments);
    }
});