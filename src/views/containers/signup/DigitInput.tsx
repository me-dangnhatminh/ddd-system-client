import { Input, Stack } from "@mui/joy";
import React, { useState } from "react";
import { useImperativeHandle, useRef } from "react";

interface IDigitInputProps {
  digitSize: number;
  onChange?: (value: string) => void;
}

interface DigitInputRef {
  clearValues: () => void;
  value: string;
}

const DigitInput = React.forwardRef(
  (
    { digitSize, onChange }: IDigitInputProps,
    ref: React.ForwardedRef<DigitInputRef>
  ) => {
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    const [value, setValue] = useState<string[]>(Array(digitSize).fill(""));

    const clearValues = () => {
      setValue(Array(digitSize).fill(""));
      onChange?.("");
    };

    useImperativeHandle(ref, () => ({ clearValues, value: value.join("") }));

    return (
      <Stack spacing={1} direction="row">
        {Array.from({ length: digitSize }).map((_, index) => (
          <Input
            key={index}
            value={value[index] ?? ""}
            slotProps={{
              input: {
                ref: (ref) => (refs.current[index] = ref),
                type: "number",
                pattern: "[0-9]*",
                sx: {
                  WebkitAppearance: "none",
                  MozAppearance: "textfield",
                  appearance: "textfield",
                  "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  textAlign: "center",
                },
                onChange: (e) => {
                  const values = e.target.value.split("");
                  const startI = index;
                  const num = Math.min(values.length, digitSize - startI);

                  const newVal = value
                    .slice(0, startI)
                    .concat(values.slice(0, num));

                  setValue(newVal);
                  refs.current[startI + num]?.focus();
                  onChange?.(newVal.join(""));
                },
                onKeyUp: (e) => {
                  switch (e.key) {
                    case "ArrowRight":
                      if (index < digitSize - 1)
                        refs.current[index + 1]?.focus();
                      break;
                    case "ArrowLeft":
                      if (index > 0) refs.current[index - 1]?.focus();
                      break;
                    default:
                      break;
                  }
                },
                onFocus: (e) => e.target.select(),
              },
            }}
          />
        ))}
      </Stack>
    );
  }
);

export type DigitInputElement = React.ElementRef<typeof DigitInput>;
export default DigitInput;
