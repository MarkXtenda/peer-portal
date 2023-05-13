class AvatarsController < ApplicationController
    def create
        avatar = Avatar.find_by(user_id: params[:user_id])
        if avatar
            avatar.destroy
        end
        new_avatar = Avatar.new(avatar_params)
        # new_avatar.user_id = current_user.id
        if new_avatar.save
            render json: new_avatar, status: :created
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
