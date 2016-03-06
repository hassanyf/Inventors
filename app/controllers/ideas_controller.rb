class IdeasController < ApplicationController
	before_action :find_idea, only: [:show, :edit, :update, :destroy, :upvote, :downvote]
	before_action :authenticate_user!, except: [:index, :show]

	def index
		@ideas = Idea.search(params[:search]).all.order("created_at DESC")
	end

	def show
		@comments = Comment.where(idea_id: @idea)
		@random_idea = Idea.where.not(id: @idea).order("RANDOM()").first
	end

	def new
		@idea = current_user.ideas.build
	end

	def create
		@idea = current_user.ideas.build(idea_params)

		if @idea.save
			@user = current_user

			PostMailer.post_created(@user).deliver
			redirect_to @idea
		else
			render 'new'
		end
	end

	def edit
	end

	def update
		if @idea.update(idea_params)
			redirect_to @idea
		else
			render 'edit'
		end
	end

	def destroy
		@idea.destroy
		redirect_to root_path
	end

	def upvote
		@idea.upvote_by current_user
		redirect_to :back
	end

	def downvote
		@idea.downvote_by current_user
		redirect_to :back
	end

	def explore
		@ideas = Idea.search(params[:search]).all.order("created_at DESC")
	end

	def trending
		@ideas = Idea.search(params[:search]).all.order("comments_count, created_at DESC")
	end

	def popular
		@ideas = Idea.search(params[:search]).all.order("created_at DESC")
	end

	private

	def find_idea
		@idea = Idea.friendly.find(params[:id])
	end

	def idea_params
		params.require(:idea).permit(:title, :link, :description, :image, :category, :slug)
	end
end
