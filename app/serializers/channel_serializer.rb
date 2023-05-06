class ChannelSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :private
  has_many :messages, serializer: MessageSerializer
end
