Ext.define("AM.view.ProtectedContent", {
	extend : "Ext.form.Panel",
	alias : 'widget.protected',
	
	layout : {
		align : 'center',
		pack : 'center',
		type : 'hbox'
	},
	
	items : [
		{
			xtype : "button",
			anchor : "100%",
			itemId : 'logoutBtn',
			text : 'Log out'
		}
	]
});