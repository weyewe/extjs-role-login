class Api::SessionsController < Api::BaseApiController
  before_filter :authenticate_user!, :except => [:create, :destroy, :say_hi ]
  before_filter :ensure_params_exist, :except => [:say_hi, :destroy]
  respond_to :json
 
  def create
    resource = User.find_for_database_authentication(:email => params[:user_login][:email])
    return invalid_login_attempt unless resource
 
    if resource.valid_password?(params[:user_login][:password])
      sign_in(:user, resource)
      resource.ensure_authentication_token!
      render :json=> {:success=>true, 
                      :auth_token=>resource.authentication_token, 
                      :email=>resource.email,
                      :role => resource.role.to_json
              }
      return
    end
    invalid_login_attempt
  end
  
  def say_hi
    render :json=> {:success=>true, 
                    :msg => "Server: This is your coffee!"
            }
  end
 
  def destroy
    # resource = User.find_for_database_authentication(:email => params[:user_login][:email])
    resource = User.find_by_authentication_token( params[:auth_token])
    resource.authentication_token = nil
    resource.save
    render :json=> {:success=>true}
    # sign_out(resource_name)
    
    # if resource.authentication_token.nil?
    #   render :json => {:success => true }
    # else
    #   render :json => {:success => false }
    # end
    
    # initial auth_token: h2sD5gN7nyBs7w1MxWMz
    # new auth_token: eryfVgN3wL42cytkY3SL => different on save
  end
 
  protected
  def ensure_params_exist
    return unless params[:user_login].blank?
    render :json=>{:success=>false, :message=>"missing user_login parameter"}, :status=>422
  end
 
  def invalid_login_attempt
    render :json=> {:success=>false, :message=>"Error with your login or password"}, :status=>401
  end
end