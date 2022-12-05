class User < ApplicationRecord
    has_secure_password
    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :friend_requests, dependent: :destroy
    has_many :friends, through: :friend_requests

    validates :username, presence: true, uniqueness: true
end
