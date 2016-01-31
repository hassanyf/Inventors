class PostMailer < ActionMailer::Base

	def post_created(user)
		
		mail(to: user.email,
			from: "no-reply@inventors.com",
			subject: "Post Created",
			body: "Your new post has been created"
		)

	end

end