class Message < ApplicationRecord
  # after_create_commit { broadcast_message }
  belongs_to :user
  belongs_to :channel
  has_one_attached :image

  # private 

  # def broadcast_message
  #   Action.server.broadcast("MessagesChannel", {
  #     id:,
  #     body:
  #   })
  # end
end