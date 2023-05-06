class ChannelSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :private

  # NO CURRENT NEED IN SHOWING USERS MESSAGES
  # has_many :messages, serializer: MessageSerializer
  # SHOW USERS INSTEAD
  has_many :users, serializer: UserSerializer
end
