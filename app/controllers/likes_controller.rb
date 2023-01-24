class LikesController < ApplicationController

    def create
        @current_user.likes.find_or_create_by(post_id: params[:post_id])
        post = Post.find_by(id: params[:post_id])
        render json: post, status: :ok
    end

end
