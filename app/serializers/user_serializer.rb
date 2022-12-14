class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :profile_picture_url, :bio
  has_many :liked_posts
  has_many :posts
end
