class LikesController < ApplicationController

    def create
        like = @current_user.likes.find_or_create_by(post_id: params[:post_id])
        render json: like, status: :ok, include: ['post.users_liked']
    end

end
