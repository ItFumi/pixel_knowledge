Rails.application.routes.draw do

  root to: "top#index"

  get "about", to: "about#index"
  get "favorites", to: "favorites#index"

  resources :posts do
    resources :favorites, only: [:create, :destroy]
    resources :comments
  end

  devise_for :users, controllers: { sessions: "sessions", passwords: "passwords", registrations: "registrations" }

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
