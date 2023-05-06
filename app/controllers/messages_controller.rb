class MessagesController < ApplicationController
  before_action :authenticate_user!
  def create
    @channel = Channel.find(params[:channel_id])
    @message = @channel.messages.create(message_params)
    @message.user = current_user
    @message.username = current_user.username
    if @message.save
      # channel_name = "messages_channel_#{params[:channel_id]}"
      # channel_name = "messages_channel"
      # Action cable to return a single message 
      # ActionCable.server.broadcast "public_chat", {messages: @message}
      ActionCable.server.broadcast "public_chat", {messages: @channel.messages}
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # def create
  #   user = User.find(1)
  #   @channel = Channel.find(1)
  #   message = @channel.messages.create(message_params)
  #   if message.valid?   
  #     ActionCable.server.broadcast 'public_chat', message.content
  #     render json: message 
  #   end
  # end

  def index
    @channel = Channel.find(params[:channel_id])
    @messages = @channel.messages
    render json: @messages
  end

  private

  def message_params
    params.require(:message).permit(:content, :channel_id, :message)
  end
end
