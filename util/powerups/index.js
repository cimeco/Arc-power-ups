export const sendMessage = function (action, data) {
  window.parent.postMessage(
    JSON.stringify({
      source: "custom_embed",
      action,
      data,
      key: parseQueryString()['k'],
    }),
    "*"
  );
};


export const parseQueryString = function () {
  const params = location.search.split("?")[1] || "";
  const kv = params.split("&");
  return kv.reduce((result, item) => {
    const [key, value] = item.split("=");
    return Object.assign(result, {
      [key]: value,
    });
  }, {});
};