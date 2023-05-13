class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :channel_id, :creator, :user_id, :url
  include Rails.application.routes.url_helpers

  def url
    user = self.object.user
    if user.avatar && user.avatar.avatar.attached?
      url_for(user.avatar.avatar)
    end
  end
end
