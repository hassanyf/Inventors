class Idea < ActiveRecord::Base
	acts_as_votable
	belongs_to :user
	has_many :comments
	has_attached_file :image, styles: { medium: "700x500#", small: "350x250>" }
  	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  	def self.search(search)
  		if search
  			where(["title LIKE ?","%#{search}%"]).all.order("created_at DESC")
  		else
  			all
  		end
  	end
end
