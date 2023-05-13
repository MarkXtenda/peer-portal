Rails.application.routes.draw do
  resources :channels, except: [:new, :edit]
  resources :members, only: [:create, :destroy]
  post '/login', to: 'sessions#create'
  post '/signup', to: 'users#create'
  delete '/logout', to: 'sessions#destroy'
  post '/search', to: 'channels#find_channel'
  post '/avatars', to: 'avatars#create'
  post '/find_channel', to: 'channels#find_channel'
  # testing
  get '/avatars', to: 'avatars#show'
  get '/users', to: 'users#show'
  get '/messages', to: 'messages#index'
  resources :channels do
    resources :messages, only: [:index, :create]
  end
  mount ActionCable.server => '/cable'
end
