export const createMembership = (membership) => (
  $.ajax({
    method: "POST",
    url: "/api/memberships",
    data : { membership }
  })
);

export const updateMembership = (membership) => (
  $.ajax({
    method: "PATCH",
    url: `/api/memberships/${membership.id}`,
    data: { membership }
  })
);

export const deleteMembership = (membershipId) => (
  $.ajax({
    method: "DELETE",
    url: `/api/memberships/${membershipId}`,
  })
);