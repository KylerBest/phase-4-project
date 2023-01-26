class PostsController < ApplicationController

    def index
        posts = Post.all
        render json: posts.reverse, status: :ok
    end
    
    def create
        post = @current_user.posts.create!(post_params)
        render json: post, status: :created
    end

    def update
        post = @current_user.posts.find_by(id: params[:id])
        post.update!(post_params)
        render json: post, status: :ok
    end

    def destroy
        post = @current_user.posts.find_by(id: params[:id])
        post.destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:text_content, :image_url)
    end

end
