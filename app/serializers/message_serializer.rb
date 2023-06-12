class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :image, :channel_id, :creator, :user_id, :url, :created_at
  include Rails.application.routes.url_helpers

  def url
    user = self.object.user
    if user.avatar && user.avatar.avatar.attached?
      url_for(user.avatar.avatar)
    end
  end

  def image
    if object.image.attached?
      url_for(object.image)
    end
  end
end
