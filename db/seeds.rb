# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
admin = User.create(username: "admin", email: "admin@mail.com", password: "12345678", password_confirmation: "12345678")
channel = Channel.create(name: "Admin Channel", description: "Channel created by admin", private: false, invitekey: "first-channel")
message = Message.create(content: "First message!")
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
