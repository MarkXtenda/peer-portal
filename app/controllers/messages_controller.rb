# app/controllers/messages_controller.rb
class MessagesController < ApplicationController
  # before_action :authenticate_user!
  
  def create
    @channel = Channel.find(params[:channel_id])
    @message = @channel.messages.new(message_params)
    @message.user = current_user
    if @message.save

      render json: @message
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
    params.require(:message).permit(:content)
  end
end
