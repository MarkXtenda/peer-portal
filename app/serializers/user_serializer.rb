class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :channels
  
  def channels
    self.object.channels
  end

  def avatar
    if object.avatar&.attached?
      ActiveModelSerializers::SerializableResource.new(object.avatar, serializer: AvatarSerializer).as_json
    end
  end
  # has_one :avatar, serializer: AvatarSerializer
end
