// export const sendMessage = function (action, data) {
//     window.parent.postMessage(
//       JSON.stringify({
//         source: "custom_embed",
//         action,
//         data,
//         key: '#SEARCH',
//       }),
//       "*"
//     );
//   };


  var sendMessage = function sendMessage(action, data) {
    if ((window, 'parent', false)) {
        // var messagePayload = {
        //     source: 'custom_embed',
        //     action: action,
        //     data: data,
        //     key: getKey()
        // };

        if (action === 'ready') {
            messagePayload.isAnsRequired = true;
        }

        window.parent.postMessage(JSON.stringify(messagePayload), '*');
    }
};

  

  const parseQueryString = function () {
    const params = location.search.split("?")[1] || "";
    const kv = params.split("&");
    return kv.reduce((result, item) => {
      const [key, value] = item.split("=");
      return Object.assign(result, {
        [key]: value,
      });
    }, {});
  };