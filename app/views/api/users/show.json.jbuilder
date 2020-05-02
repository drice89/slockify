json.partial! "api/users/user", user: @user

json.partial! "api/conversations/conversation", conversation: @user.conversations