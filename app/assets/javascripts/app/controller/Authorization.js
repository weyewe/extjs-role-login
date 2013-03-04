Ext.define("AM.controller.Authorization", {
	extend : "Ext.app.Controller",
	views : [
		"ProtectedContent"
	],
	 
	
	refs: [
		{
			ref: 'protectedContent',
			selector: 'protected'
		} 
	],
	 
	init : function( application ) {
		var me = this; 
		 
		me.control({
			"protected" : {
				activate : this.onActiveProtectedContent
			} 
			
		});
		
	},
	
	onActiveProtectedContent: function( panel, options) {
		var me  = this; 
		var currentUser = Ext.decode( localStorage.getItem('currentUser'));
		
		
		// console.log("FROM the Authorization controller. on active protected content");
		var coffeeBtn = panel.down('#coffeeBtn');
		
		// if( coffeeBtn ){
		// 	console.log("Coffee button is fond");
		// }
		
		// console.log("The type of currentUser in Authorization: " + typeof currentUser);
		// 
		// console.log("The type of currentUser['role']:" + typeof currentUser['role'] )
		
		if( currentUser && currentUser['role'] && 
					currentUser['role']['coffee_maker'] && 
					currentUser['role']['coffee_maker']['make_coffee']){
			coffeeBtn.setVisible(true ) ;
		}
		
		
		
		// check authorization.. check the role
	}
});