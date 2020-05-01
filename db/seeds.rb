# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demoUser = User.create({email: "demouser@slockify.io", password: "password123!", full_name: "Demo User"})
user1 = User.new({email: "seededuser1@slockify.io", password: "password123!", full_name: "Seed User 1"})
user1.save
user2 = User.new({email: "seededuser2@slockify.io", password: "password123!", full_name: "Seed User 2"})
user2.save
conversation1 = Conversation.new(name: "test convo", description: "Something something", owner_id: user1.id, is_private?: false, convo_type: "direct")
conversation1.save
Membership.create(member_id: user1.id, conversation_id: conversation1.id, is_admin?: false)
Membership.create(member_id: user2.id, conversation_id: conversation1.id, is_admin?: false)
