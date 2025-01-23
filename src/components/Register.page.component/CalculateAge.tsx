import { useState, useEffect } from "react";
import {
  Div,
  Fieldset,
  Legend,
  Select,
  P,
} from "../Login.page.component/Login.style";
import Modal from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";

interface CalculateAgeProps {
  isAdult: (isValid: boolean | null) => void;
  onBirthdateChange: (year: string, month: string, day: string) => void;
}

const CalculateAge = ({ isAdult, onBirthdateChange }: CalculateAgeProps) => {
  const { isModalOpen, modalTitle, modalContent, openModal, closeModal } =
    useModal();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const years = Array.from(
    { length: new Date().getFullYear() - 1899 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const yearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
    setIsValid(null); // 값이 변경될 때만 유효성 검사를 다시 수행하게 설정
  };

  const monthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(event.target.value);
    setIsValid(null); // 값이 변경될 때만 유효성 검사를 다시 수행하게 설정
  };

  const dayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(event.target.value);
    setIsValid(null); // 값이 변경될 때만 유효성 검사를 다시 수행하게 설정
  };

  useEffect(() => {
    const validateDate = () => {
      if (!year || !month || !day) {
        setIsValid(null);
        isAdult(null);
        return;
      }

      const birthDate = new Date(
        parseInt(year, 10),
        parseInt(month, 10) - 1,
        parseInt(day, 10)
      );
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isUnder19 =
        age < 19 ||
        (age === 19 &&
          (today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() &&
              today.getDate() < birthDate.getDate())));

      if (isUnder19) {
        openModal(
          "잠깐!",
          <Div className="modal-box">
            <P>19세 미만 회원의 경우,</P>
            <P>이용에 제한이 있을 수 있습니다.</P>
          </Div>
        );
        setIsValid(false);
        isAdult(false);
      } else {
        setIsValid(true);
        isAdult(true);
      }
    };

    if (isValid === null) {
      validateDate(); // 날짜가 변경된 경우에만 유효성 검사 수행
    }
    onBirthdateChange(year, month, day);
  }, [year, month, day]);

  return (
    <Fieldset>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalTitle}
        content={modalContent}
      />
      <Legend>생년월일</Legend>
      <Div
        className={`item-box ${isValid === true ? "valid" : ""} ${
          isValid === false ? "invalid" : ""
        }`}
      >
        <Select name="year" value={year} onChange={yearChange} required>
          <option value="" disabled hidden>
            년
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>

        <Select name="month" value={month} onChange={monthChange} required>
          <option value="" disabled hidden>
            월
          </option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </Select>

        <Select name="day" value={day} onChange={dayChange} required>
          <option value="" disabled hidden>
            일
          </option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </Select>
      </Div>
    </Fieldset>
  );
};

export default CalculateAge;
