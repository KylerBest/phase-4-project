class Post < ApplicationRecord
    belongs_to :user
    has_many :likes, dependent: :destroy
    has_many :users_liked, through: :likes, source: :user

    validates :text_content, presence: true

end
