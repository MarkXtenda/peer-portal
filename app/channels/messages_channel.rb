class MessagesChannel < ApplicationCable::Channel
  def subscribed
    channel_id = params[:channel_id]
    # channel_name = "messages_channel_#{channel_id}"
    channel_name = "messages_channel"
    stream_from channel_name
  end

  def unsubscribed
    # Cleanup needed when channel is unsubscribed
  end
end
