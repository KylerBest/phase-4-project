class PostsController < ApplicationController

    def index
        posts = Post.all
        render json: posts, status: :ok
    end

    def create
        post = @current_user.posts.create!(post_params)
        render json: post, status: :created
    end

    private

    def post_params
        params.permit(:text_content, :image_url)
    end

end
