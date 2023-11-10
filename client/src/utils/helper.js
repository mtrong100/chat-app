export const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const checkUserOnline = (onlineUsers, userId) => {
  if (!onlineUsers || !userId) return;
  const isOnline = onlineUsers.some((item) => item.userId === userId);
  return isOnline;
};
