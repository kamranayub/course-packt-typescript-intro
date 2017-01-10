'use strict';

export = {
  isString: function(arg: Object) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg: Object) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg: Object | null) {
    return arg === null;
  },
  isNullOrUndefined: function(arg: Object | null | undefined) {
    return arg == null;
  }
};
