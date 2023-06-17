class MembersController < ApplicationController
    def create
        membership = Member.find_by(user_id: params[:user_id], channel_id: params[:channel_id])
        if !membership
            membership = Member.create(member_params)
            channel = Channel.find(params[:channel_id])
            # ActionCable.server.broadcast "MessagesChannel_#{params[:channel_id]}", {channel: channel}
            render json: channel, serializer: ChannelSerializer, status: :created
        else
            render json: { error: "Already a member" }, status: :unprocessable_entity
        end
    end

    def destroy
        membership = Member.find_by(user_id: params[:user_id], channel_id: params[:channel_id])
        if membership
            membership.destroy
            channel = Channel.find(params[:channel_id])
            # ActionCable.server.broadcast "MessagesChannel_#{params[:channel_id]}", {channel: channel}
            render json: channel, serializer: ChannelSerializer, status: 200
        else
            render json: { error: "A non-member" }, status: :unprocessable_entity
        end
    end

    private
    def member_params
        params.permit(:user_id, :channel_id)
    end
    def all_member_params
        params.permit(:id, :user_id, :channel_id)
    end
end
