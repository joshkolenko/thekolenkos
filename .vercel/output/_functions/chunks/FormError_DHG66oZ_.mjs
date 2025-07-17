import { jsx } from 'react/jsx-runtime';

function FormError({ error, showError }) {
  if (!showError || !error) {
    return null;
  }
  return /* @__PURE__ */ jsx("div", { className: "text-red-500 text-sm mt-1 tracking-tight", children: error });
}

export { FormError as F };
