Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :create] do
    end
    resource :session, only: [:create, :destroy]
    resources :conversations, except: [:edit, :new] do 
      resources :messages, only: [:index]
    end
    resources :messages, only: [:create, :update, :show, :destroy]
    resources :memberships, only: [:create, :update, :destroy]

  end

  get '/auth/spotify/callback', to: 'api/users#spotify'
  get '/auth/failure', to: 'api/users#failure'

  mount ActionCable.server, at: '/cable'

  
end
