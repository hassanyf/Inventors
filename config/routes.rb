Rails.application.routes.draw do
  devise_for :users
  resources :ideas do
  	member do
  		get "like", to: "ideas#upvote"
  		get "dislike", to: "ideas#downvote"
  	end
  	resources :comments
  end

  root 'ideas#index'

end
