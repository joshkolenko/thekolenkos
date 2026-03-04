import clsx from "clsx";
import { use, useEffect, useRef, useState } from "react";

export default function EditableInput({
  value,
  onChange,
  className,
  type = "text",
}: {
  value: string | number;
  onChange: (newValue: string | number) => void;
  className?: string;
  type?: string;
}) {
  const [isEdited, setIsEdited] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(value);
    setIsEdited(false);
  }, [value]);

  useEffect(() => {
    if (value !== inputValue) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [inputValue]);

  function handleSave() {
    onChange(inputValue);
    setIsEdited(false);
  }

  function handleCancel() {
    setInputValue(value);
    setIsEdited(false);
  }

  return (
    <label className={clsx("input validator outline-none pr-1 w-full", className)}>
      <input
        type={type}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        ref={inputRef}
      />
      <div className="flex gap-1">
        {isEdited && (
          <>
            <button
              type="button"
              className="btn btn-sm btn-primary w-10 btn-square outline-none"
              onClick={handleSave}
            >
              <i className="ph-bold ph-check text-xl" />
            </button>
            <button
              type="button"
              className="btn btn-sm btn-error w-10 btn-square outline-none"
              onClick={handleCancel}
            >
              <i className="ph-bold ph-x text-xl" />
            </button>
          </>
        )}
      </div>
    </label>
  );
}
