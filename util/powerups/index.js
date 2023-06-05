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

export const getKey = function getKey() {
  var pageURL = new URL((0, _lodash["default"])(window, 'location.href', ''));
  var searchParams = pageURL.searchParams;
  var keyResult = searchParams.get('k');

  if (keyResult) {
      return keyResult;
  }

  var hash = pageURL.hash;
  var embedParams = hash.split('?');
  var embedParamsList = embedParams[1].split('&');
  var sessionKey = embedParamsList.reduce(function (accumulator, currentValue) {
      if (currentValue.startsWith('k=')) {
          var key = currentValue.split('=')[1];
          return key;
      }

      return accumulator;

  }, '');

  return sessionKey;
};
