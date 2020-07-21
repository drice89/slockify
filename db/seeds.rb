require 'set'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def generate_name(ids)
  ids.sort
end

demoUser = User.create({email: "demouser@slockify.io", password: "password123!", full_name: "Demo User"})
user1 = User.new({email: "seededuser1@slockify.io", password: "password123!", full_name: "James Hetfield", avatar_url: "https://ih1.redbubble.net/image.1265197598.4166/raf,128x128,075,f,black_white.u2.jpg"})
user1.save
user2 = User.new({email: "seededuser2@slockify.io", password: "password123!", full_name: "Kendrick Lamar", display_name: "Good Kid", avatar_url: "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png"})
user2.save
conversation1 = Conversation.new(name: generate_name([demoUser.id, user2.id]), description: "Something something", owner_id: user1.id, is_private?: false, convo_type: "direct")
conversation1.save
Membership.create(member_id: demoUser.id, conversation_id: conversation1.id, is_admin?: false)
Membership.create(member_id: user2.id, conversation_id: conversation1.id, is_admin?: false)
Message.create(body: "Wow this is so cool", author_id: demoUser.id, recipient_id: conversation1.id)
Message.create(body: "yea bro totally", author_id: user2.id, recipient_id: conversation1.id)
Message.create(body: "Did you hear this track by DJ Fresh", author_id: demoUser.id, recipient_id: conversation1.id)
Message.create(body: "its so lit!", author_id: user2.id, recipient_id: conversation1.id)
axl = User.create(email: "arose@slockify.io" , password: "password123!", full_name: "Axl Rose", display_name: "Axl", avatar_url: "https://www.al.com/resizer/bcZDXwj6GAbkM7GxiSSRU18PLJk=/450x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.al.com/home/bama-media/width600/img/entertainment_impact/photo/guns-n-roses-axl-rose-c-1988-6affa86f8f25afd2.jpg")
beck = User.create(email: "user1@slockify.io" , password: "password123!", full_name: "Jeff Beck", display_name: "Beck", avatar_url: "https://static2.greatsong.net/artiste/96x96/jeff-beck-156391.jpg")
kanye = User.create(email: "user2@slockify.io" , password: "password123!", full_name: "Kanye West", display_name: "Yeezus", avatar_url: "https://i.imgur.com/1YNrC3G.jpg")
jack = User.create(email: "user3@slockify.io" , password: "password123!", full_name: "Jack Johnson", avatar_url: "https://images-na.ssl-images-amazon.com/images/I/A1swyyRkBxL._CR0,0,3840,2880_._SL1000_.jpg")
cardi = User.create(email: "user4@slockify.io" , password: "password123!", full_name: "Cardi B", display_name: "Cardi", avatar_url: "https://www.stylist.co.uk/images/app/uploads/2019/02/04123227/cardi-b-256x256.jpg?w=256&h=256&fit=max&auto=format%2Ccompress")
carrie = User.create(email: "user5@slockify.io" , password: "password123!", full_name: "Carrie Underwood", display_name: "nflQueen", avatar_url: "https://pbs.twimg.com/profile_images/610206978363785216/rLwSdD4-.jpg")
paul = User.create(email: "user6@slockify.io" , password: "password123!", full_name: "Paul M", display_name: "TheBestBeatle", avatar_url: "https://i.pinimg.com/originals/61/ce/3b/61ce3ba03613c6fabef87c7373711a5c.jpg")
axlDemoDm = Conversation.create(name: generate_name([demoUser.id, axl.id]), description: "Something something", owner_id: axl.id, is_private?: true, convo_type: "direct")
kanyeDemoDm = Conversation.create(name: generate_name([demoUser.id, kanye.id]), description: "Something something", owner_id: kanye.id, is_private?: true, convo_type: "direct")
demoCardiDm = Conversation.create(name: generate_name([demoUser.id, cardi.id]), description: "Something something", owner_id: demoUser.id, is_private?: true, convo_type: "direct")
paulDemoDm = Conversation.create(name: generate_name([demoUser.id, paul.id]), description: "Something something", owner_id: paul.id, is_private?: true, convo_type: "direct")
general = Conversation.create(name: "General", description: "Something something", owner_id: user1.id, is_private?: false, convo_type: "channel", playlist_url: "7gTmFj8jC34XlXewe3n4nj")

Membership.create(member_id: demoUser.id , conversation_id: axlDemoDm.id)
Membership.create(member_id: axl.id , conversation_id: axlDemoDm.id)
Message.create(author_id: axl.id, recipient_id: axlDemoDm, body: "WOOOOOOOAAAAAAA WOAAAA WOAAA SWEET CHILD OF MINE!")
Membership.create(member_id: demoUser.id , conversation_id: kanyeDemoDm.id)
Membership.create(member_id: kanye.id, conversation_id: kanyeDemoDm.id)
Message.create(author_id: kanye.id, recipient_id: kanyeDemoDm.id, body: "Ima let you finish but...")
Membership.create(member_id: demoUser.id, conversation_id: demoCardiDm.id)
Membership.create(member_id: cardi.id, conversation_id: demoCardiDm.id)
Message.create(author_id: cardi.id, recipient_id: demoCardiDm.id, body: "Bought a new foreign, I might cop a yacht")
Membership.create(member_id: demoUser.id, conversation_id: paulDemoDm.id)
Membership.create(member_id: paul.id, conversation_id: paulDemoDm.id)
Message.create(author_id: paul.id, recipient_id: paulDemoDm.id, body: "SHE LOVES YOU YEAH YEAH")

User.all.each do |user|
  Membership.create(member_id: user.id, conversation_id: general.id, is_admin?: false )
  Message.create( author_id: user.id, recipient_id: general.id, body: "Hello from #{user.full_name}")
end

