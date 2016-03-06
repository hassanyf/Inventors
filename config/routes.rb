Rails.application.routes.draw do

  #get 'welcome/index'

  # conversations
  resources :conversations do
    member do
      post :reply
      post :trash
      post :untrash
    end
  end

  get "mailbox/inbox" => "mailbox#inbox", as: :mailbox_inbox
  get "mailbox/sent" => "mailbox#sent", as: :mailbox_sent
  get "mailbox/trash" => "mailbox#trash", as: :mailbox_trash

  get "ideas/explore" => "ideas#explore", as: :ideas_explore
  get "ideas/trending" => "ideas#trending", as: :ideas_trending
  get "ideas/popular" => "ideas#popular", as: :ideas_popular

  resources :searches, :only => [:new, :create, :show]
  devise_for :users
  resources :ideas do
  	member do
  		get "like", to: "ideas#upvote"
  		get "dislike", to: "ideas#downvote"
  	end
  	resources :comments
  end

  authenticated :user do
  	root 'ideas#index', as: "authenticated_root"
  end

  root 'welcome#index'

  #root 'ideas#index'

end
