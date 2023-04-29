class ChannelsController < ApplicationController
  before_action :set_channel, only: [:show, :update, :destroy]
  # before_action :authenticate_user

  def index
    @channels = Channel.all
    render json: @channels
  end

  def show
    render json: @channel
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.user = current_user

    if @channel.save
      render json: @channel, status: :created
    else
      render json: @channel.errors, status: :unprocessable_entity
    end
  end

  def update
    if @channel.update(channel_params)
      render json: @channel
    else
      render json: @channel.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @channel.destroy
    head :no_content
  end

  private

  def set_channel
    @channel = Channel.find(params[:id])
  end

  def channel_params
    params.require(:channel).permit(:name, :description, :private, :invitekey)
  end
end
