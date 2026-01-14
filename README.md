# Repro to demonstrate non tree-shakability of rolldown's build output

1. Clone and change into the projest directory -

```sh
git clone https://github.com/brijeshb42/rolldown-treeshake-repro.git
cd rolldown-treeshake-repro
```

2. Install dependencies

```sh
npm i
```

3. Check the simulated lib file -> [src/lib/index.ts](src/lib/index.ts) being imported in [App.ts](src/App.ts). Initially it imports the `lib/index.ts` file.
4. Run `npm run build` to build the project with vite.
5. Verify the output in `dist/assets/index-[hash].js`. It'll contain something like -

```js
import "./polyfill-COaX8i6R.js";
const hello12 = "hello1_2";
function main() {
  console.log(hello12);
}
main();
```

Here, since in the source `App.ts`, it was only using `hello.hello1.hello12` in the code, the final bundle only contains `hello12`.

6. Now run `npm run build:lib` and update the import in `App.ts` to be from `'./lib/index.js'` to point to the file built by rolldown instead.
7. Rebuild the vite project with `npm run build` and inspect the output in `dist/assets/index-[hash].js`. It'll contain something like -

```js
var __defProp = Object.defineProperty;
var __exportAll = (all, symbols) => {
  let target = {};
  for (var name in all) {
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
    });
  }
  return target;
};
var hello1_exports = /* @__PURE__ */ __exportAll({
  hello11: () => hello11,
  hello12: () => hello12,
});
const hello11 = "hello1_1";
const hello12 = "hello1_2";
function main() {
  console.log(hello1_exports.hello12);
}
main();
```

This contains some runtime code by rolldown (not significant for a big project). But it also contains the imports that are not actually used in the source `App.ts`, in this case, `hello11` is not used but is still part of the code.
