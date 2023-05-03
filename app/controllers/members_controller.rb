class MembersController < ApplicationController
    def create
        membership = Member.find_by(member_params)
        if !membership
            membership = Member.create(member_params)
            render json: { message: 'Joined the group succesfully' }
        else
            render json: { error: "Already a member" }, status: :unprocessable_entity
        end
    end

    def destroy
        membership = Member.find_by(member_params)
        if membership
            membership.destroy
            render json: { message: 'Left the group succesfully' }
        else
            render json: { error: "Already a non-member" }, status: :unprocessable_entity
        end
    end

    private
    def member_params
        params.permit(:user_id, :channel_id)
    end
end
