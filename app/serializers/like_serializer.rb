class LikeSerializer < ActiveModel::Serializer
  attributes :rating, :user, :post
  belongs_to :user
  belongs_to :post
end
