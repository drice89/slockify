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
Message.create(body: "Wow this is so cool", author_id: user1.id, recipient_id: conversation1.id)
Message.create(body: "yea bro totally", author_id: user2.id, recipient_id: conversation1.id)
Message.create(body: "Did you hear this track by DJ Fresh", author_id: user1.id, recipient_id: conversation1.id)
Message.create(body: "Bruh its so lit", author_id: user2.id, recipient_id: conversation1.id)
axl = User.create(email: "arose@slockify.io" , password: "password123!", full_name: "Axl Rose", display_name: "Axl")
beck = User.create(email: "user1@slockify.io" , password: "password123!", full_name: "Jeff Beck", display_name: "Beck")
kanye = User.create(email: "user2@slockify.io" , password: "password123!", full_name: "Kanye West", display_name: "Yeezus")
jack = User.create(email: "user3@slockify.io" , password: "password123!", full_name: "Jack Johnson")
cardi = User.create(email: "user4@slockify.io" , password: "password123!", full_name: "Cardi B", display_name: "Cardi")
shania = User.create(email: "user5@slockify.io" , password: "password123!", full_name: "Shania Twain", display_name: "nflQueen")
paul = User.create(email: "user6@slockify.io" , password: "password123!", full_name: "Paul M", display_name: "TheBestBeatle")
axlDemoDm = Conversation.create(name: "Axl/Beck", description: "Something something", owner_id: axl.id, is_private?: true, convo_type: "direct")
kanyeDemoDm = Conversation.create(name: "Ye/Demo", description: "Something something", owner_id: kanye.id, is_private?: true, convo_type: "direct")
demoCardiDm = Conversation.create(name: "Demo/Cardi", description: "Something something", owner_id: demoUser.id, is_private?: true, convo_type: "direct")
paulDemoDm = Conversation.create(name: "Paul/Demo", description: "Something something", owner_id: paul.id, is_private?: true, convo_type: "direct")
general = Conversation.create(name: "General", description: "Something something", owner_id: user1.id, is_private?: false, convo_type: "channel")

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

