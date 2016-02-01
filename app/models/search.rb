class Search < ActiveRecord::Base

	def search_ideas
		ideas = Idea.all

		ideas = ideas.where(["title LIKE ?","%#{keywords}%"]) if keywords.present?
		ideas = ideas.where(["category LIKE ?","%#{category}%"]) if category.present?

		return ideas
	end

end
