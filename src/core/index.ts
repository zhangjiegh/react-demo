const initCore = async () => {
  if (process.env.NODE_ENV === "development") {
    await import("mock");
  }
};
export default initCore;
