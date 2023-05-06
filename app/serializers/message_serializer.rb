class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :user

  def user
    self.object.user
  end
end
