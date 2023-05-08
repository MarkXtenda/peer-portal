class AvatarsController < ApplicationController
    def create
        avatar = Avatar.new(avatar_params)
        avatar.user_id = current_user.id
        if avatar.save
            render json: avatar, status: :created
        else
            render json: { errors: avatar.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        render json: Avatar.all
    end

    private
    def avatar_params
        params.permit(:user_id, :avatar)
    end
end
