class FriendRequestSerializer < ActiveModel::Serializer
  attributes :id, :accepted
  has_one :user
  has_one :friend
end
