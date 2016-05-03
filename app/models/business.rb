class Business < ActiveRecord::Base
	validates :user_id, :name, :address, :hours, :price, presence: true
	validates :price, inclusion: {in: 1..3}

	belongs_to :user
	has_many :reviews
	has_many :photos

	def self.rating 
		Business.joins()
	end

# get ratings using joins with user and reviews/rating, includes, sum average, 	use preload as opposed to included
# do not group by business id
end
