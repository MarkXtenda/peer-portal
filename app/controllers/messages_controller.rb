class MessagesController < ApplicationController
  # before_action :authenticate_user!
  include Rails.application.routes.url_helpers
  def create
    @channel = Channel.find(params[:channel_id])
    @message = @channel.messages.new(message_params)
    # @message.user = current_user
    # @message.creator = current_user.username
    # if current_user.avatar && current_user.avatar.avatar.attached?
    #   @message.avatar = url_for(current_user.avatar.avatar)
    # end       
    if @message.save
      # channel_name = "messages_channel_#{params[:channel_id]}"
      # channel_name = "messages_channel"
      # Action cable to return a single message 
      # ActionCable.server.broadcast "public_chat", {messages: @message}
      ActionCable.server.broadcast "public_chat", {messages: Message.where(channel_id: params[:channel_id])}
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @channel = Channel.find(params[:channel_id])
    @messages = @channel.messages
    render json: @messages
  end

  private

  def message_params
    params.permit(:content, :channel_id, :user_id, :creator, :message)
  end
end
