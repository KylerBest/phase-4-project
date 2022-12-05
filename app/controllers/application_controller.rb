class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :invalid_response

    before_action :authorize

    private

    def authorize
        @current_user = User.find_by(id: session[:user_id])

        render json: {errors: ["Unauthorized"]}, status: :unauthorized unless @current_user
    end

    def invalid_response(e)
        render json: {errors: e.record.errors.full_messages}, status: :unprocessable_entity
    end
end
