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
    # Answer: Yes!
    if @channel.save
      assigning_user_to_channel = Member.new(user_id: current_user.id, channel_id: @channel.id)
      if assigning_user_to_channel.save
        render json: @channel, status: :created
      end
    else
      render json: @channel.errors, status: :unprocessable_entity
    end
  end

  # Channel update
  def update
    # channel = Channel.find(params[:id])
    if @channel.user_id === current_user.id && @channel.update(name: params[:name], description: params[:description], image: params[:image])
      render json: @channel
    else
      render json: @channel.errors, status: :unprocessable_entity
    end
  end

  # Delete channel
  def destroy
    if @channel.user_id === current_user.id 
      @channel.destroy
      head :no_content
    else
      render json: {"error": "User is not a creator user"}
    end
  end

  private

  def set_channel
    @channel = Channel.find(params[:id])
  end

  def channel_params
    params.require(:channel).permit(:name, :description, :private, :invitekey, :image)
  end
end
