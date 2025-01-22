import { useState } from "react";
import {
  Div,
  Label,
  Radio,
  Fieldset,
  Legend,
  IconBox,
  IconCheck,
} from "../Login.page.component/Login.style";

interface GenderSelectProps {
  onGenderChange: (gender: string) => void;
}

export default function GenderSelect({ onGenderChange }: GenderSelectProps) {
  const [selectedGender, setSelectedGender] = useState<string>("");

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gender = event.target.value;
    setSelectedGender(gender);
    onGenderChange(gender);
  };

  return (
    <Fieldset>
      <Legend>성별</Legend>
      <Div className="gender-box">
        <Label htmlFor="gender-male" className="check-label">
          {selectedGender === "male" ? (
            <IconCheck className="checkbox-icon-checked" />
          ) : (
            <IconBox className="checkbox-icon" />
          )}
          Male
          <Radio
            name="gender"
            type="radio"
            id="gender-male"
            value="male"
            checked={selectedGender === "male"}
            onChange={handleGenderChange}
            required
            className="gender-radio"
          />
        </Label>

        <Label htmlFor="gender-female" className="check-label">
          {selectedGender === "female" ? (
            <IconCheck className="checkbox-icon-checked" />
          ) : (
            <IconBox className="checkbox-icon" />
          )}
          Female
          <Radio
            name="gender"
            type="radio"
            id="gender-female"
            value="female"
            checked={selectedGender === "female"}
            onChange={handleGenderChange}
            required
            className="gender-radio"
          />
        </Label>

        <Label htmlFor="gender-other" className="check-label">
          {selectedGender === "other" ? (
            <IconCheck className="checkbox-icon-checked" />
          ) : (
            <IconBox className="checkbox-icon" />
          )}
          Other
          <Radio
            name="gender"
            type="radio"
            id="gender-other"
            value="other"
            checked={selectedGender === "other"}
            onChange={handleGenderChange}
            required
            className="gender-radio"
          />
        </Label>
      </Div>
    </Fieldset>
  );
}
