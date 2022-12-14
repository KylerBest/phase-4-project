class Post < ApplicationRecord
    belongs_to :user
    has_many :likes
    has_many :users_liked, through: :likes, source: :user

    validates :text_content, presence: true

end
