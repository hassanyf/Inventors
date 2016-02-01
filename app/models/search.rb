class Search < ActiveRecord::Base

	def search_ideas
		ideas = Idea.all

		ideas = ideas.where(["title ILIKE ?","%#{keywords}%"]) if keywords.present?
		ideas = ideas.where(["category ILIKE ?","%#{category}%"]) if category.present?

		return ideas
	end

end
