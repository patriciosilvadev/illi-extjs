Ext.define('Illi.view.financeiro.prazo.Combo', {
    extend: 'Illi.view.AbstractCombo',
    alias: 'widget.comboPrazo',
    name: 'id_prazo',
    store: Ext.create('Illi.store.Prazos', {storeId: "comboPrazos"}),
    displayField: 'descricao',
    valueField: 'id',
    queryMode: 'remote',
    queryParam: 'descricao',
    tpl: Ext.create('Ext.XTemplate',
            '<tpl for=".">',
            '<div class="x-boundlist-item">',
            ' {descricao} - {id}',
            '</div>',
            '</tpl>'
            ),
    initComponent: function() {
        this.callParent(arguments);
        this.store.getProxy().extraParams = {"situacao": "ATIVO"};
        this.store.load();
    }
});