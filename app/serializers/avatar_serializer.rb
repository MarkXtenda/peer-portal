class AvatarSerializer < ActiveModel::Serializer
  # attributes :url
  attributes :id, :url
  include Rails.application.routes.url_helpers

  # def url
  #   rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  # end

  # def avatar
  #   return unless object.avatar.attached?

  #   object.avatar.blob.attributes
  #         .slice('filename', 'byte_size')
  #         .merge(url: url)
  #         .tap { |attrs| attrs['name'] = attrs.delete('filename') }
  # end

  def url
    if object.avatar.attached?
      url_for(object.avatar)
    end
  end
end
