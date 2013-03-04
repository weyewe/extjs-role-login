Ext.define("AM.controller.Authentication", {
	extend : "Ext.app.Controller",
	views : [
		"AuthenticationForm",
		'Viewport',
		"ProtectedContent"
	],
	
	currentUser : null, 
 
	
	refs: [
		{
			ref: 'viewport',
			selector: 'vp'
		} 
	],
	
	
	
	onViewportLoaded: function(){
		console.log("The viewport is loaded");
		var me = this;
		var currentUserBase = localStorage.getItem('currentUser');
		if( currentUserBase === null){
			// show the login page
			me.showLoginForm(); 
		}else{
			// decode the currentUserBase
			me.currentUser = Ext.decode( currentUserBase ) ;
			// show the protected content
			me.showProtectedArea(); 
		}
	},
	
	init : function( application ) {
		var me = this; 
		
		
		
		
		// Ext.Viewport.on('loaded', function() {
		//         var view = me.getMain().down('#article-' + id);
		//         me.getMain().setActiveItem(view);
		//     }, me);
		
		me.control({
			"button#loginBtn" : {
				click : this.onLoginClick
			},
			
			"button#logoutBtn": {
				click : this.onLogoutClick
			},
			'vp' : {
				'render' : this.onViewportLoaded
			}
			
		});
		
	 
		
	},
	
	onLoginClick: function( button ){
		var me = this; 
		
		var fieldset = button.up('fieldset');
		// button.up('fieldset').setLoading( true ) ;
		fieldset.setLoading( true ) ;
	
		var form =  button.up('form');
		var emailField = form.getForm().findField('email');
		var passwordField = form.getForm().findField('password');
				
		me.authenticateUser({
			user_login : {
				email : emailField.getValue(),
				password : passwordField.getValue()
			}
		}, fieldset); 
	
	},
	
	onLogoutClick: function( button ){
		var me = this;
		me.currentUser  = null; 
		// localStorage.setItem('currentUser',  null );
		 localStorage.removeItem('currentUser');
		// this could go to the localStorage. much more awesome 
		me.showLoginForm()
	},
	
	authenticateUser : function( data , fieldset ){
		var me = this; 
		Ext.Ajax.request({
		    url: 'api/users/sign_in',
		    method: 'POST',
		    params: {
		    },
		    jsonData: data,
		    success: function(result, request ) {
						fieldset.setLoading( false ) ;
						// cleaning the form data
						var form = fieldset.up('form');
						var passwordField = form.getForm().findField('password');
						var emailField = form.getForm().findField('email');
						passwordField.setValue('');
						emailField.setValue('');
						
						
						var responseText=  result.responseText; 
						var data = Ext.decode(responseText );
						console.log("data['auth_token']: " + data['auth_token'] ); 
						console.log("data['email']: " + data['email'] ); 
						var currentUserObject = {
							'auth_token' : data['auth_token'] ,
							'email'				: data['email'],
							'role'				: Ext.decode( data['role'] ) 
						};
						
						console.log("The role:");
						console.log( currentUserObject['role']);
						
						console.log("The typeof role: " + typeof currentUserObject['role']);
						
						
						
						
						// set localStorage 
						localStorage.setItem('currentUser', Ext.encode( currentUserObject ));
						me.currentUser = currentUserObject;
						me.showProtectedArea(); 
		    },
		    failure: function(result, request ) {
						fieldset.setLoading( false ) ;
						Ext.Msg.alert("Login Error", "The email-password combination is invalid");
		    }
		});
	},
	
	showProtectedArea : function(){
		console.log("The protected area  is shown");
		console.log("Gonna show the protected area");
		var me = this; 
		
		console.log("The typeof currentUser['role']: " + typeof me.currentUser['role']);
		console.log( "THe presence of janitor: " + me.currentUser['role']['janitor']);
		
		if( me.currentUser['role']['janitor']){
			console.log("The janitor is present");
		}else{
			console.log("The janitor is not present");
		}
		
		if( me.currentUser['role']['janitor']['make_coffee']){
			console.log("he can make coffee");
		}else{
			console.log("The janitor can't make coffee");
		}
		
		me.getViewport().getLayout().setActiveItem( 1) ;
	},
	showLoginForm : function(){
		console.log("The login form is shown");
		var me = this;
		me.getViewport().getLayout().setActiveItem( 0 ) ;
	}
});