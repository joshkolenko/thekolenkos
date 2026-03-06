import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function EditableInput({
  value,
  onChange,
  className,
  type = "text",
  isTextArea = false,
}: {
  value: string | number;
  onChange: (newValue: string | number) => void;
  className?: string;
  type?: string;
  isTextArea?: boolean;
}) {
  const [isEdited, setIsEdited] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const elRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

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
    if (type === "number") {
      const numValue = Number(inputValue);

      if (isNaN(numValue)) {
        setInputValue(value);
        setIsEdited(false);
        return;
      }

      setInputValue(numValue);
      onChange(numValue);
    } else {
      onChange(inputValue);
    }

    setIsEdited(false);
    elRef.current?.blur();
  }

  function handleCancel() {
    setInputValue(value);
    setIsEdited(false);
  }

  const renderedEditButtons = isEdited && (
    <div className="flex gap-1">
      <button type="button" className="btn btn-sm btn-primary w-10 btn-square" onClick={handleSave}>
        <i className="ph-bold ph-check text-xl" />
      </button>
      <button type="button" className="btn btn-sm btn-error w-10 btn-square" onClick={handleCancel}>
        <i className="ph-bold ph-x text-xl" />
      </button>
    </div>
  );

  if (isTextArea) {
    return (
      <div className="flex flex-col gap-2">
        <textarea
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="textarea w-full h-30"
          ref={elRef as React.RefObject<HTMLTextAreaElement>}
        />
        <div className="ml-auto">{renderedEditButtons}</div>
      </div>
    );
  }

  return (
    <label className={clsx("input validator pr-1 w-full", className)}>
      <input
        type={type}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        ref={elRef as React.RefObject<HTMLInputElement>}
      />
      {renderedEditButtons}
    </label>
  );
}
