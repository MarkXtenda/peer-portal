class ChannelSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :private, :creator_id, :image, :users, :users_info
  include Rails.application.routes.url_helpers
  # NO CURRENT NEED IN SHOWING USERS MESSAGES
  # has_many :messages, serializer: MessageSerializer
  # SHOW USERS INSTEAD
  def users
    self.object.users.length
  end

  def users_info
    self.object.users.map { |user| { id: user.id, username: user.username } }
  end

  def image
    if object.image.attached?
      url_for(object.image)
    end
  end

  def creator_id
    self.object.user_id
  end
  # has_many :users, serializer: UserSerializer, only: [:username]
end
