class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :text_content, :image_url, :created_at
  belongs_to :user
  has_many :likes
end
