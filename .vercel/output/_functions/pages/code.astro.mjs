import { c as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BMAaEPJG.mjs';
import 'kleur/colors';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useForm } from '@tanstack/react-form';
import { F as FormError } from '../chunks/FormError_DHG66oZ_.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Cxf7gtX7.mjs';
export { renderers } from '../renderers.mjs';

function RsvpForm() {
  const form = useForm({
    defaultValues: {
      code: ""
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          const response = await fetch("/api/code", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
          });
          const data = await response.json();
          if (data.success) {
            window.location.href = "/";
          } else {
            return {
              fields: { code: data.error || "Invalid access code" }
            };
          }
        } catch (error) {
          return {
            fields: { code: "Error submitting form" }
          };
        }
      }
    }
  });
  return /* @__PURE__ */ jsx(
    "form",
    {
      className: "w-full",
      onSubmit: (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      },
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 w-full text-left", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "label", children: "Access code" }),
          /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "code",
              children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "name",
                    autoComplete: "off",
                    autoCapitalize: "off",
                    name: field.name,
                    value: field.state.value,
                    className: "input input-lg w-full",
                    onChange: (e) => field.handleChange(e.target.value),
                    type: "text",
                    required: true
                  }
                ),
                /* @__PURE__ */ jsx(
                  FormError,
                  {
                    showError: !field.state.meta.isValid,
                    error: field.state.meta.errors.join(",")
                  }
                )
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-lg btn-neutral mt-2", children: "Submit" })
      ] })
    }
  );
}

const $$Code = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "RSVP", "description": "Taylor and Josh's wedding RSVP page" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="px-8 pt-10 pb-10 items-center text-center text-black"> <div class="w-full max-w-md mx-auto"> <h1 class="font-heading text-2xl mb-20">The Kolenkos</h1> <p class="font-bold text-3xl mb-4">What's the password?</p> <p class="mb-12 mx-auto text-balance">
Enter the access code provided to you by Taylor and Josh to access the wedding website.
</p> ${renderComponent($$result2, "CodeForm", RsvpForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/joshkolenko/Development/github/thekolenkos/src/components/CodeForm", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/joshkolenko/Development/github/thekolenkos/src/pages/code.astro", void 0);

const $$file = "/Users/joshkolenko/Development/github/thekolenkos/src/pages/code.astro";
const $$url = "/code";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Code,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
