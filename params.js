var params = function() {
  var config = {};

  var aliases = {
    "file": "f",
    "firstRowIsHeader": "frh", // Use this if you're using a default Excel CSV exported file where first row is headers
    "out": "o"
  };

  function setConfigItem(key, val) {
    config[key] = val;
  }

  function createParamObj() {
    var params = process.argv.length > 2 ? process.argv.slice(2) : [];
    params = params.filter((param) => {
      if (param.substr(0,2) === '--' || param.substr(0,1) === '-') {
        return true;
      }
      return false;
    }).map((param) => {
      var sliceStart = param.substr(0,2) === '--' ? 2 : 1;
      return param.substr(sliceStart);
    });
    if (params.length) {
      params.forEach((param) => {
        var tmp = param.split('=');
        setConfigItem(tmp[0], tmp[1] || true)
      });
    } else if (typeof params === 'object') {
      for (key in params) {
        if (!!params[key]) {
          setConfigItem(key, params[key] || true)
        }
      }
    }

    function checkAliases(param) {
      if (aliases.hasOwnProperty(param)) {
        var alias = aliases[param];
        return config.hasOwnProperty(alias) ? config[alias] : false;
      }
      return false;
    }

    function getParam(param) {
      var foundParam = config.hasOwnProperty(param) ? config[param] : false;

      if (!foundParam) {
        foundParam = checkAliases(param);
      }
      return foundParam;
    }

    return getParam;
  };

  return createParamObj();

};


module.exports = params();
