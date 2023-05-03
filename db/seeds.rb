# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
admin = User.create(username: "admin", email: "admin@mail.com", password: "12345678", password_confirmation: "12345678")
channel1 = Channel.create(name: "Admin Channel", description: "Channel created by admin", private: false, invitekey: "#first-channel", user_id: admin.id)
channel2 = Channel.create(name: "Admin Private Channel", description: "Channel created by admin", private: true, user_id: admin.id)
user = User.create(username: "user", email: "user@mail.com", password: "12345678", password_confirmation: "12345678", channels: [channel1, channel2])
