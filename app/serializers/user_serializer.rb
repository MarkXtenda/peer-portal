class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :channels
  
  def channels
    self.object.channels
  end

  has_one :avatar, serializer: AvatarSerializer
end
