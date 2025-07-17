import { c as createComponent, f as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BMAaEPJG.mjs';
import 'kleur/colors';
import { $ as $$Dock } from '../chunks/Dock_EC6crT5C.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useForm } from '@tanstack/react-form';
import { F as FormError } from '../chunks/FormError_DHG66oZ_.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Cxf7gtX7.mjs';
export { renderers } from '../renderers.mjs';

function RsvpForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: ""
    },
    validators: {
      onSubmit: ({ value }) => {
        const errors = {};
        if (!value.name) {
          errors["name"] = "Name is required";
        }
        if (!value.email) {
          errors["email"] = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value.email)) {
          errors["email"] = "Email is invalid";
        }
        if (!value.phone) {
          errors["phone"] = "Phone is required";
        } else if (!/^\+?[1-9]\d{1,14}$/.test(value.phone)) {
          errors["phone"] = "Phone number is invalid";
        }
        if (Object.keys(errors).length) {
          return {
            fields: errors
          };
        }
        return void 0;
      }
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      return;
    }
  });
  function removeGuest(guest) {
    form.setFieldValue("guests", (prev) => {
      const currentGuests = prev ? prev.split(",").map((g) => g.trim()) : [];
      const updatedGuests = currentGuests.filter((g) => g !== guest.trim());
      return updatedGuests.join(", ");
    });
  }
  function handleTagKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      const value = input.value.replace(/,/g, "").trim();
      if (!value) return;
      if (value) {
        form.setFieldValue("guests", (prev) => {
          const currentGuests = prev ? prev.split(",").map((g) => g.trim()) : [];
          return [...currentGuests, value].join(", ");
        });
        input.value = "";
      }
    }
  }
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
        /* @__PURE__ */ jsx("span", { className: "my-2 text-sm text-base-content/60", children: "* Required field" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "label", children: "Name*" }),
          /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "name",
              children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "name",
                    autoComplete: "name",
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
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "label", children: "Email*" }),
          /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "email",
              children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "email",
                    autoComplete: "name",
                    name: field.name,
                    value: field.state.value,
                    className: "input input-lg w-full",
                    onChange: (e) => field.handleChange(e.target.value),
                    type: "email",
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
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "label", children: "Phone*" }),
          /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "phone",
              children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "phone",
                    autoComplete: "tel",
                    name: field.name,
                    value: field.state.value,
                    className: "input input-lg w-full",
                    onChange: (e) => field.handleChange(e.target.value),
                    type: "phone",
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
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "label", children: "Guests" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm text-base-content/60", children: "Press enter to add a guest, click guest to remove" }),
          /* @__PURE__ */ jsx(
            form.Field,
            {
              name: "guests",
              children: (field) => /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("input", { type: "text", onKeyDown: handleTagKeyDown, className: "input input-lg w-full" }),
                field.state.value && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: field.state.value.split(",").map((guest, index) => /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    className: "cursor-pointer badge badge-lg badge-neutral",
                    onClick: () => removeGuest(guest),
                    children: [
                      guest,
                      /* @__PURE__ */ jsx("i", { className: "ph-bold ph-x text-xs" })
                    ]
                  },
                  index
                )) })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-lg btn-neutral mt-2", children: "Submit" })
      ] })
    }
  );
}

const $$Rsvp = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "RSVP", "description": "Taylor and Josh's wedding RSVP page" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="px-8 pt-20 pb-10 items-center text-center text-black"> <div class="w-full max-w-md mx-auto"> <h1 class="font-body text-5xl tracking-wider mb-6">RSVP</h1> <p class="mb-4 text-xl">
RSVP deadline: <strong>June 1, 2026</strong> </p> <p class="mb-8">
If you'd like to attend our wedding, please fill out the form below. If you have additional
        guests such as children or your plus one, enter their names in the Guests field.
</p> ${renderComponent($$result2, "RsvpForm", RsvpForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/joshkolenko/Development/github/thekolenkos/src/components/RsvpForm", "client:component-export": "default" })} </div> </div> ${renderComponent($$result2, "Dock", $$Dock, { "active": "RSVP" })} ` })}`;
}, "/Users/joshkolenko/Development/github/thekolenkos/src/pages/rsvp.astro", void 0);

const $$file = "/Users/joshkolenko/Development/github/thekolenkos/src/pages/rsvp.astro";
const $$url = "/rsvp";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Rsvp,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
