class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :text_content, :image_url
  has_many :comments
end
