ExtjsRoleLoginLocalstorage::Application.routes.draw do
  devise_for :users
  root :to => 'home#index'

  namespace :api do
    devise_for :users
    resources :recipes, :only=>[:index, :show]
  end

end
