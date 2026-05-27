export const getCheckedDevicesFromCart = (cart) => {
  const finalDevices = cart.devices.filter((device) => device.checked);
  console.log(finalDevices);
  return finalDevices;
};
