class LikeSerializer < ActiveModel::Serializer
  attributes :rating
  belongs_to :post
end
