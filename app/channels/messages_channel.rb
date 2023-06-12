class MessagesChannel < ApplicationCable::Channel
  def subscribed
    channel_id = params[:channel_id]
    # channel_chat = Message.where(channel_id: params[:channel_id])
    # serialized_messages = ActiveModel::Serializer::CollectionSerializer.new(channel_chat, serializer: MessageSerializer)
    # transmit({ messages: serialized_messages })
    stream_from "MessagesChannel_#{channel_id}"
  end

  def unsubscribed
  end
end

