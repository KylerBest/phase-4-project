class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_picture_url, :bio, :posts, :liked_posts
  has_many :posts
  has_many :liked_posts, through: :likes, source: :post
end
