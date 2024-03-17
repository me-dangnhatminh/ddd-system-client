import { Input, Stack } from "@mui/joy";
import { useRef } from "react";

interface IDigitInputProps {
  digitSize: number;
  onChange?: (value: string) => void;
}

function DigitInput({ digitSize = 6, onChange }: IDigitInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <Stack spacing={1} direction="row">
      {Array.from({ length: digitSize }).map((_, index) => (
        <Input
          slotProps={{
            input: {
              ref: (ref) => (refs.current[index] = ref),
              type: "number",
              pattern: "[0-9]*",
              sx: {
                WebkitAppearance: "none",
                MozAppearance: "textfield",
                appearance: "textfield",
                "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                textAlign: "center",
              },
              onChange: (e) => {
                const values = e.target.value;

                const loopSize = Math.min(values.length + 1, digitSize - index);
                for (let i = 0; i < loopSize; i++) {
                  const value = values[i];
                  const ref = refs.current[index + i];
                  if (ref && value) ref.value = value;
                }
                onChange?.(values);
                refs.current[index + loopSize - 1]?.focus();
              },
              onKeyUp: (e) => {
                switch (e.key) {
                  case "ArrowRight":
                    if (index < digitSize - 1) refs.current[index + 1]?.focus();
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

export default DigitInput;
