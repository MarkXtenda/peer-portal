class MembersController < ApplicationController
    def create
        membership = Member.find_by(member_params)
        if !membership
            user = member.user.username
            membership = Member.create(member_params)
            render json: { user: user, message: 'Joined the group' }
        else
            render json: { error: "Already a member" }, status: :unprocessable_entity
        end
    end

    def destroy
        membership = Member.find_by(member_params)
        if membership
            user = member.user.username
            membership.destroy
            render json: { user: user, message: 'Left the group' }
        else
            render json: { error: "A non-member" }, status: :unprocessable_entity
        end
    end

    private
    def member_params
        params.permit(:user_id, :channel_id)
    end
end
