import { useState } from "react";
import {
  Div,
  Select,
  Label,
  Input,
  Fieldset,
  Legend,
} from "../Login.page.component/Login.style";
import countryCodeArray from "../../../public/assets/datas/countryCode"
interface PhoneNumberProps {
  onPhoneNumberChange: (countryCode: string, phoneNumber: string) => void;
}

export default function PhoneNumber({ onPhoneNumberChange }: PhoneNumberProps) {
  const [registerPhonenumber, setRegisterPhonenumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");

  const handlePhonenumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setRegisterPhonenumber(value);
    onPhoneNumberChange(countryCode, value); // 변경된 전화번호와 국가 코드 전달
  };

  const handleCountryCodeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setCountryCode(value);
    onPhoneNumberChange(value, registerPhonenumber); // 변경된 국가 코드와 전화번호 전달
  };

  return (
    <Fieldset>
      <Div className={`item-box ${countryCode ? "valid" : ""}`}>
        <Label htmlFor="phonenumber">
          연락처
          <Div className="number-box">
            <Select
              name="countrycode"
              defaultValue=""
              onChange={handleCountryCodeChange}
              required
            >
              <option value="">국가</option>
              {countryCodeArray.map((item) => (
                <option key={`${item.country}-${item.code}`} value={item.code}>
                  ({item.code}) {item.country}
                </option>
              ))}
            </Select>
            <Input
              name="phonenumber"
              type="tel"
              id="phonenumber"
              value={registerPhonenumber}
              minLength={8}
              onChange={handlePhonenumberChange}
              required
              placeholder="'-' 없이 입력"
              className="number"
            />
          </Div>
        </Label>
      </Div>
    </Fieldset>
  );
}
