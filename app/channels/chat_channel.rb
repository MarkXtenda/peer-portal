class ChatChannel < ApplicationCable::Channel
  def subscribed
    channel = Channel.find(params[:channel_id])
    stream_from 'public_chat'
    ActionCable.server.broadcast 'public_chat', { messages: channel.messages }
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
