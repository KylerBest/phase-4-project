class LikeSerializer < ActiveModel::Serializer
  attributes :user_id
  belongs_to :post
end
