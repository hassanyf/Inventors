Rails.application.routes.draw do

  devise_for :users
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

  resources :searches, :only => [:new, :create, :show]
  resources :ideas do
  	member do
  		get "like", to: "ideas#upvote"
  		get "dislike", to: "ideas#downvote"
  	end
  	resources :comments
  end
  # 
  # authenticated :user do
  # 	root 'ideas#index', as: "authenticated_root"
  # end

  root 'welcome#index'

  #root 'ideas#index'

end
