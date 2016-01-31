class CommentsController < ApplicationController
	before_action :authenticate_user!
	def create
		@idea = Idea.find(params[:idea_id])
		@comment = Comment.create(params[:comment].permit(:content))
		@comment.user_id = current_user.id
		@comment.idea_id = @idea.id

		if @comment.save
			CommentMailer.comment_created(current_user, @idea.user, @comment.content).deliver
			redirect_to idea_path(@idea)
		else
			render 'new'
		end
	end
end
