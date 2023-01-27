class LikesController < ApplicationController

    def create
        like = @current_user.likes.find_or_create_by(post_id: params[:post_id])
        like.update(rating: params[:rating])
        post = Post.find_by(id: params[:post_id])
        render json: post, status: :ok
    end

end
