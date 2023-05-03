Rails.application.routes.draw do
  resources :channels, except: [:new, :edit]
  post '/login', to: 'sessions#create'
  post '/signup', to: 'users#create'
  delete '/logout', to: 'sessions#destroy'
  resources :channels do
    resources :messages, only: [:index, :create]
  end
  mount ActionCable.server => '/cable'
end
