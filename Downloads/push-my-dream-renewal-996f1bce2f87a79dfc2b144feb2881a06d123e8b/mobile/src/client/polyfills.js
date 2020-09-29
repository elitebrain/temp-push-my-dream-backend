// /* eslint no-extend-native: 0 */
// // core-js comes with Next.js. So, you can import it like below
// import includes from "core-js/library/fn/string/virtual/includes";
// import repeat from "core-js/library/fn/string/virtual/repeat";
// import assign from "core-js/library/fn/object/assign";

// // import assign from "core-js"

// // Add your polyfills
// // This files runs at the very beginning (even before React and Next.js core)
// console.log("Load your polyfills");

// String.prototype.includes = includes;
// String.prototype.repeat = repeat;
// Object.assign = assign;

import "core-js/features/array/copy-within";
import "core-js/features/array/fill";
import "core-js/features/array/find";
import "core-js/features/array/find-index";
import "core-js/features/array/flat-map";
import "core-js/features/array/flat";
import "core-js/features/array/from";
import "core-js/features/array/includes";
import "core-js/features/array/iterator";
import "core-js/features/array/of";
import "core-js/features/function/has-instance";
import "core-js/features/map";
import "core-js/features/number/constructor";
import "core-js/features/number/epsilon";
import "core-js/features/number/is-finite";
import "core-js/features/number/is-integer";
import "core-js/features/number/is-nan";
import "core-js/features/number/is-safe-integer";
import "core-js/features/number/max-safe-integer";
import "core-js/features/number/min-safe-integer";
import "core-js/features/object/entries";
import "core-js/features/object/get-own-property-descriptors";
import "core-js/features/object/is";
import "core-js/features/object/values";
import "core-js/features/reflect";
import "core-js/features/regexp";
import "core-js/features/set";
import "core-js/features/symbol";
import "core-js/features/symbol/async-iterator";
import "core-js/features/string/code-point-at";
import "core-js/features/string/ends-with";
import "core-js/features/string/from-code-point";
import "core-js/features/string/includes";
import "core-js/features/string/iterator";
import "core-js/features/string/pad-start";
import "core-js/features/string/pad-end";
import "core-js/features/string/raw";
import "core-js/features/string/repeat";
import "core-js/features/string/starts-with";
import "core-js/features/string/trim-left";
import "core-js/features/string/trim-right";
import "core-js/features/weak-map";
import "core-js/features/weak-set";
import "core-js/features/promise";
import "core-js/features/promise/all-settled";
import "core-js/features/promise/finally";

// Specialized Packages:
import "whatwg-fetch";
import "url-polyfill";
import assign from "object-assign";
Object.assign = assign;
