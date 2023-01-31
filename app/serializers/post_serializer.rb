class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :text_content, :image_url, :created_at, :user, :likes, :users_liked
  belongs_to :user
  has_many :likes
  has_many :users_liked, through: :likes, source: :user
end
