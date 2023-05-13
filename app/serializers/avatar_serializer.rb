class AvatarSerializer < ActiveModel::Serializer
  attributes :url
  include Rails.application.routes.url_helpers

  def url
    if object.avatar.attached?
      url_for(object.avatar)
    end
  end
end
