/**
 * Makes a DELETE http request to auth-service and logs out user
 *
 * @param {*} user
 */
export const logoutHandler = async (user) => {
  const refreshTokenToDelete = {
    refreshToken: user?.refreshToken,
  };
  try {
    await fetch("/api/v1/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(refreshTokenToDelete),
    });
    localStorage.removeItem("lc_ab_mb_token");
    localStorage.removeItem("lc_ab_mb_refresh_token");
  } catch (error) {
    console.log(error);
  }
};
