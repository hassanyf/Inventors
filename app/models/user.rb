class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable, :timeoutable
  has_many :ideas
  has_many :comments

  acts_as_messageable

  def mailboxer_name
    self.name
  end

  def mailboxer_email(object)
    self.email
  end
  
end
