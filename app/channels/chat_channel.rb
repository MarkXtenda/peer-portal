class ChatChannel < ApplicationCable::Channel
  # def subscribed
  #   # channel = Channel.find(params[:channel_id])
  #   channel_chat = Message.where(channel_id: params[:channel_id])
  #   stream_from 'public_chat', serializer: MessageSerializer
  #   ActionCable.server.broadcast 'public_chat', { messages: channel_chat }
  # end

  def subscribed
    channel_chat = Message.where(channel_id: params[:channel_id])
    serialized_messages = ActiveModel::Serializer::CollectionSerializer.new(channel_chat, serializer: MessageSerializer)
    stream_for 'public_chat'
    transmit({ messages: serialized_messages })
  end
  

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
