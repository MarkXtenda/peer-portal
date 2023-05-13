class ChannelsController < ApplicationController
  before_action :set_channel, only: [:show, :update, :destroy]
  # before_action :authenticate_user

  # Shows all channel that user subscribed to
  def index
    @channels = current_user.channels
    render json: @channels
  end
  # Render chosen Channel
  def show
    render json: @channel
  end

  # Search function for channels. Either public or private
  # !!! need appropriate route
  def find_channel
    if (params[:invitekey])
      @channels = Channel.where(invitekey: params[:invitekey])
    else
      public_channels = Channel.where(private: false)
      @channels = public_channels.select {|channel| channel.name.include?(params[:name])}
    end
    render json: @channels
  end

  # Create channel
  def create
    @channel = Channel.new(channel_params)
    @channel.user_id = current_user.id
    # Note: Do you need to be a member of created group?
    if @channel.save
      render json: @channel, status: :created
    else
      render json: @channel.errors, status: :unprocessable_entity
    end
  end

  # Channel update
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
