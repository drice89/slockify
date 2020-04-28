export const signup = (user) => (
  $.ajax({
    method: "POST",
    url: "api/users",
    data: { 
      user: {
        email: user.email,
        password: user.password,
        full_name: user.fullName
    } 
  }
  })
);

export const login = (user) => (
  $.ajax({
    method: "POST",
    url: "api/session",
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    method: "DELETE",
    url: "api/session"
  })
);