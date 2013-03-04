Ext.define("AM.view.ProtectedContent", {
	extend : "Ext.form.Panel",
	alias : 'widget.protected',
	
	layout : {
		align : 'center',
		pack : 'center',
		type : 'vbox'
	},
	
	items : [
		{
			xtype : "button",
			anchor : "100%",
			itemId : 'logoutBtn',
			text : 'Log out',
			hidden: false
		},
		{
			xtype : "button",
			anchor : "100%",
			itemId : 'coffeeBtn',
			text : 'Coffee',
			hidden: true
		},
		{
			xtype : "button",
			anchor : "100%",
			itemId : 'massageBtn',
			text : 'Massage',
			hidden: true
		},
	]
});