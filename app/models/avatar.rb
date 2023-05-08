class Avatar < ApplicationRecord
    has_one_attached :avatar
    belongs_to :user
    
    def url
        # rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
        Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
    end
end
