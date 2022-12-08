class Post < ApplicationRecord
    belongs_to :user
    has_many :comments

    validates :text_content, presence: true

end
