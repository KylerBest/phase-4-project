class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :text_content, :image_url
  belongs_to :user
  has_many :comments
end
